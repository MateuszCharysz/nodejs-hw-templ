const gravatar = require('gravatar');

const avatarUrl = email => {
  return gravatar.url(email);
};

module.exports = {avatarUrl}