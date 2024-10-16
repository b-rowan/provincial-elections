const map = document.getElementById("map");
const rootStyle = getComputedStyle(document.documentElement);
const secondaryColor = rootStyle.getPropertyValue('--bs-secondary').trim();
const parties = {
    "???": {"symbol": "???", "name": "Unknown", "color": secondaryColor},
    "GRN": {"symbol": "GRN", "name": "Green Party", "color": "#008542"},
    "NDP": {"symbol": "NDP", "name": "New Democratic Party", "color": "#FF6633"},
    "CON": {"symbol": "CON", "name": "Conservative Party", "color": "#004AAD"}
}
const electoralCsvUrl = 'https://electionsbcenr.blob.core.windows.net/electionsbcenr/GE-2024-10-19_Candidate.csv';

let locations = [];
document.addEventListener("DOMContentLoaded", () => {
    map.addEventListener('load', () => {
        const svgDoc = map.contentDocument;
        if (!svgDoc) {
            console.error("Failed to load SVG document.");
            return;
        }
        const svgElements = svgDoc.querySelectorAll('*');
        svgElements.forEach(element => {
            if (element.id.length === 3) {
                locations.push(element.id);
            }
        });
        startFetchingElectoralData(electoralCsvUrl);
    });
});
function recolorArea(name, party) {
    const area = map.contentDocument.getElementById(name);
    if (!area) {
        console.error(`failed to set party color: ${name}, ${party}`)
        return
    }
    const partyColor = parties[party] ? parties[party]["color"] : secondaryColor;
    area.setAttribute('fill', partyColor);

    const areaExpanded = map.contentDocument.getElementById(name + "-EXPANDED")
    if (areaExpanded != null) {
        areaExpanded.setAttribute('fill', partyColor);
    }
}
function updateCounts() {
    const counts = Object.keys(parties).reduce((acc, key) => {
        acc[key] = 0;
        return acc;
    }, {});
    locations.forEach((loc) => {
        const area = map.contentDocument.getElementById(loc);
        Object.keys(parties).forEach((key) => {
            if (parties[key]["color"] === area.getAttribute("fill")) {
                counts[key]++;
            }
        })
    })
    Object.keys(counts).forEach((party) => {
        const count = document.getElementById(`${party}-count`);
        count.innerHTML = counts[party];
    })
}
async function fetchElectoralData(url) {
    try {
        const response = await fetch(url, {mode: "no-cors"});

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const csvData = await response.text();
        const parsedData = parseElectoralCSV(csvData);
        const winningParties = getTopPartyByDistrict(parsedData);
        for (const district in winningParties) {
            const winningParty = winningParties[district];
            recolorArea(district, winningParty);
        }
        updateCounts();
    } catch (error) {
        console.error('Error fetching electoral data:', error);
    }
}
function parseElectoralCSV(csv) {
    const lines = csv.trim().split('\n');
    const headers = lines[0].split(',');

    const result = lines.slice(1).map(line => {
        const fields = line.split(',');
        return {
            district: fields[0],
            party: fields[3],
            votes: fields[4],
        };
    });

    return result;
}
function getTopPartyByDistrict(parsedData) {
    const topParties = {};

    const partyMapping = {
        'Conservative Party': 'CON',
        'Green Party': 'GRN',
        'BC NDP': 'NDP',
    };

    parsedData.forEach(entry => {
        const { district, party, votes } = entry;
        const voteCount = parseInt(votes, 10); // Convert votes to a number
        const abbreviatedParty = partyMapping[party] || '???';
        if (!topParties[district] || voteCount > topParties[district].votes) {
            topParties[district] = { party: abbreviatedParty, votes: voteCount };
        }
    });

    const result = {};
    for (const district in topParties) {
        result[district] = topParties[district].party;
    }

    return result;
}
function startFetchingElectoralData(csvUrl) {
    fetchElectoralData(csvUrl);
    setInterval(() => {
        fetchElectoralData(csvUrl);
    }, 180000);
}
