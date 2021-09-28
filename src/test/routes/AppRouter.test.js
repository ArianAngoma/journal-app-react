import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {mount} from "enzyme";
import {Provider} from "react-redux";
import {MemoryRouter} from "react-router-dom";
import {AppRouter} from "../../routes/AppRouter";
import {act} from "@testing-library/react";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {login} from "../../actions/auth";

jest.mock('../../actions/auth', () => ({
    login: jest.fn()
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {},
    ui: {
        loading: false,
        msgError: null
    },
    notes: {
        active: {
            id: '123',

        },
        notes: []
    }
};

let store = mockStore(initState);
store.dispatch = jest.fn();


describe('Pruebas en AppRouter', () => {
    test('Debe de llamar al login si estoy autenticado', async () => {
        let user;

        await act(async () => {
            const userCred = await signInWithEmailAndPassword(getAuth(), 'test@test.com', '123456');
            user = userCred.user;

            const wrapper = mount(
                <Provider store={store}>
                    <MemoryRouter>
                        <AppRouter/>
                    </MemoryRouter>
                </Provider>
            );
        });

        expect(login).toHaveBeenCalled();
        expect(login).toHaveBeenCalledWith("ehVBaqgWglarAJWnTL82UDjXEDi1", null);
    });
});