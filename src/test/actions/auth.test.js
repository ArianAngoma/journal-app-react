import {login, logout} from "../../actions/auth";
import {types} from "../../types/types";

describe('Pruebas con las acciones de Auth', () => {
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
});