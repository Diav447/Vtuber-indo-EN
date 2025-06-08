const container = document.getElementById("vtuberList");
const input = document.getElementById("searchInput");
let vtubers = [];

// Ambil data VTuber bahasa Indonesia dari Holodex API
fetch("https://holodex.net/api/v2/channels?lang=id&limit=100")
  .then(res => res.json())
  .then(data => {
    vtubers = data;
    renderList(vtubers);
  })
  .catch(err => {
    console.error("Gagal ambil data:", err);
    container.innerHTML = "<p style='color:red;'>Gagal memuat data dari Holodex 😢</p>";
  });

// Fungsi render card VTuber
function renderList(list) {
  container.innerHTML = list.map(v => `
    <div class="vtuber-card">
      <img src="${v.photo}" alt="${v.name}" />
      <h3>${v.name}</h3>
      <p>Agensi: ${v.org ?? 'Indie'}</p>
      <a href="https://www.youtube.com/channel/${v.id}" target="_blank">📺 Lihat Channel</a>
    </div>
  `).join('');
}

// Live search saat user ngetik
input.addEventListener("input", () => {
  const keyword = input.value.toLowerCase();
  const filtered = vtubers.filter(v =>
    v.name.toLowerCase().includes(keyword) ||
    (v.org ?? '').toLowerCase().includes(keyword)
  );
  renderList(filtered);
});
