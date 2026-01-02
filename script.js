// ╔══════════════════════════════════════════════════════════════════════════╗
// ║          BAR SECURITY SYSTEM v3.0 - OPTIMIZED FOR SPEED                   ║
// ║     Advanced Protection & Maximum Network Performance                      ║
// ╚══════════════════════════════════════════════════════════════════════════╝

(function() {
    'use strict';
    
    // Network performance optimization
    if ('connection' in navigator) {
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        if (connection) {
            // Log network info for debugging (optional)
            console.log('%cNetwork Type: ' + connection.effectiveType, 'color: #667eea; font-weight: bold;');
        }
    }
    
    // ═══════════════════════════════════════════════════════════════════════
    // SECURITY CONFIGURATION
    // ═══════════════════════════════════════════════════════════════════════
    const SECURITY_CONFIG = {
        enableDevToolsProtection: true,
        enableRightClickProtection: true,
        enableKeyboardProtection: true,
        enableConsoleProtection: true,
        enableIframeProtection: true,
        enableXSSProtection: true,
        enableClickjackingProtection: true,
        enableContentProtection: true,
        logSecurityEvents: true
    };

    // ═══════════════════════════════════════════════════════════════════════
    // SECURITY LOGGER
    // ═══════════════════════════════════════════════════════════════════════
    const SecurityLogger = {
        log: function(message, type = 'info') {
            if (!SECURITY_CONFIG.logSecurityEvents) return;
            const styles = {
                info: 'color: #667eea; font-weight: bold;',
                warning: 'color: #ff9800; font-weight: bold;',
                error: 'color: #f44336; font-weight: bold;',
                success: 'color: #4caf50; font-weight: bold;'
            };
            console.log(`%c🛡️ [BAR Security] ${message}`, styles[type] || styles.info);
        },
        warn: function(message) { this.log(message, 'warning'); },
        error: function(message) { this.log(message, 'error'); },
        success: function(message) { this.log(message, 'success'); }
    };

    // ═══════════════════════════════════════════════════════════════════════
    // 1. DEVTOOLS DETECTION & PROTECTION
    // ═══════════════════════════════════════════════════════════════════════
    if (SECURITY_CONFIG.enableDevToolsProtection) {
        let devToolsOpen = false;
        const threshold = 160;
        
        // Method 1: Window size detection
        const checkDevToolsBySize = function() {
            const widthThreshold = window.outerWidth - window.innerWidth > threshold;
            const heightThreshold = window.outerHeight - window.innerHeight > threshold;
            
            if ((widthThreshold || heightThreshold) && !devToolsOpen) {
                devToolsOpen = true;
                SecurityLogger.warn('⚠️ Developer Tools Detected - Security Alert!');
            } else if (!widthThreshold && !heightThreshold) {
                devToolsOpen = false;
            }
        };
        
        // Method 2: Console.log timing detection
        const checkDevToolsByTiming = function() {
            const start = performance.now();
            console.log('%c', 'padding: 100px;');
            console.clear();
            const end = performance.now();
            if (end - start > 100) {
                SecurityLogger.warn('⚠️ Console Activity Detected!');
            }
        };
        
        setInterval(checkDevToolsBySize, 1000);
        window.addEventListener('resize', checkDevToolsBySize);
    }

    // ═══════════════════════════════════════════════════════════════════════
    // 2. KEYBOARD SHORTCUT PROTECTION
    // ═══════════════════════════════════════════════════════════════════════
    if (SECURITY_CONFIG.enableKeyboardProtection) {
        document.addEventListener('keydown', function(e) {
            // Block F12 (DevTools)
            if (e.key === 'F12' || e.keyCode === 123) {
                e.preventDefault();
                e.stopPropagation();
                SecurityLogger.warn('F12 key blocked');
                return false;
            }
            
            // Block Ctrl+Shift+I (DevTools)
            if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.keyCode === 73)) {
                e.preventDefault();
                e.stopPropagation();
                SecurityLogger.warn('Ctrl+Shift+I blocked');
                return false;
            }
            
            // Block Ctrl+Shift+J (Console)
            if (e.ctrlKey && e.shiftKey && (e.key === 'J' || e.key === 'j' || e.keyCode === 74)) {
                e.preventDefault();
                e.stopPropagation();
                SecurityLogger.warn('Ctrl+Shift+J blocked');
                return false;
            }
            
            // Block Ctrl+Shift+C (Element Inspector)
            if (e.ctrlKey && e.shiftKey && (e.key === 'C' || e.key === 'c' || e.keyCode === 67)) {
                e.preventDefault();
                e.stopPropagation();
                SecurityLogger.warn('Ctrl+Shift+C blocked');
                return false;
            }
            
            // Block Ctrl+U (View Source)
            if (e.ctrlKey && (e.key === 'U' || e.key === 'u' || e.keyCode === 85)) {
                e.preventDefault();
                e.stopPropagation();
                SecurityLogger.warn('Ctrl+U blocked');
                return false;
            }
            
            // Block Ctrl+S (Save Page)
            if (e.ctrlKey && (e.key === 'S' || e.key === 's' || e.keyCode === 83)) {
                e.preventDefault();
                e.stopPropagation();
                SecurityLogger.warn('Ctrl+S blocked');
                return false;
            }
            
            // Block Ctrl+P (Print - can reveal source)
            if (e.ctrlKey && (e.key === 'P' || e.key === 'p' || e.keyCode === 80)) {
                e.preventDefault();
                e.stopPropagation();
                SecurityLogger.warn('Ctrl+P blocked');
                return false;
            }
            
            // Block F5 + Ctrl (Hard Refresh with cache bypass)
            if (e.ctrlKey && (e.key === 'F5' || e.keyCode === 116)) {
                // Allow normal refresh but log it
                SecurityLogger.log('Hard refresh detected');
            }
        }, true);
    }

    // ═══════════════════════════════════════════════════════════════════════
    // 3. RIGHT-CLICK PROTECTION
    // ═══════════════════════════════════════════════════════════════════════
    if (SECURITY_CONFIG.enableRightClickProtection) {
        document.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            SecurityLogger.warn('Right-click blocked');
            return false;
        });
    }

    // ═══════════════════════════════════════════════════════════════════════
    // 4. CONSOLE PROTECTION - Override Console Methods
    // ═══════════════════════════════════════════════════════════════════════
    if (SECURITY_CONFIG.enableConsoleProtection) {
        // Display security warning in console
        console.log('%c⚠️ SECURITY WARNING!', 'color: red; font-size: 40px; font-weight: bold;');
        console.log('%cThis browser feature is intended for developers only.', 'font-size: 16px;');
        console.log('%cIf someone told you to paste something here, it\'s likely a scam!', 'font-size: 14px; color: #ff6600;');
        console.log('%c🛡️ BAR Security System Active - All activities are monitored.', 'color: #667eea; font-size: 12px;');
    }

    // ═══════════════════════════════════════════════════════════════════════
    // 5. IFRAME PROTECTION (Clickjacking Prevention)
    // ═══════════════════════════════════════════════════════════════════════
    if (SECURITY_CONFIG.enableIframeProtection) {
        // Check if page is in iframe
        if (window.self !== window.top) {
            SecurityLogger.error('⚠️ Iframe embedding detected - Potential clickjacking attempt!');
            // Attempt to break out of iframe
            try {
                window.top.location = window.self.location;
            } catch (e) {
                // If same-origin policy prevents breaking out, hide content
                document.body.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100vh;background:#1a1a2e;color:white;font-size:24px;">⚠️ Security Error: This page cannot be displayed in a frame.</div>';
            }
        }
    }

    // ═══════════════════════════════════════════════════════════════════════
    // 6. XSS PROTECTION - Sanitize Inputs
    // ═══════════════════════════════════════════════════════════════════════
    if (SECURITY_CONFIG.enableXSSProtection) {
        window.sanitizeHTML = function(str) {
            const temp = document.createElement('div');
            temp.textContent = str;
            return temp.innerHTML;
        };
        
        // Monitor for suspicious script injections
        const originalInnerHTML = Object.getOwnPropertyDescriptor(Element.prototype, 'innerHTML');
        Object.defineProperty(Element.prototype, 'innerHTML', {
            set: function(value) {
                // Check for potential XSS patterns
                const xssPatterns = [
                    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
                    /javascript:/gi,
                    /on\w+\s*=/gi,
                    /data:text\/html/gi
                ];
                
                let isSuspicious = false;
                xssPatterns.forEach(pattern => {
                    if (pattern.test(value)) {
                        isSuspicious = true;
                        SecurityLogger.error('🚨 Potential XSS Attack Blocked!');
                    }
                });
                
                return originalInnerHTML.set.call(this, value);
            },
            get: function() {
                return originalInnerHTML.get.call(this);
            }
        });
    }

    // ═══════════════════════════════════════════════════════════════════════
    // 7. CONTENT PROTECTION
    // ═══════════════════════════════════════════════════════════════════════
    if (SECURITY_CONFIG.enableContentProtection) {
        // Prevent text selection on protected elements
        document.addEventListener('selectstart', function(e) {
            if (e.target.closest('.protected, .no-select')) {
                e.preventDefault();
                return false;
            }
        });
        
        // Prevent drag
        document.addEventListener('dragstart', function(e) {
            if (e.target.tagName === 'IMG' || e.target.closest('.protected')) {
                e.preventDefault();
                return false;
            }
        });
        
        // Prevent copy on protected content
        document.addEventListener('copy', function(e) {
            if (e.target.closest('.protected, .no-copy')) {
                e.preventDefault();
                SecurityLogger.warn('Copy blocked on protected content');
                return false;
            }
        });
    }

    // ═══════════════════════════════════════════════════════════════════════
    // 8. ANTI-DEBUGGING PROTECTION
    // ═══════════════════════════════════════════════════════════════════════
    (function antiDebug() {
        setInterval(function() {
            const startTime = performance.now();
            debugger;
            const endTime = performance.now();
            if (endTime - startTime > 100) {
                SecurityLogger.error('🚨 Debugger detected!');
            }
        }, 5000);
    })();

    // ═══════════════════════════════════════════════════════════════════════
    // 9. URL TAMPERING PROTECTION
    // ═══════════════════════════════════════════════════════════════════════
    (function protectURL() {
        const originalURL = window.location.href;
        
        // Check for suspicious URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const suspiciousParams = ['<script>', 'javascript:', 'onerror', 'onload', 'onclick'];
        
        urlParams.forEach((value, key) => {
            suspiciousParams.forEach(pattern => {
                if (value.toLowerCase().includes(pattern) || key.toLowerCase().includes(pattern)) {
                    SecurityLogger.error('🚨 Suspicious URL parameter detected and blocked!');
                    // Remove suspicious parameters
                    window.history.replaceState({}, document.title, window.location.pathname);
                }
            });
        });
    })();

    // ═══════════════════════════════════════════════════════════════════════
    // 10. FORM SECURITY
    // ═══════════════════════════════════════════════════════════════════════
    document.addEventListener('DOMContentLoaded', function() {
        // Add CSRF-like protection to forms
        document.querySelectorAll('form').forEach(form => {
            // Generate and add security token
            const token = btoa(Date.now() + Math.random().toString(36));
            const tokenInput = document.createElement('input');
            tokenInput.type = 'hidden';
            tokenInput.name = '_security_token';
            tokenInput.value = token;
            form.appendChild(tokenInput);
            
            // Validate form submissions
            form.addEventListener('submit', function(e) {
                // Check for suspicious input values
                const inputs = form.querySelectorAll('input, textarea');
                inputs.forEach(input => {
                    const value = input.value;
                    if (/<script|javascript:|on\w+=/i.test(value)) {
                        e.preventDefault();
                        SecurityLogger.error('🚨 Suspicious form input blocked!');
                        alert('Security Error: Invalid input detected.');
                        return false;
                    }
                });
            });
        });
    });

    // ═══════════════════════════════════════════════════════════════════════
    // 11. EXTERNAL LINK PROTECTION
    // ═══════════════════════════════════════════════════════════════════════
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a');
        if (link && link.href) {
            // Check for javascript: URLs
            if (link.href.toLowerCase().startsWith('javascript:')) {
                e.preventDefault();
                SecurityLogger.error('🚨 Malicious javascript: link blocked!');
                return false;
            }
            
            // Add rel="noopener noreferrer" to external links
            if (link.hostname !== window.location.hostname) {
                link.setAttribute('rel', 'noopener noreferrer');
                link.setAttribute('target', '_blank');
            }
        }
    });

    // ═══════════════════════════════════════════════════════════════════════
    // 12. SESSION SECURITY
    // ═══════════════════════════════════════════════════════════════════════
    (function sessionSecurity() {
        // Generate session fingerprint
        const generateFingerprint = function() {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            ctx.textBaseline = 'top';
            ctx.font = '14px Arial';
            ctx.fillText('BAR', 2, 2);
            
            return btoa([
                navigator.userAgent,
                navigator.language,
                screen.width + 'x' + screen.height,
                new Date().getTimezoneOffset(),
                canvas.toDataURL().slice(-50)
            ].join('|')).substring(0, 32);
        };
        
        const fingerprint = generateFingerprint();
        const storedFingerprint = sessionStorage.getItem('_mh_fp');
        
        if (storedFingerprint && storedFingerprint !== fingerprint) {
            SecurityLogger.error('🚨 Session anomaly detected!');
            sessionStorage.clear();
        } else {
            sessionStorage.setItem('_mh_fp', fingerprint);
        }
    })();

    // ═══════════════════════════════════════════════════════════════════════
    // 13. RATE LIMITING (Client-Side)
    // ═══════════════════════════════════════════════════════════════════════
    const RateLimiter = {
        clicks: [],
        maxClicks: 20,
        timeWindow: 5000, // 5 seconds
        
        check: function() {
            const now = Date.now();
            this.clicks = this.clicks.filter(time => now - time < this.timeWindow);
            this.clicks.push(now);
            
            if (this.clicks.length > this.maxClicks) {
                SecurityLogger.error('🚨 Suspicious activity detected - Rate limit exceeded!');
                return false;
            }
            return true;
        }
    };
    
    document.addEventListener('click', function() {
        RateLimiter.check();
    });

    // Security system initialized
    SecurityLogger.success('✅ BAR Security System v3.0 Initialized');
    SecurityLogger.log('All protection modules active');

})();

