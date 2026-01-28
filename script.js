// Menú responsive
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');
    const body = document.body;
    
    // Toggle del menú móvil
    menuToggle.addEventListener('click', function() {
        mainNav.classList.toggle('active');
        menuToggle.classList.toggle('active');
        body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
    });
    
    // Cerrar menú al hacer clic en un enlace
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mainNav.classList.remove('active');
            menuToggle.classList.remove('active');
            body.style.overflow = '';
        });
    });
    
    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', function(event) {
        if (!mainNav.contains(event.target) && !menuToggle.contains(event.target) && mainNav.classList.contains('active')) {
            mainNav.classList.remove('active');
            menuToggle.classList.remove('active');
            body.style.overflow = '';
        }
    });
    
    
    // Efecto de scroll suave para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Efecto de animación al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observar elementos para animación
    document.querySelectorAll('.service-card, .help-card, .contact-card').forEach(el => {
        observer.observe(el);
    });
    
    // Inicializar mapa
    initializeMap();
    
    // Cambiar estilo del header al hacer scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.padding = '5px 0';
            header.style.boxShadow = '0 5px 20px rgba(44, 62, 80, 0.15)';
        } else {
            header.style.padding = '15px 0';
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
    });
});

// Función para inicializar el mapa
function initializeMap() {
    const bredLat = 19.2350221;
    const bredLng = -103.7340239;
    
    // Crear el mapa
    const map = L.map('map').setView([bredLat, bredLng], 16);
    
    // Agregar capa de mapa base
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    
    // Icono personalizado
    const bredIcon = L.divIcon({
        html: `<div style="background: linear-gradient(135deg, #27ae60, #3498db); color: white; width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; border: 3px solid white; box-shadow: 0 0 10px rgba(0,0,0,0.3);"><i class="fas fa-tshirt"></i></div>`,
        className: 'bred-marker',
        iconSize: [50, 50],
        iconAnchor: [25, 50],
        popupAnchor: [0, -45]
    });
    
    // Agregar marcador personalizado
    L.marker([bredLat, bredLng], {icon: bredIcon})
        .addTo(map)
        .bindPopup(`
            <div style="text-align: center; padding: 10px;">
                <h3 style="margin: 0 0 10px; color: #2c3e50;"><b>BRED - COLIMA IAP</b></h3>
                <p style="margin: 5px 0;">Calle Medellín #585</p>
                <p style="margin: 5px 0;">Colonia Popular, Colima</p>
                <p style="margin: 5px 0;">Tel: 312 554 4355</p>
                <a href="https://maps.google.com/?q=19.2350221,-103.7340239" target="_blank" style="display: inline-block; background: #27ae60; color: white; padding: 5px 15px; border-radius: 4px; text-decoration: none; margin-top: 10px;">Abrir en Google Maps</a>
            </div>
        `)
        .openPopup();
    
    // Agregar círculo para destacar la ubicación
    L.circle([bredLat, bredLng], {
        color: '#27ae60',
        fillColor: '#3498db',
        fillOpacity: 0.1,
        radius: 150
    }).addTo(map);
}