import bcrypt from 'bcrypt'

const getUserOptions = (username, password) =>
  new Promise((resolve, reject) => {
    const options = {}

    if (username) {
      options.username = username
    }

    if (password) {
      bcrypt.hash(password, 10, async (err, hash) => {
        if (err) reject(err)

        options.password = hash

        resolve(options)
      })
    } else {
      resolve(options)
    }
  })

export default async (parent, { id, username, password }, { models: { User } }) => {
  try {
    const data = await getUserOptions(username, password)

    const user = await User.findOneAndUpdate({ _id: id }, { $set: data }, { new: true })

    const token = await user.generateToken()

    return {
      token,
    }
  } catch (err) {
    throw new Error(err)
  }
}
