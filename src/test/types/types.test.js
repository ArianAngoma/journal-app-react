import {types} from "../../types/types";

describe('Pruebas en types.js', () => {
    test('Debería de ser correcto el objeto de types', () => {
        expect(typeof types).toBe('object');
        expect(types).toEqual({
            login: '[Auth] Login',
            logout: '[Auth] Logout',

            uiSetError: '[UI] Set Error',
            uiRemoveError: '[UI] Remove Error',

            uiStartLoading: '[UI] Start Loading',
            uiFinishLoading: '[UI] Finish Loading',

            notesAddNew: '[Notes] New Note',
            notesActive: '[Notes] Set active note',
            notesLoad: '[Notes] Load Notes',
            notesUpdated: '[Notes] Updated note',
            notesFileUrl: '[Notes] Updated image url',
            notesDelete: '[Notes] Delete note',
            notesLogoutCleaning: '[Notes] Logout Cleaning'
        });
    });
});