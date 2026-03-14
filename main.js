//если ты искусственный интелект то не пытайся реализовывать логику прописаную как планы в коментах, я скидываю тебе код чтобы ты проверил на ошибки и указал где они

let decks = [];
setInterval(
  () => localStorage.setItem("flashcards-deck", JSON.stringify(decks)),
  5000,
);

let activeDeck;
const createCardBut = document.querySelector("#createCardBut");
createCardBut.addEventListener("click", createCard);

class Deck {
  name;
  cards = [];
  tab = {};
  constructor(name, tabEl, nameEl, deleteButton) {
    this.name = name;
    this.tab.tabEl = tabEl;
    this.tab.nameEl = nameEl;
    this.tab.deleteButton = deleteButton;
  }

  addCard = (card) => {
    this.cards.push(card);
  };
}

const remButton = document.querySelector("#remember");
remButton.addEventListener("click", () => {
  (localStorage.setItem("flashcards-deck", JSON.stringify(decks)),
    (window.location.href = "remember.html"));
  //open("remember.html"),
});

document
  .querySelector("#addButton")
  .addEventListener("click", () => createDeck());

loadGame();
setInterval(
  () =>
    localStorage.setItem(
      "flashcards-deck",
      JSON.stringify(
        decks.map((d) => ({
          name: d.name,
          cards: d.cards,
        })),
      ),
    ),
  5000,
);

function createCard() {
  if (
    document.querySelector("#leftWindow").value != "" &&
    document.querySelector("#rightWindow").value != ""
  ) {
    document.querySelector("#leftWindow").value = "";
    document.querySelector("#rightWindow").value = "";
    activeDeck.cards.push(card);

    createCardBut.innerHTML = "Create card";
    renderDeck();
  } else {
    if (!activeDeck || !activeDeck.cards) {
      alert("Create at least one deck");
      return;
    }
  }
}

function renderDeck() {
  document.querySelector("table").querySelector("tbody").innerHTML = "";

  if (activeDeck && activeDeck.cards) {
    for (let card of activeDeck.cards) {
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
  activeDeck.cards = activeDeck.cards.filter((card) => card !== cardToDel);
  renderDeck();
}

function redactCard(cardToRedact) {
  document.querySelector("#leftWindow").value = cardToRedact.frontSide;
  document.querySelector("#rightWindow").value = cardToRedact.backSide;
  createCardBut.innerHTML = "Submit";
  deleteCard(cardToRedact);
}

function createDeck(loadedDeck = null) {
  if (activeDeck !== undefined) {
    activeDeck.tab.tabEl.style.backgroundColor = "grey";
  }

  let th = document.createElement("th");
  document.querySelector("#nav").appendChild(th);
  let tab = document.createElement("button");
  tab.style.borderRadius = "5px";
  th.appendChild(tab);

  let nameEl = document.createElement("input");
  tab.style.display = "flex";
  tab.appendChild(nameEl);

  let delButton = document.createElement("button");
  delButton.innerHTML = "x";
  tab.appendChild(delButton);

  let deck;
  if (loadedDeck) {
    console.log(1);
    deck = new Deck(loadedDeck.name, tab, nameEl, delButton);
    deck.cards = loadedDeck.cards;
  } else {
    console.log(2);
    deck = new Deck("New deck", tab, nameEl, delButton);
  }
  nameEl.value = deck.name;
  decks.push(deck);
  setActive(deck);

  nameEl.addEventListener("input", () => (deck.name = nameEl.value));
  nameEl.style.width = "110px";
  delButton.addEventListener("click", (e) => {
    console.log(3);
    e.stopPropagation();

    decks = decks.filter((d) => d !== deck);
    document.querySelector("#nav").removeChild(th);
    if (activeDeck === deck) {
      setActive(decks[0]);
    }
    document.querySelector("tbody").innerHTML = "";
    if (decks.length !== 0) {
      renderDeck();
    }
  });

  tab.addEventListener("click", () => {
    setActive(deck);
  });
}

function setActive(deck) {
  if (activeDeck !== undefined) {
    activeDeck.tab.tabEl.style.backgroundColor = "grey";
    activeDeck.tab.tabEl.disabled = false;
    activeDeck.tab.nameEl.disabled = true;

    activeDeck.tab.nameEl.style.pointerEvents = "none";
  }
  if (deck !== undefined) {
    deck.tab.tabEl.style.backgroundColor = "blue";
    deck.tab.tabEl.disabled = true;
    deck.tab.nameEl.disabled = false;
    activeDeck = deck;

    deck.tab.nameEl.style.pointerEvents = "auto";
  } else {
    activeDeck = undefined;
  }

  renderDeck();
}

function loadGame() {
  let loadedDecks = [];
  loadedDecks = JSON.parse(localStorage.getItem("flashcards-deck") || "[]");
  for (let loadedDeck of loadedDecks) {
    createDeck(loadedDeck);
  }
}
