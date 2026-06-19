interface CreateSongDto {
    title: string;
    description: string;
}

export async function createSong() {
    console.log("Create song in progress");
}

export async function editSong(songId: number) {
    console.log("Edit song in progress");
}

export async function deleteSong(songId: number) {
    if (confirm("Czy na pewno chcesz usunąć utwór?")) {
    console.log("Delete song in progress");
    }

}