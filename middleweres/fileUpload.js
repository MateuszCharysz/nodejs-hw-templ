const multer = require('multer');
const path = require('node:path');

const tempFolder = path.format({ dir: './tmp' });

const multerConfig = multer.diskStorage({
  desination: tempFolder,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const fileUpload = multer({ storage: multerConfig });

module.exports = { fileUpload };
