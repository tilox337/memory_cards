class Deck {
  constructor(name, tabEl, nameEl) {
    this.name = name;
    this.cards = [];
    this.tab = { tabEl, nameEl };
  }
}

let decks = [];
let activeDeck;

loadGame();

document.querySelector("#GoBack").addEventListener("click", () => {
  saveGame();
  window.location.href = "index.html";
});

setInterval(saveGame, 5000);

function saveGame() {
  const dataToSave = decks.map((d) => ({ name: d.name, cards: d.cards }));
  localStorage.setItem("flashcards-deck", JSON.stringify(dataToSave));
}

function createDeck(loadedDeck = null) {
  let th = document.createElement("th");
  document.querySelector("#nav").appendChild(th);

  let tab = document.createElement("button");
  th.appendChild(tab);

  let nameEl = document.createElement("input");
  nameEl.value = loadedDeck ? loadedDeck.name : "Новая колода";
  tab.style.display = "flex";
  tab.appendChild(nameEl);

  let deck = new Deck(nameEl.value, tab, nameEl);
  if (loadedDeck) deck.cards = loadedDeck.cards;

  decks.push(deck);

  nameEl.addEventListener("input", () => {
    deck.name = nameEl.value;
  });

  tab.addEventListener("click", (e) => {
    if (e.target === nameEl) return;
    setActive(deck);
  });

  setActive(deck);
}

function setActive(deck) {
  if (activeDeck) {
    activeDeck.tab.tabEl.style.backgroundColor = "";
    activeDeck.tab.tabEl.disabled = false;
    activeDeck.tab.nameEl.disabled = true;
    activeDeck.tab.nameEl.style.pointerEvents = "none";
  }

  activeDeck = deck;
  deck.tab.tabEl.style.backgroundColor = "blue";
  deck.tab.tabEl.disabled = true;
  deck.tab.nameEl.disabled = false;
  deck.tab.nameEl.style.pointerEvents = "auto";

  renderCard(deck.cards[0] || null);
}

function loadGame() {
  let loadedDecks = JSON.parse(localStorage.getItem("flashcards-deck") || "[]");
  if (loadedDecks.length === 0) {
  } else {
    loadedDecks.forEach((d) => createDeck(d));
  }
}

function renderCard(card) {
  let div = document.querySelector("#card");
  let navi = document.querySelector("#navi");
  div.innerHTML = "";
  navi.innerHTML = "";

  if (!card) {
    div.innerHTML = "This deck is empty";
    div.disabled = true;
    div.onclick = null;
    return;
  }

  let side = 0;
  div.innerText = card.frontSide;

  div.onclick = () => {
    side = (side + 1) % 2;
    div.innerText = side ? card.backSide : card.frontSide;
  };

  navigation(card);
}

function navigation(card) {
  let navi = document.querySelector("#navi");
  navi.innerHTML = "";

  let currentIndex = activeDeck.cards.indexOf(card);

  let back = document.createElement("button");
  back.innerHTML = "<-";
  back.addEventListener("click", () => {
    renderCard(
      activeDeck.cards[
        (currentIndex - 1 + activeDeck.cards.length) % activeDeck.cards.length
      ],
    );
  });

  let learnedLabel = document.createElement("label");
  let learned = document.createElement("input");
  learned.type = "checkbox";
  learned.checked = card.learned || false;
  learned.addEventListener("change", () => {
    card.learned = learned.checked;
  });
  learnedLabel.append(learned, " Изучено");

  let forward = document.createElement("button");
  forward.innerHTML = "->";
  forward.addEventListener("click", () => {
    renderCard(activeDeck.cards[(currentIndex + 1) % activeDeck.cards.length]);
  });

  navi.append(back, learnedLabel, forward);
}
