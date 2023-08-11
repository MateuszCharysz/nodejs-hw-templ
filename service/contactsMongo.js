const Contact = require('../models/contact.shem');

const listContacts = async () => {
  try {
    const contacts = await Contact.find();
    return contacts;
  } catch (err) {
    console.error(err);
  }
};

const getContactById = async contactId => {
  try {
    const contact = await Contact.findById(contactId);
    return contact;
  } catch (err) {
    console.error(err);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const contact = await Contact.create({
      name: name,
      email: email,
      phone: phone,
    });
    return contact;
  } catch (err) {
    console.error(err);
  }
};

const removeContact = async contactId => {
  try {
    const contact = await Contact.findByIdAndDelete(contactId);
    return contact;
  } catch (err) {
    console.error(err);
  }
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
