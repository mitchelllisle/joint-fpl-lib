import * as Plot from "npm:@observablehq/plot";
import * as d3 from "npm:d3";
import {colours} from "../utils/colours";

export function formChart(data, {width} = {}) {
    // Get last 5 gameweeks
    const maxGameweek = d3.max(data, d => d.gameweek);
    const last5 = data.filter(d => d.gameweek > maxGameweek - 5);
    
    return Plot.plot({
        title: "Last 5 Gameweeks Form",
        subtitle: "Position finished each gameweek. 1 = First place, 4 = Last place.",
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
            Plot.cell(last5, {
                x: "gameweek",
                y: "team",
                fill: "rank",
                tip: true,
                inset: 0
            }),
            Plot.text(last5, {
                x: "gameweek",
                y: "team",
                text: d => d.rank === 1 ? "1st" : d.rank === 2 ? "2nd" : d.rank === 3 ? "3rd" : "4th",
                fill: "white",
                fontWeight: "bold",
                fontSize: 11
            })
        ]
    });
}
