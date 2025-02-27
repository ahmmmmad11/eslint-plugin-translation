export function formatText(text) {
    if (!text.includes("'")) {
        return `'${text.trim()}'`;
    }

    if (! text.includes('"')) {
        return `"${text.trim()}"`;
    }

    return `'${text.trim().replace(/'/g, "\\'")}'`;
}
