import mongoose, { Schema } from "mongoose";

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        isEditable: {
            type: Boolean,
            default: true,
            required: false
        },
        icon: {
            id: String,
            name: String,
            symbol: String
        },
        color: {
            id: String,
            name: String,
            code: String
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    }
);

const Category = mongoose.model("Category", categorySchema);

export default Category;
