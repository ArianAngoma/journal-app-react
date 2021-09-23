import {useDispatch, useSelector} from "react-redux";
import {startSaveNote} from "../../actions/notes";

export const NoteAppBar = () => {
    const dispatch = useDispatch();
    const {active} = useSelector(state => state.notes);

    const handleSaveNote = () => {
        console.log(active)
        dispatch(startSaveNote(active));
    }
    return (
        <div className="notes__appbar">
            <span>07 de Junio</span>

            <div>
                <button className="btn">
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