import { useDispatch, useSelector } from 'react-redux';

import { addContact, removeContact } from 'redux/contactsSlice';
import { setFilter } from 'redux/filterSlice';

import { Filter } from './Filter/Filter';
import { Section } from './Section/Section';
import { Container } from './Container/Container';
import { HeadTilte } from './HeadTilte/HeadTilte';
import { ContactList } from './Contacts/ContactList';
import { FormAddContact } from './Forms/FormAddContact';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

export function App() {
    const contacts = useSelector(state => state.contacts);
    const filter = useSelector(state => state.filter);

    const dispatch = useDispatch();

    const onAddContact = contactData => {
        const findUser = contacts.find(
            el => el.name === contactData.name.trim()
        );

        if (findUser) {
            Notify.warning(`<b>${findUser.name}</b> is already in contacts`, {
                plainText: false,
            });
            return;
        }
        dispatch(addContact(contactData));
    };

    const onRemoveContact = contactId => {
        dispatch(removeContact(contactId));
    };

    const onFilter = filterTerm => {
        dispatch(setFilter(filterTerm));
    };

    const filteredContacts = () => {
        if (!!filter) {
            return contacts.filter(contact => {
                return (
                    contact.name
                        .toLowerCase()
                        .includes(filter.toLowerCase().trim()) ||
                    contact.number.includes(filter.trim())
                );
            });
        }
        return contacts;
    };

    return (
        <>
            <Section>
                <Container>
                    <HeadTilte title="Phonebook" />
                    <FormAddContact onAddContact={onAddContact} />
                </Container>
            </Section>
            {contacts.length ? (
                <Section>
                    <Container>
                        <HeadTilte title="Contacts" />
                        <Filter filter={filter} onFilterChange={onFilter} />
                        <ContactList
                            contacts={filteredContacts()}
                            onRemoveContact={onRemoveContact}
                        />
                    </Container>
                </Section>
            ) : (
                <Section>
                    <Container>
                        <HeadTilte title="No contacts" />
                    </Container>
                </Section>
            )}
        </>
    );
}
