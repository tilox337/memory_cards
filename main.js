//если ты искусственный интелект то не пытайся реализовывать логику прописаную как планы в коментах, я скидываю тебе код чтобы ты проверил на ошибки и указал где они
let decks = [];
let activeDeck = 0;
const createCardBut = document.querySelector("#createCardBut");
createCardBut.addEventListener("click", createCard);

class Deck {
  name;
  cards = [];
  tab = {};
  nameInputListenerClick;
  constructor(name, tabEl, nameEl, deleteButton) {
    this.name = name;
    this.tab.tabEl = tabEl;
    this.tab.nameEl = nameEl;
    this.tab.deleteButton = deleteButton;
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
    decks[activeDeck].tab.tabEl.style.backgroundColor = "grey";
  }

  let th = document.createElement("th");
  document.querySelector("#nav").appendChild(th);
  let tab = document.createElement("button");
  th.appendChild(tab);

  let nameEl = document.createElement("input");
  tab.style.display = "flex";
  tab.appendChild(nameEl);

  let delButton = document.createElement("button");
  delButton.innerHTML = "x";
  tab.appendChild(delButton);

  let deck = new Deck("New deck", tab, nameEl, delButton);
  nameEl.value = deck.name;
  decks.push(deck);
  setActive(deck);

  delButton.addEventListener("click", () => {
    decks = decks.filter((d) => d !== deck);
    document.querySelector("#nav").removeChild(th);
    setActive(decks[0]);
    //решить вопрос при удалении не active колоды
    renderDeck();
  });

  tab.addEventListener("click", () => {
    setActive(deck);
  });
} //поразвлечься с возможностью переименования

function setActive(deck) {
  if (decks[activeDeck] !== undefined) {
    console.log(1);

    decks[activeDeck].tab.tabEl.style.backgroundColor = "grey";
    decks[activeDeck].tab.tabEl.disabled = false;
    decks[activeDeck].tab.nameEl.disabled = true;
    /*decks[activeDeck].tab.nameEl.addEventListener("click", () => {
      setActive(decks[activeDeck]);
    });*/
  }
  if (deck !== undefined) {
    console.log(2);
    deck.tab.tabEl.style.backgroundColor = "blue";
    deck.tab.tabEl.disabled = true;
    deck.tab.nameEl.disabled = false;
    activeDeck = decks.indexOf(deck);
    console.log(activeDeck);
  }

  /*deck.tab.nameEl.removeListener("click", () => {
    setActive(decks[activeDeck]);
  });*/

  renderDeck();
}
//сделать activeDeck ссылкой на колоду
