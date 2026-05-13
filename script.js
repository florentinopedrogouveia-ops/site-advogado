document.addEventListener('DOMContentLoaded', () => {
    // 1. HEADER SCROLL STATE
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }, { passive: true });

    // 2. REVEAL ORCHESTRATION (Taste-Skill Rule 69)
    const revealElements = document.querySelectorAll('.reveal');
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add a small staggered delay based on appearance order if needed
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 50); 
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    // 3. SMOOTH NAVIGATION
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                const headerHeight = header.offsetHeight;
                window.scrollTo({
                    top: target.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. FORM HANDLING & TACTILE FEEDBACK (Taste-Skill Rule 58)
    const form = document.getElementById('valenteForm');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;
            
            // Loading State
            submitBtn.innerText = 'PROCESSANDO...';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';

            // Simulate Network Delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Success State
            submitBtn.innerText = 'SOLICITAÇÃO ENVIADA';
            submitBtn.style.backgroundColor = '#10b981'; // Emerald-500
            submitBtn.style.color = '#ffffff';
            
            form.reset();

            setTimeout(() => {
                submitBtn.innerText = originalText;
                submitBtn.style.backgroundColor = '';
                submitBtn.style.color = '';
                submitBtn.disabled = false;
                submitBtn.style.opacity = '';
            }, 3000);
        });
    }

    // 5. PARALLAX MICRO-PHYSICS (Taste-Skill Rule 154)
    // Subtle movement on the hero image for a "premium" feel
    const heroImage = document.querySelector('.group img');
    if (heroImage) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            if (scrolled < window.innerHeight) {
                heroImage.style.transform = `scale(1.05) translateY(${scrolled * 0.1}px)`;
            }
        }, { passive: true });
    }
});
