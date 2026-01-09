import { colours } from "../utils/colours.js";
export function positionBreakdown(data, { Plot, d3, width, title = "Points by Position", subtitle = "Total season points contribution by position (starting XI only)" } = {}) {
    // Only include starting 11
    const startingData = data.filter(d => d.position <= 11);
    // Map element_type to position names: 1=GK, 2=DEF, 3=MID, 4=FWD
    const positionNames = { 1: "GK", 2: "DEF", 3: "MID", 4: "FWD" };
    // Group by owner and position, sum points
    const grouped = {};
    startingData.forEach(player => {
        const key = `${player.owner}_${player.element_type}`;
        if (!grouped[key]) {
            grouped[key] = {
                owner: player.owner,
                position: positionNames[player.element_type] || "Unknown",
                points: 0
            };
        }
        grouped[key].points += player.total_points || 0;
    });
    const breakdown = Object.values(grouped);
    return Plot.plot({
        title,
        subtitle,
        width,
        marginLeft: 120,
        x: { label: "Total Points" },
        y: { label: null },
        color: {
            domain: ["GK", "DEF", "MID", "FWD"],
            range: ["#e90052", "#963cff", "#04f5ff", "#00ff85"],
            legend: true
        },
        marks: [
            Plot.barX(breakdown, Plot.stackX({
                x: "points",
                y: "owner",
                fill: "position",
                tip: true,
                sort: { y: "-x", reduce: "sum" }
            })),
            Plot.ruleX([0])
        ]
    });
}
