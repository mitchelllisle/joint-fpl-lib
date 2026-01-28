import {colours} from "../utils/colours.js";

export function formChart(data, {Plot, d3, width, title = "Last 5 Gameweeks Form", subtitle = "Position finished each gameweek. 1 = First place, 4 = Last place."} = {}) {
    // Get last 5 gameweeks
    const maxGameweek = d3.max(data, d => d.gameweek);
    const last5 = data.filter(d => d.gameweek > maxGameweek - 5);
    
    // Calculate gameweek-specific ranks based on points scored that week
    const gameweekRanks = d3.group(last5, d => d.gameweek);
    const rankedData = [];
    
    for (const [gameweek, teams] of gameweekRanks) {
        // Sort teams by points (descending) for this gameweek
        const sorted = [...teams].sort((a, b) => (b.event_points || 0) - (a.event_points || 0));
        
        // Assign ranks, handling ties
        let currentRank = 1;
        sorted.forEach((team, index) => {
            // If not first and points are same as previous, use same rank
            if (index > 0 && team.event_points === sorted[index - 1].event_points) {
                rankedData.push({
                    ...team,
                    gameweekRank: sorted[index - 1].gameweekRank || currentRank
                });
            } else {
                rankedData.push({
                    ...team,
                    gameweekRank: currentRank
                });
                currentRank = index + 1;
            }
        });
    }
    
    return Plot.plot({
        title,
        subtitle,
        width,
        height: 180,
        marginLeft: 120,
        marginRight: 60,
        x: {
            label: "Gameweek",
            tickFormat: d => `GW${d}`,
            domain: d3.range(maxGameweek - 4, maxGameweek + 1),
            padding: 0
        },
        y: {label: null, padding: 0},
        color: {
            type: "ordinal",
            domain: [1, 2, 3, 4],
            range: ["#10b981", "#fbbf24", "#f97316", "#ef4444"],
            legend: true,
            label: "Position"
        },
        marks: [
            Plot.cell(rankedData, {
                x: "gameweek",
                y: "team",
                fill: "gameweekRank",
                tip: true,
                inset: 0
            }),
            Plot.text(rankedData, {
                x: "gameweek",
                y: "team",
                text: d => d.gameweekRank === 1 ? "1st" : d.gameweekRank === 2 ? "2nd" : d.gameweekRank === 3 ? "3rd" : "4th",
                fill: "white",
                fontWeight: "bold",
                fontSize: 11
            })
        ]
    });
}
