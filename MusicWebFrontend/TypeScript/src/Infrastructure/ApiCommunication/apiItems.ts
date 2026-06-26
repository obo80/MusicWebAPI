import { ItemDTO } from "../../DTO/ItemsDto.js";
import { PagedResultDto } from "../../DTO/PagedResultDto.js";
import { LoginDto } from "../../DTO/UserDtos.js";
import { ApiGetMethodObjectDtoWithAuthorization, ApiGetMethodObjectDtoWithoutAuthorization, handleResponse, IApiResponse } from "./apiHTTPMethods.js";

export async function getPagedItemsFromApi(url: string): Promise<PagedResultDto<ItemDTO>> | null {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.log(`Failed to fetch data from ${url}. Status: ${response.status}`);
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json() as PagedResultDto<ItemDTO>;
        console.log(`Data fetched from ${url}:`);
        return data;
    } catch (error) {
        console.error("Error fetching items:", error);
        return null;
    }
}
export async function getItemFromApi(url: string): Promise<ItemDTO> | null {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.log(`Failed to fetch data from ${url}. Status: ${response.status}`);
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json() as ItemDTO;
        console.log(`Data fetched from ${url}:`);
        return data;
    } catch (error) {
        console.error("Error fetching items:", error);
        return null;
    }
}

export async function getItemFieldValue<T>(fieldName: string, url: string, token: string): Promise<number | string | boolean | null | T[]> {

    const response = await ApiGetMethodObjectDtoWithAuthorization<T>(url, token);
    if (response.status === 200) {
        const data = response.data;
        const result = data[fieldName];
        if (result === null) {
            return null;
        }
        return result;
    }
    else {
        console.log(response.status, response);
        return null;
    }
}

export async function getItemsForUrl<T>(url: string, token: string): Promise<T[] | null> {
    const response = await ApiGetMethodObjectDtoWithAuthorization<T>(url, token);
    if (response.status === 200) {
        const data = response.data;
        const result = data["items"];
        if (result === null) {
            return null;
        }
        return result;
    }
    else {
        console.log(response.status, response);
        return null;
    }
}

export async function loginUserToApi(url: string, loginDto: LoginDto): Promise<number> {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginDto)
        });

        const responseResult = await handleResponse<string>(response);

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
}


