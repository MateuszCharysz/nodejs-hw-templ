const fs = require('node:fs').promises;

const getPromiseData = async promise =>
  await promise.then(data => {
    return data;
  });

const jsonBufferToDataErrorHandling = file => {
  try {
    const parsedFile = JSON.parse(file);
    return parsedFile;
  } catch (error) {
    return error;
  }
};

const getContactsDataInArray = async path => {
  try {
    const bufferdata = await getPromiseData(fs.readFile(path));
    const data = jsonBufferToDataErrorHandling(bufferdata);
    return data;
  } catch (err) {
    console.error(err);
  }
};

const saveArrayToFile = (filePath, arr) => {
  const string = JSON.stringify(arr);
  try {
    fs.writeFile(filePath, string);
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  getContactsDataInArray,
  saveArrayToFile,
};
