document.addEventListener("DOMContentLoaded", function() {
    // Generate QR code for the current URL when the modal is opened
    const qrModal = document.getElementById('qrModal');
    if (qrModal) {
        qrModal.addEventListener('show.bs.modal', function () {
            // Get current URL
            const currentUrl = window.location.href;
            
            // Generate QR code using API
            const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(currentUrl)}&margin=15&color=0284c7`;
            
            // Set image source
            const qrImage = document.getElementById('qrCodeImage');
            qrImage.src = qrImageUrl;
            
            // Handle loading state
            qrImage.onload = function() {
                document.getElementById('qrLoading').style.display = 'none';
                qrImage.style.display = 'block';
            };
        });
        
        // Reset state when hidden
        qrModal.addEventListener('hidden.bs.modal', function () {
            const qrImage = document.getElementById('qrCodeImage');
            qrImage.style.display = 'none';
            qrImage.src = '';
            document.getElementById('qrLoading').style.display = 'block';
        });
    }

    // Initialize SPA navigation
    setupSPA();
    
    // Initial image zoom setup
    setupImageZoom();
});

// Single Page Application (SPA) Logic
function setupSPA() {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const mainContent = document.querySelector('main');
    
    if (!mainContent) return;

    // Handle clicks on navbar links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Don't intercept links with target blank (like external videos) or links that don't start with /
            const href = this.getAttribute('href');
            if (!href.startsWith('/')) return;

            e.preventDefault();
            
            // Update active state in UI
            navLinks.forEach(l => l.parentElement.classList.remove('active'));
            this.parentElement.classList.add('active');
            
            // Close mobile navbar if open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                if (bsCollapse) bsCollapse.hide();
            }
            
            // Load the new page
            loadPage(href);
        });
    });
    
    // Handle browser back/forward buttons
    window.addEventListener('popstate', function() {
        loadPage(window.location.pathname, false);
    });
    
    // Core function to fetch and replace content
    function loadPage(url, pushState = true) {
        // Visual feedback
        mainContent.style.opacity = '0.4';
        mainContent.style.transition = 'opacity 0.3s ease';

        fetch(url)
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.text();
            })
            .then(html => {
                // Parse the fetched HTML
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const newMainContent = doc.querySelector('main').innerHTML;
                
                // Replace content
                mainContent.innerHTML = newMainContent;
                
                // Setup interactivity on new content
                setupImageZoom();
                
                // Fade back in
                mainContent.style.opacity = '1';
                
                // Scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
                
                // Update browser URL without reloading
                if (pushState) {
                    window.history.pushState({}, '', url);
                }
            })
            .catch(error => {
                console.error('Lỗi khi tải trang:', error);
                mainContent.style.opacity = '1';
                // Fallback to traditional navigation if fetch fails
                window.location.href = url;
            });
    }
}

// Function to setup image click-to-zoom feature
function setupImageZoom() {
    // Select all images in content area, except those explicitly excluded
    const images = document.querySelectorAll('main img.img-fluid:not(.no-zoom)');
    
    if (images.length === 0) return;
    
    // Try to get or create the modal instance
    const modalEl = document.getElementById('imagePreviewModal');
    if (!modalEl) return;
    
    // Add classes and event listeners to images
    const previewImage = document.getElementById('previewImage');
    
    images.forEach(img => {
        // Add zoomable class for CSS styling
        img.classList.add('zoomable');
        
        // Add title tooltip to give a hint
        if (!img.hasAttribute('title')) {
            img.setAttribute('title', 'Bấm vào để phóng to');
        }
        
        // Clone and replace to avoid duplicate event listeners if called multiple times
        const newImg = img.cloneNode(true);
        img.parentNode.replaceChild(newImg, img);
        
        newImg.addEventListener('click', function() {
            previewImage.src = this.src;
            const previewModal = new bootstrap.Modal(modalEl);
            previewModal.show();
        });
    });
}
