const multer = require('multer')

const storage = multer.memoryStorage()

const imageFilter = function(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|pdf)$/i)) {
      return cb(new Error('Greška'), false)
    }
    cb(null, true)
}

const upload = multer({
    storage:storage,
    fileFilter:imageFilter,
    limits:{
        fileSize:8*1920*1080
    }
})

module.exports = upload