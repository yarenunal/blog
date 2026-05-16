# Yaren Ünal · iOS Developer Blog

[Blogu görüntüle](https://yarenunal.github.io/blog/)

## Avatar ekleme

1. Kare fotoğraf seçin (en az 400×400 px).
2. `assets/avatar.jpg` olarak kaydedin.
3. GitHub’a push edin.

## Proje videoları ekleme

`assets/projects-data.js` dosyasını düzenleyin.

### YouTube

```javascript
video: { type: "youtube", videoId: "abc123XYZ90" }
// veya tam link:
video: { type: "youtube", videoId: "https://youtu.be/abc123XYZ90" }
```

### LinkedIn

Gönderide **⋯ → Gönderiyi yerleştir** → iframe `src` değerini kopyalayın:

```javascript
video: {
  type: "linkedin",
  embedUrl: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:..."
}
```

İsteğe bağlı: `YOUTUBE_CHANNEL` alanına kanal linkinizi yazın (placeholder’da görünür).

## Yayınlama

```bash
git add .
git commit -m "Blog güncellemesi"
git push origin main
```

GitHub Pages birkaç dakika içinde güncellenir.
