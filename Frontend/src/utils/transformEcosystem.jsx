export function transformEcosystem(rows) {
    return rows
        .filter(r => r.Description !== "Total")
        .map(r => ({
            id: r.id,
            category: r.Description,
            value: Number(r["Value__in_Cr__"].replace(/,/g, "")),
            volume: Number(r["Volume__in_Mn_"].replace(/,/g, "")),
        }));
}