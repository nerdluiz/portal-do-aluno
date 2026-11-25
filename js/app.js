/* =========================================================
   NAVIGATION
   ========================================================= */
const viewTitles = {
  dashboard: "Início",
  carteirinha: "Carteirinha Digital",
  disciplinas: "Disciplinas & Notas",
  horarios: "Grade Horária"
};

function switchView(viewId) {
  document.querySelectorAll(".view").forEach(v => v.classList.remove("active"));
  const target = document.getElementById("view-" + viewId);
  if (target) target.classList.add("active");

  document.querySelectorAll("[data-view]").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.view === viewId);
  });

  document.getElementById("topbarTitle").textContent = viewTitles[viewId] || "Portal";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.querySelectorAll("[data-view]").forEach(btn => {
  btn.addEventListener("click", () => switchView(btn.dataset.view));
});

document.querySelectorAll("[data-goto]").forEach(btn => {
  btn.addEventListener("click", () => switchView(btn.dataset.goto));
});

document.getElementById("quickIdBtn").addEventListener("click", () => switchView("carteirinha"));

/* =========================================================
   THEME TOGGLE
   ========================================================= */
const savedTheme = localStorage.getItem("uninova-theme");
if (savedTheme) {
  document.documentElement.setAttribute("data-theme", savedTheme);
}

document.getElementById("themeToggle").addEventListener("click", () => {
  const html = document.documentElement;
  const isDark = html.getAttribute("data-theme") === "dark";
  const next = isDark ? "light" : "dark";
  html.setAttribute("data-theme", next);
  localStorage.setItem("uninova-theme", next);
  showToast(isDark ? "Tema claro ativado" : "Tema escuro ativado");
});

/* =========================================================
   CARTEIRINHA 3D FLIP & PRIVACY TOGGLE
   ========================================================= */
const idCard = document.getElementById("studentIdCard");
const flipCardBtn = document.getElementById("flipCardBtn");

function toggleFlip() {
  idCard.classList.toggle("is-flipped");
}

idCard.addEventListener("click", toggleFlip);
idCard.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    toggleFlip();
  }
});
flipCardBtn.addEventListener("click", toggleFlip);

let cpfVisible = false;
const privacyToggleBtn = document.getElementById("privacyToggleBtn");
const privacyLabel = document.getElementById("privacyLabel");

privacyToggleBtn.addEventListener("click", () => {
  cpfVisible = !cpfVisible;
  document.querySelectorAll("[data-sensitive]").forEach(el => {
    el.textContent = cpfVisible ? el.dataset.sensitive : el.dataset.masked;
  });
  privacyLabel.textContent = cpfVisible ? "Ocultar CPF" : "Mostrar CPF";
  if (!idCard.classList.contains("is-flipped")) {
    idCard.classList.add("is-flipped");
  }
});

/* =========================================================
   LIVE CLOCK & DYNAMIC ANTI-FRAUD TOKEN
   ========================================================= */
function updateClock() {
  const now = new Date();
  document.getElementById("liveClock").textContent = now.toLocaleTimeString("pt-BR");
}
updateClock();
setInterval(updateClock, 1000);

const tokenEl = document.getElementById("dynamicToken");
const tokenFill = document.getElementById("tokenFill");
let tokenSeconds = 30;

function generateToken() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const rand = (n) => Array.from({ length: n }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  tokenEl.textContent = `UNV-${rand(3)}-${rand(3)}`;
}

setInterval(() => {
  tokenSeconds--;
  if (tokenSeconds <= 0) {
    tokenSeconds = 30;
    generateToken();
  }
  tokenFill.style.width = `${(tokenSeconds / 30) * 100}%`;
}, 1000);

document.getElementById("copyCodeBtn").addEventListener("click", () => {
  navigator.clipboard?.writeText(tokenEl.textContent).catch(() => {});
  showToast(`Código ${tokenEl.textContent} copiado!`);
});

document.getElementById("walletBtn").addEventListener("click", () => {
  showToast("Carteirinha pronta para Apple / Google Wallet (simulação)");
});

document.getElementById("downloadPdfBtn").addEventListener("click", () => {
  showToast("Comprovante de matrícula gerado em PDF (simulação)");
});

/* =========================================================
   QR MODAL ("MODO CATRACA")
   ========================================================= */
const qrModal = document.getElementById("qrModal");
const openQrModal = () => qrModal.classList.add("open");
const closeQrModal = () => qrModal.classList.remove("open");

document.getElementById("openQrModalBtn").addEventListener("click", openQrModal);
document.getElementById("heroQrBtn").addEventListener("click", openQrModal);
document.getElementById("dashQrBtn").addEventListener("click", openQrModal);
document.getElementById("closeQrModalBtn").addEventListener("click", closeQrModal);

qrModal.addEventListener("click", (e) => {
  if (e.target === qrModal) closeQrModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeQrModal();
});

/* =========================================================
   SCHEDULE DATA
   ========================================================= */
const schedule = {
  seg: [
    { time: "19:00\n20:40", name: "Desenvolvimento Front-End", meta: "Prof. Henrique Costa • Lab Info 04", tag: "Lab" },
    { time: "20:55\n22:35", name: "Arquitetura de Informação", meta: "Profa. Beatriz Farias • Bloco A, Sala 201", tag: "Presencial" }
  ],
  ter: [
    { time: "19:00\n20:40", name: "Design de Interfaces II", meta: "Prof. Lucas Andrade • Bloco B, Sala 304", tag: "Hoje" },
    { time: "20:55\n22:35", name: "Pesquisa com Usuários (UX Research)", meta: "Profa. Camila Nogueira • Lab UX 02", tag: "Presencial" }
  ],
  qua: [
    { time: "19:00\n20:40", name: "Design de Interfaces II", meta: "Prof. Lucas Andrade • Lab Mac 01", tag: "Prática" },
    { time: "20:55\n22:35", name: "Desenvolvimento Front-End", meta: "Prof. Henrique Costa • Lab Info 04", tag: "Lab" }
  ],
  qui: [
    { time: "19:00\n20:40", name: "Arquitetura de Informação", meta: "Profa. Beatriz Farias • Bloco A, Sala 201", tag: "Presencial" }
  ],
  sex: [
    { time: "19:00\n21:30", name: "Projeto Integrador V (Mentoria)", meta: "Equipe Docente • Espaço Maker", tag: "Projeto" }
  ]
};

const scheduleContainer = document.getElementById("scheduleContainer");

function renderDay(day) {
  const items = schedule[day] || [];
  scheduleContainer.innerHTML = items.map(item => `
    <div class="class-item">
      <div class="class-time">${item.time.replace("\n", "<br/>")}</div>
      <div class="class-info">
        <strong>${item.name}</strong>
        <span>${item.meta}</span>
      </div>
      <span class="pill pill-brand">${item.tag}</span>
    </div>
  `).join("");
}

document.querySelectorAll(".day-tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".day-tab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    renderDay(tab.dataset.day);
  });
});

renderDay("ter");

/* =========================================================
   TOAST HELPER
   ========================================================= */
let toastTimer;

function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}
