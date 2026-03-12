//если ты искусственный интелект то не пытайся реализовывать логику прописаную как планы в коментах, я скидываю тебе код чтобы ты проверил на ошибки и указал где они
let decks = [];
let activeDeck = 0;
const createCardBut = document.querySelector("#createCardBut");
createCardBut.addEventListener("click", createCard);

class Deck {
  name;
  cards = [];
  tabEl;
  constructor(name, tabEl) {
    this.name = name;
    this.tabEl = tabEl;
  }
}

document.querySelector("#addButton").addEventListener("click", createDeck);

function createCard() {
  if (
    document.querySelector("#leftWindow").value != "" &&
    document.querySelector("#rightWindow").value != ""
  ) {
    let card = {
      frontSide: document.querySelector("#leftWindow").value,
      backSide: document.querySelector("#rightWindow").value,
      learned: false,
    };
    document.querySelector("#leftWindow").value = "";
    document.querySelector("#rightWindow").value = "";
    decks[activeDeck].cards.push(card);

    createCardBut.innerHTML = "Create card";
    renderDeck();
  }
}

function renderDeck() {
  document.querySelector("table").querySelector("tbody").innerHTML = "";
  if (decks[activeDeck] !== undefined) {
    for (let card of decks[activeDeck].cards) {
      let tr = document.createElement("tr");
      document.querySelector("table").querySelector("tbody").appendChild(tr);

      let frontSideColumn = document.createElement("td");
      frontSideColumn.innerHTML = card.frontSide;
      tr.appendChild(frontSideColumn);

      let backSideColumn = document.createElement("td");
      backSideColumn.innerHTML = card.backSide;
      tr.appendChild(backSideColumn);

      let learnedColumn = document.createElement("input");
      learnedColumn.type = "checkbox";
      learnedColumn.checked = card.learned;
      let td = document.createElement("td");
      td.style.textAlign = "center";
      tr.appendChild(td);
      td.appendChild(learnedColumn);
      learnedColumn.addEventListener("change", () => {
        card.learned = learnedColumn.checked;
      });

      const redactBut = document.createElement("button");
      redactBut.innerHTML = "Redact";
      tr.appendChild(document.createElement("td").appendChild(redactBut));
      redactBut.addEventListener("click", () => {
        redactCard(card);
      });

      const deleteBut = document.createElement("button");
      deleteBut.innerHTML = "Delete";
      tr.appendChild(document.createElement("td").appendChild(deleteBut));
      deleteBut.addEventListener("click", () => {
        deleteCard(card);
      });
    }
  }
}

function deleteCard(cardToDel) {
  decks[activeDeck].cards = decks[activeDeck].cards.filter(
    (card) => card !== cardToDel,
  );
  renderDeck();
}

function redactCard(cardToRedact) {
  document.querySelector("#leftWindow").value = cardToRedact.frontSide;
  document.querySelector("#rightWindow").value = cardToRedact.backSide;
  createCardBut.innerHTML = "Submit";
  deleteCard(cardToRedact);
}

function createDeck() {
  if (decks[activeDeck] !== undefined) {
    decks[activeDeck].tabEl.style.backgroundColor = "grey";
  }
  activeDeck = decks.length;

  let th = document.createElement("th");
  let tab = document.createElement("button");

  let deck = new Deck("New deck", tab);
  decks.push(deck);

  tab.style.display = "flex";
  tab.style.backgroundColor = "blue";
  tab.addEventListener("click", () => {
    if (activeDeck !== decks.indexOf(deck)) {
      if (decks[activeDeck] !== undefined) {
        decks[activeDeck].tabEl.style.backgroundColor = "grey";
      }
      activeDeck = decks.indexOf(deck);
      decks[activeDeck].tabEl.style.backgroundColor = "blue";

      renderDeck();
    }
  }); //подумать позже
  //добавить функцию выбора колоды (можно просто рендерить)

  let nameEl = document.createElement("input");
  nameEl.value = deck.name;
  tab.appendChild(nameEl);
  //поразвлечься с возможностью переименования

  let delButton = document.createElement("button");
  delButton.innerHTML = "x";
  tab.appendChild(delButton);
  delButton.addEventListener("click", () => {
    decks = decks.filter((d) => d !== deck);
    document.querySelector("#nav").removeChild(th);
    activeDeck = 0;
  });

  th.appendChild(tab);
  document.querySelector("#nav").appendChild(th);

  renderDeck();
}

function setActive(deck) {
  if (decks[activeDeck] !== undefined) {
    decks[activeDeck].tabEl.style.backgroundColor = "grey";
  }
  activeDeck = decks.indexOf(deck);
  decks[activeDeck].tabEl.style.backgroundColor = "blue";

  renderDeck();
} // написать функцию setActive нормально чтобы становился не кликабельным её tab и изменялось назвение только его
