//mendefinisikan jumlah waktu untuk mengetik
var TIME_LIMIT = 60;
// kata kata yang akan ditulis
var quotes_array_html = [
    '<!DOCTYPE html> console.log("Hello world")',
    '<link rel="stylesheet" href="/style.css"> <div class="container">',
    '<textarea class="input_area" placeholder="mulai mengetik di sini..." oninput="processCurrentText()" onfocus="startGame()"></textarea>',
    '<script src="game.js"></script>',
    '<button class="restart_btn" onclick="resetValues()">Restart</button>'
];
var quotes_array_js = [
    'var timer_text = document.querySelector(".curr_time");',
    'const charSpan = document.createElement("span");',
    'let correctCharacters = (characterTyped - (total_errors + errors));',
    'var hasiltxt = document.querySelector("#hasilmu")',
    'function updateQuote()',
    'input_area.disabled = true;'
];
var quotes_array_css = [

        'display: flex; background-color: bisque; box-shadow: 10px 10px 80px rgb(156, 138, 138);',
        'border-bottom: 2px solid silver;',
        'flex-direction: column;',
        '@media (max-width: 800px) text-decoration: underline;',
        'height: 60px; width: 70px; margin: 8px;',
        'padding: 12px; border-radius: 5% ; box-shadow: 10px 10px 5px silver;',
        'margin-bottom: 40px;'
    ]
    //mendefenisikan variabel penampung untuk kata kata yang akan ditulis 
var quotes_array = []
    // menyelski elemet html dan menampungnya pada variabel penampung
var timer_text = document.querySelector(".curr_time");
var accuracy_text = document.querySelector(".curr_accuracy");
var error_text = document.querySelector(".curr_errors");
var cpm_text = document.querySelector(".curr_cpm");
var wpm_text = document.querySelector(".curr_wpm");
var quote_text = document.querySelector(".quote");
var input_area = document.querySelector(".input_area");
var restart_btn = document.querySelector(".restart_btn");
var cpm_group = document.querySelector(".cpm");
var wpm_group = document.querySelector(".wpm");
var error_group = document.querySelector(".errors");
var accuracy_group = document.querySelector(".accuracy");
var timer_group = document.querySelector(".timer");
var hasiltxt = document.querySelector("#hasilmu")
var timeLeft = TIME_LIMIT;
var timeElapsed = 0;
var total_errors = 0;
var errors = 0;
var accuracy = 0;
var characterTyped = 0;
var current_quote = "";
var quoteNo = 0;
var timer = null;
//menyeleksi tipe quotes yang akan dipilih.
function selectquotes() {
    //menampung nilai dari pilihan user untuk bahasa yang dipilih
    var value_quotes = document.querySelector("#bahasa").value;
    //melakukan pengecekan pada nilai selection yang dipilih user dan menampunya pada quotes_array
    if (value_quotes == 'html')
        quotes_array = quotes_array_html;
    else if (value_quotes == 'javascript')
        quotes_array = quotes_array_js;
    else if (value_quotes == 'css')
        quotes_array = quotes_array_css;
}
//mengupdate isi quotes

function updateQuote() {
    quote_text.textContent = null;
    current_quote = quotes_array[quoteNo];
    //mendapatkan teks yang akan ditulis lalu memisahklan setiap karakter elemen dengan span untuk setiap element yang telahdiketik oleh user
    current_quote.split('').forEach(char => {
        const charSpan = document.createElement('span')
        charSpan.innerText = char
        quote_text.appendChild(charSpan)
    })

    //memutar ke element awal
    if (quoteNo < quotes_array.length - 1)
        quoteNo++;
    else
        quoteNo = 0;
}

//mendapatkan teks yang diketik oleh user

