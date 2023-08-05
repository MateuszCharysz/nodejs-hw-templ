const express = require('express');
const Joi = require('joi');
const {
  listContacts,
  getContactById,
  addContact,
} = require('../../models/contacts');

const router = express.Router();

const contactToValidate = Joi.object({
  name: Joi.string().trim().max(35).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

router.get('/', async (req, res, next) => {
  console.log(res);
  const contacts = await listContacts();
  res.json(contacts);
});

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (contact.length > 0) {
    res.json(contact[0]);
  } else {
    res.status(404).json({ message: 'Not found' });
  }
});

router.post('/', async (req, res, next) => {
  const { name, email, phone } = req.body;
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
  const {contactId} = req.params
  res.json({ message: 'Usuwa kontakt - na podstawie id -  removeContact(id)' });
});

router.put('/:contactId', async (req, res, next) => {
  res.json({
    message:
      'aktualizuje kontakt - na podstawie id -  updateContact(id, body) JOI',
  });
});

module.exports = router;
