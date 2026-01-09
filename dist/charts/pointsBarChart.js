import { noDataTextMark } from "../utils/noDataTextMark.js";
import { colours } from "../utils/colours.js";
export function pointsBarChart(data, { Plot, d3, width, title = "Score per Gameweek", subtitle = "Shows the total score for each player over the course of the season" } = {}) {
    const x = "gameweek";
    const y = "points";
    const z = "team";
    const nTeams = new Set(data.map(d => d.team)).size;
    let movingWindow;
    if (nTeams === 1) {
        movingWindow = Plot.lineY(data, Plot.windowY(5, { x: x, y: y, curve: "cardinal", stroke: "white" }));
    }
    return Plot.plot({
        title,
        subtitle,
        style: "overflow: visible;",
        width,
        y: { grid: true },
        color: { ...colours, legend: true },
        marks: [
            Plot.ruleY([0]),
            Plot.barY(data, { x: x, y: y, fill: z, order: z, tip: true }),
            movingWindow,
            ...noDataTextMark(data, Plot)
        ]
    });
}
