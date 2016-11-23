const multer = require('multer');

const upload = multer();

exports.form = upload.none();
