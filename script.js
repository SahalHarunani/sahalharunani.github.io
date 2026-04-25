// ===== Dark Mode Toggle =====
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

// Listen for toggle changes
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        // Update icon
        if (body.classList.contains('dark-mode')) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'dark');
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'light');
        }
    });
}

// ===== Navigation Hamburger =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animate hamburger
        const spans = hamburger.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(10px, 10px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
        } else {
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
        }
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
        });
    });
}

// ===== Active Navigation Link =====
document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('href') === window.location.pathname ||
        link.getAttribute('href') === window.location.pathname.split('/').pop()) {
        link.classList.add('active');
    }
});

// ===== Contact Form Handling =====
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        // Validation
        if (!name || !email || !subject || !message) {
            showMessage('Please fill out all fields', 'error');
            return;
        }

        if (!validateEmail(email)) {
            showMessage('Please enter a valid email address', 'error');
            return;
        }

        // Prepare email data
        const emailData = {
            to: 'shalharunani@gmail.com',
            from: email,
            subject: `New Message from ${name}: ${subject}`,
            text: `
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
            `
        };

        // Show success message (In production, send to backend)
        showMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
        
        // Log the data (for development purposes)
        console.log('Form Data:', {
            name,
            email,
            subject,
            message
        });

        // Reset form
        contactForm.reset();

        // Clear message after 5 seconds
        setTimeout(() => {
            if (formMessage) {
                formMessage.classList.remove('success', 'error');
                formMessage.style.display = 'none';
            }
        }, 5000);
    });
}

