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
let svara;
let input;

/**
 * Klárar leik. Birtir result og felur problem. Reiknar stig og birtir í result.
 */
function finish() {
  const text = `Þú svaraðir ${correct} rétt af ${total} spurningum og fékkst ${points} stig fyrir. Skráðu þig á stigatöfluna!`;

  // todo útfæra
  result = document.getElementsByClassName('result');
  result[0].classList.remove('result--hidden');

  problem = document.getElementsByClassName('problem');
  problem[0].classList.add('problem--hidden');
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
  // todo uppfæra tíma á síðu
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

  showQuestion();
}

/**
 * Event handler fyrir það þegar spurningu er svarað. Athugar hvort svar sé
 * rétt, hreinsar input og birtir nýja spurningu.
 *
 * @param {object} e Event þegar spurningu svarað
 */
function onSubmit(e) {
  e.preventDefault();

  // todo útfæra
  /*
  svara = document.getElementById('svar');
  svara.addEventListener('click', () => {
    console.log('clicke');
   // input = document.getElementById('input').value;
    //console.log(input);
  });

  svara = document.getElementsByClassName('svarButton');
  svara[0].addEventListener('click', () => {
    console.log("clicked");
    //input = document.getElementsByClassName('problem__input');
  });
  input = document.getElementsByClassName('problem__input');
  console.log(input[0].input);

  svara = document.querySelector('button');
  svara.addEventListener('click', () => {
    result = document.querySelector('input');
  });*/

  input = document.querySelector('input');

  input.addEventListener('click', () => {
    const svar = e;
    console.log(svar);
  });

  svara = document.getElementById('svar');
  svara.addEventListener('click', (e) => {
    //debugger
    console.log('clicke');
    showQuestion();
  });
  

}

/**
 * Event handler fyrir þegar stig eru skráð eftir leik.
 *
 * @param {*} e Event þegar stig eru skráð
 */
function onSubmitScore(e) {
  e.preventDefault();

  // todo útfæra

  //result.classList.add('result--hidden');
  //problem.classList.add('problem--hidden');
  //startButton.classList.remove('button--hidden');
}

/**
 * Finnur öll element DOM og setur upp event handlers.
 *
 * @param {number} _playTime Fjöldi sekúnda sem hver leikur er
 */
export default function init(_playTime) {
  playTime = _playTime;

  // todo útfæra

  // útfæra 'Byrja leik' takkann

  startButton = document.getElementById('startButton');
  startButton.addEventListener('click', () => {
    start();
  });

  /*
  startButton = document.querySelector('button');
  startButton.addEventListener('click', () => {
    start();
  });
  
  */

}
