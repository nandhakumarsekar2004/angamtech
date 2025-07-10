// ===== PROFESSIONAL CURSOR ANIMATION =====
document.addEventListener("DOMContentLoaded", () => {
  // Create cursor elements
  const cursor = document.createElement("div")
  const cursorFollower = document.createElement("div")

  cursor.className = "cursor"
  cursorFollower.className = "cursor-follower"

  document.body.appendChild(cursor)
  document.body.appendChild(cursorFollower)

  let mouseX = 0,
    mouseY = 0
  let followerX = 0,
    followerY = 0

  // Update cursor position
  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX
    mouseY = e.clientY

    cursor.style.left = mouseX + "px"
    cursor.style.top = mouseY + "px"
  })

  // Smooth follower animation
  function animateFollower() {
    followerX += (mouseX - followerX) * 0.1
    followerY += (mouseY - followerY) * 0.1

    cursorFollower.style.left = followerX + "px"
    cursorFollower.style.top = followerY + "px"

    requestAnimationFrame(animateFollower)
  }
  animateFollower()

  // Hover effects
  const hoverElements = document.querySelectorAll(
    "a, button, .btn, .nav-link, .service-card, .course-card, input, textarea, select, .card",
  )

  hoverElements.forEach((element) => {
    element.addEventListener("mouseenter", () => {
      cursor.classList.add("hover")
      cursorFollower.classList.add("hover")
    })

    element.addEventListener("mouseleave", () => {
      cursor.classList.remove("hover")
      cursorFollower.classList.remove("hover")
    })
  })

  // Click effect
  document.addEventListener("mousedown", () => {
    cursor.classList.add("click")
  })

  document.addEventListener("mouseup", () => {
    cursor.classList.remove("click")
  })
})

// ===== LOADING SCREEN =====
window.addEventListener("load", () => {
  const loadingScreen = document.querySelector(".loading-screen")
  if (loadingScreen) {
    setTimeout(() => {
      loadingScreen.style.opacity = "0"
      setTimeout(() => {
        loadingScreen.style.display = "none"
      }, 500)
    }, 2000)
  }
})

// ===== NAVBAR SCROLL EFFECT =====
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".glass-nav")
  if (navbar) {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }
  }
})

// ===== TYPING ANIMATION =====
function typeWriter(element, text, speed = 100) {
  let i = 0
  element.innerHTML = ""

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i)
      i++
      setTimeout(type, speed)
    }
  }
  type()
}

// Initialize typing animation if element exists
document.addEventListener("DOMContentLoaded", () => {
  const typingElement = document.querySelector(".typing-text")
  if (typingElement) {
    const texts = ["Innovation", "Technology", "Excellence", "Future"]
    let currentIndex = 0

    function startTyping() {
      typeWriter(typingElement, texts[currentIndex], 150)
      currentIndex = (currentIndex + 1) % texts.length
    }

    startTyping()
    setInterval(startTyping, 3000)
  }
})

// ===== BACK TO TOP BUTTON =====
window.addEventListener("scroll", () => {
  const backToTop = document.querySelector(".back-to-top")
  if (backToTop) {
    if (window.scrollY > 300) {
      backToTop.classList.add("show")
    } else {
      backToTop.classList.remove("show")
    }
  }
})

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// ===== COUNTER ANIMATION =====
function animateCounters() {
  const counters = document.querySelectorAll(".counter")

  counters.forEach((counter) => {
    const target = Number.parseInt(counter.getAttribute("data-target"))
    const increment = target / 100
    let current = 0

    const updateCounter = () => {
      if (current < target) {
        current += increment
        counter.textContent = Math.ceil(current)
        setTimeout(updateCounter, 20)
      } else {
        counter.textContent = target
      }
    }

    updateCounter()
  })
}

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate")

      // Trigger counter animation
      if (entry.target.classList.contains("stats-section")) {
        animateCounters()
      }
    }
  })
}, observerOptions)

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  const animateElements = document.querySelectorAll(".service-card, .course-card, .stats-section, .testimonial-card")
  animateElements.forEach((el) => observer.observe(el))
})

