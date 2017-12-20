const setupUserModel = ({
  mongoose, bcrypt, jwt, JWT_SECRET,
}) => () => {
  const UserSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: String,
    boards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Board' }],
  })

  UserSchema.pre('save', function saveUser(next) {
    if (!this.isModified('password')) return next()

    bcrypt.hash(this.password, 10, (err, hash) => {
      if (err) return next(err)

      this.password = hash
      return next()
    })
  })

  UserSchema.methods.comparePassword = function comparePassword(password) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, this.password, (err, isMatch) => {
        if (err) {
          reject(err)
        }

        if (!isMatch) {
          reject(new Error('Password incorrect'))
        }

        resolve()
      })
    })
  }

  UserSchema.methods.generateToken = function generateToken() {
    return new Promise((resolve) => {
      resolve(jwt.sign({ _id: this._id, username: this.username }, JWT_SECRET, { expiresIn: '100h' }))
    })
  }

  UserSchema.methods.verifyToken = async function verifyToken({ token }) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, JWT_SECRET, (err) => {
        if (err) {
          reject(err)
        }

        resolve()
      })
    })
  }

  const User = mongoose.model('User', UserSchema)

  return User
}

export default setupUserModel
