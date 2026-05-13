document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor with Mix-Blend-Mode
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });

    const animate = () => {
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';
        requestAnimationFrame(animate);
    };
    animate();

    // Full Screen Nav Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const fullNav = document.querySelector('.full-nav');
    const navLinks = document.querySelectorAll('.nav-menu a');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        fullNav.classList.toggle('active');
        
        if (fullNav.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            fullNav.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // Scroll Reveal Stagger Logic
    const revealElements = document.querySelectorAll('.expertise-item, .editorial-text, .hero-title');
    
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'all 1s cubic-bezier(0.77, 0, 0.175, 1)';
        observer.observe(el);
    });

    // Form Submission
    const form = document.getElementById('valenteForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('.submit-btn');
            btn.innerHTML = 'ENVIANDO... <span>→</span>';
            
            setTimeout(() => {
                btn.innerHTML = 'RECEBIDO. <span>✔</span>';
                btn.style.background = '#0047FF';
                form.reset();
            }, 2000);
        });
    }

    // Dynamic Text Skew on Scroll
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const title = document.querySelector('.hero-title');
        if (title) {
            title.style.transform = `skewY(${scrolled * 0.01}deg)`;
        }
    });
});
