import express from 'express';
import cors from 'cors';
const questions = [
    {
        id: 1,
        question: "What is the capital of Chile?",
        answers: ["New York", "Santiago", "Tbilisi"],
        answer: 1
    },
    {
        id: 2,
        question: "What is the smallest country in the world?",
        answers: ["Vatican City", "United States of America"],
        answer: 0
    },
    {
        id: 3,
        question: "What is the largest country in the world?",
        answers: ["Russia", "China"],
        answer: 0
    }
]

const app = express();
app.use(cors());

const serverStarted = function () {
    console.log('server started');
}

const getQuestions = function (req, res) {
    return res.send(questions);
}

app.get('/questions', getQuestions);

app.listen("3000", serverStarted);