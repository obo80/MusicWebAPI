var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
        }
    });
}
export function ApiGetMethodObjectDtoWithoutAuthorization(url, token) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const responseResult = yield handleResponse(response);
            return responseResult;
        }
        catch (error) {
            console.error("Error fetching items:", error);
        }
    });
}
export function ApiPutMethodObjectDtoWithAuthorization(url, objectDto, token) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(objectDto)
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
export function ApiPostMethodObjectDtoWithAuthorization(url, objectDto, token) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(JSON.stringify(objectDto));
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
            return responseResult;
        }
        catch (error) {
            console.error("Error fetching items:", error);
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
            return responseResult;
        }
        catch (error) {
            console.error("Error fetching items:", error);
            //return 500;
        }
    });
}
export function ApiDeleteMethodWithAuthorization(url, token) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(url, {
                method: 'DELETE',
                headers: {
                    //'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            const responseResult = yield handleResponse(response);
            return responseResult;
        }
        catch (error) {
            console.error("Error fetching items:", error);
        }
    });
}
export function handleResponse(rawResponse) {
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
//# sourceMappingURL=apiHTTPMethods.js.map