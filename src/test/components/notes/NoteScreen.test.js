import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {mount} from "enzyme";
import {Provider} from "react-redux";
import {activeNote} from '../../../actions/notes';
import {NoteScreen} from "../../../components/notes/NoteScreen";

jest.mock('../../../actions/notes', () => ({
    activeNote: jest.fn()
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {
        uid: '1',
        name: 'Arian'
    },
    ui: {
        loading: false,
        msgError: null
    },
    notes: {
        active: {
            id: 123,
            title: 'Hola',
            body: 'Mundo',
            date: 0
        },
        notes: []
    }
};

let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={store}>
        <NoteScreen/>
    </Provider>
);


describe('Pruebas en el componente NoteScreen', () => {
    test('Debe de mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('Debe de disparar el activeNote', () => {
        wrapper.find('input[name="title"]').simulate('change', {
            target: {
                name: 'title',
                value: 'Hola de nuevo'
            }
        });

        expect(activeNote).toHaveBeenCalled();
        expect(activeNote).toHaveBeenLastCalledWith(
            123,
            {
                body: 'Mundo',
                title: 'Hola de nuevo',
                id: 123,
                date: 0
            }
        );
    });
});