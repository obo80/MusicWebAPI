import { createLayout } from "./layout.js";
import { createMainContentContainerElement } from "./displayItemsSubpages/sharedSuppage.js";
export const renderMainPage = () => {
    const header = "Witaj w naszej aplikacji muzycznej!";
    const subhader = `<div class="subheader"><p>Witaj w naszej aplikacji muzycznej!</p>
                        <p> Na tej stronie znajdziesz informacje o artystach, albumach i utworach.</p>
                        <p>Kliknij na odpowiednią sekcję w menu, aby rozpocząć eksplorację naszej biblioteki muzycznej.</p></div>`;
    const mainContentContainer = createMainContentContainerElement(header, subhader, null);
    const bodyElement = document.querySelector("body");
    const newPageWrapper = createLayout(header, subhader);
    if (bodyElement) {
        const pageWrapper = bodyElement.querySelector(".page-wrapper");
        if (!pageWrapper)
            bodyElement.prepend(newPageWrapper);
        else
            pageWrapper.replaceWith(newPageWrapper);
    }
};
//# sourceMappingURL=homePage.js.map