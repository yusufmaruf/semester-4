function lm() {
    document.getElementById("p1").innerHTML = "dimodfifikasi terakhir pada " + document.lastModified;
}

function oplus() {
    document.kirim.hasil.value = parseInt(document.kirim.text1.value) + parseInt(document.kirim.text2.value);
    lm();
}

function ominus() {
    document.kirim.hasil.value = parseInt(document.kirim.text1.value) - parseInt(document.kirim.text2.value);
    lm();
}

function okali() {
    document.kirim.hasil.value = parseInt(document.kirim.text1.value) * parseInt(document.kirim.text2.value);
    lm();
}

function obagi() {
    document.kirim.hasil.value = parseInt(document.kirim.text1.value) / parseInt(document.kirim.text2.value);
    lm();
}