const FLAGS = [
  "🇮🇱",
  "🇺🇱",
  "🇮🇱",
  "🇯🇴",
  "🇪🇬",
  "🇱🇧",
  "🇦🇪",
  "🇸🇦",
  "🇶🇦",
  "🇧🇭",
  "🇰🇼",
  "🇬🇧",
  "🇫🇷",
  "🇩🇪",
  "🇮🇹",
  "🇪🇸",
  "🇵🇹",
  "🇳🇱",
  "🇧🇪",
  "🇨🇭",
  "🇦🇹",
  "🇸🇪",
  "🇳🇴",
  "🇩🇰",
  "🇫🇮",
  "🇮🇪",
  "🇬🇷",
  "🇵🇱",
  "🇨🇿",
  "🇭🇺",
  "🇷🇴",
  "🇧🇬",
  "🇭🇷",
  "🇷🇸",
  "🇸🇰",
  "🇺🇸",
  "🇨🇦",
  "🇲🇽",
  "🇧🇷",
  "🇦🇷",
  "🇨🇱",
  "🇨🇴",
  "🇵🇪",
  "🇺🇾",
  "🇵🇾",
  "🇪🇨",
  "🇻🇪",
  "🇯🇵",
  "🇰🇷",
  "🇨🇳",
  "🇮🇳",
  "🇹🇭",
  "🇻🇳",
  "🇵🇭",
  "🇲🇾",
  "🇸🇬",
  "🇮🇩",
  "🇵🇰",
  "🇧🇩",
  "🇰🇿",
  "🇺🇿",
  "🇹🇷",
  "🇿🇦",
  "🇳🇬",
  "🇰🇪",
  "🇲🇦",
  "🇹🇳",
  "🇩🇿",
  "🇸🇳",
  "🇬🇭",
  "🇦🇺",
  "🇳🇿",
  "🇫🇯",
  "🇵🇬",
];

document.addEventListener("DOMContentLoaded", function () {
  // הגדרת תמונות הרקע
  const backgroundImages = Array.from(
    { length: 10 },
    (_, i) => `Screenshots/${i + 1}.jpg`
  );
  let currentImageIndex = 0;
  const heroSection = document.querySelector(".hero-section");

  // פונקציה להחלפת תמונת רקע
  function changeBackgroundImage() {
    heroSection.style.backgroundImage = `url('${backgroundImages[currentImageIndex]}')`;
    currentImageIndex = (currentImageIndex + 1) % backgroundImages.length;
  }

  // הגדרת התמונה הראשונה
  changeBackgroundImage();

  // החלפת תמונה כל 5 שניות
  setInterval(changeBackgroundImage, 5000);

  // הוספת אלמנט הדגלים
  const flagsContainer = document.createElement("div");
  flagsContainer.className = "floating-flags";
  document.querySelector(".hero-section").appendChild(flagsContainer);

  // פונקציה ליצירת דגל מרחף
  function createFlag() {
    const flag = document.createElement("div");
    flag.className = "flag";
    flag.textContent = FLAGS[Math.floor(Math.random() * FLAGS.length)];

    // מיקום רנדומלי
    flag.style.left = Math.random() * 100 + "%";

    // מהירות רנדומלית בין 10 ל-20 שניות
    flag.style.animationDuration = 10 + Math.random() * 10 + "s";

    // השהייה רנדומלית בין 0 ל-3 שניות
    flag.style.animationDelay = Math.random() * 3 + "s";

    // גודל רנדומלי
    const size = 2 + Math.random() * 1; // בין 2 ל-3 rem
    flag.style.fontSize = size + "rem";

    // סיבוב רנדומלי התחלתי
    flag.style.transform = `rotate(${Math.random() * 360}deg)`;

    flagsContainer.appendChild(flag);

    // הסרת הדגל אחרי שהאנימציה מסתיימת
    flag.addEventListener("animationend", () => {
      flag.remove();
    });
  }

  // יצירת דגלים חדשים כל 1.5 שניות במקום 2
  setInterval(createFlag, 1500);

  // יצירת יותר דגלים התחלתיים
  for (let i = 0; i < 15; i++) {
    setTimeout(createFlag, Math.random() * 3000);
  }
});

function openImageModal(element) {
  const img = element.querySelector("img");
  const modalImg = document.getElementById("modalImage");
  modalImg.src = img.src;

  const imageModal = new bootstrap.Modal(document.getElementById("imageModal"));
  imageModal.show();
}

function reveal() {
  const reveals = document.querySelectorAll(
    ".reveal, .reveal-left, .reveal-right"
  );

  reveals.forEach((element) => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      element.classList.add("active");
    }
  });
}

window.addEventListener("scroll", reveal);
reveal(); // Run on page load
