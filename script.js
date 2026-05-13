document.addEventListener('DOMContentLoaded', () => {
    // 1. MOBILE MENU LOGIC (FIXED REDIRECTS)
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const mobileOverlay = document.getElementById('mobile-menu-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    const menuIcon = document.getElementById('menu-icon-toggle');

    let isMenuOpen = false;

    const toggleMenu = (forceClose = null) => {
        isMenuOpen = forceClose !== null ? !forceClose : !isMenuOpen;
        
        if (isMenuOpen) {
            mobileOverlay.classList.remove('translate-y-full', 'opacity-0');
            mobileOverlay.classList.add('translate-y-0', 'opacity-100');
            menuIcon.classList.replace('ph-list', 'ph-x');
            document.body.style.overflow = 'hidden';
        } else {
            mobileOverlay.classList.add('translate-y-full', 'opacity-0');
            mobileOverlay.classList.remove('translate-y-0', 'opacity-100');
            menuIcon.classList.replace('ph-x', 'ph-list');
            document.body.style.overflow = '';
        }
    };

    if (mobileToggle) {
        mobileToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });
    }

    // Fixed Link Click logic for Mobile
    mobileLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const target = document.querySelector(targetId);
            
            // 1. Close Menu First
            toggleMenu(true); 

            // 2. Scroll after a tiny delay to allow the menu to start closing
            if (target) {
                setTimeout(() => {
                    const headerHeight = 80;
                    window.scrollTo({
                        top: target.offsetTop - headerHeight,
                        behavior: 'smooth'
                    });
                }, 100); 
            }
        });
    });

    // 2. HEADER SCROLL STATE
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            header.classList.add('bg-zinc-950/80', 'backdrop-blur-2xl', 'border-b', 'border-zinc-800/50', 'py-4');
            header.classList.remove('py-6');
        } else {
            header.classList.remove('bg-zinc-950/80', 'backdrop-blur-2xl', 'border-b', 'border-zinc-800/50', 'py-4');
            header.classList.add('py-6');
        }
    }, { passive: true });

    // 3. REVEAL ON SCROLL
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    reveals.forEach(r => observer.observe(r));

    // 4. FORM HANDLING
    const form = document.getElementById('valenteForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            btn.innerText = 'ENVIANDO...';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerText = 'PROTOCOLO ENVIADO';
                btn.classList.replace('bg-white', 'bg-emerald-500');
                btn.classList.add('text-white');
                form.reset();
                
                setTimeout(() => {
                    btn.innerText = 'ENVIAR NOVO PROTOCOLO';
                    btn.classList.replace('bg-emerald-500', 'bg-white');
                    btn.classList.remove('text-white');
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }
});
