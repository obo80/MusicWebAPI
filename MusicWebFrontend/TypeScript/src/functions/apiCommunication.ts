import type { ItemDTO } from "../DTO/ItemsDto.js";
import type { PagedResultDto } from "../DTO/PagedResultDto.js";

export async function getPagedItemsFromApi(url: string): Promise<PagedResultDto<ItemDTO>> | null {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.log(`Failed to fetch data from ${url}. Status: ${response.status}`);
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json() as PagedResultDto<ItemDTO>;
        console.log(`Data fetched from ${url}:`);
        // console.log("A dane to:", data);
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
        // console.log("A dane to:", data);
        return data;
    } catch (error) {
        console.error("Error fetching items:", error);
        return null;
    }
}
