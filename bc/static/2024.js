const map = document.getElementById("map");
const rootStyle = getComputedStyle(document.documentElement);
const secondaryColor = rootStyle.getPropertyValue('--bs-secondary').trim();
const parties = {
    "TBD": {"symbol": "TBD", "name": "Unknown", "color": secondaryColor},
    "GRN": {"symbol": "GRN", "name": "Green Party", "color": "#008542"},
    "NDP": {"symbol": "NDP", "name": "New Democratic Party", "color": "#FF6633"},
    "CON": {"symbol": "CON", "name": "Conservative Party", "color": "#004AAD"}
}
var regions = {'ABM': {'name': 'Abbotsford-Mission', 'parties': {}}, 'ABS': {'name': 'Abbotsford South', 'parties': {}}, 'ABW': {'name': 'Abbotsford West', 'parties': {}}, 'BDS': {'name': 'Boundary-Similkameen', 'parties': {}}, 'BLS': {'name': 'Bulkley Valley-Stikine', 'parties': {}}, 'BNC': {'name': 'Burnaby Centre', 'parties': {}}, 'BNE': {'name': 'Burnaby East', 'parties': {}}, 'BNN': {'name': 'Burnaby-New Westminster', 'parties': {}}, 'BNO': {'name': 'Burnaby North', 'parties': {}}, 'BNS': {'name': 'Burnaby South-Metrotown', 'parties': {}}, 'CBC': {'name': 'Cariboo-Chilcotin', 'parties': {}}, 'CHC': {'name': 'Chilliwack-Cultus Lake', 'parties': {}}, 'CHN': {'name': 'Chilliwack North', 'parties': {}}, 'CLR': {'name': 'Columbia River-Revelstoke', 'parties': {}}, 'CQB': {'name': 'Coquitlam-Burke Mountain', 'parties': {}}, 'CQM': {'name': 'Coquitlam-Maillardville', 'parties': {}}, 'CRC': {'name': 'Courtenay-Comox', 'parties': {}}, 'CWV': {'name': 'Cowichan Valley', 'parties': {}}, 'DLN': {'name': 'Delta North', 'parties': {}}, 'DLS': {'name': 'Delta South', 'parties': {}}, 'ESC': {'name': 'Esquimalt-Colwood', 'parties': {}}, 'FRN': {'name': 'Fraser-Nicola', 'parties': {}}, 'JFM': {'name': 'Juan de Fuca-Malahat', 'parties': {}}, 'KAC': {'name': 'Kamloops Centre', 'parties': {}}, 'KAN': {'name': 'Kamloops-North Thompson', 'parties': {}}, 'KEC': {'name': 'Kelowna Centre', 'parties': {}}, 'KLC': {'name': 'Kelowna-Lake Country-Coldstream', 'parties': {}}, 'KLM': {'name': 'Kelowna-Mission', 'parties': {}}, 'KOC': {'name': 'Kootenay Central', 'parties': {}}, 'KOM': {'name': 'Kootenay-Monashee', 'parties': {}}, 'KOR': {'name': 'Kootenay-Rockies', 'parties': {}}, 'LAO': {'name': 'Ladysmith-Oceanside', 'parties': {}}, 'LFH': {'name': 'Langford-Highlands', 'parties': {}}, 'LLA': {'name': 'Langley-Abbotsford', 'parties': {}}, 'LWG': {'name': 'Langley-Walnut Grove', 'parties': {}}, 'LWI': {'name': 'Langley-Willowbrook', 'parties': {}}, 'MAE': {'name': 'Maple Ridge East', 'parties': {}}, 'MAP': {'name': 'Maple Ridge-Pitt Meadows', 'parties': {}}, 'MPR': {'name': 'Mid Island-Pacific Rim', 'parties': {}}, 'NAI': {'name': 'Nanaimo-Gabriola Island', 'parties': {}}, 'NAL': {'name': 'Nanaimo-Lantzville', 'parties': {}}, 'NEC': {'name': 'Nechako Lakes', 'parties': {}}, 'NMC': {'name': 'New Westminster-Coquitlam', 'parties': {}}, 'NOH': {'name': 'North Coast-Haida Gwaii', 'parties': {}}, 'NOI': {'name': 'North Island', 'parties': {}}, 'NVL': {'name': 'North Vancouver-Lonsdale', 'parties': {}}, 'NVS': {'name': 'North Vancouver-Seymour', 'parties': {}}, 'OBG': {'name': 'Oak Bay-Gordon Head', 'parties': {}}, 'PCN': {'name': 'Peace River North', 'parties': {}}, 'PCS': {'name': 'Peace River South', 'parties': {}}, 'PES': {'name': 'Penticton-Summerland', 'parties': {}}, 'POC': {'name': 'Port Coquitlam', 'parties': {}}, 'POM': {'name': 'Port Moody-Burquitlam', 'parties': {}}, 'POR': {'name': 'Powell River-Sunshine Coast', 'parties': {}}, 'PRM': {'name': 'Prince George-Mackenzie', 'parties': {}}, 'PRO': {'name': 'Prince George-North Cariboo', 'parties': {}}, 'PRV': {'name': 'Prince George-Valemount', 'parties': {}}, 'RCB': {'name': 'Richmond-Bridgeport', 'parties': {}}, 'RCC': {'name': 'Richmond Centre', 'parties': {}}, 'RCQ': {'name': 'Richmond-Queensborough', 'parties': {}}, 'RCS': {'name': 'Richmond-Steveston', 'parties': {}}, 'SAN': {'name': 'Saanich North and the Islands', 'parties': {}}, 'SAS': {'name': 'Saanich South', 'parties': {}}, 'SHU': {'name': 'Salmon Arm-Shuswap', 'parties': {}}, 'SKE': {'name': 'Skeena', 'parties': {}}, 'SRC': {'name': 'Surrey City Centre', 'parties': {}}, 'SRD': {'name': 'Surrey-Cloverdale', 'parties': {}}, 'SRF': {'name': 'Surrey-Fleetwood', 'parties': {}}, 'SRG': {'name': 'Surrey-Guildford', 'parties': {}}, 'SRN': {'name': 'Surrey-Newton', 'parties': {}}, 'SUN': {'name': 'Surrey North', 'parties': {}}, 'SUP': {'name': 'Surrey-Panorama', 'parties': {}}, 'SUR': {'name': 'Surrey-Serpentine River', 'parties': {}}, 'SUS': {'name': 'Surrey South', 'parties': {}}, 'SWR': {'name': 'Surrey-White Rock', 'parties': {}}, 'VFV': {'name': 'Vancouver-Fraserview', 'parties': {}}, 'VHA': {'name': 'Vancouver-Hastings', 'parties': {}}, 'VKE': {'name': 'Vancouver-Kensington', 'parties': {}}, 'VLA': {'name': 'Vancouver-Langara', 'parties': {}}, 'VLM': {'name': 'Vancouver-Little Mountain', 'parties': {}}, 'VNP': {'name': 'Vancouver-Point Grey', 'parties': {}}, 'VNQ': {'name': 'Vancouver-Quilchena', 'parties': {}}, 'VNR': {'name': 'Vancouver-Renfrew', 'parties': {}}, 'VNS': {'name': 'Vancouver-South Granville', 'parties': {}}, 'VNT': {'name': 'Vancouver-Strathcona', 'parties': {}}, 'VNW': {'name': 'Vancouver-West End', 'parties': {}}, 'VNY': {'name': 'Vancouver-Yaletown', 'parties': {}}, 'VRL': {'name': 'Vernon-Lumby', 'parties': {}}, 'VTB': {'name': 'Victoria-Beacon Hill', 'parties': {}}, 'VTS': {'name': 'Victoria-Swan Lake', 'parties': {}}, 'WKP': {'name': 'West Kelowna-Peachland', 'parties': {}}, 'WVC': {'name': 'West Vancouver-Capilano', 'parties': {}}, 'WVS': {'name': 'West Vancouver-Sea to Sky', 'parties': {}}}

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
        locations.forEach(location => {
            if (!!svgDoc.getElementById(location + "-EXPANDED")) {
                const svgObjectExpanded = svgDoc.getElementById(location + "-EXPANDED")
                svgObjectExpanded.addEventListener('mouseenter', updateRegionInfo);
                svgObjectExpanded.addEventListener('mouseleave', clearRegionInfo);
            }
            const svgObject = svgDoc.getElementById(location)
            svgObject.addEventListener('mouseenter', updateRegionInfo);
            svgObject.addEventListener('mouseleave', clearRegionInfo);
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
        regions[fields[0]]["parties"][fields[3]] = {
            "name": fields[3],
            "candidate": fields[2],
            "votes": fields[4],
        }
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
        const abbreviatedParty = partyMapping[party] || 'TBD';
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
function updateRegionInfo(e) {
    const region = e.target.id.slice(0, 3);
    const regionInfo = document.getElementById("region-info");

    const regionHeader = document.createElement("h5");
    regionHeader.classList = "justify-content-center d-flex m-2 fw-bold";
    regionHeader.innerHTML = regions[region]["name"];
    regionInfo.appendChild(regionHeader);

    const partiesInfo = document.createElement("ul")
    partiesInfo.classList = "list-group list-group-horizontal justify-content-center d-flex mb-2"

    for (const partyName in regions[region]["parties"]) {
        const partyInfo = document.createElement("li");
        partyInfo.classList = "list-group-item";

        const partyData = regions[region]["parties"][partyName];

        const partyHeader = document.createElement("div");
        partyHeader.classList = "row justify-content-center d-flex fw-bold";
        if (partyData["name"] === " ") {
            partyHeader.innerHTML = "Unknown";
        } else {
            partyHeader.innerHTML =  partyData["name"];
        }

        const candidateName = document.createElement("div");
        candidateName.classList = "row justify-content-center d-flex";
        candidateName.innerHTML = partyData["candidate"];

        const candidateVotes = document.createElement("div");
        candidateVotes.classList = "row justify-content-center d-flex";
        candidateVotes.innerHTML = partyData["votes"];

        partyInfo.appendChild(partyHeader);
        partyInfo.appendChild(candidateName);
        partyInfo.appendChild(candidateVotes);
        partiesInfo.appendChild(partyInfo);
    }
    regionInfo.appendChild(partiesInfo)
}
function clearRegionInfo() {
    const regionInfo = document.getElementById("region-info");
    regionInfo.innerHTML = ""
}