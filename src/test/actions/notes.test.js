/**

 * @jest-environment node

 */

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {deleteDoc, disableNetwork, doc, getDoc} from "firebase/firestore";
import {startLoadingNotes, startNewNote, startSaveNote, startUploading} from "../../actions/notes";
import {db} from "../../firebase/firebase-config";
import {types} from "../../types/types";
import {fileUpload} from "../../helpers/fileUpload";

jest.mock('../../helpers/fileUpload', () => ({
    fileUpload: () => {
        //return 'https://hola-mundo.com/cosa.jpg';
        return Promise.resolve('https://hola-mundo.com/cosa.jpg');
    }
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {
        uid: '123'
    },
    notes: {
        active: {
            id: '779IeMUcHWpcsU3HKIUK',
            title: 'Hola',
            body: 'Mundo'
        }
    }
}

let store = mockStore(initState);

describe('Pruebas en notes-action', () => {
    beforeEach(() => {
        store = mockStore(initState)
    });

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

    test('startLoadingNotes debe cargar las notas', async () => {
        await store.dispatch(startLoadingNotes('123'));

        const actions = store.getActions();
        //console.log(actions);

        expect(actions[0]).toEqual({
            type: types.notesLoad,
            payload: expect.any(Array)
        });

        const expected = {
            id: expect.any(String),
            title: expect.any(String),
            body: expect.any(String),
            date: expect.any(Number)
        };

        expect(actions[0].payload[0]).toMatchObject(expected);
    });

    test('startSaveNote debe de actualziar la nota', async () => {
        const note = {
            id: '779IeMUcHWpcsU3HKIUK',
            title: 'title',
            body: 'body'
        };

        await store.dispatch(startSaveNote(note));

        const actions = store.getActions();
        // console.log(actions);

        expect(actions[0].type).toBe(types.notesUpdated);

        const docRef = await getDoc(doc(db, `/123/journal/notes/${note.id}`));
        // console.log(docRef.data());

        expect(docRef.data().title).toBe(note.title);
    });

    test('startUploading debe de actualizar el url del entry', async () => {
        const file = [];
        await store.dispatch(startUploading(file));

        const docRef = await getDoc(doc(db, `/123/journal/notes/779IeMUcHWpcsU3HKIUK`));

        expect(docRef.data().url).toBe('https://hola-mundo.com/cosa.jpg');
    });
});