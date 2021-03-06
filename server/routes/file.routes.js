const Router = require('express')
const authMiddleware = require('../middleware/auth.middleware') // для индентификация юзера
const fileController = require('../controllers/fileController')
const router = new Router()

router.get('/download', authMiddleware, fileController.downloadFile)
router.get('', authMiddleware, fileController.getFiles)
router.get('/search', authMiddleware, fileController.searchFile)
router.post('', authMiddleware, fileController.createDir)
router.post('/upload', authMiddleware, fileController.uploadFile)
router.post('/avatar', authMiddleware, fileController.uploadAvatar)
router.delete('/', authMiddleware, fileController.deleteFile)
router.delete('/avatar', authMiddleware, fileController.deleteAvatar)

module.exports = router
