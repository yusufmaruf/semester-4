function ubah() {
    var val1 = document.kirim.text1.value
    if (0 < val1 && val1 <= 40)
        document.kirim.text2.value = "E"
    else if (val1 > 40 && val1 <= 55)
        document.kirim.text2.value = "D"
    else if (val1 > 55 && val1 <= 60)
        document.kirim.text2.value = "C"
    else if (val1 > 60 && val1 <= 65)
        document.kirim.text2.value = "BC"
    else if (val1 > 65 && val1 <= 70)
        document.kirim.text2.value = "B"
    else if (val1 > 70 && val1 <= 80)
        document.kirim.text2.value = "AB"
    else if (val1 > 80 && val1 <= 100)
        document.kirim.text2.value = "A"
}