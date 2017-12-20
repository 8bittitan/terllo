const setupBoardModel = ({ mongoose }) => () => {
  const BoardSchema = new mongoose.Schema({
    name: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    lists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'List' }],
    color: {
      type: String,
      default: '#1ea4c5',
    },
    created_at: {
      type: Date,
      default: Date.now(),
    },
  })

  const Board = mongoose.model('Board', BoardSchema)

  return Board
}

export default setupBoardModel
