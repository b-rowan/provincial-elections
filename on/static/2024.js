const map = document.getElementById("map");
const rootStyle = getComputedStyle(document.documentElement);
const secondaryColor = rootStyle.getPropertyValue('--bs-secondary').trim();
const parties = {
    "TBD": {"symbol": "TBD", "name": "Unknown", "color": secondaryColor},
//    "GRN": {"symbol": "GRN", "name": "Green Party", "color": "#008542"},
//    "NDP": {"symbol": "NDP", "name": "New Democratic Party", "color": "#FF6633"},
//    "CON": {"symbol": "CON", "name": "Conservative Party", "color": "#004AAD"}
}
var regions = {'8': {'name': 'Brampton Centre', 'parties': {}}, '97': {'name': 'Scarborough-Rouge Park', 'parties': {}}, '96': {'name': 'Scarborough North', 'parties': {}}, '1': {'name': 'Ajax', 'parties': {}}, '91': {'name': 'Sarnia-Lambton', 'parties': {}}, '7': {'name': 'Beaches-East York', 'parties': {}}, '64': {'name': 'Mississauga-Malton', 'parties': {}}, '79': {'name': 'Ottawa South', 'parties': {}}, '34': {'name': 'Haldimand-Norfolk', 'parties': {}}, '105': {'name': 'Thunder Bay-Atikokan', 'parties': {}}, '54': {'name': 'London North Centre', 'parties': {}}, '93': {'name': 'Scarborough-Agincourt', 'parties': {}}, '58': {'name': 'Markham-Unionville', 'parties': {}}, '53': {'name': 'London-Fanshawe', 'parties': {}}, '102': {'name': 'Stormont-Dundas-South Glengarry', 'parties': {}}, '12': {'name': 'Brampton West', 'parties': {}}, '114': {'name': 'Waterloo', 'parties': {}}, '21': {'name': 'Don Valley North', 'parties': {}}, '28': {'name': 'Etobicoke Centre', 'parties': {}}, '88': {'name': 'Renfrew-Nipissing-Pembroke', 'parties': {}}, '4': {'name': 'Barrie-Innisfil', 'parties': {}}, '61': {'name': 'Mississauga East-Cooksville', 'parties': {}}, '90': {'name': 'St. Catharines', 'parties': {}}, '17': {'name': 'Carleton', 'parties': {}}, '70': {'name': 'Niagara West', 'parties': {}}, '39': {'name': 'Hamilton West-Ancaster-Dundas', 'parties': {}}, '3': {'name': 'Aurora-Oak Ridges-Richmond Hill', 'parties': {}}, '60': {'name': 'Mississauga Centre', 'parties': {}}, '63': {'name': 'Mississauga-Lakeshore', 'parties': {}}, '43': {'name': 'Kanata-Carleton', 'parties': {}}, '120': {'name': 'York Centre', 'parties': {}}, '73': {'name': 'Northumberland-Peterborough South', 'parties': {}}, '67': {'name': 'Newmarket-Aurora', 'parties': {}}, '123': {'name': 'Kiiwetinoong', 'parties': {}}, '24': {'name': 'Durham', 'parties': {}}, '44': {'name': 'Kenora-Rainy River', 'parties': {}}, '103': {'name': 'Sudbury', 'parties': {}}, '72': {'name': 'Nipissing', 'parties': {}}, '5': {'name': 'Barrie-Springwater-Oro-Medonte', 'parties': {}}, '99': {'name': 'Simcoe-Grey', 'parties': {}}, '35': {'name': 'Haliburton-Kawartha Lakes-Brock', 'parties': {}}, '86': {'name': 'Peterborough-Kawartha', 'parties': {}}, '6': {'name': 'Bay of Quinte', 'parties': {}}, '52': {'name': 'Leeds-Grenville-Thousand Islands and Rideau Lakes', 'parties': {}}, '108': {'name': 'Timmins', 'parties': {}}, '106': {'name': 'Thunder Bay-Superior North', 'parties': {}}, '46': {'name': 'Kingston and the Islands', 'parties': {}}, '77': {'name': 'Oshawa', 'parties': {}}, '116': {'name': 'Whitby', 'parties': {}}, '118': {'name': 'Windsor-Tecumseh', 'parties': {}}, '119': {'name': 'Windsor West', 'parties': {}}, '27': {'name': 'Essex', 'parties': {}}, '124': {'name': 'Mushkegowuk-James Bay', 'parties': {}}, '57': {'name': 'Markham-Thornhill', 'parties': {}}, '74': {'name': 'Oakville', 'parties': {}}, '62': {'name': 'Mississauga-Erin Mills', 'parties': {}}, '117': {'name': 'Willowdale', 'parties': {}}, '20': {'name': 'Don Valley East', 'parties': {}}, '95': {'name': 'Scarborough-Guildwood', 'parties': {}}, '40': {'name': 'Hastings-Lennox and Addington', 'parties': {}}, '51': {'name': 'Lanark-Frontenac-Kingston', 'parties': {}}, '55': {'name': 'London West', 'parties': {}}, '98': {'name': 'Scarborough Southwest', 'parties': {}}, '94': {'name': 'Scarborough Centre', 'parties': {}}, '23': {'name': 'Dufferin-Caledon', 'parties': {}}, '22': {'name': 'Don Valley West', 'parties': {}}, '25': {'name': 'Eglinton-Lawrence', 'parties': {}}, '49': {'name': 'Kitchener South-Hespeler', 'parties': {}}, '47': {'name': 'Kitchener Centre', 'parties': {}}, '111': {'name': "Toronto-St. Paul's", 'parties': {}}, '45': {'name': 'King-Vaughan', 'parties': {}}, '89': {'name': 'Richmond Hill', 'parties': {}}, '9': {'name': 'Brampton East', 'parties': {}}, '59': {'name': 'Milton', 'parties': {}}, '10': {'name': 'Brampton North', 'parties': {}}, '75': {'name': 'Oakville North-Burlington', 'parties': {}}, '15': {'name': 'Burlington', 'parties': {}}, '115': {'name': 'Wellington-Halton Hills', 'parties': {}}, '33': {'name': 'Guelph', 'parties': {}}, '18': {'name': 'Chatham-Kent-Leamington', 'parties': {}}, '110': {'name': 'Toronto-Danforth', 'parties': {}}, '29': {'name': 'Etobicoke-Lakeshore', 'parties': {}}, '83': {'name': 'Parkdale-High Park', 'parties': {}}, '112': {'name': 'University-Rosedale', 'parties': {}}, '109': {'name': 'Toronto Centre', 'parties': {}}, '66': {'name': 'Nepean', 'parties': {}}, '32': {'name': 'Glengarry-Prescott-Russell', 'parties': {}}, '31': {'name': 'Flamborough-Glanbrook', 'parties': {}}, '69': {'name': 'Niagara Falls', 'parties': {}}, '68': {'name': 'Niagara Centre', 'parties': {}}, '13': {'name': 'Brantford-Brant', 'parties': {}}, '16': {'name': 'Cambridge', 'parties': {}}, '65': {'name': 'Mississauga-Streetsville', 'parties': {}}, '11': {'name': 'Brampton South', 'parties': {}}, '56': {'name': 'Markham-Stouffville', 'parties': {}}, '38': {'name': 'Hamilton Mountain', 'parties': {}}, '36': {'name': 'Hamilton Centre', 'parties': {}}, '37': {'name': 'Hamilton East-Stoney Creek', 'parties': {}}, '71': {'name': 'Nickel Belt', 'parties': {}}, '92': {'name': 'Sault Ste. Marie', 'parties': {}}, '2': {'name': 'Algoma-Manitoulin', 'parties': {}}, '107': {'name': 'Timiskaming-Cochrane', 'parties': {}}, '80': {'name': 'Ottawa-Vanier', 'parties': {}}, '81': {'name': 'Ottawa West-Nepean', 'parties': {}}, '76': {'name': 'Orléans', 'parties': {}}, '78': {'name': 'Ottawa Centre', 'parties': {}}, '30': {'name': 'Etobicoke North', 'parties': {}}, '122': {'name': 'York South-Weston', 'parties': {}}, '41': {'name': 'Humber River-Black Creek', 'parties': {}}, '14': {'name': 'Bruce-Grey-Owen Sound', 'parties': {}}, '85': {'name': 'Perth-Wellington', 'parties': {}}, '104': {'name': 'Thornhill', 'parties': {}}, '113': {'name': 'Vaughan-Woodbridge', 'parties': {}}, '48': {'name': 'Kitchener-Conestoga', 'parties': {}}, '84': {'name': 'Parry Sound-Muskoka', 'parties': {}}, '101': {'name': 'Spadina-Fort York', 'parties': {}}, '100': {'name': 'Simcoe North', 'parties': {}}, '19': {'name': 'Davenport', 'parties': {}}, '82': {'name': 'Oxford', 'parties': {}}, '87': {'name': 'Pickering-Uxbridge', 'parties': {}}, '121': {'name': 'York-Simcoe', 'parties': {}}, '42': {'name': 'Huron-Bruce', 'parties': {}}, '26': {'name': 'Elgin-Middlesex-London', 'parties': {}}, '50': {'name': 'Lambton-Kent-Middlesex', 'parties': {}}}

//const electoralCsvUrl = 'https://corsproxy.io/?' + encodeURIComponent('https://electionsbcenr.blob.core.windows.net/electionsbcenr/GE-2024-10-19_Candidate.csv');
const electoralCsvUrl = ""

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
            if (!isNaN(element.id) && element.id.trim() !== "") {
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
//    try {
//        const response = await fetch(url);
//        const csvData = await response.text();
//        const parsedData = parseElectoralCSV(csvData);
//        const winningParties = getTopPartyByDistrict(parsedData);
//        for (const district in winningParties) {
//            const winningParty = winningParties[district];
//            recolorArea(district, winningParty);
//        }
//        updateCounts();
//    } catch (error) {
//        console.error('Error fetching electoral data:', error);
//    }
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
//        'Conservative Party': 'CON',
//        'BC Green Party': 'GRN',
//        'BC NDP': 'NDP',
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
function startFetchingElectoralData(csvUrl) {
    fetchElectoralData(csvUrl);
    setInterval(() => {
        fetchElectoralData(csvUrl);
    }, 30000);
}
function updateRegionInfo(e) {

    const region = e.target.id.replace("-EXPANDED", "");
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