// ===== FORM VALIDATION =====
function validateForm(form) {
  const inputs = form.querySelectorAll("input[required], textarea[required], select[required]")
  let isValid = true

  inputs.forEach((input) => {
    if (!input.value.trim()) {
      input.classList.add("is-invalid")
      isValid = false
    } else {
      input.classList.remove("is-invalid")
    }

    // Email validation
    if (input.type === "email" && input.value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(input.value)) {
        input.classList.add("is-invalid")
        isValid = false
      }
    }

    // Phone validation
    if (input.type === "tel" && input.value) {
      const phoneRegex = /^[+]?[1-9][\d]{0,15}$/
      if (!phoneRegex.test(input.value.replace(/\s/g, ""))) {
        input.classList.add("is-invalid")
        isValid = false
      }
    }
  })

  return isValid
}

// ===== PORTFOLIO FILTER =====
function filterPortfolio(category) {
  const items = document.querySelectorAll(".portfolio-item")
  const buttons = document.querySelectorAll(".filter-btn")

  // Update active button
  buttons.forEach((btn) => btn.classList.remove("active"))
  document.querySelector(`[data-filter="${category}"]`).classList.add("active")

  // Filter items
  items.forEach((item) => {
    if (category === "all" || item.classList.contains(category)) {
      item.style.display = "block"
      setTimeout(() => {
        item.style.opacity = "1"
        item.style.transform = "scale(1)"
      }, 100)
    } else {
      item.style.opacity = "0"
      item.style.transform = "scale(0.8)"
      setTimeout(() => {
        item.style.display = "none"
      }, 300)
    }
  })
}

// ===== MODAL FUNCTIONALITY =====
function openModal(modalId) {
  const modal = document.getElementById(modalId)
  if (modal) {
    modal.style.display = "flex"
    setTimeout(() => {
      modal.classList.add("show")
    }, 10)
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId)
  if (modal) {
    modal.classList.remove("show")
    setTimeout(() => {
      modal.style.display = "none"
    }, 300)
  }
}

// Close modal when clicking outside
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal")) {
    closeModal(e.target.id)
  }
})

// ===== TESTIMONIAL SLIDER =====
let currentTestimonial = 0
const testimonials = document.querySelectorAll(".testimonial-item")

function showTestimonial(index) {
  testimonials.forEach((testimonial, i) => {
    testimonial.style.display = i === index ? "block" : "none"
  })
}

function nextTestimonial() {
  currentTestimonial = (currentTestimonial + 1) % testimonials.length
  showTestimonial(currentTestimonial)
}

// Auto-rotate testimonials
if (testimonials.length > 0) {
  setInterval(nextTestimonial, 5000)
}

// ===== NAVBAR MOBILE TOGGLE =====
document.addEventListener("DOMContentLoaded", () => {
  const navbarToggler = document.querySelector(".navbar-toggler")
  const navbarCollapse = document.querySelector(".navbar-collapse")

  if (navbarToggler && navbarCollapse) {
    navbarToggler.addEventListener("click", () => {
      navbarCollapse.classList.toggle("show")
    })

    // Close navbar when clicking on links
    const navLinks = document.querySelectorAll(".nav-link")
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navbarCollapse.classList.remove("show")
      })
    })
  }
})

// ===== PARALLAX EFFECT =====
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const parallaxElements = document.querySelectorAll(".parallax")

  parallaxElements.forEach((element) => {
    const speed = element.dataset.speed || 0.5
    const yPos = -(scrolled * speed)
    element.style.transform = `translateY(${yPos}px)`
  })
})

// ===== LAZY LOADING =====
const lazyImages = document.querySelectorAll("img[data-src]")
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target
      img.src = img.dataset.src
      img.classList.remove("lazy")
      imageObserver.unobserve(img)
    }
  })
})

lazyImages.forEach((img) => imageObserver.observe(img))
