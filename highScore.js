//SELECTORS 

const scoreList = document.querySelector('.highScores');
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

scoreList.innerHTML = highScores.map(score => {
    return (`<li class="scoreli">${score.name} - ${score.score}</li>`)
}).join("");

goHome = () => {
    window.location.assign('/')
}