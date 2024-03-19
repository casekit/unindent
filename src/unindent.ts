export const unindent = (strings: TemplateStringsArray) => {
    const joined = strings.join("");
    const lines = joined.split("\n");

    while (lines[0]?.replace(/\s*/, "") === "") {
        lines.splice(0, 1);
    }

    while (lines[lines.length - 1]?.replace(/\s*/, "") === "") {
        lines.splice(lines.length - 1, 1);
    }

    const indent =
        Math.min(
            ...lines.map((s) => s.length - s.replace(/^\s+/, "").length),
        ) ?? 0;

    return lines.map((s) => s.substring(indent)).join("\n");
};
