import expres from 'express'
import { addVideo, addView, deleteVideo, getByTag, getRandom, getSubscribed, getTrend, getVideo, search, updateVideo } from '../controllers/video.js'
import { verifyToken } from '../verifyToken.js'

const router = expres.Router()

router.post('/', verifyToken, addVideo)

router.put('/:id', verifyToken, updateVideo)

router.delete('/:id', verifyToken, deleteVideo)

router.get('/find/:id', getVideo)

router.get('/view/:id', addView)

router.get('/trend', getTrend)

router.get('/random', getRandom)

router.get('/subscribed', getSubscribed)

router.get('/tags', getByTag)

router.get('/search', search)


export default router