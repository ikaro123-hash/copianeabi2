// NEABI Main JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu toggle
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  const menuOpen = document.getElementById("menu-open");
  const menuClose = document.getElementById("menu-close");

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", function () {
      mobileMenu.classList.toggle("hidden");
      if (menuOpen && menuClose) {
        menuOpen.classList.toggle("hidden");
        menuClose.classList.toggle("hidden");
      }
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Auto-hide alerts after 5 seconds
  const alerts = document.querySelectorAll(".alert");
  alerts.forEach(function (alert) {
    setTimeout(function () {
      if (alert.parentNode) {
        alert.style.opacity = "0";
        alert.style.transform = "translateY(-10px)";
        setTimeout(function () {
          if (alert.parentNode) {
            alert.parentNode.removeChild(alert);
          }
        }, 300);
      }
    }, 5000);
  });

  // Close alert buttons
  document.querySelectorAll(".alert .close-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const alert = this.closest(".alert");
      if (alert) {
        alert.style.opacity = "0";
        alert.style.transform = "translateY(-10px)";
        setTimeout(function () {
          if (alert.parentNode) {
            alert.parentNode.removeChild(alert);
          }
        }, 300);
      }
    });
  });

  // Form validation helpers
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // Contact form validation
  const contactForm = document.querySelector("#contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      const email = this.querySelector('input[type="email"]');
      const name = this.querySelector('input[name="name"]');
      const message = this.querySelector('textarea[name="message"]');

      let isValid = true;

      // Clear previous errors
      this.querySelectorAll(".error-message").forEach((el) => el.remove());
      this.querySelectorAll(".border-red-500").forEach((el) => {
        el.classList.remove("border-red-500");
        el.classList.add("border-gray-300");
      });

      // Validate name
      if (name && name.value.trim().length < 2) {
        showFieldError(name, "Nome deve ter pelo menos 2 caracteres");
        isValid = false;
      }

      // Validate email
      if (email && !validateEmail(email.value)) {
        showFieldError(email, "Email inválido");
        isValid = false;
      }

      // Validate message
      if (message && message.value.trim().length < 10) {
        showFieldError(message, "Mensagem deve ter pelo menos 10 caracteres");
        isValid = false;
      }

      if (!isValid) {
        e.preventDefault();
      }
    });
  }

  function showFieldError(field, message) {
    field.classList.remove("border-gray-300");
    field.classList.add("border-red-500");

    const errorDiv = document.createElement("div");
    errorDiv.className = "error-message text-red-500 text-sm mt-1";
    errorDiv.textContent = message;

    field.parentNode.appendChild(errorDiv);
  }

  // Search functionality
  const searchForms = document.querySelectorAll('form[role="search"]');
  searchForms.forEach(function (form) {
    const searchInput = form.querySelector(
      'input[type="search"], input[name="search"]',
    );
    if (searchInput) {
      // Add search icon animation
      searchInput.addEventListener("focus", function () {
        this.parentNode.classList.add("ring-2", "ring-amber-500");
      });

      searchInput.addEventListener("blur", function () {
        this.parentNode.classList.remove("ring-2", "ring-amber-500");
      });
    }
  });

  // Lazy loading for images
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove("lazy");
          observer.unobserve(img);
        }
      });
    });

    document.querySelectorAll("img[data-src]").forEach((img) => {
      imageObserver.observe(img);
    });
  }

  // Scroll to top button
  const scrollToTopBtn = document.querySelector("#scroll-to-top");
  if (scrollToTopBtn) {
    window.addEventListener("scroll", function () {
      if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.remove("hidden");
      } else {
        scrollToTopBtn.classList.add("hidden");
      }
    });

    scrollToTopBtn.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // Admin dashboard functionality
  if (document.querySelector(".admin-dashboard")) {
    // Auto-refresh stats every 30 seconds
    setInterval(function () {
      const statsElements = document.querySelectorAll("[data-stat]");
      if (statsElements.length > 0) {
        // In a real app, you'd fetch updated stats via AJAX
        console.log("Stats would be refreshed here");
      }
    }, 30000);
  }

  // Copy to clipboard functionality
  document.querySelectorAll(".copy-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const text = this.dataset.copy;
      navigator.clipboard.writeText(text).then(() => {
        // Show copied message
        const originalText = this.textContent;
        this.textContent = "Copiado!";
        setTimeout(() => {
          this.textContent = originalText;
        }, 1000);
      });
    });
  });

  // Print functionality
  document.querySelectorAll(".print-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      window.print();
    });
  });

  // Initialize tooltips (if needed)
  function initTooltips() {
    document.querySelectorAll("[data-tooltip]").forEach((element) => {
      element.addEventListener("mouseenter", function () {
        const tooltip = document.createElement("div");
        tooltip.className =
          "tooltip absolute bg-gray-900 text-white text-sm px-2 py-1 rounded z-50";
        tooltip.textContent = this.dataset.tooltip;
        document.body.appendChild(tooltip);

        const rect = this.getBoundingClientRect();
        tooltip.style.left =
          rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + "px";
        tooltip.style.top = rect.top - tooltip.offsetHeight - 5 + "px";
      });

      element.addEventListener("mouseleave", function () {
        document.querySelectorAll(".tooltip").forEach((tooltip) => {
          tooltip.remove();
        });
      });
    });
  }

  initTooltips();

  console.log("NEABI JavaScript loaded successfully");
});

// Utility functions
window.NEABI = {
  // Show notification
  showNotification: function (message, type = "info") {
    const notification = document.createElement("div");
    notification.className = `alert alert-${type} fixed top-4 right-4 z-50 max-w-sm`;
    notification.innerHTML = `
            <div class="flex items-start">
                <div class="flex-1">
                    <p class="text-sm">${message}</p>
                </div>
                <button class="close-btn ml-2 text-gray-400 hover:text-gray-600">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                    </svg>
                </button>
            </div>
        `;

    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.style.opacity = "0";
        setTimeout(() => {
          if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
          }
        }, 300);
      }
    }, 5000);

    // Close button functionality
    notification
      .querySelector(".close-btn")
      .addEventListener("click", function () {
        notification.style.opacity = "0";
        setTimeout(() => {
          if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
          }
        }, 300);
      });
  },

  // Format date
  formatDate: function (date, format = "dd/mm/yyyy") {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();

    switch (format) {
      case "dd/mm/yyyy":
        return `${day}/${month}/${year}`;
      case "mm/dd/yyyy":
        return `${month}/${day}/${year}`;
      case "yyyy-mm-dd":
        return `${year}-${month}-${day}`;
      default:
        return d.toLocaleDateString("pt-BR");
    }
  },
};
