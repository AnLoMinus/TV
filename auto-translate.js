// Initialize Google Translate API
function initGoogleTranslate() {
  new google.translate.TranslateElement(
    {
      pageLanguage: "he",
      includedLanguages: "en,ru,fr,es,ar,am", // Add more languages as needed
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
      autoDisplay: true,
    },
    "google_translate_element"
  );
}

// Detect user's browser language
function detectUserLanguage() {
  const browserLang = navigator.language || navigator.userLanguage;
  return browserLang.split("-")[0]; // Get primary language code
}

// Get user's country using IP geolocation
async function detectUserCountry() {
  try {
    const response = await fetch("https://ipapi.co/json/");
    const data = await response.json();
    return data.country_code.toLowerCase();
  } catch (error) {
    console.error("Error detecting country:", error);
    return null;
  }
}

// Auto-translate based on user's language and country
async function autoTranslate() {
  const userLang = detectUserLanguage();
  const userCountry = await detectUserCountry();

  // Wait for Google Translate to be ready
  if (typeof google !== "undefined" && google.translate) {
    const translateElement = google.translate.TranslateElement.getInstance();
    if (translateElement && userLang !== "he") {
      translateElement.translate("", userLang);
    }
  }
}

// Initialize when document is ready
document.addEventListener("DOMContentLoaded", () => {
  // Add Google Translate script dynamically
  const script = document.createElement("script");
  script.src =
    "https://translate.google.com/translate_a/element.js?cb=initGoogleTranslate";
  script.async = true;
  document.body.appendChild(script);

  // Start auto-translation process
  autoTranslate();
});
