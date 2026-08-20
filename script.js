const yesBtn = document.getElementById('yes');
const noBtn = document.getElementById('no');
const answerEl = document.getElementById('answer');
const effectsEl = document.getElementById('effects');
const resetBtn = document.getElementById('reset');

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
  effectsEl.replaceChildren();
  effectsEl.className = 'effects';
  yesBtn.disabled = false;
  noBtn.disabled = false;
  resetBtn.hidden = true;
}

yesBtn.addEventListener('click', ()=> showAnswer('Yes'));
noBtn.addEventListener('click', ()=> showAnswer('No'));
resetBtn.addEventListener('click', resetAnswer);
