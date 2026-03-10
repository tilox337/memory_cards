let deck = [];
const createCardBut = document.querySelector("#createCardBut");
createCardBut.addEventListener("click", createCard);

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
    deck.push(card);

    createCardBut.innerHTML = "Create card";
    renderDeck();
  }
}

function renderDeck() {
  document.querySelector("table").querySelector("tbody").innerHTML = "";
  for (let card of deck) {
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

function deleteCard(cardToDel) {
  deck = deck.filter((card) => card !== cardToDel);
  renderDeck();
}

function redactCard(cardToRedact) {
  document.querySelector("#leftWindow").value = cardToRedact.frontSide;
  document.querySelector("#rightWindow").value = cardToRedact.backSide;
  createCardBut.innerHTML = "Submit";
  deleteCard(cardToRedact);
}
