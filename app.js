const pop = document.querySelector('.pop');
const gameBlock = document.querySelectorAll('.memory-game .game-block');
gameBlock.forEach((block) => {
  block.style.height = `${block.clientWidth}px`;
});
document.body.onresize = () => {
  gameBlock.forEach((block) => {
    block.style.height = `${block.clientWidth}px`;
  });
};

const fronts = document.querySelectorAll('.memory-game .game-block .front');
fronts.forEach((front) => {
  front.innerText = `?`;
});
let wrong = 0;
gameBlock.forEach((block) => {
  block.addEventListener('click', () => {
    let isTurn = document.querySelectorAll('.is-turn');
    if (isTurn.length == 0) {
      block.classList.add('is-turn');
    } else {
      let isTurnSrc = isTurn[0].children[1].children[0].src;
      let blockSrc = block.children[1].children[0].src;
      if (isTurnSrc == blockSrc) {
        isTurn[0].classList.remove('is-turn');
        isTurn[0].classList.add('done');
        block.classList.add('done');
      } else {
        wrong++;
        gameBlock.forEach((e) => {
          e.style.cssText += 'pointer-events: none';
        });
        block.classList.add('is-turn');
        setTimeout(() => {
          isTurn[0].classList.remove('is-turn');
          block.classList.remove('is-turn');
          gameBlock.forEach((e) => {
            e.style.cssText += 'pointer-events: all';
          });
        }, 1000);
      }
    }
    let triys = document.querySelector('.tries span');
    triys.innerText = wrong;
    let done = document.querySelectorAll('.memory-game .done');
    if (done.length == gameBlock.length) {
      document.querySelector('.overlay').style.transform = 'scale(1)'
      pop.style.transform = 'translate(-50%, -50%) scale(1)';
      pop.addEventListener('click', () => {
        window.location.reload();
      });
    }
  });
});
let blocksArray = Array.from(gameBlock);
let orderRange = Array.from(Array(gameBlock.length).keys());
let myOrder = shuffle(orderRange);
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}
gameBlock.forEach((block, ind) => {
  block.style.order = myOrder[ind];
});


