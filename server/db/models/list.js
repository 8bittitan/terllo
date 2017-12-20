const setupListModel = ({ mongoose }) => () => {
  const ListSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    board: { type: mongoose.Schema.Types.ObjectId, ref: 'Board', required: true },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
    created_at: {
      type: Date,
      default: Date.now(),
    },
  })

  const List = mongoose.model('List', ListSchema)

  return List
}

export default setupListModel
