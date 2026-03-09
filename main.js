let decks = [];

function createDeck() {
  document.querySelector("#rightWindow");
  let card = {
    frontSide: document.querySelector("#leftWindow").value,
    backSide: document.querySelector("#leftWindow").value,
  };
  decks.push(card);
}
