import AssessmentModel from '../models/Assessment.js';
import AssessmentsResultsModel from "../models/AssessmentsResults.js";

export const getAll = async (req, res) => {
    try {
        const assessments = await AssessmentModel.find().populate('user').exec();
        res.json(assessments);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Internal server error'
        })
    }
};

export const getOne = async (req, res) => {
    try {
        const assessmentId = req.params.id;
        const assessment = await AssessmentModel.findById(assessmentId).populate('user').exec();
        if (!assessment) {
            return res.status(404).json({
                message: 'Assessment is not found'
            })
        }
        res.json(assessment);
    } catch (err) {
        console.log(err);
        res.status(404).json({
            message: 'Assessment is not found'
        })
    }
};

export const remove = async (req, res) => {
    try {
        const assessmentId = req.params.id;
        const assessment = await AssessmentModel.findOneAndRemove({_id: assessmentId});
        if (!assessment) {
            return res.status(404).json({
                message: 'Assessment is not found'
            });
        }
        res.json({
            success: true
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Deletion failed'
        });
    }
};

export const create = async (req, res) => {
    try {
        const doc = new AssessmentModel({
            title: req.body.title,
            description: req.body.description,
            questions: req.body.questions,
            user: req.userId,
        });

        const assessment = await doc.save();

        res.json(assessment);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Assessment creation failed'
        });
    }
}

export const update = async (req, res) => {
    try {
        const assessmentId = req.params.id;
        await AssessmentModel.updateOne(
            {
                _id: assessmentId
            },
            {
                title: req.body.title,
                description: req.body.description,
                questions: req.body.questions,
            }
        );
        res.json({
            success: true
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Updating failed'
        });
    }
};

export const getResults = async (req, res) => {
    try {
        const assessmentId = req.params.id;
        const assessmentResults = await AssessmentsResultsModel.find({assessment: assessmentId}).populate('user').exec();
        if (!assessmentResults) {
            return res.status(404).json({
                message: 'Assessment is not found or results is empty'
            });
        }
        res.json(assessmentResults);
    } catch (err) {
        console.log(err);
        res.status(404).json({
            message: 'Assessment is not found'
        })
    }
};

export const sendResult = async (req, res) => {
    try {
        const assessmentId = req.params.id;
        const assessment = await AssessmentModel.findById(assessmentId);
        if (!assessment) {
            return res.status(404).json({
                message: 'Assessment is not found'
            });
        }
        const score = parseInt(req.body.score);
        const doc = new AssessmentsResultsModel({
            assessment: req.body.assessmentId,
            user: req.userId,
            score
        });

        const result = await doc.save();

        res.json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Internal server error'
        })
    }
};