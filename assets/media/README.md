# Adăugarea fotografiilor și videoclipurilor

Editează lista `gallery` din `assets/js/resources.js`. Fiecare intrare are un `id` unic, `type` (`photo` sau `video`), `title`, `label`, `src` și `description`.

- `src: null` afișează un placeholder clar marcat „În pregătire”.
- Pentru o fotografie: pune fișierul în `assets/images/`, completează `src: 'assets/images/nume.webp'` și textul alternativ `alt`.
- Pentru un video: pune un MP4 compatibil cu browserul în acest folder și setează `src: 'assets/media/nume.mp4'`. Este recomandat și un `poster: 'assets/images/nume-poster.webp'` pentru miniatură.
- Cu un fișier video real, fereastra folosește playerul nativ cu controale, fără redare automată. Videoclipul se oprește la închiderea ferestrei.
- Înlocuiește descrierea de placeholder cu descrierea reală. Completează doar ediții și date confirmate.

Păstrează căile relative pentru funcționarea offline. Nu pune un link YouTube/Facebook în câmpul `src` al playerului MP4. Poți adăuga o legătură externă separată pentru astfel de materiale.
