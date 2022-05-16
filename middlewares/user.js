const {User} = require('../models')


exports.getUserById = async (req ,res, next) => {
    try {
    const {userId} = req.body;
    const user = await User.findAll({
      where: {id: userId ?? 0}
    })
    if(!user) {
      createError('User not found', 400)
    }
    next()
    } catch (err) {
        next(err)
    }
}