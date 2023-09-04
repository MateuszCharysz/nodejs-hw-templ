const jimp = require('jimp');

const jimpedAvatar = async (readFilePath, writeFilePath) => {
  const image = await jimp.read(readFilePath);
  const imageRess = image.resize(250, 250);
  return await imageRess.writeAsync(writeFilePath);
};

module.exports = { jimpedAvatar };
