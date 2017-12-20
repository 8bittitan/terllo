export const signup = async (parent, { username, password }, { models: { User } }) => {
  try {
    const user = new User({ username, password })

    await user.save()
    const token = await user.generateToken()

    return {
      token,
    }
  } catch (err) {
    throw new Error(err.message)
  }
}

export const login = async (parent, { username, password }, { models: { User } }) => {
  try {
    const user = await User.findOne({ username })
      .populate('boards')
      .exec()

    await user.comparePassword(password)
    const token = await user.generateToken()

    return { token, boards: user.boards }
  } catch (err) {
    throw new Error(err)
  }
}

export const setUser = (parent, { token }, { jwt, config }) => {
  try {
    const data = jwt.verify(token, config.JWT_SECRET)
    const user = jwt.sign({ _id: data._id, username: data.username }, config.JWT_SECRET)

    return { token: user }
  } catch (err) {
    throw new Error(err.message)
  }
}
