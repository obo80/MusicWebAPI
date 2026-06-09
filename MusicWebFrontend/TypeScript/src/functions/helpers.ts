export function createDivByClassName(className: string): HTMLDivElement {
    const div = document.createElement("div");
    div.className = className;
    return div;
}

export function createLiByClassName(className: string): HTMLLIElement {
    const li = document.createElement("li");
    li.className = className; 
    return li;
}