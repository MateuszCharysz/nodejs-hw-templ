const { nanoid } = require('nanoid');
const path = require('node:path');
const {
  getContactsDataInArray,
  saveArrayToFile,
  newArr,
} = require('./contactsFunc');

const contactsPath = path.format({ dir: './models', base: 'contacts.json' });
console.log(contactsPath);

const listContacts = async () => {
  const contacts = await getContactsDataInArray(contactsPath);
  return contacts;
};

const getContactById = async contactId => {
  const contacts = await getContactsDataInArray(contactsPath);
  const contact = contacts.filter(({ id }) => id === contactId);
  return contact;
};

const removeContact = async contactId => {
  const contacts = await getContactsDataInArray(contactsPath);
  const remContactArr = contacts.filter(({ id }) => id !== contactId);
  if (remContactArr.length < contacts.length) {
    saveArrayToFile(contactsPath, remContactArr);
    console.log('Contact succesfully removed');
  } else {
    console.log('There is no contact with given id. Contacts intact');
  }
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

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
