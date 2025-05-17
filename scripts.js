// Módulo para la carta de Tarot
const TarotCard = (function() {
  // Variables privadas
  let tarotCard = null;
  let isScrolling = false;
  
  // Función para manejar el clic en la carta
  function handleCardClick() {
    if (isScrolling) return;
    
    // Desactivar temporalmente la rotación infinita
    tarotCard.style.animation = "none";
    
    // Forzar reinicio del DOM para aplicar nueva animación
    void tarotCard.offsetWidth; // hack para reiniciar animación
    
    // Aplicar animación de rotación completa
    tarotCard.style.animation = "rotateCardClick 1s ease forwards";
    
    // Indicar que estamos en proceso de scroll
    isScrolling = true;
    
    // Desplazar hacia abajo después de un breve retraso
    setTimeout(() => {
      scrollToSection();
      
      // Restaurar la rotación lenta después de completar el scroll
      setTimeout(() => {
        tarotCard.style.animation = "rotateCardSlow 10s linear infinite";
        isScrolling = false;
      }, 1200);
    }, 900);
  }
  
  // Función para desplazarse a la sección de tiradas
  function scrollToSection() {
    const readingsSection = document.getElementById("readings-section");
    readingsSection.scrollIntoView({ behavior: "smooth" });
  }
  
  // Inicialización
  function init() {
    tarotCard = document.getElementById("tarot-card");
    if (tarotCard) {
      tarotCard.addEventListener("click", handleCardClick);
      console.log("Carta de Tarot inicializada correctamente");
    } else {
      console.error("No se encontró el elemento de la carta de tarot");
    }
  }
  
  // API pública
  return {
    init: init
  };
})();

// Módulo para manejar las pestañas
const TabSystem = (function() {
  function init() {
    document.querySelectorAll('.tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const tabId = tab.dataset.tab;
        
        // Resetear todas las pestañas
        document.querySelectorAll('.tab, .tab-content').forEach(el => {
          el.classList.remove('active');
        });
        
        // Activar la actual
        tab.classList.add('active');
        const content = document.querySelector(`.tab-content[data-tab-content="${tabId}"]`);
        if(content) {
          content.classList.add('active');
          initializeCards(tabId); // Inicializar cartas para esta pestaña
        }
      });
    });
    
    // Inicializar la pestaña 1 por defecto
    const defaultTab = document.querySelector('.tab[data-tab="1"]');
    if(defaultTab) defaultTab.click();
  }
  
  function initializeCards(tabId) {
    const cardCount = getCardCountForTab(tabId);
    const container = document.querySelector(`.tab-content[data-tab-content="${tabId}"] .cards-display`);
    
    if(container) {
      // Limpiar contenedor
      container.innerHTML = '';
      
      // Crear slots de cartas
      for(let i = 0; i < cardCount; i++) {
        const slot = document.createElement('div');
        slot.className = 'card-slot';
        container.appendChild(slot);
      }
    }
  }
  
  function getCardCountForTab(tabId) {
    // Define cuántas cartas debe tener cada tirada
    const cardsPerTab = {
      '1': 5,  // Tirada 1: 5 cartas
      '2': 5,  // Tirada 2: 5 cartas
      '3': 3,  // Tirada 3: 3 cartas
      '4': 4,  // Tirada 4: 4 cartas
      '5': 5   // Tirada 5: 5 cartas
    };
    return cardsPerTab[tabId] || 0;
  }
  
  return {
    init: init
  };
})();

// Modifica tu App.init para incluir TabSystem
const App = (function() {
  function init() {
    document.addEventListener("DOMContentLoaded", function() {
      TarotCard.init();
      TabSystem.init(); // <-- Añade esta línea
      console.log("Aplicación inicializada correctamente");
    });
  }
  
  return {
    init: init
  };
})();

// Iniciar la aplicación
App.init();