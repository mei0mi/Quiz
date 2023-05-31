//SELECTORS 
const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const scores = document.querySelector('.addScore');
const questionCounterText = document.querySelector('.addQuestion');
const loader = document.querySelector('.loader')
const game = document.querySelector('#game')

//VARIABELS 

let currentQuestion = {};
let acceptingAnswer = false;
let score = 0; 
let questionCounter = 0;
let availableQuestions = [];


let questions = [];

fetch('https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple')
   .then(res => {return res.json()})
   .then(loadedQuestion => {
    questions = loadedQuestion.results.map((loadedQuestion) => {
        const formattedQuestion = {
            question: loadedQuestion.question,
        }

        const answerChoices = [...loadedQuestion.incorrect_answers];
        formattedQuestion.answer = (Math.floor(Math.random() * 3) + 1)
        answerChoices.splice(formattedQuestion.answer - 1, 0, loadedQuestion.correct_answer);

        answerChoices.forEach((choice,index) => {
            formattedQuestion['choice'+ (index + 1)] = choice;
        })

        return formattedQuestion;
    });
    game.classList.remove('hidden')
    loader.classList.add('hidden')
    startGame()
})
    .catch(error => {
        console.log(error)
    });


//CONSTANT 

let CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

//FUNCTIONS 

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    nextQuestion();
}

nextQuestion = () => {


    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score);
        //GO TO THE END PAGE
        return window.location.assign('/end.html');
    };

    questionCounter ++;
    questionCounterText.innerHTML = questionCounter + '/' + MAX_QUESTIONS;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex]
    question.innerText = currentQuestion.question;

    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice'+ number]
    })


    availableQuestions.splice(questionIndex, 1)

    acceptingAnswer = true;
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswer) return;


        acceptingAnswer = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset.number;

        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        selectedChoice.classList.add(classToApply);

        if(classToApply === 'correct'){
            incrementScore(CORRECT_BONUS);
        }
        
        //WAIT FOR THE CORRECT ANSWER TO SHOW THEN MOVE ON TO THE NEXT QUESTION
        setTimeout(() => {
            selectedChoice.classList.remove(classToApply);
            nextQuestion()
        }, 1100)
    
    })
})

incrementScore = num => {
    score += num
    scores.innerText = score;
}

