const map = document.getElementById("map");
const rootStyle = getComputedStyle(document.documentElement);
const secondaryColor = rootStyle.getPropertyValue('--bs-secondary').trim();
const parties = {
    "TBD": {"symbol": "TBD", "name": "Unknown", "color": secondaryColor},
    "SAS": {"symbol": "SAS", "name": "Saskatchewan Party", "color": "#00593E"},
    "UNI": {"symbol": "UNI", "name": "Saskatchewan United Party", "color": "#055284"},
    "NDP": {"symbol": "NDP", "name": "New Democratic Party", "color": "#FF9800"},
    "BUF": {"symbol": "BUF", "name": "Buffalo Party", "color": "#FDCC04"}
}
var regions = {'ATH': {'name': 'Athabasca', 'parties': {}}, 'BAT': {'name': 'Batoche', 'parties': {}}, 'CAN': {'name': 'Cannington', 'parties': {}}, 'CNP': {'name': 'Canora-Pelly', 'parties': {}}, 'CRV': {'name': 'Carrot River Valley', 'parties': {}}, 'CUB': {'name': 'Cumberland', 'parties': {}}, 'CUT': {'name': 'Cut Knife-Turtleford', 'parties': {}}, 'CYP': {'name': 'Cypress Hills', 'parties': {}}, 'DAR': {'name': 'Dakota-Arm River', 'parties': {}}, 'EBM': {'name': 'Estevan-Big Muddy', 'parties': {}}, 'HUW': {'name': 'Humboldt-Watrous', 'parties': {}}, 'KEW': {'name': 'Kelvington-Wadena', 'parties': {}}, 'KIB': {'name': 'Kindersley-Biggar', 'parties': {}}, 'LAT': {'name': 'Last Mountain-Touchwood', 'parties': {}}, 'LLD': {'name': 'Lloydminster', 'parties': {}}, 'LUM': {'name': 'Lumsden-Morse', 'parties': {}}, 'MAB': {'name': 'Martensville-Blairmore', 'parties': {}}, 'MEA': {'name': 'Meadow Lake', 'parties': {}}, 'MEL': {'name': 'Melfort', 'parties': {}}, 'MES': {'name': 'Melville-Saltcoats', 'parties': {}}, 'MJN': {'name': 'Moose Jaw North', 'parties': {}}, 'MJW': {'name': 'Moose Jaw Wakamow', 'parties': {}}, 'MOM': {'name': 'Moosomin-Montmartre', 'parties': {}}, 'PAC': {'name': 'Prince Albert Carlton', 'parties': {}}, 'PAN': {'name': 'Prince Albert Northcote', 'parties': {}}, 'RCP': {'name': 'Regina Coronation Park', 'parties': {}}, 'RDP': {'name': 'Regina Douglas Park', 'parties': {}}, 'REC': {'name': 'Regina Elphinstone-Centre', 'parties': {}}, 'RLK': {'name': 'Regina Lakeview', 'parties': {}}, 'RMR': {'name': 'Regina Mount Royal', 'parties': {}}, 'RNE': {'name': 'Regina Northeast', 'parties': {}}, 'RPQ': {'name': 'Regina Pasqua', 'parties': {}}, 'RRD': {'name': 'Regina Rochdale', 'parties': {}}, 'RSA': {'name': 'Regina South Albert', 'parties': {}}, 'RUN': {'name': 'Regina University', 'parties': {}}, 'RWA': {'name': 'Regina Walsh Acres', 'parties': {}}, 'RWP': {'name': 'Regina Wascana Plains', 'parties': {}}, 'RZD': {'name': 'Rosetown-Delisle', 'parties': {}}, 'SAR': {'name': 'Saskatchewan Rivers', 'parties': {}}, 'SCE': {'name': 'Saskatoon Centre', 'parties': {}}, 'SCM': {'name': 'Saskatoon Chief Mistawasis', 'parties': {}}, 'SCW': {'name': 'Saskatoon Churchill-Wildwood', 'parties': {}}, 'SEA': {'name': 'Saskatoon Eastview', 'parties': {}}, 'SFA': {'name': 'Saskatoon Fairview', 'parties': {}}, 'SME': {'name': 'Saskatoon Meewasin', 'parties': {}}, 'SNU': {'name': 'Saskatoon Nutana', 'parties': {}}, 'SRD': {'name': 'Saskatoon Riversdale', 'parties': {}}, 'SSI': {'name': 'Saskatoon Silverspring', 'parties': {}}, 'SSO': {'name': 'Saskatoon Southeast', 'parties': {}}, 'SST': {'name': 'Saskatoon Stonebridge', 'parties': {}}, 'SUS': {'name': 'Saskatoon University-Sutherland', 'parties': {}}, 'SWE': {'name': 'Saskatoon Westview', 'parties': {}}, 'SWI': {'name': 'Saskatoon Willowgrove', 'parties': {}}, 'SWT': {'name': 'Swift Current', 'parties': {}}, 'TBF': {'name': 'The Battlefords', 'parties': {}}, 'WAR': {'name': 'Warman', 'parties': {}}, 'WBG': {'name': 'Weyburn-Bengough', 'parties': {}}, 'WCQ': {'name': "White City-Qu'appelle", 'parties': {}}, 'WOR': {'name': 'Wood River', 'parties': {}}, 'YRK': {'name': 'Yorkton', 'parties': {}}, 'RZS': {'name': 'Rosthern-Shellbrook', 'parties': {}}}
var regionConversion = {'Athabasca': 'ATH', 'Batoche': 'BAT', 'Cannington': 'CAN', 'Canora-Pelly': 'CNP', 'Carrot River Valley': 'CRV', 'Cumberland': 'CUB', 'Cut Knife-Turtleford': 'CUT', 'Cypress Hills': 'CYP', 'Dakota-Arm River': 'DAR', 'Estevan-Big Muddy': 'EBM', 'Humboldt-Watrous': 'HUW', 'Kelvington-Wadena': 'KEW', 'Kindersley-Biggar': 'KIB', 'Last Mountain-Touchwood': 'LAT', 'Lloydminster': 'LLD', 'Lumsden-Morse': 'LUM', 'Martensville-Blairmore': 'MAB', 'Meadow Lake': 'MEA', 'Melfort': 'MEL', 'Melville-Saltcoats': 'MES', 'Moose Jaw North': 'MJN', 'Moose Jaw Wakamow': 'MJW', 'Moosomin-Montmartre': 'MOM', 'Prince Albert Carlton': 'PAC', 'Prince Albert Northcote': 'PAN', 'Regina Coronation Park': 'RCP', 'Regina Douglas Park': 'RDP', 'Regina Elphinstone-Centre': 'REC', 'Regina Lakeview': 'RLK', 'Regina Mount Royal': 'RMR', 'Regina Northeast': 'RNE', 'Regina Pasqua': 'RPQ', 'Regina Rochdale': 'RRD', 'Regina South Albert': 'RSA', 'Regina University': 'RUN', 'Regina Walsh Acres': 'RWA', 'Regina Wascana Plains': 'RWP', 'Rosetown-Delisle': 'RZD', 'Saskatchewan Rivers': 'SAR', 'Saskatoon Centre': 'SCE', 'Saskatoon Chief Mistawasis': 'SCM', 'Saskatoon Churchill-Wildwood': 'SCW', 'Saskatoon Eastview': 'SEA', 'Saskatoon Fairview': 'SFA', 'Saskatoon Meewasin': 'SME', 'Saskatoon Nutana': 'SNU', 'Saskatoon Riversdale': 'SRD', 'Saskatoon Silverspring': 'SSI', 'Saskatoon Southeast': 'SSO', 'Saskatoon Stonebridge': 'SST', 'Saskatoon University-Sutherland': 'SUS', 'Saskatoon Westview': 'SWE', 'Saskatoon Willowgrove': 'SWI', 'Swift Current': 'SWT', 'The Battlefords': 'TBF', 'Warman': 'WAR', 'Weyburn-Bengough': 'WBG', "White City-Qu'appelle": 'WCQ', 'Wood River': 'WOR', 'Yorkton': 'YRK', 'Rosthern-Shellbrook': 'RZS'}
var partyConversion = {"SP": "Saskatchewan Party", "NDP": "New Democratic Party", "BUF": "Buffalo Party", "SUP": "Saskatchewan United Party", "IND": "Independent", "GRN": "Green Party", "PRG": "Progressive Party", "PC": "PC Party"}

