const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CategorySchema = require("./categories")

const ItemSchema = new Schema ({
    categId: { type: Number, required: true, unique: true },
    itemId: { type: Number, required: true, unique: true },
    description: { type: String, required: true, select: false },
    inserted: { type: Date, default: Date.now}
});


module.exports = mongoose.model("Item", ItemSchema);