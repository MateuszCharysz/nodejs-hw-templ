const {
  newContactJoiValidation,
  editedContactJoiValidation,
  favJoiValidation,
} = require('../service/contactsJoi');
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateFav,
} = require('../service/contactsMongo');

const get = async (req, res, next) => {
  console.log(req)
  try {
    const contacts = await listContacts();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: 'Error ocurred', error: err });
  }
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const contact = await getContactById(contactId);
    res.json(contact);
  } catch (err) {
    res.status(404).json({ message: 'Not found' });
  }
};

const postNew = async (req, res, next) => {
  const { name, email, phone } = req.body;
  try {
    await newContactJoiValidation(name, email, phone);
    const contact = await addContact(name, email, phone);
    res.status(201).json(contact);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteCont = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    await removeContact(contactId);
    res.json({ message: 'contact deleted' });
  } catch (err) {
    res.status(404).json({ message: 'Not found' });
  }
};

const putEditCont = async (req, res, next) => {
  const { contactId } = req.params;
  const update = req.body;
  try {
    await editedContactJoiValidation(update);
    try {
      const contact = await updateContact(contactId, update);
      res.json(contact);
    } catch (err) {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (err) {
    res.status(400).json({ message: 'Missing fields' });
  }
};

const patchFav = async (req, res, next) => {
  const { contactId } = req.params;
  const body = req.body;
  try {
    await favJoiValidation(body);
    try {
      const contact = await updateFav(contactId, body);
      res.json(contact);
    } catch {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (err) {
    res.status(400).json({ message: 'missing field favorite' });
  }
};

module.exports = { get, getById, postNew, putEditCont, patchFav, deleteCont };