function processCurrentText() {

    // mendapatkan teks dari inputan pengguna
    curr_input = input_area.value;
    curr_input_array = curr_input.split('');

    // menambahkan total karakter yang diketik
    characterTyped++;

    errors = 0;
    //proses mengoreksi inpuan pengguna

    quoteSpanArray = quote_text.querySelectorAll('span');
    quoteSpanArray.forEach((char, index) => {
        let typedChar = curr_input_array[index]

        // ketika tidak ada karakter yang diketik
        if (typedChar == null) {
            char.classList.remove('correct_char');
            char.classList.remove('incorrect_char');

            // ketika inputan character pengguna sama dengan quotes
        } else if (typedChar === char.innerText) {
            char.classList.add('correct_char');
            char.classList.remove('incorrect_char');

            // ketika inputan character pengguna tidak sama dengan quotes
        } else {
            char.classList.add('incorrect_char');
            char.classList.remove('correct_char');

            // meanmabahkan jumlah eror
            errors++;
        }
    });

    // menampilkan jumlah eror
    error_text.textContent = total_errors + errors;

    //menghitung ketepatan
    //karakter benar = karakter yang ditulis - (total eror + eror)
    let correctCharacters = (characterTyped - (total_errors + errors));
    //menghitung karakter benar = karakter benar / karakter yang ditulis * 100
    let accuracyVal = ((correctCharacters / characterTyped) * 100);
    //pembulatan hasil karakter benar
    accuracy_text.textContent = Math.round(accuracyVal);

    // ketika teks diketik
    if (curr_input.length == current_quote.length) {
        updateQuote();

        // mengupdate total eror
        total_errors += errors;

        // menghapus input area
        input_area.value = "";
    }
}

function updateTimer() {
    if (timeLeft > 0) {
        //menghitung mundur waktu

        timeLeft--;


        //menambahkan waktu yang telah berlalu
        timeElapsed++;


        // mengupdate text di tmer sesuai dengan waktu yang berjalan
        timer_text.textContent = timeLeft + "s";
    } else {
        //ketika game selesai
        finishGame();
    }
}

function finishGame() {
    // menghentikan waktu
    clearInterval(timer);


    // menonaktifkan input area dan membersihkan inputanya
    input_area.disabled = true;
    input_area.value = "";

    // menampilkan kata restart untuk memulia kembali pada quotes
    quote_text.textContent = "Klik restart untuk memulai kembali.";

    // menampilkan restart button
    restart_btn.style.display = "block";

    // menghitung cpm dengan cara (karakter yang ditulis / waktu pengerjaan) * 60 lalu dibulatkan
    cpm = Math.round(((characterTyped / timeElapsed) * 60));
    // menghitung wpm dengan cara (karakter yang ditulis /7)/ waktu pengerjaan)* 60 lalu dibulatkan
    //angka 7 merupakan rata rata jumlah character pada kata
    wpm = Math.round((((characterTyped / 7) / timeElapsed) * 60));

    // memberikan nilai pada cpm dan wpm
    cpm_text.textContent = cpm;
    wpm_text.textContent = wpm;

    // menampilkan elemen hasil, cpm, wpm, ketepatan dan eror 
    cpm_group.style.display = "block";
    wpm_group.style.display = "block";
    accuracy_group.style.display = "block";
    error_group.style.display = "block";
    hasiltxt.style.display = "block";

    //menyembenyikan timer
    timer_group.style.display = "none";
}

//mereset nilai 
function resetValues() {
    timeLeft = TIME_LIMIT;
    timeElapsed = 0;
    errors = 0;
    total_errors = 0;
    accuracy = 0;
    characterTyped = 0;
    quoteNo = 0;
    input_area.disabled = false;

    input_area.value = "";
    quote_text.textContent = 'Klik kolom di bawah untuk memulai game.';
    accuracy_text.textContent = 100;
    timer_text.textContent = timeLeft + 's';
    error_text.textContent = 0;
    restart_btn.style.display = "none";
    cpm_group.style.display = "none";
    wpm_group.style.display = "none";
    accuracy_group.style.display = "none";
    error_group.style.display = "none";
    timer_group.style.display = "block";
    hasiltxt.style.display = "none";


}
//memulai permainan

function startGame() {
    // memangil fungsi select quotes
    selectquotes();
    // memangil fungsi reset nilai
    resetValues();
    // memangil fungsi update quotes
    updateQuote();

    // menghapus waktu yang lalu dan memulainya dengan waktu yang awal
    clearInterval(timer);
    timer = setInterval(updateTimer, 1000);
}