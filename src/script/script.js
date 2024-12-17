/*PARCOURS ACADEMIQUE */
                  
                  // Sélectionne les éléments nécessaires
                  const lightbox = document.getElementById("lightbox");
                  const lightboxImg = document.getElementById("lightbox-img");
                  const lightboxClose = document.getElementById("lightbox-close");
                  const clickableImages = document.querySelectorAll(".clickable");
                  
                  // Ouvrir la lightbox quand on clique sur une image
                  clickableImages.forEach(image => {
                      image.addEventListener("click", (e) => {
                          e.preventDefault(); // Prevent default link behavior
                          lightbox.style.display = "flex";
                          lightboxImg.src = image.src; // Charger l'image cliquée
                      });
                  });
                  
                  // Fermer la lightbox quand on clique sur le bouton de fermeture
                  lightboxClose.addEventListener("click", () => {
                      lightbox.style.display = "none";
                  });
                  
                  // Fermer la lightbox quand on clique en dehors de l'image
                  lightbox.addEventListener("click", (e) => {
                      if (e.target === lightbox) {
                          lightbox.style.display = "none";
                      }
                  });
                  
