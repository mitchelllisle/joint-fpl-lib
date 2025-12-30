import * as Plot from "npm:@observablehq/plot";
import {noDataTextMark} from "joint-fpl-lib/utils/noDataTextMark";
import {won, lose, draw} from "joint-fpl-lib/utils/colours";

export function waffleByUser(rawData, {width, height} = {}) {
    const totalGameweeks = 38;

    const data = rawData.flatMap(d => [
        ...Array(d.matches_won || 0).fill({user: d.user, result: "won"}),
        ...Array(d.matches_lost || 0).fill({user: d.user, result: "lost"}),
        ...Array(d.matches_drawn || 0).fill({user: d.user, result: "drawn"})
    ]);
    
    return Plot.plot({
        title: "Match Results",
        subtitle: "Shows the results of each match played by each player",
        axis: null,
        label: null,
        width,
        height: 300,
        marginTop: 20,
        marginBottom: 70,
        marks: [
            ...noDataTextMark(data),
            Plot.axisFx({lineWidth: 10, anchor: "bottom"}),
            Plot.waffleX({length: 1}, {x: totalGameweeks, fillOpacity: 0.4, rx: "100%"}),
            Plot.waffleX(data, Plot.groupZ({x: "count"}, {
                fill: "result",
                fx: "user",
                rx: "100%",
            })),
            Plot.text(rawData, {
                    fx: "user",
                    text: (d) => {
                        const total = (d.matches_won || 0) + (d.matches_lost || 0) + (d.matches_drawn || 0);
                        return total > 0 ? ((d.matches_won || 0) / total).toLocaleString("en-US", {style: "percent"}) : "0%";
                    },
                    frameAnchor: "bottom",
                    lineAnchor: "top",
                    dy: 30,
                    fill: "white",
                    fontSize: 18,
                    fontWeight: "bold",
                }
            ),
            Plot.text(rawData, {
                    fx: "user", text: (_) => "Win Percentage",
                    frameAnchor: "bottom",
                    lineAnchor: "top",
                    dy: 50,
                    fill: "white",
                    fontSize: 12,
                    fontWeight: "bold"
                }
            )

        ],
        color: {
            domain: ["won", "lost", "drawn"],
            range: [won, lose, draw],
            legend: true
        }
    });
}
