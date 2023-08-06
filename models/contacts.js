const { nanoid } = require('nanoid');
const path = require('node:path');
const {
  getContactsDataInArray,
  saveArrayToFile,
  newArr,
} = require('./contactsFunc');

const contactsPath = path.format({ dir: './models', base: 'contacts.json' });

const listContacts = async () => {
  const contacts = await getContactsDataInArray(contactsPath);
  return contacts;
};

const getContactById = async contactId => {
  const contacts = await getContactsDataInArray(contactsPath);
  const contact = contacts.filter(({ id }) => id === contactId);
  return contact;
};

const removeContact = contacts => {
  saveArrayToFile(contactsPath, contacts);
};

const addContact = async (name, email, phone) => {
  const contacts = await getContactsDataInArray(contactsPath);
  const contact = {
    id: nanoid(),
    name: name,
    email: email,
    phone: phone,
  };
  saveArrayToFile(contactsPath, newArr(contacts, contact));
  return contact;
};

const updateContact = (contactId, update, arr) => {
  const updatedContacts = arr.map(contact =>
    contact.id === contactId ? { ...contact, ...update } : contact,
  );
  const updatedContact = updatedContacts.find(
    contact => contact.id === contactId,
  );
  saveArrayToFile(contactsPath, updatedContacts);
  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
