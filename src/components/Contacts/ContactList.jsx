import PropTypes from 'prop-types';
import { Contact } from './Contact';
import { StyledContactList } from './ContactList.styled';

export const ContactList = ({ contacts, onRemoveContact }) => {
    let sortedContacts = [...contacts];
    sortedContacts.sort((a, b) => a.name.localeCompare(b.name));

    return (
        <StyledContactList>
            {sortedContacts.map(contact => (
                <Contact
                    contact={contact}
                    onRemoveContact={onRemoveContact}
                    key={contact.id}
                />
            ))}
        </StyledContactList>
    );
};

ContactList.propTypes = {
    contacts: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            number: PropTypes.string.isRequired,
        }).isRequired
    ).isRequired,
    onRemoveContact: PropTypes.func.isRequired,
};
