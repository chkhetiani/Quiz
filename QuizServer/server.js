import express from 'express';
import cors from 'cors';

const questions = [
    {
        id: 1,
        question: "What is the capital of Chile?",
        answers: ["New York", "Santiago", "Tbilisi"],
    },
    {
        id: 2,
        question: "What is the smallest country in the world?",
        answers: ["Vatican City", "United States of America"],
    },
    {
        id: 3,
        question: "What is the largest country in the world?",
        answers: ["Russia", "China"],
    },
    {
        id: 4,
        question: "What is the capital of Georgia?",
        answers: ["Tbilisi", "Gori", "Kutaisi"],
    },
];

const answers = [1, 0, 0, 0];

const app = express();
app.use(cors());

const serverStarted = function () {
    console.log('server started');
}

const getQuestions = function (req, res) {
    return res.send(questions);
}

const submitQuiz = function (req, res) {
    const userAnswers = JSON.parse(req.query.answers);

    console.log(req.query.answers);
    console.log(userAnswers);

    let score = 0;

    for (let i = 0; i < userAnswers.length; i++) {
        const userAns = userAnswers[i];
        const answer = questions[i].answers[answers[i]];
        if (userAns === answer) {
            score++;
        }
    }

    return res.send({
        score: score
    });
}

app.get('/questions', getQuestions);
app.post('/submit', submitQuiz);

app.listen("3000", serverStarted);