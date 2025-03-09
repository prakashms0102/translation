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
  
  let deferredPrompt;
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
  
    // Create install button
    const installButton = document.createElement("button");
    installButton.innerHTML = `<img src="icon-192x192.png" width="24" height="24" style="margin-right: 5px;"> Install App`;
    installButton.style.position = "fixed";
    installButton.style.bottom = "10px";
    installButton.style.right = "10px";
    installButton.style.padding = "10px";
    installButton.style.background = "#007bff";
    installButton.style.color = "#fff";
    installButton.style.border = "none";
    installButton.style.borderRadius = "5px";
    installButton.style.cursor = "pointer";
  
    document.body.appendChild(installButton);
  
    installButton.addEventListener("click", () => {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User installed the app");
        }
        deferredPrompt = null;
        installButton.remove();
      });
    });
  });
  