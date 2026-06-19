var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function createSong() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Create song in progress");
    });
}
export function editSong(songId) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Edit song in progress");
    });
}
export function deleteSong(songId) {
    return __awaiter(this, void 0, void 0, function* () {
        if (confirm("Czy na pewno chcesz usunąć utwór?")) {
            console.log("Delete song in progress");
        }
    });
}
//# sourceMappingURL=songCreatorForms.js.map