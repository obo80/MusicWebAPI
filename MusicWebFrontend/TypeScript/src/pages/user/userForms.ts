export function createLoginForm(): HTMLFormElement {
    const loginForm = document.createElement("form");
    loginForm.classList.add("loginForm");
    loginForm.id = "loginForm";

    const emailLabel = document.createElement("label");
    emailLabel.textContent = "Email:";
    emailLabel.htmlFor = "email";
    loginForm.appendChild(emailLabel);

    const emailInput = document.createElement("input");
    emailInput.type = "email";
    emailInput.id = "email";
    emailInput.required = true;
    loginForm.appendChild(emailInput);

    const passwordLabel = document.createElement("label");
    passwordLabel.textContent = "Hasło:";
    passwordLabel.htmlFor = "password";
    loginForm.appendChild(passwordLabel);

    const passwordInput = document.createElement("input");
    passwordInput.type = "password";
    passwordInput.id = "password";
    passwordInput.required = true;
    loginForm.appendChild(passwordInput);

    const loginButton = document.createElement("button");
    loginButton.type = "submit";
    loginButton.textContent = "Zaloguj";
    loginForm.appendChild(loginButton);    


    
    return loginForm;
}
