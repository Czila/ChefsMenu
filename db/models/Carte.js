const {default:mongoose} = require("mongoose")

const menuSchema = new mongoose.Schema({
menus: [mongoose.Types.ObjectId],
plats: [mongoose.Types.ObjectId]

})

module.exports = mongoose.model("Menu", menuSchema) 