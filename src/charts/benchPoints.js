import {colours} from "../utils/colours.js";

export function benchPoints(data, {Plot, d3, width} = {}) {
    // Position 12-15 are bench players (11 starting + 4 bench)
    const benchData = data.filter(d => d.position > 11);
    
    const benchByOwner = {};
    benchData.forEach(player => {
        if (!benchByOwner[player.owner]) {
            benchByOwner[player.owner] = {
                owner: player.owner,
                points: 0,
                count: 0
            };
        }
        benchByOwner[player.owner].points += player.event_points || 0;
        benchByOwner[player.owner].count += 1;
    });
    
    const chartData = Object.values(benchByOwner);
    
    return Plot.plot({
        title: "Points Left on Bench",
        subtitle: "Total points scored by benched players this gameweek",
        width,
        marginLeft: 120,
        x: {label: "Points on Bench"},
        y: {label: null},
        color: {...colours, legend: false},
        marks: [
            Plot.barX(chartData, {
                x: "points",
                y: "owner",
                fill: "owner",
                tip: true,
                sort: {y: "-x"}
            }),
            Plot.text(chartData, {
                x: "points",
                y: "owner",
                text: d => d.points,
                dx: 15,
                textAnchor: "start"
            })
        ]
    });
}
