const multer = require('multer');

//here we defined the options for uploading our file such as destination and filename
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/')
    },
    filename: (req, file, cb) => {
        let uniqueName = Math.round(Math.random() * 12123123133);
        cb(null, uniqueName + '-' + file.originalname)
    }
})

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype === 'image/png' ||
            file.mimetype === 'image/jpg' ||
            file.mimetype === 'image/jpeg'
        ) {
            cb(null, true)
        } else {
            cb(null, false)
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
            
        }
    },
})

module.exports = upload;