// copied from ajarn, modifications in other files?
// incomplete?

exports.updateTodo = async (req, res, next) => {
    try {
        const {id} = req.params
        const {title, completed, dueDate, userId} = req.body
        const newValue = {}
        // if (!title) {
        //     newValue.title = title
        // }
        // if (!completed) {
        //     newValue.completed = completed
        // }
        // if (!dueDate) {
        //     newValue.dueDate = dueDate
        // }
        const result = await Todo.update({title, completed, dueDate}, {where: {id, userId}})
        if (result[0] === 0) {
            createError('todo with this id is not found', 400);
        }
        res.json({message: 'update todo success'})
    } catch (err) {
        next(err)
    }
}

exports.deleteTodo = async (req, res, next) => {
    try {
        const {id} = req.params;
        const {userId} = req.body;
        const result = await Todo.destroy({where:{id:id, userId:userId}})
        if (result === 0) {
            createError('todo with this id is not found', 400);
        }
        res.status(204).json
    } catch (err) {
        next(err)
    }
}