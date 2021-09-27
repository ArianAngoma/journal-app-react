/**

 * @jest-environment node

 */

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {collection, deleteDoc, disableNetwork, doc, getDoc} from "firebase/firestore";
import {startLoadingNotes, startNewNote, startSaveNote, startUploading} from "../../actions/notes";
import {db} from "../../firebase/firebase-config";
import {types} from "../../types/types";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {
        uid: '123'
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
        const file = new File([], 'photo.jpg');
        await store.dispatch(startUploading(file));
    });
});