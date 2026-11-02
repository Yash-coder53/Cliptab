/* ==========================================
   CLIPTAB AGENCY - MAIN SCRIPT
   ========================================== */

(function () {
    'use strict';

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

    /* ==========================================
       2. MOBILE MENU TOGGLE
       ========================================== */
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.preventDefault();
            mobileMenu.classList.toggle('active');

            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                if (mobileMenu.classList.contains('active')) {
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
                mobileMenu.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    /* ==========================================
       3. CONTACT FORM HANDLER
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

            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i> Sending...';

            setTimeout(() => {
                const subject = encodeURIComponent(`New Project Inquiry from ${name}`);
                const body = encodeURIComponent(`Hi Cliptab Team,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\n---\nSent from cliptab website contact form.`);
                
                contactForm.classList.add('hidden');
                successState.classList.remove('hidden');
                successState.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                window.location.href = `mailto:cliptabagency@gmail.com?subject=${subject}&body=${body}`;
            }, 1200);
        });
    }

    /* ==========================================
       4. HEADER SCROLL EFFECT & NAV HIGHLIGHT
       ========================================== */
    const header = document.querySelector('.site-header');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        let current = '';
        const scrollPos = window.scrollY + 120;
        
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove('text-red-600');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('text-red-600');
            }
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '#home') return;
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

})();
