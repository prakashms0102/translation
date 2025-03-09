function translateText() {
    let ApplyText = document.getElementById("apply_text").value.trim();
    const ApplyLanguage = document.getElementById("apply_language").value;
    const OutputLanguage = document.getElementById("output_language").value;

    if (ApplyText == "") {
        alert("Please enter text to translate!");
        return;
    }

    let apiUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${ApplyLanguage}&tl=${OutputLanguage}&dt=t&q=${encodeURIComponent(ApplyText)}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            let translatedText = data[0].map(item => item[0]).join("");
            document.getElementById("output_text").value = translatedText;
        })
        .catch(error => {
            console.error("Translation Error:", error);
            alert("Error in translation. Please try again!");
        });
}


function swapLanguages() {
    let applyLang = document.getElementById("apply_language");
    let outputLang = document.getElementById("output_language");

    // Swap selected values
    let temp = applyLang.value;
    applyLang.value = outputLang.value;
    outputLang.value = temp;
}

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js").then(() => {
      console.log("Service Worker Registered");
    });
  }
  