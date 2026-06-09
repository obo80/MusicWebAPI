export function createSvgFromString(svgString: string): SVGSVGElement | null {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgString, "image/svg+xml");

    // 1. Sprawdzenie, czy nie ma błędów składniowych
    const parserError = doc.querySelector("parsererror");
    if (parserError) {
        console.error("Błąd składni XML w SVG:", parserError.textContent);
        return null;
    }

    // 2. Pobranie głównego elementu
    const rootElement = doc.documentElement;

    // 3. Sprawdzenie po nazwie znacznika (nodeName), czy to na pewno SVG
    if (rootElement && rootElement.nodeName.toLowerCase() === "svg") {
        // Rzutujemy bezpiecznie na właściwy typ, bo wiemy już, że to tag <svg>
        return rootElement as unknown as SVGSVGElement;
    }

    console.error("Przekazany tekst nie zawiera poprawnego znacznika <svg>.");
    return null;
}