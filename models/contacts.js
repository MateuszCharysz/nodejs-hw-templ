// const { nanoid } = require('nanoid');
const path = require('node:path');
const { getContactsDataInArray } = require('./contactsFunc');

const contactsPath = path.format({ dir: './models', base: 'contacts.json' });
console.log(contactsPath);

const listContacts = async () => {
  const contacts = await getContactsDataInArray(contactsPath);
  return contacts;
};

const getContactById = async contactId => {
  const contacts = await getContactsDataInArray(contactsPath);
    const contact = contacts.filter(({ id }) => id === contactId);
    return contact
    // if (contact.length > 0) {
    //   console.table(contact);
    // } else {
    //   console.log('There is no contact with given id.');
    // }
  }


const removeContact = async contactId => {};

const addContact = async body => {};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
