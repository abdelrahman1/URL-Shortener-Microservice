import Url from "../models/urlshortner"
import validate from "../helpers/validation"
import ShortId from "id-shorter"

let urlController = {}
const mongoDBShortId = ShortId()
urlController.createShortUrl = async (req, res, next) => {
  let url = req.query.url || ""

  //validate url
  if (!validate(url)) {
    res.json({
      error: {
        message: "invalid url"
      }
    })
  }

  //save url in db
  let newUrl = new Url({ long_url: url })
  await newUrl.save()
  newUrl.short_url =
    req.protocol + "://" + req.hostname + "/" + mongoDBShortId.encode(newUrl.id)
  await newUrl.save()
  res.status(200).json({
    data: {
      short_url:newUrl.short_url
    }
  })
}

urlController.getLongUrl = async (req, res, next) => {
  let shortURL = req.protocol + "://" + req.hostname + "/" + req.params.shortURL
  let url = await Url.findOneAndUpdate(
    { short_url: shortURL },
    { $inc: { clicks: 1 } }
  )
  if (url) {
    res.redirect(url.long_url)
  } else {
    res.json({
      error:{
        message:'invalid short url'
      }
    })
  }
}

export default urlController
