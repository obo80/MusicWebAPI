import { getUserName, isUserLoggedIn, loginUser, logoutUser } from "./userButtonFunctions.js";

let userName: string = getUserName()

function renderUserButton(): void {
    const userButtonContainer = getUserButtonContainer();
    const headerTopRight = document.querySelector(".header-top-right");
    headerTopRight.innerHTML = "";
    headerTopRight.appendChild(userButtonContainer);
}
export function getUserButtonContainer() {
    if (isUserLoggedIn) {
        return createUserDropdown();
    } else {
        return createLoginButton();
    }
}
function createLoginButton(): HTMLDivElement {
    // Create the dropdown container
    const userLoginContainer = document.createElement("div");
    userLoginContainer.classList.add("user-login-container");
    const loginButton = document.createElement("button");
    loginButton.classList.add("login-btn");
    loginButton.id = "login-btn";
    loginButton.textContent = "Zaloguj";
    loginButton.addEventListener("click", () => {
        // Handle login button click
        loginUser();
        renderUserButton();
        console.log("Login button clicked");
    });

    userLoginContainer.appendChild(loginButton);
    return userLoginContainer;

}


function createUserDropdown(): HTMLDivElement {
    // Create the dropdown container
    const dropdownContainer = document.createElement("div");
    dropdownContainer.classList.add("user-dropdown");

    // Create the dropdown trigger button
    const dropdownTrigger = document.createElement("button");
    dropdownTrigger.classList.add("dropdown-trigger");
    dropdownTrigger.textContent = `Witaj, ${userName} ▾`;
    dropdownContainer.appendChild(dropdownTrigger);

    // Create the dropdown content container
    const dropdownContent = document.createElement("ul");
    dropdownContent.classList.add("dropdown-content");

    // Add the settings link
    const settingsLink = document.createElement("li");
    settingsLink.classList.add("user-settings-btn");
    settingsLink.id = "user-settings";
    settingsLink.textContent = "Ustawienia";
    dropdownContent.appendChild(settingsLink);
    settingsLink.addEventListener("click", () => {
        // Handle settings link click
        console.log("Settings link clicked");
        hideDropdown();
    });

    // Add the password change link
    const passwordChangeLink = document.createElement("li");
    passwordChangeLink.classList.add("pass-change-btn");
    passwordChangeLink.id = "change-password";
    passwordChangeLink.textContent = "Zmień hasło";
    dropdownContent.appendChild(passwordChangeLink);
    passwordChangeLink.addEventListener("click", () => {
        // Handle password change link click
        console.log("Password change link clicked");
        hideDropdown();
    });

    // Add the divider
    const divider = document.createElement("li");
    divider.classList.add("divider");
    dropdownContent.appendChild(divider);

    // Add the logout button
    const logoutButton = document.createElement("li");
    logoutButton.id = "logout";
    logoutButton.classList.add("logout-btn");
    logoutButton.textContent = "Wyloguj";
    dropdownContent.appendChild(logoutButton);
    logoutButton.addEventListener("click", () => {
        // Handle logout button click
        logoutUser();
        console.log("Logout button clicked");
        renderUserButton();
        hideDropdown();
    });

    // Append the dropdown content to the dropdown container
    dropdownContainer.appendChild(dropdownContent);

    // Event listener for the dropdown trigger button
    dropdownTrigger.addEventListener("click", () => {
        // Show the dropdown menu
        dropdownContent.style.display = "block";
    });

    // Return the dropdown container
    return dropdownContainer;
}

// Function to hide the dropdown
function hideDropdown(): void {
    if (isUserLoggedIn) {
        const dropdownContent = document.querySelector(".dropdown-content");
        (dropdownContent as HTMLElement).style.display = "none";
    }
}

// Event listener for clicking outside the dropdown
document.addEventListener("click", (event) => {
    if (isUserLoggedIn) {
        const dropdownContent = document.querySelector(".dropdown-content");
        const dropdownTrigger = document.querySelector(".dropdown-trigger");
        const dropdownContainer = document.querySelector(".user-dropdown");

        if (!dropdownContainer.contains(event.target as Node) && !dropdownTrigger.contains(event.target as Node)) {
            hideDropdown();
        }
    }
});
