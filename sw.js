self.addEventListener("install", (event) => {
    console.log("Service Worker Installed");
  });
  
  self.addEventListener("fetch", (event) => {
    console.log("Fetch Event:", event.request.url);
  });
  