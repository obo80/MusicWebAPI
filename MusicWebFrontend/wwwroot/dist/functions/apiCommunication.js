var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function getPagedItemsFromApi(url) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(url);
            if (!response.ok) {
                console.log(`Failed to fetch data from ${url}. Status: ${response.status}`);
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = yield response.json();
            console.log(`Data fetched from ${url}:`);
            // console.log("A dane to:", data);
            return data;
        }
        catch (error) {
            console.error("Error fetching items:", error);
            return null;
        }
    });
}
export function getItemFromApi(url) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(url);
            if (!response.ok) {
                console.log(`Failed to fetch data from ${url}. Status: ${response.status}`);
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = yield response.json();
            console.log(`Data fetched from ${url}:`);
            // console.log("A dane to:", data);
            return data;
        }
        catch (error) {
            console.error("Error fetching items:", error);
            return null;
        }
    });
}
export function loginUserToApi(loginDto) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const bodyJson = JSON.stringify(loginDto);
            console.log("bodyJson", bodyJson);
            const response = yield fetch('https://twoje-api.com', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                //body: JSON.stringify({ loginDto })
                body: bodyJson
            });
            if (!response.ok) {
                throw new Error('Błędne dane logowania');
            }
            const data = yield response.json();
            localStorage.setItem('jwt_token', data.accessToken);
            return true;
        }
        catch (error) {
            throw error;
        }
    });
}
//# sourceMappingURL=apiCommunication.js.map