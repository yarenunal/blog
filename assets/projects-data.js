/**
 * Proje vitrinı — medya buradan güncellenir.
 *
 * YouTube: video: { type: "youtube", videoId: "..." }
 * LinkedIn: video: { type: "linkedin", embedUrl: "..." }
 * Yerel MP4: video: { type: "file", src: "projects/.../demo.mp4" }
 * Görseller: media: { type: "gallery", images: [{ src, alt }] }
 */
const YOUTUBE_CHANNEL = "";

/** GitHub Pages /blog/ altında doğru görsel yolu */
function getAssetBase() {
  const script = document.querySelector('script[src*="projects-data.js"]');
  if (script?.src) {
    return script.src.replace(/\/[^/]+$/, "/");
  }
  const path = window.location.pathname;
  const blogRoot = path.includes("/blog")
    ? path.split("/blog")[0] + "/blog/assets/"
    : path.replace(/\/?[^/]*$/, "/assets/");
  return window.location.origin + blogRoot;
}

function resolveAssetUrl(path) {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;
  const clean = path.replace(/^\//, "");
  return new URL(clean, getAssetBase()).href;
}

const PROJECT_SHOWCASE = [
  {
    title: "ArenaX",
    description:
      "Harita üzerinden yakınınızdaki spor alanlarını ve etkinlikleri keşfetmenizi, kayıt olmanızı ve uygulama içi işlemleri yönetmenizi sağlayan mobil platform. Yakında App Store’da.",
    tags: ["SwiftUI", "Firebase", "StoreKit 2", "MapKit", "MVVM"],
    video: { type: "youtube", videoId: "" },
    links: [{ label: "GitHub", url: "https://github.com/Yarenunal" }],
  },
  {
    title: "NotasyonApp",
    description:
      "Elinizdeki bir ses kaydını (MP3) otomatik olarak notaya, MusicXML ve PDF’e çevirir — müzisyenler ve öğrenciler kaydı yazıya dökebilir, partisyonu paylaşabilir.",
    tags: ["Flutter", "FastAPI", "Redis", "librosa", "music21"],
    video: { type: "youtube", videoId: "" },
    links: [{ label: "GitHub", url: "https://github.com/Yarenunal" }],
  },
  {
    title: "TakasApp",
    description:
      "Kullanıcıların para kullanmadan eşya takası yapabildiği platform. İlan verir, teklif alır ve güvenli kimlik doğrulama ile takas sürecini yönetirsiniz.",
    tags: ["Flutter", "Flask", "PostgreSQL", "JWT", "Docker"],
    video: { type: "youtube", videoId: "Kkcq81ZbU7M" },
    links: [{ label: "GitHub", url: "https://github.com/Yarenunal" }],
  },
  {
    title: "e-Ticaret iOS Klonu",
    description:
      "Ürünleri listeleyip sepete ekleyebileceğiniz, sipariş verebileceğiniz bir online mağaza deneyimi — gerçek bir e-ticaret sitesinin mobil karşılığı.",
    tags: ["SwiftUI", "Node.js", "PostgreSQL", "RabbitMQ", "Docker"],
    video: { type: "youtube", videoId: "G2G0Yw62L7w" },
    links: [{ label: "GitHub", url: "https://github.com/Yarenunal" }],
  },
  {
    title: "SQL ChatBot",
    description:
      "SQL bilmeden veritabanınıza Türkçe soru sorarsınız; sistem sorguyu üretir, sonucu gösterir ve ne yaptığını açıklar. Raporlama ve veri analizi için pratik bir asistan.",
    tags: ["Python", "LangChain", "FastAPI", "PostgreSQL", "LLM"],
    media: {
      type: "gallery",
      images: [
        {
          src: "projects/sql-chatbot/ana-ekran.png",
          alt: "PostgreSQL Chatbot ana arayüzü ve örnek sorgular",
        },
        {
          src: "projects/sql-chatbot/sorgu-teklif.png",
          alt: "En çok teklif alan araç sorusu ve üretilen SQL",
        },
        {
          src: "projects/sql-chatbot/sorgu-yil.png",
          alt: "Model yılı sorgusu ve SQL sonucu",
        },
      ],
    },
    links: [{ label: "GitHub", url: "https://github.com/Yarenunal" }],
  },
  {
    title: "Ehliyet Quiz App",
    description:
      "Ehliyet sınavına hazırlık için çıkmış sorularla test çözersiniz. İnternet olmadan çalışır; doğru-yanlış takibiyle kendinizi sınava hazırlarsınız.",
    tags: ["SwiftUI", "CoreData", "iOS"],
    video: { type: "file", src: "projects/ehliyet-quiz/demo.mp4" },
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

  if (video?.type === "file" && video.src) {
    const src = resolveAssetUrl(video.src);
    return (
      '<div class="showcase-video-wrap showcase-video-wrap--file">' +
      '<video controls playsinline preload="metadata">' +
      '<source src="' +
      escapeHtml(src) +
      '" type="video/mp4" />' +
      "Tarayıcınız video oynatmayı desteklemiyor." +
      "</video>" +
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
    "</p>" +
    watchLink +
    "</div>"
  );
}

function buildGalleryHtml(media, projectId) {
  const images = media.images || [];
  if (!images.length) return buildVideoHtml(null);

  const galleryId = "gallery-" + projectId;
  const main = images[0];
  const mainUrl = resolveAssetUrl(main.src);

  const thumbs = images
    .map(function (img, i) {
      const url = resolveAssetUrl(img.src);
      return (
        '<button type="button" class="showcase-gallery-thumb' +
        (i === 0 ? " is-active" : "") +
        '" data-gallery="' +
        galleryId +
        '" data-src="' +
        escapeHtml(url) +
        '" data-alt="' +
        escapeHtml(img.alt || "") +
        '" aria-label="' +
        escapeHtml(img.alt || "Görsel " + (i + 1)) +
        '">' +
        '<img src="' +
        escapeHtml(url) +
        '" alt="" loading="lazy" />' +
        "</button>"
      );
    })
    .join("");

  const thumbRow =
    images.length > 1
      ? '<div class="showcase-gallery-thumbs">' + thumbs + "</div>"
      : "";

  return (
    '<div class="showcase-gallery" id="' +
    galleryId +
    '">' +
    '<div class="showcase-gallery-main">' +
    '<img id="' +
    galleryId +
    '-main" src="' +
    escapeHtml(mainUrl) +
    '" alt="' +
    escapeHtml(main.alt || "") +
    '" loading="eager" />' +
    "</div>" +
    thumbRow +
    '<p class="showcase-gallery-caption" id="' +
    galleryId +
    '-caption">' +
    escapeHtml(main.alt || "") +
    "</p>" +
    "</div>"
  );
}

function buildMediaHtml(project, projectId) {
  if (project.media?.type === "gallery") {
    return buildGalleryHtml(project.media, projectId);
  }
  return buildVideoHtml(project.video);
}

function initGalleries() {
  document.querySelectorAll(".showcase-gallery-thumb").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const galleryId = btn.getAttribute("data-gallery");
      const main = document.getElementById(galleryId + "-main");
      const caption = document.getElementById(galleryId + "-caption");
      const src = btn.getAttribute("data-src");
      const alt = btn.getAttribute("data-alt") || "";

      if (main) {
        main.src = src;
        main.alt = alt;
      }
      if (caption) caption.textContent = alt;

      document
        .querySelectorAll('[data-gallery="' + galleryId + '"]')
        .forEach(function (b) {
          b.classList.toggle("is-active", b === btn);
        });
    });
  });
}

function renderProjectShowcase() {
  const root = document.getElementById("project-showcase");
  if (!root) return;

  root.innerHTML = PROJECT_SHOWCASE.map(function (project, index) {
    const num = String(index + 1).padStart(2, "0");
    const reverse = index % 2 === 1 ? " showcase-item--reverse" : "";
    const projectId = "proje-" + (index + 1);
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
      '<article class="showcase-item reveal' +
      reverse +
      '" id="' +
      projectId +
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
      '<div class="showcase-tags">' +
      tags +
      "</div>" +
      (links ? '<div class="showcase-links">' + links + "</div>" : "") +
      "</div>" +
      '<div class="showcase-media">' +
      buildMediaHtml(project, projectId) +
      "</div>" +
      "</article>"
    );
  }).join("");

  initGalleries();

  document.querySelectorAll(".showcase-item").forEach(function (el, i) {
    el.style.transitionDelay = i * 0.07 + "s";
  });

  if (typeof window.initReveal === "function") {
    window.initReveal();
  }
}

document.addEventListener("DOMContentLoaded", renderProjectShowcase);
