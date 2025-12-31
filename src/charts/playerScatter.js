import {colours} from "../utils/colours.js";

export function playerScatter(data, {Plot, d3, width, title = "Player Minutes vs Points", subtitle = "Shows the relationship between minutes played and points scored clustered by owner."} = {}) {
    console.log("Scatter chart - input data length:", data.length);
    const x = "total_points";
    const y = "minutes";
    const fill = "owner";

    const owned = data.filter(d => d.owner !== null);
    const unowned = data.filter(d => d.owner === null);
    console.log("Scatter chart - owned:", owned.length, "unowned:", unowned.length);

    return Plot.plot({
        title,
        subtitle,
        width,
        grid: true,
        color: {...colours, legend: true},
        x: {label: "Points"},
        y: {label: "Minutes"},
        symbol: {legend: true},
        marks: [
            Plot.dot(unowned, {x: x, y: y, r: 10, opacity: 0.2, fill: fill}),
            Plot.dot(owned, {x: x, y: y, r: 10, opacity: 0.8, fill: fill}),
            Plot.tip(data, Plot.pointer({
                x: x,
                y: y,
                channels: {Owner: "owner", Name: "web_name"},
            })),
        ]
      })
}
