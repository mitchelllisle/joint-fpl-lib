import { colours } from "../utils/colours.js";
export function bonusPoints(data, { Plot, d3, width } = {}) {
    // Filter to only players with some minutes
    const activeData = data.filter(d => d.minutes > 0);
    // Get top bonus earners for labels
    const topBonus = activeData
        .filter(d => d.bonus > 10)
        .sort((a, b) => b.bonus - a.bonus)
        .slice(0, 10);
    return Plot.plot({
        title: "Bonus Points vs Total Points",
        subtitle: "Scatter plot showing all players. Owned players highlighted by team. Contours show player density.",
        width,
        height: 500,
        x: { label: "Total Points" },
        y: { label: "Bonus Points" },
        color: { ...colours, legend: true },
        marks: [
            // Density contours for all players
            Plot.density(activeData, {
                x: "total_points",
                y: "bonus",
                stroke: "#ccc",
                strokeOpacity: 0.5,
                strokeWidth: 2,
                thresholds: 5
            }),
            // All players as light dots
            Plot.dot(activeData.filter(d => !d.owner), {
                x: "total_points",
                y: "bonus",
                fill: "#ddd",
                r: 3,
                opacity: 0.3
            }),
            // Owned players highlighted
            Plot.dot(activeData.filter(d => d.owner), {
                x: "total_points",
                y: "bonus",
                fill: "owner",
                stroke: "owner",
                strokeWidth: 1.5,
                r: 6,
                tip: true,
                channels: {
                    Player: "web_name",
                    Team: "owner",
                    Bonus: "bonus",
                    Points: "total_points",
                    Minutes: "minutes"
                }
            }),
            // Label top bonus earners
            Plot.text(topBonus, {
                x: "total_points",
                y: "bonus",
                text: "web_name",
                dy: -10,
                fontSize: 9,
                fontWeight: "bold"
            })
        ]
    });
}
