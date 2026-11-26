/* ZAKATCALC - JAVASCRIPT */
const zakatForm = document.getElementById("zakatForm");
const hasil = document.getElementById("hasil");

// Logika Hitung Zakat (Versi Dasar)
zakatForm.addEventListener("submit", function(event) {
    event.preventDefault();
    
    const penghasilan = Number(document.getElementById("penghasilan").value.replace(/\./g, ''));
    const kebutuhan = Number(document.getElementById("kebutuhan").value.replace(/\./g, ''));
    const hargaEmas = Number(document.getElementById("hargaEmas").value.replace(/\./g, ''));

    const penghasilanBersih = penghasilan - kebutuhan;
    const nisab = (85 * hargaEmas) / 12;
    let zakat = 0, status = "";

    if (penghasilanBersih >= nisab) {
        status = "Wajib Zakat";
        zakat = penghasilanBersih * 0.025;
    } else {
        status = "Belum Wajib Zakat";
        zakat = 0;
    }

    hasil.innerHTML = `<h2>Hasil: ${status} - Rp ${zakat}</h2>`;
});

// Fungsi Format Rupiah
function formatRupiah(angka) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency", currency: "IDR",
        minimumFractionDigits: 0, maximumFractionDigits: 0
    }).format(angka);
}

// Validasi Input
if (kebutuhan > penghasilan) {
    alert("Kebutuhan pokok tidak boleh melebihi penghasilan.");
    return;
}