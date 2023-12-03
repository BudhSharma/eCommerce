const multer = require('multer')
const path = require('path')
const fs = require('fs')

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const folderPath = path.join(__dirname, '../uploads')

    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath)
    }

    callback(null, folderPath)
  },
  filename: (req, file, callback) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    const fileExtension = path.extname(file.originalname)
    const uniqueFileName = `${uniqueSuffix}${fileExtension}`
    callback(null, uniqueFileName)
  }
})

const upload = multer({ storage })

module.exports = upload
