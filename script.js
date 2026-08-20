const yesBtn = document.getElementById('yes');
const noBtn = document.getElementById('no');
const answerEl = document.getElementById('answer');
const effectsEl = document.getElementById('effects');
const resetBtn = document.getElementById('reset');
const responseHistoryKey = 'yes-or-no-response-history';
const microsoftFormEndpoint = "https://forms.guest.usercontent.microsoft/formapi/api/9188040d-6c67-4c5b-b112-36a304b66dad/users/00000000-0000-0000-0003-bffd28363fba/forms('DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAO__Sg2P7pUM1U1N1JDOE1BWkZDVEZZWTJXSDZQVVozMS4u')/responses";
const microsoftFormQuestionId = 'r06ed52b0d86641bda1d2abae667dfadf';

function storeResponse(response){
  const history = JSON.parse(localStorage.getItem(responseHistoryKey) || '[]');
  history.push({ response, recordedAt: new Date().toISOString() });
  localStorage.setItem(responseHistoryKey, JSON.stringify(history));
}

function submitToMicrosoftForm(response){
  const submittedAt = new Date().toISOString();
  const answers = JSON.stringify([{ questionId: microsoftFormQuestionId, answer1: response }]);

  fetch(microsoftFormEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ startDate: submittedAt, submitDate: submittedAt, answers })
  }).catch(() => {
    // The local history remains available if the visitor is offline.
  });
}

function showResultEffect(text){
  effectsEl.replaceChildren();
  effectsEl.className = `effects ${text === 'Yes' ? 'effects-yes' : 'effects-no'}`;

  if(text === 'Yes'){
    for(let index = 0; index < 48; index += 1){
      const heart = document.createElement('span');
      heart.className = 'flying-heart';
      heart.textContent = '♥';
      heart.style.setProperty('--x', `${Math.random() * 100}%`);
      heart.style.setProperty('--delay', `${Math.random() * 1.2}s`);
      heart.style.setProperty('--duration', `${2.4 + Math.random() * 1.8}s`);
      heart.style.setProperty('--size', `${18 + Math.random() * 28}px`);
      heart.style.setProperty('--drift', `${-80 + Math.random() * 160}px`);
      effectsEl.appendChild(heart);
    }
  } else {
    const brokenHeart = document.createElement('span');
    brokenHeart.className = 'giant-broken-heart';
    brokenHeart.textContent = '💔';
    effectsEl.appendChild(brokenHeart);
  }
}

function showAnswer(text){
  answerEl.textContent = text;
  answerEl.classList.toggle('no', text === 'No');
  storeResponse(text);
  submitToMicrosoftForm(text);
  showResultEffect(text);
  // subtle pop animation
  answerEl.animate([
    { transform: 'scale(1)' },
    { transform: 'scale(1.06)' },
    { transform: 'scale(1)' }
  ], { duration: 420, easing: 'ease-out' });
  // disable buttons after answer
  yesBtn.disabled = true;
  noBtn.disabled = true;
  resetBtn.hidden = false;
}

function resetAnswer(){
  answerEl.textContent = '—';
  answerEl.classList.remove('no');
  storeResponse('Changed their mind');
  submitToMicrosoftForm('Changed their mind');
  effectsEl.replaceChildren();
  effectsEl.className = 'effects';
  yesBtn.disabled = false;
  noBtn.disabled = false;
  resetBtn.hidden = true;
}

yesBtn.addEventListener('click', ()=> showAnswer('Yes'));
noBtn.addEventListener('click', ()=> showAnswer('No'));
resetBtn.addEventListener('click', resetAnswer);
