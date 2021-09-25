import {authReducer} from "../../reducers/authReducer";
import {types} from "../../types/types";

describe('Pruebas en authReducer', () => {
    test('Debería de regresar el usuario logueado', () => {
        const initialState = {};
        const action = {
            type: types.login,
            payload: {
                uid: '123',
                displayName: 'Arian'
            }
        };

        const state = authReducer(initialState, action);

        expect(state).toEqual({uid: '123', name: 'Arian'});
    });

    test('Debería de hacer logout correctamente', () => {
        const initialState = {
            uid: '123',
            name: 'Arian'
        };
        const action = {type: types.logout};

        const state = authReducer(initialState, action);
        expect(state).toEqual({});
    });

    test('Debería retornar el state por defecto', () => {
        const initialState = {
            uid: '123',
            name: 'Arian'
        };
        const action = {type: 'error'};

        const state = authReducer(initialState, action);
        expect(state).toEqual(initialState);
    });
});
