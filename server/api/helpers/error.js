//catch 404 and forward it to error handle middleware function
export const catch404 = (req, res, next) => {
  const err = new Error("Not Found")
  err.status = 404
  next(err)
}

// error handling middleware function
export const handleError = (err, req, res, next) => {
  res.status(err.status || 500).json({
    error: {
      message: err.message
    }
  })
  if (process.env.NODE_ENV === "dev") console.log(`error: ${err.message}`)
}
