import {noDataTextMark} from "../utils/noDataTextMark.js";
import {colours} from "../utils/colours.js";


export function pointsPerWeek(data, {Plot, d3, width, title = "Points per Gameweek", subtitle = "Shows a cumulative points total for each player over the course of the season"} = {}) {
    const x = "gameweek";
    const y = "total";
    const stroke = "team";

    return Plot.plot({
        title,
        subtitle,
        style: "overflow: visible;",
        width,
        y: {grid: true},
        color: {...colours, legend: true},
        marks: [
            Plot.ruleY([0]),
            Plot.axisY({label: "Points"}),
            Plot.axisX({label: "Gameweek"}),
            Plot.lineY(data, {
                x: x,
                y: y,
                stroke: stroke,
                curve: "natural",
                marker: "circle-stroke",
                tip: true
            }),
            Plot.text(data, Plot.selectLast({
                x: x,
                y: y,
                z: stroke,
                text: stroke,
                textAnchor: "start",
                dx: 3
            })),
            ...noDataTextMark(data, Plot)
        ]
    });
}
