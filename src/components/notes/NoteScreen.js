import {NoteAppBar} from "./NoteAppBar";
import {useSelector} from "react-redux";
import {useForm} from "../../hooks/useForm";
import {useEffect, useRef} from "react";

export const NoteScreen = () => {
    const {active: note} = useSelector(state => state.notes);

    const [formValues, handleInputChange, reset] = useForm(note);
    console.log(formValues);
    const {body, title} = formValues;

    const activeId = useRef(note.id);
    useEffect(() => {
        if (note.id !== activeId.current) {
            reset(note);
            activeId.current = note.id;
        }
    }, [note, reset]);

    return (
        <div className="notes__main-content">
            <NoteAppBar/>

            <div className="notes__content">
                <input type="text"
                       placeholder="Some awesome title"
                       className="notes__title-input"
                       autoComplete="off"
                       value={title}
                       onChange={handleInputChange}/>

                <textarea placeholder="What happened today"
                          className="notes__textarea"
                          value={body}
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