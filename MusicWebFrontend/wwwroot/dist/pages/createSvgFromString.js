export function createSvgFromString(svgString) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgString, "image/svg+xml");
    const parserError = doc.querySelector("parsererror");
    if (parserError) {
        console.error("Błąd składni XML w SVG:", parserError.textContent);
        return null;
    }
    const rootElement = doc.documentElement;
    if (rootElement && rootElement.nodeName.toLowerCase() === "svg") {
        return rootElement;
    }
    console.error("Przekazany tekst nie zawiera poprawnego znacznika <svg>.");
    return null;
}
//# sourceMappingURL=createSvgFromString.js.map