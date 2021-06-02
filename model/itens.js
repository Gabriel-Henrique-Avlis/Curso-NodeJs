const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CategorySchema = require("./categories")

const ItemSchema = new Schema ({
    categId: { type: Number, required: true},
    itemId: { type: Number, required: true},
    description: { type: String, required: true},
    expend: { type: Number, required: true },
    inserted: { type: Date, default: Date.now}
});

ItemSchema.index({categId: 1, itemId: 1}, { unique:true })

module.exports = mongoose.model("Item", ItemSchema);