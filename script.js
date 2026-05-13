document.addEventListener('DOMContentLoaded', () => {
    // Elegant Cursor Logic
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    const links = document.querySelectorAll('a, button, input, textarea');

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });

    const animateCursor = () => {
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';
        requestAnimationFrame(animateCursor);
    };
    animateCursor();

    // Hover effects for the refined cursor
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            follower.style.transform = 'scale(1.5)';
            follower.style.backgroundColor = 'rgba(184, 158, 117, 0.1)';
            cursor.style.transform = 'scale(0)';
        });
        link.addEventListener('mouseleave', () => {
            follower.style.transform = 'scale(1)';
            follower.style.backgroundColor = 'transparent';
            cursor.style.transform = 'scale(1)';
        });
    });

    // Intersection Observer for the "Luxury Reveal"
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    reveals.forEach(r => observer.observe(r));

    // Form Simulation
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            btn.innerText = 'Processando...';
            
            setTimeout(() => {
                btn.innerText = 'Solicitação Recebida';
                btn.style.borderColor = '#B89E75';
                btn.style.color = '#B89E75';
                form.reset();
            }, 2000);
        });
    }

    // Parallax on Image Frame
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const frame = document.querySelector('.image-frame div');
        if (frame) {
            frame.style.transform = `scale(${1 + scrolled * 0.0002}) translateY(${scrolled * 0.05}px)`;
        }
    });
});
