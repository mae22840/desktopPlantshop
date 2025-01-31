function singleAddToCart(){
    // Referenz zur WarenkorbSumme
    const cartCountElement = document.getElementById("cart-count");
       
    cartCountElement.textContent++;  
    console.log('Warenkorb-Zähler incremented');
}

// Back-Button Scrollposition
const backButton = document.querySelector(".back-button");
backButton.addEventListener("click", () => {
    const scrollPosition = window.scrollY;
    sessionStorage.setItem("scrollPosition", scrollPosition);
});

// Scroll-Position wiederherstellen beim Laden der Seite
window.addEventListener("load", () => {
    const scrollPosition = sessionStorage.getItem("scrollPosition");
    if (scrollPosition) {
        window.scrollTo(0, parseInt(scrollPosition, 10));
    }
});

// Quantity Button
var a = 1;

document.addEventListener("DOMContentLoaded", () => {
    const plus = document.querySelector(".quantity-increase");
    const minus = document.querySelector(".quantity-decrease");
    const num = document.querySelector(".quantity-value");

    if (!plus || !minus || !num) {
        console.error("Ein oder mehrere Elemente wurden nicht gefunden.");
        return;
    }

    plus.addEventListener("click", () => {
        a++;
        a = a < 10 ? "0" + a : a;
        num.textContent = a;
        console.log(`Erhöht: ${a}`);
    });

    minus.addEventListener("click", () => {
        if (a > 1) {
            a--;
            a = a < 10 ? "0" + a : a;
            num.textContent = a;
            console.log(`Verringert: ${a}`);
        }
    });
});

// Warenkorb Icon
document.addEventListener("DOMContentLoaded", () => {
    // Referenz zum Warenkorb-Zähler
    const cartCountElement = document.getElementById("cart-count");
    let cartCount = 0; // Startwert des Warenkorbs

    // Den Button mit der Klasse "cart-button" auswählen
    const addToCartButton = document.querySelector(".cart-button");

    // Überprüfen, ob der Button existiert
    if (!addToCartButton) {
        console.error("Der Button mit der Klasse 'cart-button' wurde nicht gefunden!");
        return;
    }

    // Event Listener für den Button hinzufügen
    addToCartButton.addEventListener("click", () => {
        cartCount= cartCount + parseInt(a); // Zähler erhöhen
        cartCountElement.textContent = cartCount; // Zähler im DOM aktualisieren
        console.log(`Warenkorb-Zähler: ${cartCount}`); // Debugging-Ausgabe
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const filterButton = document.getElementById("filter-button");
    const filterContainer = document.querySelector(".filter-container");
    const closeButton = document.querySelector(".close-button");

    // Funktion zum Anzeigen des Filters
    const showFilter = () => {
        const buttonRect = filterButton.getBoundingClientRect();
        filterContainer.style.position = "absolute";
        filterContainer.style.top = `${buttonRect.bottom + window.scrollY}px`;
        filterContainer.style.left = `${buttonRect.left + window.scrollX}px`;
        filterContainer.style.display = "flex";
        filterButton.style.visibility = "hidden";
    };

    // Funktion zum Verstecken des Filters
    const hideFilter = () => {
        filterContainer.style.display = "none";
        filterButton.style.visibility = "visible";
    };

    // Scroll-Event hinzufügen
    window.addEventListener("scroll", () => {
        const scrollY = window.scrollY;
        const moveSpeed = 0; // Geschwindigkeit, wie schnell der Button mitbewegt wird

        // Berechne die Verschiebung des Buttons basierend auf dem Scrollwert
        const moveDistance = scrollY * moveSpeed;

        // Fixiere den Button relativ zum Bildschirm
        filterButton.style.position = "fixed";
        
        // Setze die vertikale Position des Buttons so, dass er mit dem Scrollen mitgeht
        const buttonOffsetTop = Math.min(moveDistance, window.innerHeight - filterButton.offsetHeight);

        // Wenn der Button noch innerhalb des sichtbaren Bereichs ist, bleibe er sichtbar
        filterButton.style.top = `${buttonOffsetTop}px`;
    });

    // Event Listener für den Filter-Button
    filterButton.addEventListener("click", showFilter);

    // Event Listener für den Close-Button
    closeButton.addEventListener("click", hideFilter);
});

// Klick auf Bird-Product zur Einzelansicht
document.addEventListener("DOMContentLoaded", function () {
    // Ziel: Bird of Paradise Card
    const birdCard = document.querySelector('.plant-card:nth-child(1)'); // Erste Card in der Liste
    
    if (birdCard) {
        birdCard.addEventListener("click", function () {
            // Weiterleitung zur Bird Plant HTML
            window.location.href = "birdplant.html";
        });
    } else {
        console.error("Bird of Paradise card not found.");
    }
});

// Suchleiste
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.searchbar'); // Suchfeld
    const plantCards = document.querySelectorAll('.plant-card'); // Produktkarten

    // Filterfunktion für die Suchleiste
    searchInput.addEventListener('input', (e) => {
        const searchText = e.target.value.toLowerCase(); // Suchtext (kleingeschrieben)
        
        plantCards.forEach(card => {
            const commonName = card.querySelector('.common-name').textContent.toLowerCase(); // Allgemeiner Name
            const scientificName = card.querySelector('.scientific-name').textContent.toLowerCase(); // Wissenschaftlicher Name
            
            // Prüfen, ob der Suchtext in einem der beiden Namen enthalten ist
            if (commonName.includes(searchText) || scientificName.includes(searchText)) {
                card.style.display = 'flex'; // Zeige passende Karten
            } else {
                card.style.display = 'none'; // Verstecke unpassende Karten
            }
        });
    });
});

// Filter
document.addEventListener("DOMContentLoaded", () => {
    const plantCards = document.querySelectorAll(".plant-card");
    const sizeFilters = document.querySelectorAll('input[name="size"]');
    const familyFilters = document.querySelectorAll('input[name="family"]');
    const lightFilters = document.querySelectorAll('input[name="light"]');
    const waterFilters = document.querySelectorAll('input[name="water"]');

    // Filterfunktion
    function filterPlants() {
        plantCards.forEach(card => {
            // Attributwerte der Karte
            const size = card.getAttribute('data-size').toLowerCase();
            const family = card.getAttribute('data-family').toLowerCase();
            const light = card.getAttribute('data-light').toLowerCase();
            const water = card.getAttribute('data-water').toLowerCase();
    
            // Helper-Funktion für Filterlogik
            const isMatch = (filters, value) => 
                !Array.from(filters).some(input => input.checked) || 
                Array.from(filters).some(input => input.checked && input.value.toLowerCase() === value);
    
            // Überprüfen, ob die Karte in allen Kategorien passt
            const sizeMatch = isMatch(sizeFilters, size);
            const familyMatch = isMatch(familyFilters, family);
            const lightMatch = isMatch(lightFilters, light);
            const waterMatch = isMatch(waterFilters, water);
    
            // Karte anzeigen oder ausblenden
            card.style.display = sizeMatch && familyMatch && lightMatch && waterMatch ? 'block' : 'none';
        });
    }

    // Event-Listener für Checkboxen
    sizeFilters.forEach(filter => filter.addEventListener('change', filterPlants));
    familyFilters.forEach(filter => filter.addEventListener('change', filterPlants));
    lightFilters.forEach(filter => filter.addEventListener('change', filterPlants));
    waterFilters.forEach(filter => filter.addEventListener('change', filterPlants));

    // Rufe initial die Filter-Logik auf
    initializeFilters();
    filterPlants();
});
