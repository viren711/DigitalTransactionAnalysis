export function buildInsights(rows) {
    // Detect years dynamically
    const yearKeys = Object.keys(rows[0]).filter(k => k.includes("_"));

    const latestYear = yearKeys[yearKeys.length - 1];
    const prevYear = yearKeys[yearKeys.length - 2];

    // Compute change and current values
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

    // Sort & pick top 5
    const top5 = enriched.sort((a, b) => b.current - a.current).slice(0, 5);

    // Convert to insight card format
    const insights = top5.map((item) => ({
        date: new Date().toISOString().split("T")[0], // today
        source: "Digital Payments API",
        metric: `${item.mode}`,
        value: item.current.toLocaleString(), // formatted
        change: (item.change > 0 ? "+" : "") + item.change.toFixed(2) + "%"
    }));

    return insights;
}
