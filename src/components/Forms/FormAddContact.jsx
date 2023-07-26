import { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'components/Button/Button';
import { StyledFormAddContact } from './FormAddContact.styled';

const INITIAL_STATE = {
    name: '',
    number: '',
};

export function FormAddContact({ onAddContact }) {
    const [user, setUser] = useState(INITIAL_STATE);

    const onInputsChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const onFormSubmit = e => {
        e.preventDefault();

        onAddContact(user);
        setUser(INITIAL_STATE);
    };

    return (
        <StyledFormAddContact onSubmit={onFormSubmit}>
            <label htmlFor="name">Name</label>
            <input
                type="text"
                name="name"
                pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                value={user.name}
                onChange={onInputsChange}
                required
            />

            <label htmlFor="number">Number</label>
            <input
                type="tel"
                name="number"
                pattern="\+?\d{1,4}?[\-.\s]?\(?\d{1,3}?\)?[\-.\s]?\d{1,4}[\-.\s]?\d{1,4}[\-.\s]?\d{1,9}"
                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                value={user.number}
                onChange={onInputsChange}
                required
            />

            <Button className="btnGreen" type="submit">
                Add contact
            </Button>
        </StyledFormAddContact>
    );
}

FormAddContact.propTypes = {
    onAddContact: PropTypes.func.isRequired,
};
