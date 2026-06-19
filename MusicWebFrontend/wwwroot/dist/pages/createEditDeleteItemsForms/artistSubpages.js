//wywołanie tworznie artysty = przycisk gdzieś tam wywołuję podstawową funcję
//1 - funcja głowna ma za zadanie
// - storzyć elemetny do formularza w postaci formFielda w tablicy formFields
//wywołać stworzenie formatki ze zdarzeniami
// -
import { toast } from "../../Utils/toast";
import { createArtistformFields } from "./formFieldsCreator";
import { itemSharedForm } from "./ItemSharedForm";
const createArtistFormHeaderText = "Dodaj artystę";
const esitArtistFormHeaderText = "Dodaj artystę";
export function createArtist() {
    const artistFormFields = createArtistformFields();
    const createArtistForm = new itemSharedForm(artistFormFields, null, null);
    createArtistForm.renderArtistForm(createArtistFormHeaderText, () => {
        //onSave
        console.log("Save");
        toast.success("Artysta został dodany");
    }, () => {
        //onCancel
        console.log("Cancel");
        toast.info("Anulowano dodawanie artysty");
    });
}
//# sourceMappingURL=artistSubpages.js.map