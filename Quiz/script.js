let questions = [];

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

    let userChoices = [];

    for (let question of questions) {
        const name = 'q-' + question.id;
        const elem = document.querySelector(`input[name="${name}"]:checked`);
        const userChoice = elem.value;
        userChoices.push(userChoice);

        // const answer = question.answers[question.answer];

        // markQuestion(userChoice, answer, question.id);

        // if (userChoice === answer) {
        //     score++;
        // }
    }

    fetch('http://95.104.80.6:3001/submit?answers=' + JSON.stringify(userChoices), {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(score => document.querySelector('#result').innerText = score.score);
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


fetch('http://95.104.80.6:3001/questions')
    .then(response => response.json())
    .then(data => {
        questions = data;
        drawQuestions();
    });