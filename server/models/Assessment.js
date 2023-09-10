import mongoose from 'mongoose';

const assessmentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    questions: [
        {
            text: {
                type: String,
                required: true,
            },
            answers: [{
                right: {type: Boolean, required: true},
                text: {type: String, required: true}
            }],
        }
    ],
}, {
    timestamps: true,
});

export default mongoose.model('Assessment', assessmentSchema);