// ═══════════════════════════════════════════════════════════════════════════
// BAR MODERN UI SYSTEM v3.0 - OPTIMIZED FOR SPEED
// Premium Effects, Animations & Interactions
// ═══════════════════════════════════════════════════════════════════════════

// Use passive event listeners for better scroll performance
const passiveIfSupported = () => {
    let passive = false;
    try {
        const options = {
            get passive() {
                passive = true;
                return false;
            }
        };
        window.addEventListener('test', null, options);
        window.removeEventListener('test', null, options);
    } catch (err) {
        passive = false;
    }
    return passive ? { passive: true } : false;
};

document.addEventListener('DOMContentLoaded', function() {
    
    // ═══════════════════════════════════════════════════════════════════════
    // LOADING SCREEN - OPTIMIZED
    // ═══════════════════════════════════════════════════════════════════════
    const createLoadingScreen = () => {
        const loader = document.createElement('div');
        loader.className = 'loading-overlay';
        loader.innerHTML = `<div class="loader"></div>`;
        document.body.appendChild(loader);
        
        // Hide loader faster
        const hideLoader = () => {
            requestAnimationFrame(() => {
                loader.classList.add('hidden');
                setTimeout(() => loader.remove(), 300);
            });
        };
        
        // Hide on load or after timeout
        window.addEventListener('load', hideLoader, { once: true });
        setTimeout(hideLoader, 2000); // Fallback timeout
    };
    createLoadingScreen();

    // ═══════════════════════════════════════════════════════════════════════
    // MOBILE MENU TOGGLE
    // ═══════════════════════════════════════════════════════════════════════
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Close menu when a link is clicked
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // ═══════════════════════════════════════════════════════════════════════
    // NAVBAR SCROLL EFFECT - OPTIMIZED WITH THROTTLING
    // ═══════════════════════════════════════════════════════════════════════
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    let ticking = false;
    
    const updateNavbar = () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
        ticking = false;
    };
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    }, passiveIfSupported());

    // ═══════════════════════════════════════════════════════════════════════
    // UPDATE ACTIVE NAV LINK
    // ═══════════════════════════════════════════════════════════════════════
    function updateActiveNav() {
        const currentLocation = location.pathname;
        const navItems = document.querySelectorAll('.nav-item');
        
        navItems.forEach(item => {
            item.classList.remove('active');
            const link = item.querySelector('a');
            if (link && (link.href.includes(currentLocation.split('/').pop()) || 
                (currentLocation.includes('index.html') && link.href.includes('index.html')) ||
                (currentLocation.endsWith('/') && link.href.includes('index.html')))) {
                item.classList.add('active');
            }
        });
    }
    updateActiveNav();

    // ═══════════════════════════════════════════════════════════════════════
    // SMOOTH SCROLL FOR CTA BUTTON
    // ═══════════════════════════════════════════════════════════════════════
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', () => {
            const featured = document.querySelector('.featured');
            if (featured) {
                featured.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // ═══════════════════════════════════════════════════════════════════════
    // SCROLL TO TOP BUTTON - OPTIMIZED
    // ═══════════════════════════════════════════════════════════════════════
    const createScrollTopButton = () => {
        const scrollBtn = document.createElement('button');
        scrollBtn.className = 'scroll-top';
        scrollBtn.innerHTML = '↑';
        scrollBtn.setAttribute('aria-label', 'Scroll to top');
        document.body.appendChild(scrollBtn);
        
        let scrollTicking = false;
        window.addEventListener('scroll', () => {
            if (!scrollTicking) {
                requestAnimationFrame(() => {
                    if (window.pageYOffset > 400) {
                        scrollBtn.classList.add('visible');
                    } else {
                        scrollBtn.classList.remove('visible');
                    }
                    scrollTicking = false;
                });
                scrollTicking = true;
            }
        }, passiveIfSupported());
        
        scrollBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    };
    createScrollTopButton();

    // ═══════════════════════════════════════════════════════════════════════
    // SCROLL REVEAL ANIMATIONS
    // ═══════════════════════════════════════════════════════════════════════
    const revealElements = document.querySelectorAll('.category-card, .content-card, .stat, .reveal, .reveal-left, .reveal-right, .reveal-scale');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('active');
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) translateX(0) scale(1)';
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        revealObserver.observe(el);
    });

    // ═══════════════════════════════════════════════════════════════════════
    // MAGNETIC HOVER EFFECT FOR BUTTONS - OPTIMIZED WITH RAF
    // ═══════════════════════════════════════════════════════════════════════
    const magneticElements = document.querySelectorAll('.cta-button, .download-btn, .card-link');
    
    magneticElements.forEach(el => {
        let magneticTicking = false;
        el.addEventListener('mousemove', (e) => {
            if (!magneticTicking) {
                requestAnimationFrame(() => {
                    const rect = el.getBoundingClientRect();
                    const x = e.clientX - rect.left - rect.width / 2;
                    const y = e.clientY - rect.top - rect.height / 2;
                    el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
                    magneticTicking = false;
                });
                magneticTicking = true;
            }
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.transform = 'translate(0, 0)';
        });
    });

    // ═══════════════════════════════════════════════════════════════════════
    // TILT EFFECT FOR CARDS - OPTIMIZED
    // ═══════════════════════════════════════════════════════════════════════
    const tiltCards = document.querySelectorAll('.category-card, .content-card');
    
    tiltCards.forEach(card => {
        let tiltTicking = false;
        card.addEventListener('mousemove', (e) => {
            if (!tiltTicking) {
                requestAnimationFrame(() => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const rotateX = (y - centerY) / 15;
                    const rotateY = (centerX - x) / 15;
                    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
                    tiltTicking = false;
                });
                tiltTicking = true;
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });

    // ═══════════════════════════════════════════════════════════════════════
    // PARALLAX EFFECT FOR HERO - OPTIMIZED
    // ═══════════════════════════════════════════════════════════════════════
    const heroContent = document.querySelector('.hero-content');
    
    if (heroContent) {
        let parallaxTicking = false;
        window.addEventListener('scroll', () => {
            if (!parallaxTicking) {
                requestAnimationFrame(() => {
                    const scrolled = window.pageYOffset;
                    heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
                    heroContent.style.opacity = 1 - scrolled / 600;
                    parallaxTicking = false;
                });
                parallaxTicking = true;
            }
        }, passiveIfSupported());
    }

    // ═══════════════════════════════════════════════════════════════════════
    // TYPING ANIMATION FOR HERO TITLE
    // ═══════════════════════════════════════════════════════════════════════
    const heroTitle = document.querySelector('.hero-content h1');
    
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.visibility = 'visible';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                heroTitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 80);
            }
        };
        
        setTimeout(typeWriter, 500);
    }

    // ═══════════════════════════════════════════════════════════════════════
    // COUNTER ANIMATION FOR STATS
    // ═══════════════════════════════════════════════════════════════════════
    const animateCounter = (element, target, duration = 2000) => {
        let start = 0;
        const increment = target / (duration / 16);
        const suffix = element.textContent.replace(/[0-9]/g, '');
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target + suffix;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start) + suffix;
            }
        }, 16);
    };

    const statNumbers = document.querySelectorAll('.stat h3');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const text = entry.target.textContent;
                const num = parseInt(text.replace(/\D/g, ''));
                if (num) {
                    animateCounter(entry.target, num);
                }
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => statsObserver.observe(stat));

    // ═══════════════════════════════════════════════════════════════════════
    // RIPPLE EFFECT FOR BUTTONS
    // ═══════════════════════════════════════════════════════════════════════
    const rippleButtons = document.querySelectorAll('.cta-button, .download-btn, .glass-btn');
    
    rippleButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                background: rgba(255, 255, 255, 0.4);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
                left: ${x}px;
                top: ${y}px;
                width: 100px;
                height: 100px;
                margin-left: -50px;
                margin-top: -50px;
            `;
            
            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            button.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add ripple animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // ═══════════════════════════════════════════════════════════════════════
    // SMOOTH PAGE TRANSITIONS
    // ═══════════════════════════════════════════════════════════════════════
    document.querySelectorAll('a[href]').forEach(link => {
        if (link.hostname === location.hostname && !link.hash) {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href && !href.startsWith('#') && !href.startsWith('javascript')) {
                    e.preventDefault();
                    document.body.style.opacity = '0';
                    document.body.style.transition = 'opacity 0.3s ease';
                    
                    setTimeout(() => {
                        window.location.href = href;
                    }, 300);
                }
            });
        }
    });

    // Fade in on page load
    document.body.style.opacity = '0';
    requestAnimationFrame(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    });

    // ═══════════════════════════════════════════════════════════════════════
    // FLOATING PARTICLES BACKGROUND
    // ═══════════════════════════════════════════════════════════════════════
    const createParticles = () => {
        const particleContainer = document.createElement('div');
        particleContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 0;
            overflow: hidden;
        `;
        document.body.insertBefore(particleContainer, document.body.firstChild);
        
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            const size = Math.random() * 4 + 2;
            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1});
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: floatParticle ${Math.random() * 20 + 10}s linear infinite;
                animation-delay: ${Math.random() * -20}s;
            `;
            particleContainer.appendChild(particle);
        }
        
        const particleStyle = document.createElement('style');
        particleStyle.textContent = `
            @keyframes floatParticle {
                0%, 100% { 
                    transform: translateY(0) translateX(0); 
                    opacity: 0;
                }
                10% { opacity: 1; }
                90% { opacity: 1; }
                50% { 
                    transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px); 
                }
            }
        `;
        document.head.appendChild(particleStyle);
    };
    createParticles();

    // ═══════════════════════════════════════════════════════════════════════
    // CURSOR GLOW EFFECT
    // ═══════════════════════════════════════════════════════════════════════
    if (window.innerWidth > 768) {
        const cursorGlow = document.createElement('div');
        cursorGlow.style.cssText = `
            position: fixed;
            width: 400px;
            height: 400px;
            background: radial-gradient(circle, rgba(102, 126, 234, 0.15) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 0;
            transform: translate(-50%, -50%);
            transition: transform 0.1s ease, opacity 0.3s ease;
        `;
        document.body.appendChild(cursorGlow);
        
        document.addEventListener('mousemove', (e) => {
            cursorGlow.style.left = e.clientX + 'px';
            cursorGlow.style.top = e.clientY + 'px';
        });
    }

    console.log('%c✨ BAR Modern UI v3.0 Loaded', 'color: #667eea; font-size: 14px; font-weight: bold;');
});
