/**
 * "Ver na mesa" — protótipo de câmera + adesivo 2D.
 *
 * Isto NÃO é AR de verdade: não há detecção de superfície nem
 * profundidade. É a foto do prato composta sobre o vídeo ao vivo
 * da câmera, que o usuário posiciona e redimensiona manualmente.
 *
 * Requer HTTPS (ou localhost) e permissão de câmera do navegador.
 */

const video = document.getElementById("arVideo");
const sticker = document.getElementById("arSticker");
const scaleInput = document.getElementById("arScale");
const permissionPanel = document.getElementById("arPermission");
const permissionText = document.getElementById("arPermissionText");
const retryBtn = document.getElementById("arRetry");

let stream = null;
let position = { x: 0, y: 0 }; // offset from center, in px
let scale = Number(scaleInput.value) / 100;

initCamera();
initDrag();
initScale();

async function initCamera() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    showPermissionPanel(
      "Este navegador não tem suporte a câmera via web. Tente em um navegador mais recente."
    );
    return;
  }

  try {
    stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: { ideal: "environment" } },
      audio: false,
    });
    video.srcObject = stream;
    permissionPanel.hidden = true;
  } catch (err) {
    showPermissionPanel(
      "Não conseguimos acessar a câmera. Verifique as permissões do navegador e tente de novo."
    );
  }
}

function showPermissionPanel(message) {
  permissionText.textContent = message;
  permissionPanel.hidden = false;
}

retryBtn.addEventListener("click", initCamera);

/* ---------- Drag to reposition ---------- */
function initDrag() {
  let dragging = false;
  let startPointer = { x: 0, y: 0 };
  let startPosition = { x: 0, y: 0 };

  sticker.addEventListener("pointerdown", (e) => {
    dragging = true;
    sticker.setPointerCapture(e.pointerId);
    startPointer = { x: e.clientX, y: e.clientY };
    startPosition = { ...position };
  });

  sticker.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    position = {
      x: startPosition.x + (e.clientX - startPointer.x),
      y: startPosition.y + (e.clientY - startPointer.y),
    };
    applyTransform();
  });

  ["pointerup", "pointercancel"].forEach((evt) =>
    sticker.addEventListener(evt, () => {
      dragging = false;
    })
  );
}

/* ---------- Slider to resize ---------- */
function initScale() {
  scaleInput.addEventListener("input", () => {
    scale = Number(scaleInput.value) / 100;
    applyTransform();
  });
}

function applyTransform() {
  sticker.style.transform =
    `translate(-50%, -50%) translate(${position.x}px, ${position.y}px) scale(${scale})`;
}

/* ---------- Cleanup ---------- */
window.addEventListener("beforeunload", () => {
  if (stream) {
    stream.getTracks().forEach((track) => track.stop());
  }
});
