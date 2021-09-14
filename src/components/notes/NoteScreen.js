import {NoteAppBar} from "./NoteAppBar";

export const NoteScreen = () => {
    return (
        <div className="notes__main-content">
            <NoteAppBar/>

            <div className="notes__content">
                <input type="text"
                       placeholder="Some awesome title"
                       className="notes__title-input"
                       autoComplete="off"/>

                <textarea placeholder="What happened today"
                          className="notes__textarea"/>

                <div className="notes__image">
                    <img src="https://www.arsys.es/blog/file/uploads/2017/04/NodeJS.jpg" alt="img"/>
                </div>
            </div>


        </div>
    )
}