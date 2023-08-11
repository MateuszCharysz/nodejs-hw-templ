const express = require('express');
const Joi = require('joi');
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
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
  const contactToValidate = Joi.object({
    name: Joi.string().trim().max(35).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
  });
  try {
    await contactToValidate.validateAsync({
      name: name,
      email: email,
      phone: phone,
    });
    const contact = await addContact(name, email, phone);
    res.status(201).json(contact);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const contacts = await listContacts();
  const remContactArr = contacts.filter(({ id }) => id !== contactId);
  if (remContactArr.length < contacts.length) {
    removeContact(remContactArr);
    res.json({ message: 'contact deleted' });
  } else {
    res.status(404).json({
      message: 'Not found',
    });
  }
});

router.put('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const update = req.body;
  const contactToValidate = Joi.object()
    .keys({
      name: Joi.string().trim().max(35),
      email: Joi.string().email(),
      phone: Joi.string(),
    })
    .or('name', 'email', 'phone')
    .required();
  try {
    await contactToValidate.validateAsync({
      name: update.name,
      email: update.email,
      phone: update.phone,
    });
    const contacts = await listContacts();
    if (contacts.some(({ id }) => id === contactId)) {
      res.json(updateContact(contactId, update, contacts));
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (err) {
    res.status(400).json({ message: 'Missing fields' });
  }
});

module.exports = router;
