//SELECTORS 

const username = document.querySelector('.input-user');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const totalScore = document.querySelector('.totalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

const MAX_HIGH_SCORE = 5;

totalScore.innerText = mostRecentScore;

username.addEventListener('keyup', () => {
   saveScoreBtn.disabled = !username.value; 

})

saveHighScore = (e) => {
    e.preventDefault();

    const score = {
        name: username.value,
        score: mostRecentScore
    }

    highScores.push(score);
    highScores.sort((a,b) => b.score - a.score);
    highScores.splice(5)

    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.assign('/');
}


