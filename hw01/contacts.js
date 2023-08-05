const { nanoid } = require('nanoid');
const path = require('node:path');
const { getContactsDataInArray, saveArrayToFile } = require('./contactsFunc');

const contactsPath = path.format({ dir: './db', base: 'contacts.json' });

const listContacts = async () => {
  const contacts = await getContactsDataInArray(contactsPath);
  console.table(contacts);
};

const getContactById = async (contactId = '') => {
  const contacts = await getContactsDataInArray(contactsPath);
  if (contactId === '') {
    return console.log('Please write id');
  } else {
    const contact = contacts.filter(({ id }) => id === contactId);
    if (contact.length > 0) {
      console.table(contact);
    } else {
      console.log('There is no contact with given id.');
    }
  }
};

const removeContact = async (contactId = '') => {
  const contacts = await getContactsDataInArray(contactsPath);
  if (contactId === '') {
    return console.log('Please write id');
  } else {
    const remContactArr = contacts.filter(({ id }) => id !== contactId);
    if (remContactArr.length < contacts.length) {
      saveArrayToFile(contactsPath, remContactArr);
      console.log('Contact succesfully removed');
    } else {
      console.log('There is no contact with given id. Contacts intact');
    }
  }
};

const addContact = async (name = '', email, phone) => {
  const contacts = await getContactsDataInArray(contactsPath);
  if (name === '') {
    return console.log('Contact must have a name');
  } else {
    const contact = {
      id: nanoid(),
      name: name,
      email: email,
      phone: phone,
    };
    const newArr = [...contacts, contact];
    saveArrayToFile(contactsPath, newArr);
    console.log('Contact succesfully added');
  }
};
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
