document.addEventListener('DOMContentLoaded', () => {
    // 1. HEADER SCROLL STATE
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('bg-zinc-950/80', 'backdrop-blur-xl', 'border-b', 'border-zinc-800/50', 'py-4');
            header.classList.remove('py-6');
        } else {
            header.classList.remove('bg-zinc-950/80', 'backdrop-blur-xl', 'border-b', 'border-zinc-800/50', 'py-4');
            header.classList.add('py-6');
        }
    }, { passive: true });

    // 2. REVEAL ORCHESTRATION
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    reveals.forEach(r => observer.observe(r));

    // 3. FORM HANDLING
    const form = document.getElementById('valenteForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            const original = btn.innerText;
            btn.innerText = 'ENVIANDO...';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerText = 'RECEBIDO';
                btn.classList.replace('bg-zinc-100', 'bg-emerald-500');
                btn.classList.add('text-white');
                form.reset();
                
                setTimeout(() => {
                    btn.innerText = original;
                    btn.classList.replace('bg-emerald-500', 'bg-zinc-100');
                    btn.classList.remove('text-white');
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }

    // 4. SMOOTH SCROLL
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
});
