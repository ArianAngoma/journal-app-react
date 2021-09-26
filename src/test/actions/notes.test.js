import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {deleteDoc, disableNetwork, doc} from "firebase/firestore";
import {startNewNote} from "../../actions/notes";
import {db} from "../../firebase/firebase-config";
import {types} from "../../types/types";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const store = mockStore({
    auth: {
        uid: '123'
    }
});

describe('Pruebas en notes-action', () => {
    afterAll(() => {
        disableNetwork(db);
    });

    test('Debe de crear una nueva nota startNewNote', async () => {
        await store.dispatch(startNewNote());

        const actions = store.getActions();
        // console.log(actions);

        expect(actions[0]).toEqual({
            type: types.notesActive,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        });

        expect(actions[1]).toEqual({
            type: types.notesAddNew,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        });

        const docId = actions[0].payload.id;
        await deleteDoc(doc(db, `/123/journal/notes/${docId}`));
    });
});