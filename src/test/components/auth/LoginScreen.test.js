import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {mount} from "enzyme";
import {LoginScreen} from "../../../components/auth/LoginScreen";
import {Provider} from "react-redux";
import {MemoryRouter} from "react-router-dom";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {},
    ui: {
        loading: false,
        msgError: null
    }
};

let store = mockStore(initState);

const wrapper = mount(
    <Provider store={store}>
        <MemoryRouter>
            <LoginScreen/>
        </MemoryRouter>
    </Provider>
);

describe('Pruebas en el componente LoginScreen', () => {
    beforeEach(() => {
        store = mockStore(initState);
    });

    test('Debe de mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    });
});