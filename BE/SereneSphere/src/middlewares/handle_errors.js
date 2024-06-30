import createError from 'handle-errors'

export const badRequest = (err, res) => {
  const error = createError.badRequest(err)
  return res.status(error.status).json({
    err: 1,
    message: error.message
  })
}

// export const unAuth = (err, res) => {
//     const error = createError.Unauthorizated(err)
//     return res.status(error.status).json({
//       err: 1,
//       message: error.message
//     })
//   }