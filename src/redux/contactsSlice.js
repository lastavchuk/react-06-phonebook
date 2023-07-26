import { createSlice, nanoid } from '@reduxjs/toolkit';

const contactsInitialState = [];

const contactsSlice = createSlice({
    name: 'contacts',
    initialState: contactsInitialState,
    reducers: {
        addContact: {
            reducer(state, action) {
                state.push(action.payload);
            },
            prepare(contactData) {
                return {
                    payload: {
                        id: nanoid(),
                        ...contactData,
                    },
                };
            },
        },
        removeContact(state, action) {
            const index = state.findIndex(
                contact => contact.id === action.payload
            );
            state.splice(index, 1);
        },
    },
});

export const { addContact, removeContact } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
