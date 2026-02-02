// index.js — исправленный вариант без ESM импорта

document.addEventListener("DOMContentLoaded", () => {
  // Фильтры
  const filterButtons = document.querySelectorAll(".filter-btn");
  const exerciseCards = document.querySelectorAll(".exercise-card");

  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      // убираем active со всех кнопок
      filterButtons.forEach(b => b.classList.remove("active"));
      // добавляем active текущей
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");

      exerciseCards.forEach(card => {
        const cardFilter = card.getAttribute("data-filter");

        if (filter === "all" || cardFilter === filter) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // Пагинация (пока только смена active-класса)
  document.querySelectorAll(".page-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".page-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });

  // Форма подписки
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

      // Имитация отправки
      setTimeout(() => {
        showNotification(`Thank you! You've been subscribed with: ${email}`, "success");
        subscribeForm.reset();
      }, 500);
    });
  }

  // Динамическое добавление ссылки "Favorites" в навигацию
  addFavoritesLink();
});

// Вспомогательные функции

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showNotification(message, type = "info") {
  // Удаляем старое уведомление, если есть
  const old = document.querySelector(".notification");
  if (old) old.remove();

  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.textContent = message;

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

  // Анимация
  const style = document.createElement("style");
  style.textContent = `
    @keyframes slideInRight {
      from { transform: translateX(100%); opacity: 0; }
      to   { transform: translateX(0);    opacity: 1; }
    }
  `;
  document.head.appendChild(style);

  setTimeout(() => {
    if (notification.parentNode) notification.remove();
  }, 3000);
}

function addFavoritesLink() {
  const links = document.querySelectorAll(".nav-link");

  if (links.length >= 2 &&
      links[0].href.includes("index.html") &&
      links[1].href.includes("exercises.html")) {

    if (!document.querySelector('a[href="./favorites.html"]')) {
      const favLink = document.createElement("a");
      favLink.href = "./favorites.html";
      favLink.className = "nav-link";
      favLink.textContent = "Favorites";

      // Вставляем после Exercises
      links[1].parentNode.insertBefore(favLink, links[1].nextSibling);
    }
  }
}
