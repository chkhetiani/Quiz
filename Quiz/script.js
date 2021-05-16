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

function drawQuestions() {
    const q = document.querySelector('#questions');

    for (let question of questions) {
        const qE = createQuestion(question);
        q.innerHTML += qE;
    }
}

function createQuestion(question) {
    let choices = '';
    for (let choice of question.answers) {
        choices += `
            <div>
                <input id="${removeSpaces(choice)}-${question.id}" type="radio" value="${choice}" name="q-${question.id}">
                <label id="label-${removeSpaces(choice)}-${question.id}" for="${removeSpaces(choice)}-${question.id}">${choice}</label>
            </div>
        `;
    }

    return `
        <div>
            <h2>${question.question}</h2>
            <div>
                ${choices}
            </div>
        </div>
    `;
}

function submitAnswers() {

    let score = 0;

    disableInputs();

    for (let question of questions) {
        const name = 'q-' + question.id;
        const elem = document.querySelector(`input[name="${name}"]:checked`);
        const userChoice = elem.value;
        const answer = question.answers[question.answer];

        markQuestion(userChoice, answer, question.id);

        if (userChoice === answer) {
            score++;
        }
    }

    document.querySelector('#result').innerText = score;
}

function disableInputs() {
    const inputs = document.querySelectorAll('input[type="radio"]');
    for (const input of inputs) {
        input.setAttribute('disabled', 'true');
    }
}

function markQuestion(userChoice, answer, questionId) {
    const label = document.querySelector(`#label-${removeSpaces(userChoice)}-${questionId}`);
    label.style.color = 'red';

    const ansLabel = document.querySelector(`#label-${removeSpaces(answer)}-${questionId}`);
    ansLabel.style.color = 'green';
}

function removeSpaces(str) {
    return str.replaceAll(' ', '_');
}

function resetQuiz() {
    document.querySelector('#questions').innerHTML = '';
    document.querySelector('#result').innerHTML = ''
    drawQuestions();
}

drawQuestions();