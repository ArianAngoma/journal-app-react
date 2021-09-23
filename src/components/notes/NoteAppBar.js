import {useDispatch, useSelector} from "react-redux";
import {startSaveNote, startUploading} from "../../actions/notes";

export const NoteAppBar = () => {
    const dispatch = useDispatch();
    const {active} = useSelector(state => state.notes);

    const handleSaveNote = () => {
        dispatch(startSaveNote(active));
    }

    const handlePictureCLick = () => {
        document.querySelector('#fileSelector').click();
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            dispatch(startUploading(file))
        }
    }

    return (
        <div className="notes__appbar">
            <span>07 de Junio</span>

            <input id="fileSelector"
                   type="file"
                   name="file"
                   style={{display: 'none'}}
                   onChange={handleFileChange}/>

            <div>
                <button className="btn"
                        onClick={handlePictureCLick}>
                    Picture
                </button>

                <button className="btn"
                        onClick={handleSaveNote}>
                    Save
                </button>
            </div>
        </div>
    )
}