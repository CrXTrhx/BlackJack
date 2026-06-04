let deck = [];
const tipos = ["H", "C", "S", "D"];
const especiales = ["K", "J", "Q", "A"];

let puntosPlayer = 0,
  puntosCpu = 0;

//Referencias dom

const btnPedir = document.querySelector("#btnPedir");
const btnDetener = document.querySelector("#btnDetener");
const btnNuevo = document.querySelector("#btnNuevo");
const smalls = document.querySelectorAll("small");
const cartasPlayer = document.querySelector("#jugador-cartas");
const cartasCpu = document.querySelector("#computadora-cartas");

const crearDeck = () => {
  for (let i = 2; i <= 10; i++) {
    for (let tipo of tipos) {
      deck.push(i + tipo);
    }
  }
  for (let tipo of tipos) {
    for (let esp of especiales) {
      deck.push(esp + tipo);
    }
  }
};

const mezclarDeck = () => {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
};

crearDeck();
mezclarDeck();

const pedirCarta = () => {
  if (deck === 0) {
    throw "No hay cartas en la baraja";
  }
  let carta = deck.pop();
  return carta;
};

const valorCarta = (carta) => {
  const valor = carta.substring(0, carta.length - 1);

  return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;
};
//turno compu

const turnoCpu = (puntosMinimos) => {
  do {
    const carta = pedirCarta();
    puntosCpu += valorCarta(carta);
    smalls[1].innerText = puntosCpu;
    const imgCarta = document.createElement("img");
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add("carta");
    cartasCpu.append(imgCarta);

    if (puntosMinimos > 21) {
      break;
    }
  } while (puntosCpu < puntosMinimos && puntosMinimos <= 21);

  setTimeout(() => {
    if (puntosCpu === puntosMinimos) {
      alert("Nadie gana");
    } else if (puntosMinimos > 21) {
      alert("La casa gana");
    } else if (puntosCpu > 21) {
      alert("Jugador gana");
    } else if (puntosMinimos > puntosCpu) {
      alert("Jugador gana");
    } else if (puntosMinimos < puntosCpu) {
      alert("La casa gana");
    }
  }, 500);
};

//Eventos

btnPedir.addEventListener("click", () => {
  const carta = pedirCarta();
  puntosPlayer += valorCarta(carta);
  smalls[0].innerText = puntosPlayer;
  const imgCarta = document.createElement("img");
  imgCarta.src = `assets/cartas/${carta}.png`;
  imgCarta.classList.add("carta");
  cartasPlayer.append(imgCarta);

  if (puntosPlayer > 21) {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoCpu(puntosPlayer);
  } else if (puntosPlayer === 21) {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoCpu(puntosPlayer);
  }
});

btnDetener.addEventListener("click", () => {
  btnPedir.disabled = true;
  btnDetener.disabled = true;

  turnoCpu(puntosPlayer);
});

btnNuevo.addEventListener("click", () => {

  btnPedir.disabled = false;
  btnDetener.disabled = false;

  puntosCpu = 0;
  puntosPlayer = 0;

  smalls[0].innerText = 0;
  smalls[1].innerText = 0;

  cartasCpu.innerHTML = '';
  cartasPlayer.innerHTML = '';

  deck = [];
  crearDeck();
  mezclarDeck();
});
