import { Schema, model } from "mongoose";

const citaSchema = Schema({

    pet: {
        type: Schema.Types.ObjectId,
        ref: 'pet',
        required: true,
    },
    date: {
        type: String,
        default: () => {
            const current = new Date();
            return current.toISOString().slice(0, 16).replace("T", " ");
        }
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    status: {
        type: Boolean,
        default: true,
    }
}, {
    timestamps: true,
    versionKey: false
})

export default model('Cita', citaSchema);