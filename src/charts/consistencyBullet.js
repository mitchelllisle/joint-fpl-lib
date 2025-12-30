import * as Plot from "npm:@observablehq/plot";
import * as d3 from "npm:d3";
import {colours} from "joint-fpl-lib/utils/colours";

export function consistencyBullet(data, {width} = {}) {
    // Calculate stats per owner
    const ownerStats = {};
    
    data.forEach(row => {
        if (!ownerStats[row.team]) {
            ownerStats[row.team] = {
                team: row.team,
                points: [],
                best: -Infinity,
                worst: Infinity
            };
        }
        ownerStats[row.team].points.push(row.points);
        ownerStats[row.team].best = Math.max(ownerStats[row.team].best, row.points);
        ownerStats[row.team].worst = Math.min(ownerStats[row.team].worst, row.points);
    });
    
    const chartData = Object.values(ownerStats).map(stats => {
        const mean = d3.mean(stats.points);
        const stdDev = d3.deviation(stats.points);
        return {
            team: stats.team,
            mean: mean,
            stdDev: stdDev,
            best: stats.best,
            worst: stats.worst,
            // Lower std dev = more consistent
            consistencyScore: 100 - (stdDev / mean * 100)
        };
    });
    
    const maxPoints = d3.max(chartData, d => d.best);
    const minPoints = d3.min(chartData, d => d.worst) - 5;
    
    return Plot.plot({
        title: "Consistency & Performance Range",
        subtitle: "Best/worst gameweek with average shown. Shorter bars = more consistent",
        width,
        marginLeft: 120,
        x: {label: "Points", domain: [minPoints, maxPoints]},
        y: {label: null},
        color: {...colours, legend: false},
        marks: [
            // Range bar (worst to best)
            Plot.barX(chartData, {
                x1: "worst",
                x2: "best",
                y: "team",
                fill: "team",
                fillOpacity: 0.2
            }),
            // Mean marker
            Plot.tickX(chartData, {
                x: "mean",
                y: "team",
                stroke: "team",
                strokeWidth: 4
            }),
            // Best marker
            Plot.dot(chartData, {
                x: "best",
                y: "team",
                fill: "team",
                r: 5
            }),
            // Worst marker
            Plot.dot(chartData, {
                x: "worst",
                y: "team",
                fill: "team",
                r: 5
            }),
            Plot.tip(chartData, Plot.pointer({
                x: "mean",
                y: "team",
                title: d => `${d.team}\nBest: ${d.best}\nAvg: ${d.mean.toFixed(1)}\nWorst: ${d.worst}\nStd Dev: ${d.stdDev.toFixed(1)}`
            }))
        ]
    });
}
