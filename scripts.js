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
  
  // Función para desplazarse a la segunda sección
  function scrollToSection() {
    const secondSection = document.getElementById("second-section");
    secondSection.scrollIntoView({ behavior: "smooth" });
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

// Módulo para manejar el DOM y eventos generales
const App = (function() {
  function init() {
    document.addEventListener("DOMContentLoaded", function() {
      // Inicializar componentes de la página
      TarotCard.init();
      
      console.log("Aplicación inicializada correctamente");
    });
  }
  
  return {
    init: init
  };
})();

// Iniciar la aplicación
App.init();