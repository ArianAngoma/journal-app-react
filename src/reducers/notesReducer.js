/*
 {
    notes: [],
    active: null,
    active: {
        id: '132',
        title: '',
        body: '',
        imageUrl: '',
        date: 123456789
    }
 }
* */

const initialState = {
    notes: [],
    active: null
}

export const notesReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
}