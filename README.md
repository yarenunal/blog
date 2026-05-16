# Yaren Ünal · Developer Blog

[Blogu görüntüle](https://yarenunal.github.io/blog/)

## Memoji / profil fotoğrafı (Mac)

1. **Mesajlar** uygulamasını açın.
2. Sohbette **+** → **Memoji** → kendi avatar çıkartmanızı bulun.
3. Çıkartmayı **Masaüstüne sürükleyin** (PNG oluşur).
4. Dosyayı kopyalayın:

   `Desktop/blog/assets/avatar.png`

5. Yayınlayın:

   ```bash
   cd ~/Desktop/blog
   git add assets/avatar.png
   git commit -m "Profil Memoji eklendi"
   git push origin main
   ```

## Proje videoları

`assets/projects-data.js` dosyasından YouTube / LinkedIn / MP4 ekleyin.

## Yayınlama

```bash
git add .
git commit -m "Blog güncellemesi"
git push origin main
```
