import {colours} from "../utils/colours.js";
import {calculateGini} from "../utils/gini.js";
import {noDataTextMark} from "../utils/noDataTextMark.js";

export function giniIndexChart(data, {Plot, d3, width} = {}) {
    console.log("Gini chart - input data length:", data.length);
    const owned = data.filter(d => d.owner !== null);
    console.log("Gini chart - owned data length:", owned.length);

    const chartData = {};
    owned.forEach(player => {
        if (!chartData[player.owner]) {
            chartData[player.owner] = {
                owner: player.owner,
                points: [],
                maxPoints: 0
            };
        }
        chartData[player.owner].points.push(player.total_points);
        chartData[player.owner].maxPoints = Math.max(chartData[player.owner].maxPoints, player.total_points);
    });

    const giniData = Object.values(chartData).map(d => ({
        owner: d.owner,
        gini: calculateGini(d.points) * 100,
        maxPoints: d.maxPoints
    }));
    
    console.log("Gini chart - giniData:", giniData);

    return Plot.plot({
        title: "Gini Index by Owner",
        subtitle: `A measure of inequality in points scored. 0% = perfectly equal, 100 = one player has all the points. The lower the score, the more players are contributing the points. Size of hexagon represents max points scored by a single player.`,
        width,
        height: 500,
        color: {...colours, legend: false},
        y: {domain: [0, 100], label: "Gini Index"},
        x: {label: null},
        r: {range: [5, 20]},
        marginTop: 40,
        marginLeft: 80,
        marks: [
            Plot.hexagon(
                giniData, Plot.dodgeX({y: "gini", r: "maxPoints", fill: "owner", tip: true, fillOpacity: 0.8, strokeWidth: 10})
            ),
            ...noDataTextMark(giniData, Plot)
        ]
    });
}
