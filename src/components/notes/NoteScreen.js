import {NoteAppBar} from "./NoteAppBar";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "../../hooks/useForm";
import {useEffect, useRef} from "react";
import {activeNote} from "../../actions/notes";

export const NoteScreen = () => {
    const dispatch = useDispatch();

    const {active: note} = useSelector(state => state.notes);

    const [formValues, handleInputChange, reset] = useForm(note);
    const {body, title} = formValues;

    const activeId = useRef(note.id);
    useEffect(() => {
        if (note.id !== activeId.current) {
            reset(note);
            activeId.current = note.id;
        }
    }, [note, reset]);

    useEffect(() => {
        dispatch(activeNote(formValues.id, {...formValues}))
    }, [formValues, dispatch]);

    return (
        <div className="notes__main-content">
            <NoteAppBar/>

            <div className="notes__content">
                <input type="text"
                       placeholder="Some awesome title"
                       className="notes__title-input"
                       autoComplete="off"
                       value={title}
                       name="title"
                       onChange={handleInputChange}/>

                <textarea placeholder="What happened today"
                          className="notes__textarea"
                          value={body}
                          name="body"
                          onChange={handleInputChange}/>

                {
                    (note.url) && (
                        <div className="notes__image">
                            <img src="https://www.arsys.es/blog/file/uploads/2017/04/NodeJS.jpg" alt="img"/>
                        </div>
                    )
                }
            </div>


        </div>
    )
}