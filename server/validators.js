import {body} from 'express-validator'

export const loginValidator = [
    body('email', 'Invalid email format').isEmail(),
    body('password', 'Password must be at least 5 characters').isLength({min: 5}),
];

export const registerValidator = [
    body('email', 'Invalid email format').isEmail(),
    body('password', 'Password must be at least 5 characters').isLength({min: 5}),
    body('username', 'Please enter a username (minimum 2 characters)').isLength({min: 2}),
];

export const createResultValidator = [
    body('assessmentId')
        .trim()
        .notEmpty()
        .withMessage('Assessment ID is required'),

    body('score')
        .trim()
        .notEmpty()
        .isNumeric()
        .withMessage('Score is required and must be a numeric value'),
];

export const createAssessmentValidator = [
    body('title')
        .trim()
        .notEmpty()
        .withMessage('Title is required'),
    body('description')
        .trim()
        .notEmpty()
        .withMessage('Description is required'),

    body('questions')
        .isArray()
        .withMessage('Questions must be an array')
        .custom((questions) => {
            if (!questions || questions.length < 1) {
                throw new Error('At least one question is required');
            }
            questions.forEach((question) => {
                if (!question) {
                    throw new Error('Question must not be empty');
                }
            });
            return true;
        }),
];

export const updateAssessmentValidator = [
    body('title')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Title cannot be empty'),

    body('description')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Description cannot be empty'),

    body('questions')
        .optional()
        .isArray()
        .withMessage('Questions must be an array')
        .custom((questions) => {
            if (questions) {
                if (questions.length < 1) {
                    throw new Error('At least one question is required');
                }
                questions.forEach((question) => {
                    if (!question) {
                        throw new Error('Question must not be empty');
                    }
                });
            }
            return true;
        }),
];
