/* ZAKATCALC - JAVASCRIPT */
const zakatForm = document.getElementById("zakatForm");
const hasil = document.getElementById("hasil");

// Fungsi Format Rupiah untuk Hasil Akhir
function formatRupiah(angka) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(angka);
}

// FUNGSI BIAR INPUT OTOMATIS ADA TITIKNYA
const inputs = document.querySelectorAll('input[type="text"]');
inputs.forEach(input => {
    input.addEventListener('input', function(e) {
        // Hapus semua karakter selain angka
        let value = this.value.replace(/[^0-9]/g, '');
        // Kasih titik tiap 3 digit
        this.value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    });
});

// Logika Hitung Zakat
zakatForm.addEventListener("submit", function(event) {
    event.preventDefault();

    // Ambil nilai, HAPUS TITIKNYA dulu biar bisa dihitung
    const strPenghasilan = document.getElementById("penghasilan").value.replace(/\./g, '');
    const strKebutuhan = document.getElementById("kebutuhan").value.replace(/\./g, '');
    const strHargaEmas = document.getElementById("hargaEmas").value.replace(/\./g, '');

    const penghasilan = Number(strPenghasilan);
    const kebutuhan = Number(strKebutuhan);
    const hargaEmas = Number(strHargaEmas);

    // Validasi
    if (!Number.isFinite(penghasilan) || !Number.isFinite(kebutuhan) || !Number.isFinite(hargaEmas) || penghasilan <= 0 || kebutuhan < 0 || hargaEmas <= 0) {
        tampilkanError("Mohon masukkan semua data dengan angka yang benar.");
        return;
    }
    if (kebutuhan > penghasilan) {
        tampilkanError("Kebutuhan pokok tidak boleh melebihi penghasilan.");
        return;
    }

    // Perhitungan
    const penghasilanBersih = penghasilan - kebutuhan;
    const nisab = (85 * hargaEmas) / 12;
    let zakat = 0, status = "", kelasStatus = "", pesan = "";

    if (penghasilanBersih >= nisab) {
        status = "Wajib Zakat"; kelasStatus = "status-wajib"; zakat = penghasilanBersih * 0.025;
        pesan = "Alhamdulillah! Penghasilan Anda telah mencapai nisab.";
    } else {
        status = "Belum Wajib Zakat"; kelasStatus = "status-belum"; zakat = 0;
        pesan = "Penghasilan bersih Anda belum mencapai nisab bulanan.";
    }

    // Tampilkan Hasil
    hasil.className = "hasil";
    hasil.innerHTML = `
        <h2>Hasil Perhitungan Zakat</h2>
        <p>Penghasilan per Bulan: <strong>${formatRupiah(penghasilan)}</strong></p>
        <p>Kebutuhan Pokok / Cicilan: <strong>${formatRupiah(kebutuhan)}</strong></p>
        <p>Penghasilan Bersih: <strong>${formatRupiah(penghasilanBersih)}</strong></p>
        <p>Nisab per Bulan: <strong>${formatRupiah(nisab)}</strong></p>
        <p>Status: <span class="status ${kelasStatus}">${status}</span></p>
        <p>Zakat yang Dibayar: <strong>${formatRupiah(zakat)}</strong></p>
        <div class="pesan">🌙 ${pesan}</div>
        <p class="catatan"><small>*Perhitungan ini menggunakan rumus nisab 85 gram emas per tahun dan tarif zakat 2,5%.</small></p>
    `;
});

function tampilkanError(pesan) {
    hasil.className = "hasil error";
    hasil.innerHTML = `<h2>⚠ Periksa Kembali Data</h2><p>${pesan}</p>`;
}