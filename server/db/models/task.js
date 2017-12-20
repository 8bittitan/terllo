const setupTaskModel = ({ mongoose }) => () => {
  const TaskSchema = new mongoose.Schema({
    text: String,
    listId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'List',
      required: true,
    },
    created_at: {
      type: Date,
      default: Date.now(),
    },
    completed: {
      type: Boolean,
      default: false,
    },
  })

  const Task = mongoose.model('Task', TaskSchema)

  return Task
}

export default setupTaskModel
