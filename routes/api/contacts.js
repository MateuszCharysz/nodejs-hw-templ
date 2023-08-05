const express = require('express');
const { listContacts, getContactById } = require('../../models/contacts');

const router = express.Router();

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
  res.json({
    message:
      'Dodaje contact - musi on być pełen (middleware sprawdza body) - addContact(body) dodaje do contacts.json JOI',
  });
});

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'Usuwa kontakt - na podstawie id -  removeContact(id)' });
});

router.put('/:contactId', async (req, res, next) => {
  res.json({
    message:
      'aktualizuje kontakt - na podstawie id -  updateContact(id, body) JOI',
  });
});

module.exports = router;
