let deck = [];
const createCardBut = document.querySelector("#createCardBut");
createCardBut.addEventListener("click", createCard);

function createCard() {
  let card = {
    frontSide: document.querySelector("#leftWindow").value,
    backSide: document.querySelector("#rightWindow").value,
  };
  document.querySelector("#leftWindow").value = "";
  document.querySelector("#rightWindow").value = "";
  deck.push(card);
}
