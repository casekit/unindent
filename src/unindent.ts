export const unindent = (
    strings: TemplateStringsArray,
    ...values: unknown[]
) => {
    const joined = values
        .reduce(
            (acc: string[], arg: unknown, index: number) => {
                return [...acc, arg?.toString() ?? "", strings[index + 1]];
            },
            [strings[0]],
        )
        .join("");

    const lines = joined.split("\n");

    // strip any leading empty lines
    while (lines[0]?.replace(/\s*/, "") === "") {
        lines.splice(0, 1);
    }

    // strip any traling empty lines
    while (lines[lines.length - 1]?.replace(/\s*/, "") === "") {
        lines.splice(lines.length - 1, 1);
    }

    const indents = lines
        // ignore any blank lines when calculating indents
        .filter((l) => l.replace(/\s*/, "") !== "")
        // get the number of whitespace characters before the first non-whitespace character
        .map((s) => s.length - s.replace(/^\s+/, "").length);

    // take the smallest indent: this is how much we're going to unindent by
    const indent = Math.min(...indents) ?? 0;

    return lines.map((s) => s.substring(indent)).join("\n");
};