function showMessage(msg, type) {
    if (formMessage) {
        formMessage.textContent = msg;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';
    }
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ===== PB TABS FUNCTIONALITY =====
document.querySelectorAll('.pb-tab-btn').forEach(button => {
    button.addEventListener('click', function() {
        const tabName = this.getAttribute('data-tab');
        
        // Remove active class from all buttons
        document.querySelectorAll('.pb-tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Remove active class from all tab contents
        document.querySelectorAll('.pb-tab-content').forEach(content => {
            content.classList.remove('active');
        });
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Add active class to corresponding tab content
        document.getElementById(tabName).classList.add('active');
    });
});

// Set first tab as active on page load
window.addEventListener('load', function() {
    const firstTab = document.querySelector('.pb-tab-btn');
    if (firstTab) {
        firstTab.click();
    }
});

// ===== Smooth Scrolling =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== Scroll to Top Button (Optional) =====
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 999;
    transition: all 0.3s ease;
    font-size: 1.2rem;
`;

document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.style.display = 'flex';
    } else {
        scrollTopBtn.style.display = 'none';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== Scroll Animations (Fade In) =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.achievement-card, .timeline-content, .edu-details, .activity-section').forEach(el => {
    observer.observe(el);
});

// ===== Counter Animation (Optional) =====
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Animate stat cards on page load
window.addEventListener('load', () => {
    document.querySelectorAll('.stat-card h3').forEach(card => {
        const number = parseInt(card.textContent);
        if (!isNaN(number)) {
            animateCounter(card, number);
        }
    });
});

// ===== Loading Animation =====
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// ===== Console Easter Egg =====
console.log('%c🏊 Welcome to Sahal Harunani\'s Portfolio! 🏊', 'color: #0066cc; font-size: 20px; font-weight: bold;');
console.log('%cFollow me on Instagram: @sahal_harunani08', 'color: #00a8e8; font-size: 14px;');
console.log('%cLinkedIn: linkedin.com/in/sahal-harunani-387bb63b5', 'color: #00a8e8; font-size: 14px;');

// ===== GLOBAL SEARCH FUNCTIONALITY =====

// Search data structure
const searchableContent = [
    {
        title: "Home",
        category: "Page",
        url: "index.html",
        keywords: ["home", "portfolio", "sahal", "harunani"]
    },
    {
        title: "About Me",
        category: "Page",
        url: "about.html",
        keywords: ["about", "biography", "personal", "introduction", "florida", "tanzania", "languages"]
    },
    {
        title: "Swimming",
        category: "Page",
        url: "swimming.html",
        keywords: ["swimming", "achievements", "medals", "records", "freestyle", "backstroke", "breaststroke", "butterfly", "medley", "bluefins", "national team"]
    },
    {
        title: "Education",
        category: "Page",
        url: "education.html",
        keywords: ["education", "school", "grades", "igcse", "a-levels", "biochemistry", "maths", "chemistry", "biology"]
    },
    {
        title: "Activities",
        category: "Page",
        url: "activities.html",
        keywords: ["activities", "leo club", "mun", "volunteering", "leadership", "service", "community"]
    },
    {
        title: "Gallery",
        category: "Page",
        url: "gallery.html",
        keywords: ["gallery", "photos", "images", "pictures"]
    },
    {
        title: "Contact",
        category: "Page",
        url: "contact.html",
        keywords: ["contact", "email", "whatsapp", "instagram", "linkedin", "message"]
    },
    {
        title: "National Record - 400m Individual Medley",
        category: "Achievement",
        url: "swimming.html",
        keywords: ["record", "400m", "medley", "5:24.53", "2024", "national", "champion"]
    },
    {
        title: "250+ Medals",
        category: "Achievement",
        url: "swimming.html",
        keywords: ["medals", "competition", "award", "achievement", "250"]
    },
    {
        title: "14 Trophies",
        category: "Achievement",
        url: "swimming.html",
        keywords: ["trophy", "trophies", "14", "award"]
    },
    {
        title: "IGCSE Results",
        category: "Education",
        url: "education.html",
        keywords: ["igcse", "results", "grades", "a*", "mathematics", "chemistry", "ict"]
    },
    {
        title: "A-Levels Studies",
        category: "Education",
        url: "education.html",
        keywords: ["a-level", "mathematics", "chemistry", "biology", "biochemistry"]
    },
    {
        title: "Leo Club Member",
        category: "Activity",
        url: "activities.html",
        keywords: ["leo", "club", "service", "volunteer", "community"]
    },
    {
        title: "Model United Nations",
        category: "Activity",
        url: "activities.html",
        keywords: ["mun", "model", "united", "nations", "delegate", "chair"]
    },
    {
        title: "Tanzanian National Team",
        category: "Swimming",
        url: "swimming.html",
        keywords: ["tanzania", "national", "team", "representative", "aquatics"]
    },
    {
        title: "Bluefins Swim Club",
        category: "Swimming",
        url: "swimming.html",
        keywords: ["bluefins", "club", "dar es salaam", "swim"]
    }
];

// DOM Elements
const globalSearchInput = document.getElementById('global-search');
const searchBtnNav = document.getElementById('search-btn-nav');
const searchResultsModal = document.createElement('div');

// Create search results modal
searchResultsModal.className = 'search-results-modal';
document.body.appendChild(searchResultsModal);

// Search function
function performSearch(query) {
    if (!query.trim()) {
        searchResultsModal.classList.remove('active');
        return;
    }

    const lowerQuery = query.toLowerCase().trim();

    const results = searchableContent.filter(item => {
        const text = (
            item.title + " " +
            item.category + " " +
            item.keywords.join(" ") + " " +
            (item.description || "")
        ).toLowerCase();

        return text.includes(lowerQuery);
    });

    displaySearchResults(results, query);
}

// Display search results
function displaySearchResults(results, query) {
    if (results.length === 0) {
        searchResultsModal.innerHTML = `
            <div class="search-results-container">
                <div class="search-results-header">
                    <h3>Search Results for "${query}"</h3>
                    <button class="search-close-btn" onclick="closeSearch()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="search-no-results">
                    <i class="fas fa-search"></i>
                    <p>No results found for "${query}"</p>
                    <p style="font-size: 0.9rem; margin-top: 1rem;">Try searching for: pages, achievements, activities, or keywords</p>
                </div>
            </div>
        `;
    } else {
        const resultsHTML = results.map(result => `
            <div class="search-result-item" onclick="window.location.href='${result.url}'">
                <span class="search-result-category">${result.category}</span>
                <h4 class="search-result-title">${result.title}</h4>
                <p class="search-result-text">
                    <strong>Keywords:</strong> ${result.keywords.slice(0, 3).join(", ")}...
                </p>
            </div>
        `).join('');

        searchResultsModal.innerHTML = `
            <div class="search-results-container">
                <div class="search-results-header">
                    <h3>${results.length} Result${results.length !== 1 ? 's' : ''} found for "${query}"</h3>
                    <button class="search-close-btn" onclick="closeSearch()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="search-results-grid">
                    ${resultsHTML}
                </div>
            </div>
        `;
    }

    searchResultsModal.classList.add('active');
}

// Close search results
function closeSearch() {
    searchResultsModal.classList.remove('active');
    globalSearchInput.value = '';
}

// Event listeners
searchBtnNav.addEventListener('click', () => {
    performSearch(globalSearchInput.value);
});

globalSearchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        performSearch(globalSearchInput.value);
    }
});

globalSearchInput.addEventListener('input', (e) => {
    if (e.target.value.length > 0) {
        performSearch(e.target.value);
    } else {
        searchResultsModal.classList.remove('active');
    }
});

// Close search when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-box-nav') && !e.target.closest('.search-results-modal')) {
        searchResultsModal.classList.remove('active');
    }
});

// Close search when pressing Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeSearch();
    }
});


