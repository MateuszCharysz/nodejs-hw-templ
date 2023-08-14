const express = require('express');
const {
  newContactJoiValidation,
  editedContactJoiValidation,
  favJoiValidation,
} = require('../../service/contactsJoi');
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateFav,
} = require('../../service/contactsMongo');

const router = express.Router();

router.get('/', async (req, res, next) => {
  const contacts = await listContacts();
  res.json(contacts);
});

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (!contact) {
    res.status(404).json({ message: 'Not found' });
  } else {
    res.json(contact);
  }
});

router.post('/', async (req, res, next) => {
  const { name, email, phone } = req.body;
  try {
    await newContactJoiValidation(name, email, phone);
    const contact = await addContact(name, email, phone);
    res.status(201).json(contact);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await removeContact(contactId);
  if (!contact) {
    res.status(404).json({ message: 'Not found' });
  } else {
    res.json({ message: 'contact deleted' });
  }
});

router.put('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const update = req.body;
  try {
    await editedContactJoiValidation(update);
    const contact = await updateContact(contactId, update);
    if (!contact) {
      res.status(404).json({ message: 'Not found' });
    } else {
      res.json(contact);
    }
  } catch (err) {
    res.status(400).json({ message: 'Missing fields' });
  }
});

router.patch('/:contactId/favorite', async (req, res, next) => {
  const { contactId } = req.params;
  const body = req.body;
  try {
    await favJoiValidation(body);
    const contact = await updateFav(contactId, body);
    if (!contact) {
      res.status(404).json({ message: 'Not found' });
    } else {
      res.json(contact);
    }
  } catch (err) {
    res.status(400).json({ message: 'missing field favorite' });
  }
});

module.exports = router;
