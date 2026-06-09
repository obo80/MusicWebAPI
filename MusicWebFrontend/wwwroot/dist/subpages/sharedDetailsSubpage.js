export function renderDetailsSubpage(id, type) {
    const mainContent = createMainContentElement();
    switch (type) {
        case "artist":
            console.log("Wyświetlanie szczegółów artysty o id:", id);
            break;
        case "album":
            console.log("Wyświetlanie szczegółów albumu o id:", id);
            break;
        case "song":
            console.log("Wyświetlanie szczegółów utworu o id:", id);
            break;
        default:
            console.error(`Nieobsługiwany typ: ${type}`);
    }
}
export function renderRatingSubpage(id, type) {
    switch (type) {
        case "artist":
            console.log("Ocena artysty o id:", id);
            break;
        case "album":
            console.log("Ocena albumu o id:", id);
            break;
        case "song":
            console.log("Ocena utworu o id:", id);
            break;
        default:
            console.error(`Nieobsługiwany typ: ${type}`);
    }
}
function createMainContentElement() {
    const mainContent = document.createElement("div");
    return mainContent;
}
//# sourceMappingURL=sharedDetailsSubpage.js.map