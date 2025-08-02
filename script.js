// Fungsi untuk memuat data profil
async function muatProfil() {
    const response = await fetch('profil.json');
    return await response.json();
}

// Fungsi untuk menyimpan data profil
async function simpanProfil(data) {
    const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'profil.json';
    a.click();
}

// Fungsi untuk menampilkan data ke UI
function tampilkanProfil(profil) {
    document.getElementById('nama').textContent = profil.nama;
    document.getElementById('pekerjaan').textContent = profil.pekerjaan;
    document.getElementById('lokasi').textContent = profil.lokasi;
    document.getElementById('status').value = profil.status;
    document.getElementById('bio').value = profil.bio;
    document.getElementById('email').value = profil.kontak.email;
    document.getElementById('telepon').value = profil.kontak.telepon;
    
    // Tampilkan keahlian
    const keahlianList = document.getElementById('keahlian-list');
    keahlianList.innerHTML = '';
    profil.keahlian.forEach(k => {
        const item = document.createElement('div');
        item.className = 'keahlian-item';
        item.innerHTML = `
            <span>${k}</span>
            <button class="hapus-keahlian">×</button>
        `;
        keahlianList.appendChild(item);
    });
}

// Fungsi untuk mengambil data dari UI
function ambilDataDariUI() {
    return {
        nama: document.getElementById('nama').textContent,
        foto: "avatar.jpg", // Tetap sama atau implementasi ganti file
        pekerjaan: document.getElementById('pekerjaan').textContent,
        lokasi: document.getElementById('lokasi').textContent,
        status: document.getElementById('status').value,
        bio: document.getElementById('bio').value,
        kontak: {
            email: document.getElementById('email').value,
            telepon: document.getElementById('telepon').value
        },
        keahlian: Array.from(document.querySelectorAll('.keahlian-item span'))
                     .map(el => el.textContent)
    };
}

// Inisialisasi aplikasi
document.addEventListener('DOMContentLoaded', async () => {
    const profil = await muatProfil();
    tampilkanProfil(profil);
    
    // Event listener untuk simpan profil
    document.getElementById('simpan-profil').addEventListener('click', () => {
        const dataBaru = ambilDataDariUI();
        simpanProfil(dataBaru);
        alert('Profil berhasil disimpan!');
    });
    
    // Event listener untuk ganti foto
    document.getElementById('ganti-foto').addEventListener('click', () => {
        document.getElementById('upload-foto').click();
    });
    
    document.getElementById('upload-foto').addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                document.getElementById('foto').src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
    
    // Event listener untuk tambah keahlian
    document.getElementById('tambah-keahlian-btn').addEventListener('click', () => {
        const input = document.getElementById('tambah-keahlian');
        const keahlian = input.value.trim();
        if (keahlian) {
            const keahlianList = document.getElementById('keahlian-list');
            const item = document.createElement('div');
            item.className = 'keahlian-item';
            item.innerHTML = `
                <span>${keahlian}</span>
                <button class="hapus-keahlian">×</button>
            `;
            keahlianList.appendChild(item);
            input.value = '';
        }
    });
    
    // Event delegation untuk hapus keahlian
    document.getElementById('keahlian-list').addEventListener('click', (e) => {
        if (e.target.classList.contains('hapus-keahlian')) {
            e.target.parentElement.remove();
        }
    });
});
