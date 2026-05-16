/**
 * Proje vitrinı — video linklerini buradan güncelleyin.
 *
 * YouTube: videoId → 11 haneli ID veya tam link (youtu.be / watch?v=)
 * LinkedIn: gönderi → ⋯ → "Gönderiyi yerleştir" → iframe src → embedUrl
 */
const YOUTUBE_CHANNEL = ""; // örn. "https://www.youtube.com/@kanaladiniz"

const PROJECT_SHOWCASE = [
  {
    title: "ArenaX",
    description:
      "Freelance iOS full-stack uygulama — yakında App Store’da. Harita ve konum tabanlı özellikler, Firebase, StoreKit 2 ve Google AdMob. MVVM ve Repository Pattern.",
    tags: ["SwiftUI", "Firebase", "StoreKit 2", "MapKit", "MVVM"],
    video: { type: "youtube", videoId: "" },
    links: [{ label: "GitHub", url: "https://github.com/Yarenunal" }],
  },
  {
    title: "NotasyonApp",
    description:
      "Lisans bitirme projesi: MP3 yükleyip nota, MusicXML ve PDF üretir. Flutter arayüz; FastAPI, Redis/RQ, librosa, music21 ve MuseScore pipeline.",
    tags: ["Flutter", "FastAPI", "Redis", "librosa", "music21"],
    video: { type: "youtube", videoId: "" },
    links: [{ label: "GitHub", url: "https://github.com/Yarenunal" }],
  },
  {
    title: "TakasApp",
    description:
      "Full-stack takas uygulaması. Flutter (MVVM); Flask, PostgreSQL, JWT/OTP, Docker ve Redis.",
    tags: ["Flutter", "Flask", "PostgreSQL", "JWT", "Docker"],
    video: { type: "youtube", videoId: "" },
    links: [{ label: "GitHub", url: "https://github.com/Yarenunal" }],
  },
  {
    title: "e-Ticaret iOS Klonu",
    description:
      "SwiftUI e-ticaret uygulaması. Node.js (Express), PostgreSQL, Redis, RabbitMQ, Docker ve CI/CD.",
    tags: ["SwiftUI", "Node.js", "PostgreSQL", "RabbitMQ", "Docker"],
    video: { type: "youtube", videoId: "" },
    links: [{ label: "GitHub", url: "https://github.com/Yarenunal" }],
  },
  {
    title: "SQL ChatBot",
    description:
      "Doğal dil ile SQL sorgulama. LangChain, Ollama, PostgreSQL, Redis ve FastAPI — ANKAREF staj projesi.",
    tags: ["Python", "LangChain", "FastAPI", "LLM", "NLP"],
    video: { type: "youtube", videoId: "" },
    links: [{ label: "GitHub", url: "https://github.com/Yarenunal" }],
  },
  {
    title: "Ehliyet Quiz App",
    description:
      "Ehliyet çıkmış sorular için iOS quiz. SwiftUI arayüz ve CoreData ile çevrimdışı soru bankası.",
    tags: ["SwiftUI", "CoreData", "iOS"],
    video: { type: "youtube", videoId: "" },
    links: [{ label: "GitHub", url: "https://github.com/Yarenunal" }],
  },
  {
    title: "Film Karakterleri Kitaplığı",
    description:
      "TEDAŞ stajında geliştirilen iOS uygulaması. SwiftUI ile film karakterleri kitaplığı.",
    tags: ["SwiftUI", "REST API", "iOS"],
    video: { type: "youtube", videoId: "" },
    links: [{ label: "GitHub", url: "https://github.com/Yarenunal" }],
  },
  {
    title: "ToDos Tutorial",
    description:
      "SwiftUI görev yönetimi. REST API ile senkronizasyon — TEDAŞ stajı kapsamında.",
    tags: ["SwiftUI", "REST API"],
    video: { type: "youtube", videoId: "" },
    links: [{ label: "GitHub", url: "https://github.com/Yarenunal" }],
  },
];

function parseYoutubeId(input) {
  if (!input || typeof input !== "string") return null;
  const trimmed = input.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed;
  const match = trimmed.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
}

function escapeHtml(str) {
  const el = document.createElement("div");
  el.textContent = str;
  return el.innerHTML;
}

function buildVideoHtml(video) {
  if (video?.type === "youtube") {
    const id = parseYoutubeId(video.videoId || video.url || "");
    if (id) {
      return (
        '<div class="showcase-video-wrap">' +
        '<iframe src="https://www.youtube.com/embed/' +
        id +
        '?rel=0&modestbranding=1" title="Proje demosu" loading="lazy" ' +
        'allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>' +
        "</div>"
      );
    }
  }

  if (video?.type === "linkedin" && video.embedUrl) {
    return (
      '<div class="showcase-video-wrap showcase-video-wrap--linkedin">' +
      '<iframe src="' +
      escapeHtml(video.embedUrl) +
      '" title="LinkedIn gönderisi" loading="lazy" allowfullscreen></iframe>' +
      "</div>"
    );
  }

  const channelHint = YOUTUBE_CHANNEL
    ? '<a href="' +
      escapeHtml(YOUTUBE_CHANNEL) +
      '" target="_blank" rel="noopener noreferrer">YouTube kanalım</a>'
    : "YouTube veya LinkedIn";
  const watchLink = video?.watchUrl
    ? '<a class="showcase-placeholder-link" href="' +
      escapeHtml(video.watchUrl) +
      '" target="_blank" rel="noopener noreferrer">Videoyu izle →</a>'
    : "";

  return (
    '<div class="showcase-video-placeholder">' +
    '<span class="showcase-play-icon" aria-hidden="true">▶</span>' +
    "<p>Demo videosu henüz eklenmedi</p>" +
    '<p class="showcase-placeholder-hint">' +
    channelHint +
    " · <code>assets/projects-data.js</code></p>" +
    watchLink +
    "</div>"
  );
}

function renderProjectShowcase() {
  const root = document.getElementById("project-showcase");
  if (!root) return;

  root.innerHTML = PROJECT_SHOWCASE.map(function (project, index) {
    const num = String(index + 1).padStart(2, "0");
    const reverse = index % 2 === 1 ? " showcase-item--reverse" : "";
    const tags = (project.tags || [])
      .map(function (t) {
        return '<span class="showcase-tag">' + escapeHtml(t) + "</span>";
      })
      .join("");
    const links = (project.links || [])
      .map(function (l) {
        return (
          '<a href="' +
          escapeHtml(l.url) +
          '" target="_blank" rel="noopener noreferrer">' +
          escapeHtml(l.label) +
          "</a>"
        );
      })
      .join("");

    return (
      '<article class="showcase-item' +
      reverse +
      '" id="proje-' +
      (index + 1) +
      '">' +
      '<div class="showcase-content">' +
      '<span class="showcase-index">' +
      num +
      "</span>" +
      "<h3>" +
      escapeHtml(project.title) +
      "</h3>" +
      "<p>" +
      escapeHtml(project.description) +
      "</p>" +
      '<motion class="showcase-tags">' +
      tags +
      "</motion>" +
      (links ? '<div class="showcase-links">' + links + "</div>" : "") +
      "</div>" +
      '<div class="showcase-media">' +
      buildVideoHtml(project.video) +
      "</div>" +
      "</article>"
    );
  }).join("");
}

document.addEventListener("DOMContentLoaded", renderProjectShowcase);
