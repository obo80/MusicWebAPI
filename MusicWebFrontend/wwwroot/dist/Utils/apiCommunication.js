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
export function ApiGetMethodObjectDtoWithAuthorization(url, token) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            const responseResult = yield handleResponse(response);
            return responseResult;
        }
        catch (error) {
            console.error("Error fetching items:", error);
            //return 500;
        }
    });
}
export function loginUserToApi(url, loginDto) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginDto)
            });
            const responseResult = yield handleResponse(response);
            const resultStatusCode = responseResult.status;
            if (resultStatusCode === 200) {
                localStorage.setItem("token", responseResult.data);
                return 200;
            }
            else {
                return resultStatusCode;
            }
        }
        catch (error) {
            console.error("Error fetching items:", error);
            return 500;
        }
    });
}
export function ApiPostMethodObjectDtoWithAuthorization(url, objectDto, token) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(objectDto)
            });
            const responseResult = yield handleResponse(response);
            //console.log("responseResult:", responseResult);
            //const resultStatusCode = responseResult.status;
            return responseResult;
        }
        catch (error) {
            console.error("Error fetching items:", error);
            //return 500;
        }
    });
}
export function ApiPostMethodObjectDto(url, objectDto) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(objectDto)
            });
            const responseResult = yield handleResponse(response);
            //console.log("responseResult:", responseResult);
            //const resultStatusCode = responseResult.status;
            return responseResult;
        }
        catch (error) {
            console.error("Error fetching items:", error);
            //return 500;
        }
    });
}
function handleResponse(rawResponse) {
    return __awaiter(this, void 0, void 0, function* () {
        const contentType = rawResponse.headers.get('content-type') || '';
        let data;
        if (contentType.includes('application/json')) {
            data = yield rawResponse.json();
        }
        else {
            data = yield rawResponse.text();
        }
        return {
            status: rawResponse.status,
            ok: rawResponse.ok,
            url: rawResponse.url,
            body: rawResponse.body,
            headers: rawResponse.headers,
            data: data
        };
    });
}
//# sourceMappingURL=apiCommunication.js.map