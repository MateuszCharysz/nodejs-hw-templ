const path = require('node:path');
require('dotenv').config();
const tmp = process.env.TEMP_FOLDER;
const fs = require('node:fs').promises;

const tmpFolder = fileName => path.join(tmp, fileName);
const finalFolder = fileName => path.join('/public/avatars', fileName);
const deleteFileTmpFolder = async fileName => await fs.unlink(tmpFolder(fileName));
const writeTmpFile = async (readFileName, writeFileName) => await fs.rename(tmpFolder(readFileName), finalFolder(writeFileName));

module.exports = { tmpFolder, finalFolder, deleteFileTmpFolder, writeTmpFile };
