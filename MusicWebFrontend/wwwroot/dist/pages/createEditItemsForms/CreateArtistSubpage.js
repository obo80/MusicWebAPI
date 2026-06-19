//wywołanie tworznie artysty = przycisk gdzieś tam wywołuję podstawową funcję
//1 - funcja głowna ma za zadanie
// - storzyć elemetny do formularza w postaci formFielda w tablicy formFields
//wywołać stworzenie formatki ze zdarzeniami
// -
import { createArtistformFields } from "./formFieldsCreator.js";
import { itemSharedForm } from "./ItemSharedForm.js";
export function createArtist() {
    const artistFormFields = createArtistformFields();
    const createArtistForm = new itemSharedForm(artistFormFields, null, null);
    createArtist.
    ;
}
//# sourceMappingURL=CreateArtistSubpage.js.map