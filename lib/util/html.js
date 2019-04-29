export function html(strings, ...values) {
    return values.reduce((acc, v, idx) => `${acc}${v}${strings[idx + 1]}`, strings[0]).trim();
}