var electionResultsUrl = "https://canopy.cbc.ca/live/elections/prov/SK2024/all/"

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
        startFetchingElectoralData(electionResultsUrl);
    });
});

function recolorArea(name, party) {
    const area = map.contentDocument.getElementById(name);
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
        const response = await fetch(url);
        const data = await response.json();
        const parsedData = parseElectoralData(data);
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
function parseElectoralData(data) {
    result = []
    for (const idx in data.data.ridings) {
        const regionData = data.data.ridings[idx];
        regionName = regionData.englishName;
        regionCode = regionConversion[regionName];
        if (!regionCode) {
            continue
        }
        for (const pidx in regionData.parties) {
            try {
                partyData = regionData.parties[pidx];
                partyName = partyConversion[partyData.partyCode];
                regions[regionCode].parties[partyName] = {"name": partyName, "candidate": `${partyData.firstName} ${partyData.lastName}`, "votes": partyData.votes}
                result.push({"district": regionCode, "party": partyName, "votes": partyData.votes})
            } catch (error) {
                console.error(error)
            }
        }
    }
    return result;
}
function getTopPartyByDistrict(parsedData) {
    const topParties = {};

    const partyMapping = {
        "Saskatchewan Party": "SAS",
        "Saskatchewan United Party": "UNI",
        "New Democratic Party": "NDP",
        "Buffalo Party": "BUF"
    };

    parsedData.forEach(entry => {
        const { district, party, votes } = entry;
        const voteCount = parseInt(votes, 10); // Convert votes to a number
        const abbreviatedParty = partyMapping[party] || 'TBD';
        if (!topParties[district] || voteCount > topParties[district].votes) {
            if (!(voteCount == 0)) {
                topParties[district] = { party: abbreviatedParty, votes: voteCount };
            } else {
                topParties[district] = { party: "TBD", votes: 0 };
            }
        }
    });

    const result = {};
    for (const district in topParties) {
        result[district] = topParties[district].party;
    }

    return result;
}
function startFetchingElectoralData(url) {
    fetchElectoralData(url);
    setInterval(() => {
        fetchElectoralData(url);
    }, 10000);
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