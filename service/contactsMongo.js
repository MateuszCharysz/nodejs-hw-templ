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

const updateContact = async (contactId, update) => {
  try {
    const contact = await Contact.findByIdAndUpdate(contactId, update, {
      new: true,
    });
    return contact;
  } catch (err) {
    console.error(err);
  }
};

const updateFav = async (contactId, favorite) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      contactId,
      favorite,
      {
        new: true,
      },
    );
    return contact;
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateFav,
};
