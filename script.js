
document.addEventListener("DOMContentLoaded", () => {

  const inicio = document.getElementById("inicio");
  const carta = document.getElementById("carta");
  const sorpresa = document.getElementById("sorpresa");

  const btnAbrir = document.getElementById("btnAbrir");
  const btnSorpresa = document.getElementById("btnSorpresa");
  const btnVolver = document.getElementById("btnVolver");

  const musica = document.getElementById("musica");
  const btnMusica = document.getElementById("btnMusica");

  const estrellas = document.getElementById("estrellas");
  const corazones = document.getElementById("corazones");

  const reducirMovimiento = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  musica.volume = 0.35;

  function mostrarPantalla(pantalla) {
    inicio.classList.add("oculto");
    carta.classList.add("oculto");
    sorpresa.classList.add("oculto");

    pantalla.classList.remove("oculto");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function actualizarBotonMusica() {
    btnMusica.textContent = musica.paused
      ? "🎵 Reproducir música"
      : "🎵 Pausar música";
  }

  async function reproducirMusica() {
    btnMusica.hidden = false;

    try {
      await musica.play();
    } catch (error) {
      console.log(
        "No se pudo reproducir la canción:",
        error
      );
    }

    actualizarBotonMusica();
  }

  btnAbrir.addEventListener("click", () => {
    mostrarPantalla(carta);
    reproducirMusica();
  });

  btnSorpresa.addEventListener("click", () => {
    mostrarPantalla(sorpresa);
    lluviaDeCorazones();
  });

  btnVolver.addEventListener("click", () => {
    mostrarPantalla(carta);
  });

  btnMusica.addEventListener("click", async () => {
    if (musica.paused) {
      await reproducirMusica();
    } else {
      musica.pause();
      actualizarBotonMusica();
    }
  });

  musica.addEventListener("pause", actualizarBotonMusica);
  musica.addEventListener("play", actualizarBotonMusica);

  // Crear cielo estrellado
  function crearEstrellas() {
    for (let i = 0; i < 110; i++) {
      const estrella = document.createElement("span");
      estrella.className = "estrella";

      estrella.style.left = Math.random() * 100 + "%";
      estrella.style.top = Math.random() * 100 + "%";

      estrella.style.animationDelay =
        Math.random() * 4 + "s";

      estrella.style.animationDuration =
        1 + Math.random() * 3 + "s";

      estrellas.appendChild(estrella);
    }
  }

  // Crear corazones flotantes
  function crearCorazon() {
    const corazon = document.createElement("span");
    corazon.className = "corazon";

    const simbolos = ["❤️", "💕", "💗", "💖", "✨"];
    corazon.textContent =
      simbolos[Math.floor(Math.random() * simbolos.length)];

    corazon.style.left = Math.random() * 100 + "%";
    corazon.style.fontSize =
      14 + Math.random() * 22 + "px";

    const duracion = 5 + Math.random() * 5;

    corazon.style.animationDuration = duracion + "s";
    corazones.appendChild(corazon);

    setTimeout(() => corazon.remove(), duracion * 1000);
  }

  // Sorpresa: lluvia de corazones
  function lluviaDeCorazones() {
    if (reducirMovimiento) return;

    for (let i = 0; i < 30; i++) {
      setTimeout(crearCorazon, i * 100);
    }
  }

  crearEstrellas();

  if (!reducirMovimiento) {
    setInterval(crearCorazon, 900);
  }

});
