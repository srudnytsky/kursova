// index.js — основной скрипт для главной страницы (kursova)

// Ждём полной загрузки DOM
document.addEventListener("DOMContentLoaded", () => {
  // ────────────────────────────────────────────────
  // Фильтры (Muscles / Body parts / Equipment)
  // ────────────────────────────────────────────────
  const filterButtons = document.querySelectorAll(".filter-btn");
  const exerciseCards  = document.querySelectorAll(".exercise-card");

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      // убираем active у всех кнопок
      filterButtons.forEach(btn => btn.classList.remove("active"));
      // добавляем active текущей
      button.classList.add("active");

      const selectedFilter = button.getAttribute("data-filter");

      exerciseCards.forEach(card => {
        const cardFilter = card.getAttribute("data-filter");

        if (selectedFilter === "all" || cardFilter === selectedFilter) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // ────────────────────────────────────────────────
  // Пагинация (только переключение active-класса)
  // ────────────────────────────────────────────────
  document.querySelectorAll(".page-btn").forEach(button => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".page-btn").forEach(btn => {
        btn.classList.remove("active");
      });
      button.classList.add("active");
      // Если нужна реальная смена контента — добавьте логику здесь
    });
  });

  // ────────────────────────────────────────────────
  // Форма подписки + уведомление
  // ────────────────────────────────────────────────
  const subscribeForm = document.getElementById("subscribe-form");

  if (subscribeForm) {
    subscribeForm.addEventListener("submit", e => {
      e.preventDefault();

      const emailInput = subscribeForm.querySelector("input");
      const email = emailInput?.value?.trim();

      if (!email || !isValidEmail(email)) {
        showNotification("Please enter a valid email address!", "error");
        return;
      }

      // имитация успешной отправки
      setTimeout(() => {
        showNotification(`Thank you! You've been subscribed with: ${email}`, "success");
        subscribeForm.reset();
      }, 500);
    });
  }

  // ────────────────────────────────────────────────
  // Динамическое добавление ссылки "Favorites" в навигацию
  // ────────────────────────────────────────────────
  addFavoritesLinkToNav();
});

// ────────────────────────────────────────────────
// Вспомогательные функции
// ────────────────────────────────────────────────

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showNotification(message, type = "info") {
  // Удаляем предыдущее уведомление, если есть
  const oldNotification = document.querySelector(".notification");
  if (oldNotification) oldNotification.remove();

  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.textContent = message;

  // Стили (можно вынести в CSS позже)
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: ${type === "success" ? "#4CAF50" : "#f44336"};
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    z-index: 1000;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    animation: slideInRight 0.3s ease;
  `;

  document.body.appendChild(notification);

  // Анимация (тоже можно вынести в CSS)
  const style = document.createElement("style");
  style.textContent = `
    @keyframes slideInRight {
      from { transform: translateX(100%); opacity: 0; }
      to   { transform: translateX(0);    opacity: 1; }
    }
  `;
  document.head.appendChild(style);

  // Автозакрытие через 3 секунды
  setTimeout(() => {
    if (notification.parentNode) {
      notification.remove();
    }
  }, 3000);
}

function addFavoritesLinkToNav() {
  const navLinks = document.querySelectorAll(".nav-link");

  // Проверяем, что есть хотя бы 2 ссылки и это именно главная/упражнения
  if (navLinks.length >= 2 &&
      navLinks[0].href.includes("index.html") &&
      navLinks[1].href.includes("exercises.html")) {

    // Если "Favorites" ещё нет — добавляем
    if (!document.querySelector('a[href="./favorites.html"]')) {
      const favoritesLink = document.createElement("a");
      favoritesLink.href = "./favorites.html";
      favoritesLink.className = "nav-link";
      favoritesLink.textContent = "Favorites";

      // Вставляем после "Exercises"
      navLinks[1].parentNode.insertBefore(favoritesLink, navLinks[1].nextSibling);
    }
  }
}
