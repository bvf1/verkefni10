// todo vísa í rétta hluti með import
import question from './question';

// allar breytur hér eru aðeins sýnilegar innan þessa módúl

let startButton; // takki sem byrjar leik
let problem; // element sem heldur utan um verkefni, sjá index.html
let result; // element sem heldur utan um niðurstöðu, sjá index.html

let playTime; // hversu lengi á að spila? Sent inn gegnum init()
let total = 0; // fjöldi spurninga í núverandi leik
let correct = 0; // fjöldi réttra svara í núverandi leik
let currentProblem; // spurning sem er verið að sýna
let newQuestion; // býr til nýja spurningu
let showTime; // sýnir tímann sem er eftir
let input;
let resultNos; // upplýsingar um leik

/**
 * Klárar leik. Birtir result og felur problem. Reiknar stig og birtir í result.
 */
function finish() {
  result = document.getElementsByClassName('result');
  result[0].classList.remove('result--hidden');

  problem = document.getElementsByClassName('problem');
  problem[0].classList.add('problem--hidden');

  const points = 0;
  const text = `Þú svaraðir ${correct} rétt af ${total} spurningum og fékkst ${points} stig fyrir. Skráðu þig á stigatöfluna!`;
  resultNos = document.getElementsByClassName('result__text');
  resultNos[0].textContent = text;

  // todo
  input = document.getElementById('name');
}

/**
 * Keyrir áfram leikinn. Telur niður eftir því hve langur leikur er og þegar
 * tími er búinn kallar í finish().
 *
 * Í staðinn fyrir að nota setInterval köllum við í setTimeout á sekúndu fresti.
 * Þurfum þá ekki að halda utan um id á intervali og skilum falli sem lokar
 * yfir fjölda sekúnda sem eftir er.
 *
 * @param {number} current Sekúndur eftir
 */
function tick(current) {
  showTime = document.getElementsByClassName('problem__timer');
  showTime[0].textContent = current;

  if (current <= 0) {
    return finish();
  }

  return () => {
    setTimeout(tick(current - 1), 1000);
  };
}

/**
 * Býr til nýja spurningu og sýnir undir .problem__question
 */
function showQuestion() {
  // todo útfæra
  total += 1;
  newQuestion = question();
  currentProblem = document.getElementsByClassName('problem__question');
  currentProblem[0].textContent = newQuestion.problem;
}

/**
 * Byrjar leik
 *
 * - Felur startButton og sýnir problem
 * - Núllstillir total og correct
 * - Kallar í fyrsta sinn í tick()
 * - Sýnir fyrstu spurningu
 */
function start() {
  // startButton = document.getElementById('startButton');

  startButton = document.getElementsByClassName('start button');
  startButton[0].classList.add('button--hidden');

  problem = document.getElementsByClassName('problem');
  problem[0].classList.remove('problem--hidden');

  total = 0; correct = 0;

  setTimeout(tick(playTime), 1000);

  // eslint-disable-next-line no-console
  console.log('takkin virkar ekki, þegar timinn er liðinn, birtist result');

  showQuestion();
}

/**
 * Event handler fyrir það þegar spurningu er svarað. Athugar hvort svar sé
 * rétt, hreinsar input og birtir nýja spurningu.
 *
 * @param {object} e Event þegar spurningu svarað
 */
// eslint-disable-next-line no-unused-vars
function onSubmit(e) {
  e.preventDefault();

  input = e.target.querySelector('.problem__input');
  /*
  input[0].addEventlistener('submit', () => {
    console.log()
  });

  input[0].value = '';

  console.log(input[0].value);
  */
}

/**
 * Event handler fyrir þegar stig eru skráð eftir leik.
 *
 * @param {*} e Event þegar stig eru skráð
 */
// eslint-disable-next-line no-unused-vars
function onSubmitScore(e) {
  e.preventDefault();

  // todo útfæra

  result.classList.add('result--hidden');
  problem.classList.add('problem--hidden');
  startButton.classList.remove('button--hidden');
}

/**
 * Finnur öll element DOM og setur upp event handlers.
 *
 * @param {number} _playTime Fjöldi sekúnda sem hver leikur er
 */
export default function init(_playTime) {
  playTime = _playTime;

  startButton = document.querySelector('.start');
  startButton.addEventListener('click', () => {
    start();
  });
}
