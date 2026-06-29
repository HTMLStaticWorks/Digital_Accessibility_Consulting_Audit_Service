document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Toggling
    const themeBtns = document.querySelectorAll('.theme-toggle-btn');
    const currentTheme = localStorage.getItem('theme') || 'light';

    const updateThemeIcon = (isDark) => {
        themeBtns.forEach(btn => {
            btn.innerHTML = isDark ? '<i class="bi bi-brightness-high" aria-hidden="true"></i>' : '<i class="bi bi-moon-stars" aria-hidden="true"></i>';
        });
    };

    if (currentTheme === 'dark') {
        document.body.classList.add('dark-theme');
        updateThemeIcon(true);
    } else {
        updateThemeIcon(false);
    }

    themeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            const isDark = document.body.classList.contains('dark-theme');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            updateThemeIcon(isDark);
        });
    });

    // 2. RTL Toggling
    const rtlBtns = document.querySelectorAll('.rtl-toggle-btn');
    const currentDir = localStorage.getItem('dir') || 'ltr';
    const bootstrapStyle = document.getElementById('bootstrap-style');

    const setRtl = (isRtl) => {
        if (isRtl) {
            document.body.setAttribute('dir', 'rtl');
            if (bootstrapStyle) {
                bootstrapStyle.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.rtl.min.css';
            }
            rtlBtns.forEach(btn => {
                btn.innerHTML = '<i class="bi bi-globe" aria-hidden="true"></i>';
            });
            localStorage.setItem('dir', 'rtl');
        } else {
            document.body.setAttribute('dir', 'ltr');
            if (bootstrapStyle) {
                bootstrapStyle.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css';
            }
            rtlBtns.forEach(btn => {
                btn.innerHTML = '<i class="bi bi-translate" aria-hidden="true"></i>';
            });
            localStorage.setItem('dir', 'ltr');
        }
    };

    // Initialize Direction
    setRtl(currentDir === 'rtl');

    rtlBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const isRtl = document.body.getAttribute('dir') === 'rtl';
            setRtl(!isRtl);
        });
    });

    // 3. Active Nav Link Highlighting
    const currentPath = window.location.pathname.split('/').pop() || 'home-1.html';
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // 4. Back to Top Button
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.style.display = 'flex';
            } else {
                backToTopBtn.style.display = 'none';
            }
        });
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 5. Password Toggle Visibility
    const togglePasswordIcons = document.querySelectorAll('.toggle-password-visibility');
    togglePasswordIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            const passwordField = document.getElementById(icon.getAttribute('data-target'));
            if (passwordField) {
                if (passwordField.type === 'password') {
                    passwordField.type = 'text';
                    icon.classList.remove('bi-eye');
                    icon.classList.add('bi-eye-slash');
                } else {
                    passwordField.type = 'password';
                    icon.classList.remove('bi-eye-slash');
                    icon.classList.add('bi-eye');
                }
            }
        });
    });
});
