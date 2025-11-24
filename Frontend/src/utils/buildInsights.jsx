export function buildInsights(rows) {
    const yearKeys = Object.keys(rows[0]).filter(k => k.includes("_"));

    const latestYear = yearKeys[yearKeys.length - 1];
    const prevYear = yearKeys[yearKeys.length - 2];

    const enriched = rows.map((row) => {
        const current = Number(row[latestYear]);
        const prev = Number(row[prevYear]);
        const change = prev ? ((current - prev) / prev) * 100 : 0;

        return {
            mode: row.Mode,
            current: Number(current.toFixed(2)),
            change: Number(change.toFixed(2))
        };
    });

    const top5 = enriched.sort((a, b) => b.current - a.current).slice(0, 5);

    const insights = top5.map((item) => ({
        date: new Date().toISOString().split("T")[0],
        source: "Digital Payments API",
        metric: `${item.mode}`,
        value: item.current.toLocaleString(),
        change: (item.change > 0 ? "+" : "") + item.change.toFixed(2) + "%"
    }));

    return insights;
}
