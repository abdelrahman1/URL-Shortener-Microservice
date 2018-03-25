import Router from "express-promise-router"
import urlController from '../controllers/urlshortner'
const router = Router()

router.route("/shorten").get(urlController.createShortUrl)
router.route('/:shortURL').get(urlController.getLongUrl)

export default router
