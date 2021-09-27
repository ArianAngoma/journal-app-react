import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {login, logout, startLoginEmailPassword, startLogout} from "../../actions/auth";
import {types} from "../../types/types";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};

let store = mockStore(initState);

describe('Pruebas con las acciones de Auth', () => {
    beforeEach(() => {
        store = mockStore(initState);
    });

    test('Login y logout deben de crear la acción respectiva', () => {
        const loginAction = login('123', 'Arian');
        expect(loginAction).toEqual({
            type: types.login,
            payload: {
                uid: '123',
                displayName: 'Arian'
            }
        });

        const logoutAction = logout();
        expect(logoutAction).toEqual({
            type: types.logout
        });
    });

    test('startLogout debería realizarce correctamente', async () => {
        await store.dispatch(startLogout());
        const actions = store.getActions();
        // console.log(actions);

        expect(actions[0]).toEqual({type: types.logout});
        expect(actions[1]).toEqual({type: types.notesLogoutCleaning});
    });

    test('Debe de iniciar el startLoginEmailPassword', async () => {
        await store.dispatch(startLoginEmailPassword('test@test.com', '123456'));
        const actions = store.getActions();
        // console.log(actions);

        expect(actions[1]).toEqual({
            type: types.login,
            payload: {
                uid: 'ehVBaqgWglarAJWnTL82UDjXEDi1',
                displayName: null
            }
        });
    });
});