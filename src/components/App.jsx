import { nanoid } from 'nanoid';
import { ContactForm } from 'components/ContactForm/ContactForm';
import Filter from 'components/Filter/Filter';
import { ContactList } from 'components/ContactList/ContactList';
import css from 'components/App.module.css';
import React from 'react';

export class App extends React.Component {
  state = {
    contacts: [],
    filter: '',
  };

  addContact = (name, number) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    if (
      this.state.contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      alert(`${name} is already in your contact list`);
      return;
    }

    this.setState(prevState => ({
      contacts: [contact, ...prevState.contacts],
    }));
  };

  deleteContact = deleteContactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(
        contact => contact.id !== deleteContactId
      ),
    }));
  };

  handleFilterChange = event => {
    this.setState({ filter: event.target.value });
  };

  render() {
    const loweredFilter = this.state.filter.toLowerCase();

    const filterContacts = this.state.contacts.filter(contact => {
      return contact.name.toLowerCase().includes(loweredFilter);
    });

    return (
      <div className={css.section}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />
        <h2>Contacts</h2>
        <Filter value={this.state.filter} onChange={this.handleFilterChange} />
        <ContactList
          filterContacts={filterContacts}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
