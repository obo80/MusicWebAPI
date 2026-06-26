import type { ItemDTO } from "../../DTO/ItemsDto.js";
import type { PagedResultDto } from "../../DTO/PagedResultDto.js";
import { LoginDto } from "../../DTO/UserDtos.js";

export async function ApiGetMethodObjectDtoWithAuthorization<responseDataType>(url: string, token: string): Promise<IApiResponse<responseDataType>> {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const responseResult = await handleResponse<responseDataType>(response);
        return responseResult;
    }
    catch (error) {
        console.error("Error fetching items:", error);
    }
}
export async function ApiGetMethodObjectDtoWithoutAuthorization<responseDataType>(url: string, token: string): Promise<IApiResponse<responseDataType>> {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const responseResult = await handleResponse<responseDataType>(response);
        return responseResult;
    }
    catch (error) {
        console.error("Error fetching items:", error);
    }
}


export async function ApiPutMethodObjectDtoWithAuthorization<DtoType, responseDataType>(url: string, objectDto: DtoType, token: string): Promise<IApiResponse<responseDataType>> {
    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(objectDto)
        });

        const responseResult = await handleResponse<responseDataType>(response);

        return responseResult;
    }
    catch (error) {
        console.error("Error fetching items:", error);
        //return 500;
    }
}

export async function ApiPostMethodObjectDtoWithAuthorization<DtoType, responseDataType>(url: string, objectDto: DtoType, token: string): Promise<IApiResponse<responseDataType>> {
    console.log(JSON.stringify(objectDto));
    try {

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(objectDto)
        });

        const responseResult = await handleResponse<responseDataType>(response);

        return responseResult;
    }
    catch (error) {
        console.error("Error fetching items:", error);

    }
}

export async function ApiPostMethodObjectDto<DtoType, responseDataType>(url: string, objectDto: DtoType): Promise<IApiResponse<responseDataType>> {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(objectDto)
        });

        const responseResult = await handleResponse<responseDataType>(response);

        return responseResult;
    }
    catch (error) {
        console.error("Error fetching items:", error);
        //return 500;
    }
}


export async function ApiDeleteMethodWithAuthorization<responseDataType>(url: string, token: string): Promise<IApiResponse<responseDataType>> {
    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                //'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const responseResult = await handleResponse<responseDataType>(response);

        return responseResult;
    }
    catch (error) {
        console.error("Error fetching items:", error);
    }
}

export interface IApiResponse<T> {
    status: number;
    ok: boolean;
    url: string;
    body: ReadableStream<Uint8Array> | null;
    headers: Headers;
    data: T; 
}

export async function handleResponse<responseDataType>(rawResponse: Response): Promise<IApiResponse<responseDataType>> {
    const contentType = rawResponse.headers.get('content-type') || '';
    let data: any;

    if (contentType.includes('application/json')) {
        data = await rawResponse.json();
    } else {
        data = await rawResponse.text();
    }

    return {
        status: rawResponse.status,
        ok: rawResponse.ok,
        url: rawResponse.url,
        body: rawResponse.body,
        headers: rawResponse.headers,
        data: data as responseDataType
    };
}

