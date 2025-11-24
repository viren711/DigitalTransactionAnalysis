export function transformDigitalPayments(rows) {
    const years = Object.keys(rows[0]).filter(
        (k) => k.includes("_") && k !== "Mode"
    );

    const data = years.map((year) => {
        const entry = { year };

        rows.forEach((row) => {
            const raw = row[year];

            const value = typeof raw === "number" ? Number(raw.toFixed(2)) : 0;

            entry[row.Mode] = value;
        });

        return entry;
    });

    return { years, data };
}
