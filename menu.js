// Language menu configuration
const languages = [
  { code: "he", name: "עברית", flag: "🇮🇱", file: "index.html", dir: "rtl" },
  { code: "en", name: "English", flag: "🇺🇸", file: "english.html", dir: "ltr" },
  { code: "ru", name: "Русский", flag: "🇷🇺", file: "russian.html", dir: "ltr" },
];

// Create and append language menu
function createLanguageMenu() {
  const navbar = document.createElement("nav");
  navbar.className = "language-nav";
  navbar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(10px);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    padding: 12px 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: all 0.3s ease;
  `;

  // Create logo/brand section
  const brand = document.createElement("div");
  brand.className = "brand";
  brand.innerHTML = `
    <div style="display: flex; align-items: center; gap: 6px;">
      <span style="
        font-size: 1.3em;
        filter: drop-shadow(0 1px 2px rgba(0,0,0,0.1));
        transform: translateY(-1px);
      ">📺</span>
      <span style="
        font-size: 1.4em;
        font-weight: 800;
        background: linear-gradient(45deg, #2ecc71, #3498db);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        letter-spacing: -0.5px;
        padding: 4px 0;
      ">TV Box</span>
    </div>
  `;

  // Create language buttons container
  const langContainer = document.createElement("div");
  langContainer.className = "lang-container";
  langContainer.style.cssText = `
    display: flex;
    gap: 12px;
    align-items: center;
    background: rgba(0, 0, 0, 0.03);
    padding: 4px;
    border-radius: 12px;
  `;

  // Create menu items
  languages.forEach((lang) => {
    const langButton = document.createElement("button");
    langButton.className = "lang-button";
    const isCurrentPage =
      window.location.pathname.split("/").pop() === lang.file;

    langButton.style.cssText = `
      display: flex;
      align-items: center;
      padding: 8px 16px;
      border: none;
      background: ${isCurrentPage ? "white" : "transparent"};
      cursor: pointer;
      border-radius: 10px;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      font-size: 14px;
      color: #333;
      font-weight: 500;
      box-shadow: ${isCurrentPage ? "0 2px 10px rgba(0,0,0,0.1)" : "none"};
    `;

    // Add hover effect
    langButton.onmouseover = () => {
      if (!isCurrentPage) {
        langButton.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
        langButton.style.transform = "translateY(-1px)";
      }
    };
    langButton.onmouseout = () => {
      if (!isCurrentPage) {
        langButton.style.backgroundColor = "transparent";
        langButton.style.transform = "translateY(0)";
      }
    };

    // Add flag and language name
    langButton.innerHTML = `
      <span style="
        font-size: 1.2em;
        margin-right: 8px;
        filter: drop-shadow(0 1px 2px rgba(0,0,0,0.1));
      ">${lang.flag}</span>
      <span style="font-weight: ${isCurrentPage ? "600" : "400"}">${
      lang.name
    }</span>
    `;

    // Add click handler
    langButton.onclick = () => {
      if (!isCurrentPage) {
        window.location.href = lang.file;
      }
    };

    langContainer.appendChild(langButton);
  });

  // Append elements to navbar
  navbar.appendChild(brand);
  navbar.appendChild(langContainer);
  document.body.insertBefore(navbar, document.body.firstChild);

  // Add padding to body to account for fixed navbar
  document.body.style.paddingTop = "70px";

  // Add scroll behavior
  let lastScroll = 0;
  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll <= 0) {
      navbar.style.boxShadow = "0 4px 30px rgba(0, 0, 0, 0.1)";
    } else if (currentScroll > lastScroll) {
      navbar.style.transform = "translateY(-100%)";
    } else {
      navbar.style.transform = "translateY(0)";
      navbar.style.boxShadow = "0 4px 30px rgba(0, 0, 0, 0.15)";
    }
    lastScroll = currentScroll;
  });
}

// Initialize when document is ready
document.addEventListener("DOMContentLoaded", createLanguageMenu);

// Add styles
document.head.insertAdjacentHTML(
  "beforeend",
  `
  <style>
    .language-nav {
      animation: slideDown 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    @keyframes slideDown {
      from {
        transform: translateY(-100%);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }
    
    .lang-button {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      white-space: nowrap;
      user-select: none;
      -webkit-tap-highlight-color: transparent;
    }

    .lang-button:active {
      transform: scale(0.98) !important;
    }

    @media (max-width: 768px) {
      .brand span {
        font-size: 1.1em;
      }
      
      .brand img {
        height: 28px !important;
      }
      
      .language-nav {
        padding: 10px 16px !important;
      }
      
      .lang-container {
        background: transparent !important;
        padding: 0 !important;
      }
      
      .lang-button {
        padding: 6px 10px !important;
      }
      
      .lang-button span:last-child {
        display: none;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .language-nav {
        animation: none;
      }
      
      .lang-button {
        transition: none !important;
      }
    }
  </style>
`
);
