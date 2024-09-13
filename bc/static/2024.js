const map = document.getElementById("map");
const rootStyle = getComputedStyle(document.documentElement);
const secondaryColor = rootStyle.getPropertyValue('--bs-secondary').trim();
const parties = {
    "???": {"symbol": "???", "name": "Unknown", "color": secondaryColor},
    "GRN": {"symbol": "GRN", "name": "Green Party", "color": "#008542"},
    "NDP": {"symbol": "NDP", "name": "New Democratic Party", "color": "#FF6633"},
    "CON": {"symbol": "CON", "name": "Conservative Party", "color": "#004AAD"}
}

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
        updateCounts();
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