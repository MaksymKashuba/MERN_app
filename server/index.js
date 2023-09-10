import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import checkAuth from './utils/checkAuth.js';
import * as Validators from './validators.js';
import * as UserController from './controllers/UserController.js'
import * as AssessmentController from './controllers/AssessmentController.js'
import handleValidationErrors from "./utils/handleValidationErrors.js";

mongoose.connect(
    'mongodb+srv://admin:123@cluster0.ox3vnbj.mongodb.net/assessments?retryWrites=true&w=majority')
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log('MongoDB error', err));

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('good');
});

app.post('/auth/login', Validators.loginValidator, handleValidationErrors, UserController.login);

app.post('/auth/register', Validators.registerValidator, handleValidationErrors, UserController.register);

app.get('/auth/profile', checkAuth, UserController.getProfile);

app.get('/assessments', checkAuth, AssessmentController.getAll);
app.get('/assessments/:id', checkAuth, AssessmentController.getOne);
app.post('/assessments', checkAuth, Validators.createAssessmentValidator, handleValidationErrors, AssessmentController.create);
app.delete('/assessments/:id', checkAuth, AssessmentController.remove);
app.patch('/assessments/:id', checkAuth, Validators.updateAssessmentValidator, handleValidationErrors, AssessmentController.update);
app.get('/assessments/:id/results', checkAuth, AssessmentController.getResults);
app.post('/assessments/:id', checkAuth, Validators.createResultValidator, handleValidationErrors, AssessmentController.sendResult);

app.listen(8000, (err) => {
    if (err) {
        console.log(err);
    }

    console.log('Server started');
});