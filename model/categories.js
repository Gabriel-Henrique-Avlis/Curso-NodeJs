const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema ({
    categId: { type: Number, required: true, unique: true},
    name: { type: String, required: true},
    created: { type: Date, default: Date.now}
});

module.exports = mongoose.model("Category", CategorySchema);