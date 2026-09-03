/**
 * Protótipo — catálogo de pratos.
 *
 * A ideia: quando o cliente "pede" o prato, o sistema não gera nada
 * novo — ele busca a foto correspondente no catálogo e a exibe.
 * O pequeno atraso e a animação de "scan" só simulam uma consulta
 * em tempo real; a imagem já existe de antemão (ver README).
 */

const card = document.getElementById("dishCard");
const preview = document.getElementById("preview");
const status = document.getElementById("previewStatus");

const LOOKUP_DELAY_MS = 500;

card.addEventListener("click", () => {
  const alreadyOpen = card.getAttribute("aria-expanded") === "true";

  if (alreadyOpen) {
    closePreview();
    return;
  }

  openPreview();
});

function openPreview() {
  card.setAttribute("aria-expanded", "true");
  card.querySelector(".dish-card__cta").textContent = "Ocultar";

  preview.hidden = false;
  preview.classList.add("is-loading");
  preview.classList.remove("is-ready");
  status.textContent = "Preparando visualização…";

  window.setTimeout(() => {
    preview.classList.remove("is-loading");
    preview.classList.add("is-ready");
    status.textContent = "Prato confirmado no catálogo.";
  }, LOOKUP_DELAY_MS);
}

function closePreview() {
  card.setAttribute("aria-expanded", "false");
  card.querySelector(".dish-card__cta").textContent = "Pedir";
  preview.classList.remove("is-ready", "is-loading");
  preview.hidden = true;
}
