/* ==========================================
   CLIPTAB AGENCY - MAIN SCRIPT
   ========================================== */

(function () {
    'use strict';

    /* ==========================================
       0. SITE CONFIG (single source of truth)
       ========================================== */
    const SITE = {
        email: 'cliptabagency@gmail.com',
        telegram: 'https://t.me/CliptabSupport',
        instagram: 'https://www.instagram.com/cliptabagency?stkn=MThsZ2FpZHUwaXhxdA==',
        whatsapp: 'https://chat.whatsapp.com/KZesYh4RmDz6dwvCTWkZmb'
    };

    // Expose for debugging (optional)
    window.CliptabConfig = SITE;

    /* ==========================================
       1. TAB SWITCHING SYSTEM (SERVICES)
       ========================================== */
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    function activateTab(tabId) {
        tabContents.forEach((content) => content.classList.remove('active'));

        tabButtons.forEach((btn) => {
            btn.classList.remove('active-tab', 'bg-red-600', 'text-white', 'shadow-md');
            btn.classList.add('bg-gray-100', 'text-gray-600');
        });

        const targetContent = document.getElementById(tabId);
        if (targetContent) targetContent.classList.add('active');

        const activeButton = Array.from(tabButtons).find(
            (btn) => btn.dataset.tab === tabId
        );

        if (activeButton) {
            activeButton.classList.remove('bg-gray-100', 'text-gray-600');
            activeButton.classList.add('active-tab', 'bg-red-600', 'text-white', 'shadow-md');
        }
    }

    tabButtons.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const tabId = btn.dataset.tab;
            if (tabId) activateTab(tabId);
        });
    });

    // Ensure the initial tab has the correct active style
    const initialActiveBtn = document.querySelector('.tab-btn[data-tab="web-dev"]');
    if (initialActiveBtn) {
        initialActiveBtn.classList.add('active-tab', 'bg-red-600', 'text-white', 'shadow-md');
        initialActiveBtn.classList.remove('bg-gray-100', 'text-gray-600');
    }

    /* ==========================================
       2. CONTACT FORM HANDLER
       ========================================== */
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const successState = document.getElementById('successState');

    if (contactForm && submitBtn && successState) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('name')?.value.trim();
            const email = document.getElementById('email')?.value.trim();
            const message = document.getElementById('message')?.value.trim();

            if (!name || !email || !message) {
                alert('Please fill out all fields.');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // Show sending state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i> Sending...';

            // --- OPTION A: Open the user's email client with prefilled mailto ---
            // (Because static hosting cannot send emails directly)
            setTimeout(() => {
                const subject = encodeURIComponent(`New Project Inquiry from ${name}`);
                const body = encodeURIComponent(
                    `Hi Cliptab Team,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\n---\nSent from cliptab website contact form.`
                );
                const mailtoLink = `mailto:${SITE.email}?subject=${subject}&body=${body}`;

                // Redirect to mail client
                window.location.href = mailtoLink;

                // Show success state regardless
                contactForm.classList.add('hidden');
                successState.classList.remove('hidden');
                successState.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 1200);
        });
    }

    /* ==========================================
       3. MOBILE MENU TOGGLE
       ========================================== */
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('open');

            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                if (mobileMenu.classList.contains('open')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });

        const mobileLinks = document.querySelectorAll('.mobile-link');
        mobileLinks.forEach((link) => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('open');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    /* ==========================================
       4. HEADER SCROLL EFFECT
       ========================================== */
    const header = document.querySelector('.site-header');

    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    /* ==========================================
       5. SMOOTH SCROLL FOR ANCHOR LINKS
       ========================================== */
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach((link) => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '#home') return;

            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    /* ==========================================
       6. ACTIVE NAV LINK ON SCROLL
       ========================================== */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveNavLink() {
        const scrollPos = window.scrollY + 120;

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach((link) => {
                    link.classList.remove('text-red-600');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('text-red-600');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);

    /* ==========================================
       7. CONSOLE BRANDING
       ========================================== */
    console.log(
        '%cCliptab Agency %c— Build. Automate. Scale.',
        'color:#dc2626;font-weight:900;font-size:16px;',
        'color:#71717a;font-size:12px;'
    );

    console.log(
        '%c📬 Contact: ' + SITE.email + '\n' +
        '✈️  Telegram: ' + SITE.telegram + '\n' +
        '📷 Instagram: ' + SITE.instagram + '\n' +
        '💬 WhatsApp: ' + SITE.whatsapp,
        'color:#dc2626;font-size:12px;'
    );
})();
