const jimp = require('jimp')

const jimpedAvatar = async (readFilePath, writeFilePath) =>{
const image = await jimp.read(readFilePath);
const imageRess = await image.resize(250, 250)
await imageRess.writeAsync(writeFilePath)
}

module.exports = {jimpedAvatar}
