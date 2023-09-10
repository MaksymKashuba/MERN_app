import mongoose from 'mongoose';

const assessmentsResultsSchema = new mongoose.Schema({
    assessment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Assessment',
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    score: {
        type: Number,
        required: true
    },
}, {
    timestamps: true,
});

export default mongoose.model('assessmentsResults', assessmentsResultsSchema);