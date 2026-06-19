interface CreateAlbumDto {
    title: string;
    description: string;
}

export async function createAlbum() {
    console.log("Create album in progress");
}

export async function editAlbum(albumId: number) {
    console.log("Edit album in progress");
}

export async function deleteAlbum(albumId: number) {
    if (confirm("Czy na pewno chcesz usunąć album?")) {
        console.log("Delete album in progress");
    }
}