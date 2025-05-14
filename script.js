// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
    // Elementos del DOM
    const hamburger = document.querySelector(".hamburger")
    const navLinks = document.querySelector(".nav-links")
    const cursorFollower = document.querySelector(".cursor-follower")
    const typingText = document.querySelector(".typing-text")
    const carouselTrack = document.querySelector(".carousel-track")
    const prevBtn = document.querySelector(".prev-btn")
    const nextBtn = document.querySelector(".next-btn")
    const carouselIndicators = document.querySelector(".carousel-indicators")
    const projectCards = document.querySelectorAll(".project-card")
    const projectModal = document.querySelector(".project-modal")
    const closeModal = document.querySelector(".close-modal")
    const modalTitle = document.querySelector(".modal-title")
    const galleryMainImg = document.querySelector(".gallery-main-img")
    const galleryThumbs = document.querySelector(".gallery-thumbs")
    const prevImgBtn = document.querySelector(".prev-img")
    const nextImgBtn = document.querySelector(".next-img")
    const projectDescription = document.querySelector(".project-description p")
    const projectFeatures = document.querySelector(".project-features ul")
    const projectTechTags = document.querySelector(".tech-tags")
    const demoLink = document.querySelector(".demo-link")
    const codeLink = document.querySelector(".code-link")
    const viewProjectBtns = document.querySelectorAll(".view-project-btn")
  
    // Palabras para el efecto de escritura
    const words = ["Web", "Frontend", "Backend", "Fullstack"]
    let wordIndex = 0
    let charIndex = 0
    let isDeleting = false
    let typingSpeed = 100
  
    // Función para el efecto de escritura
    function typeEffect() {
      const currentWord = words[wordIndex]
  
      if (isDeleting) {
        // Borrar caracteres
        typingText.textContent = currentWord.substring(0, charIndex - 1)
        charIndex--
        typingSpeed = 50
      } else {
        // Escribir caracteres
        typingText.textContent = currentWord.substring(0, charIndex + 1)
        charIndex++
        typingSpeed = 150
      }
  
      // Si terminó de escribir la palabra
      if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true
        typingSpeed = 1000 // Pausa antes de borrar
      }
      // Si terminó de borrar la palabra
      else if (isDeleting && charIndex === 0) {
        isDeleting = false
        wordIndex = (wordIndex + 1) % words.length
      }
  
      setTimeout(typeEffect, typingSpeed)
    }
  
    // Iniciar efecto de escritura
    typeEffect()
  
    // Menú hamburguesa para móviles
    hamburger.addEventListener("click", function () {
      this.classList.toggle("active")
      navLinks.classList.toggle("active")
    })
  
    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active")
        navLinks.classList.remove("active")
      })
    })
  
    // Seguimiento del cursor personalizado
    if (window.innerWidth > 768) {
      document.addEventListener("mousemove", (e) => {
        cursorFollower.style.left = e.clientX + "px"
        cursorFollower.style.top = e.clientY + "px"
      })
  
      // Efecto de hover para enlaces y botones
      const interactiveElements = document.querySelectorAll(
        "a, button, .project-card, .skill-card, .contact-card, .social-link, .gallery-thumb",
      )
  
      interactiveElements.forEach((element) => {
        element.addEventListener("mouseenter", () => {
          cursorFollower.style.width = "50px"
          cursorFollower.style.height = "50px"
          cursorFollower.style.backgroundColor = "rgba(14, 165, 233, 0.2)"
        })
  
        element.addEventListener("mouseleave", () => {
          cursorFollower.style.width = "20px"
          cursorFollower.style.height = "20px"
          cursorFollower.style.backgroundColor = "rgba(14, 165, 233, 0.5)"
        })
      })
    }
  
    // Carousel de proyectos
    let currentSlide = 0
    let slideWidth = 0
    let slidesPerView = 1
    const totalSlides = projectCards.length
  
    // Función para actualizar el ancho de slide y slides por vista
    function updateCarouselDimensions() {
      if (window.innerWidth >= 1024) {
        slidesPerView = 3
      } else if (window.innerWidth >= 768) {
        slidesPerView = 2
      } else {
        slidesPerView = 1
      }
  
      // Calcular el ancho del slide incluyendo el gap
      const carouselWidth = carouselTrack.parentElement.clientWidth
      slideWidth = carouselWidth / slidesPerView
  
      // Actualizar el ancho de cada slide
      projectCards.forEach((card) => {
        card.style.flex = `0 0 ${slideWidth - 20}px`
      })
  
      // Mover el carousel a la posición actual
      moveCarousel()
    }
  
    // Función para mover el carousel
    function moveCarousel() {
      const offset = -currentSlide * slideWidth
      carouselTrack.style.transform = `translateX(${offset}px)`
      updateIndicators()
    }
  
    // Crear los indicadores para el carousel
    function createIndicators() {
      carouselIndicators.innerHTML = ""
      const maxIndicators = Math.ceil(totalSlides / slidesPerView)
  
      for (let i = 0; i < maxIndicators; i++) {
        const indicator = document.createElement("div")
        indicator.classList.add("carousel-indicator")
        if (i === 0) indicator.classList.add("active")
  
        indicator.addEventListener("click", () => {
          currentSlide = i * slidesPerView
          if (currentSlide > totalSlides - slidesPerView) {
            currentSlide = totalSlides - slidesPerView
          }
          moveCarousel()
        })
  
        carouselIndicators.appendChild(indicator)
      }
    }
  
    // Actualizar los indicadores activos
    function updateIndicators() {
      const indicators = document.querySelectorAll(".carousel-indicator")
      const activeIndicatorIndex = Math.floor(currentSlide / slidesPerView)
  
      indicators.forEach((indicator, index) => {
        indicator.classList.toggle("active", index === activeIndicatorIndex)
      })
    }
  
    // Botones de navegación del carousel
    prevBtn.addEventListener("click", () => {
      currentSlide = Math.max(currentSlide - slidesPerView, 0)
      moveCarousel()
    })
  
    nextBtn.addEventListener("click", () => {
      currentSlide = Math.min(currentSlide + slidesPerView, totalSlides - slidesPerView)
      moveCarousel()
    })
  
    // Inicializar el carousel
    updateCarouselDimensions()
    createIndicators()
  
    // Actualizar el carousel cuando cambia el tamaño de la ventana
    window.addEventListener("resize", () => {
      updateCarouselDimensions()
      createIndicators()
    })
  
    // Datos de proyectos para la galería
    const projectsData = {
      proyecto1: {
        title: "Tricks",
        description:
          "Aplicación web diseñada para que los usuarios puedan organizar y visualizar las calificaciones de los aspirantes que desean ingresar a la institución.",
        features: [
          "Todos los CRUDS cuentan con filtros de búsqueda",
          "Tiene subida masiva de datos mediante archivos de excel",
          "Cuenta con eliminación lógica"
        ],
        technologies: ["HTML", "CSS", "JavaScript", "Java Servlet", "MySQL", "AWS", "Bootstrap"],
        images: [
          "https://res.cloudinary.com/dotiwcsqf/image/upload/v1747195508/tricks_hintri.png",
          "https://res.cloudinary.com/dotiwcsqf/image/upload/v1747195509/tricks2_vknex3.png",
          "https://res.cloudinary.com/dotiwcsqf/image/upload/v1747195510/tricks3_hmftci.png",
          "https://res.cloudinary.com/dotiwcsqf/image/upload/v1747195510/tricks4_qucaz0.png",
        ],
        codeUrl: "https://github.com/josemanuel11sans/Tricks",
      },
      proyecto2: {
        title: "Ris",
        description:
          "Una aplicación intuitiva para organizar y monitorear pacientes, medicinas y doctores dentro de una institución de salud (hospital).",
        features: [
          "Dashboard diferente para cada rol",
          "Organización de información mediante filtros",
          "Cuenta con eliminación lógica"
        ],
        technologies: ["HTML", "CSS", "JavaScript", "JWT", "MySQL", "React", "Spring Boot"],
        images: [
          "https://res.cloudinary.com/dotiwcsqf/image/upload/v1747195505/ris_kpkewq.png",
          "https://res.cloudinary.com/dotiwcsqf/image/upload/v1747195506/ris2_jp7d8p.png",
          "https://res.cloudinary.com/dotiwcsqf/image/upload/v1747195507/ris3_d98oqq.png",
          "https://res.cloudinary.com/dotiwcsqf/image/upload/v1747195507/ris4_ecl3bi.png",
        ],
        codeUrl: "https://github.com/josemanuel11sans/Ris",
      },
      proyecto3: {
        title: "Monitor de variables de entorno",
        description:
          "Aplicación web con visualización de datos en tiempo real y gráficos interactivos sobre las condiciones ambientales de un salón de clases.",
        features: [
          "Datos en tiempo real",
          "Cuenta con eliminación lógica",
          "Alertas y notificaciones con foto incluida",
        ],
        technologies: ["HTML", "CSS", "JavaScript", "JWT", "MySQL", "React", "Node.js", "MQTT"],
        images: [
          "https://res.cloudinary.com/dotiwcsqf/image/upload/v1747195502/mo_bujgbr.png",
          "https://res.cloudinary.com/dotiwcsqf/image/upload/v1747195503/mo2_fmek0d.png",
          "https://res.cloudinary.com/dotiwcsqf/image/upload/v1747195504/mo3_r1eolr.jpg",
          "https://res.cloudinary.com/dotiwcsqf/image/upload/v1747195505/mo4_rqmtwx.jpg",
        ],
        codeUrl: "https://github.com/AndresilloDev/MOVE-Web",
      },
      proyecto4: {
        title: "Identificador de creaturas",
        description:
          "Aplicación web que te ayuda a identificar que tipo de creatura estás describiendo en base a sus características, todo esto se realiza con ayudo de el algoritmo KNN.",
        features: [
          "Permite el ingreso de archivos excel",
          "Utiliza el algoritmo KNN",
          "Las características ingresadas se ingresan del 1 - 10",
        ],
        technologies: ["HTML", "CSS", "JavaScript"],
        images: [
          "https://res.cloudinary.com/dotiwcsqf/image/upload/v1747195499/criatu_ftct8m.png",
          "https://res.cloudinary.com/dotiwcsqf/image/upload/v1747195500/criatu2_f6hipn.png",
          "https://res.cloudinary.com/dotiwcsqf/image/upload/v1747195501/criatu3_pqk6tw.png",
          "https://res.cloudinary.com/dotiwcsqf/image/upload/v1747195501/criatu4_kiensl.jpg",
        ],
        codeUrl: "https://github.com/RuuizOr/IntegradoraDerick",
      },
      proyecto5: {
        title: "Gestión de vehículos",
        description:
          "Aplicación web diseñada para gestionar servicios asignados a vehículos dentro de un taller mecánico, la cual cuenta con los roles de cliente y administrador",
        features: [
          "Todos los CRUDS cuentan con filtros de búsqueda",
          "Sistema con diversos roles de acceso",
          "Cuenta con eliminación lógica",
        ],
        technologies: ["HTML", "CSS", "JavaScript", "MySQL", "Spring Boot", "JWT"],
        images: [
          "https://res.cloudinary.com/dotiwcsqf/image/upload/v1747195498/carros3_wklmwi.png",
          "https://res.cloudinary.com/dotiwcsqf/image/upload/v1747195497/carros_imud7l.png",
          "https://res.cloudinary.com/dotiwcsqf/image/upload/v1747195497/carros2_tzkldm.png",
          "https://res.cloudinary.com/dotiwcsqf/image/upload/v1747195499/carros4_kd7smk.png",
        ],
        codeUrl: "https://github.com/RuuizOr/GestionVehiculos-Front",
      },
      proyecto6: {
        title: "Brawl community",
        description:
          "Herramienta web que permite a los jugadores de Brawl Stars proponer mejoras, ver novedades y expresar sus opiniones sobre el juego.",
        features: [
          "Sugerencias vistas por todos los que ingresen",
          "Cuenta con eliminación lógica",
          "Interfaz intuitiva y fácil de entender",
        ],
        technologies: ["HTML", "CSS", "JavaScript", "React", "Node.js", "MongoDB"],
        images: [
          "https://res.cloudinary.com/dotiwcsqf/image/upload/v1747195495/braw_rxlzw9.png",
          "https://res.cloudinary.com/dotiwcsqf/image/upload/v1747195496/braw3_ag1jnb.png",
          "https://res.cloudinary.com/dotiwcsqf/image/upload/v1747195496/braw2_kegcyq.png",
          "https://res.cloudinary.com/dotiwcsqf/image/upload/v1747195496/braw4_ews2le.png",
        ],
        codeUrl: "https://github.com/AndresilloDev/BrawlStars",
      },
    }
  
    // Variables para la galería
    let currentProject = null
    let currentImageIndex = 0
  
    // Función para abrir el modal con la información del proyecto
    function openProjectModal(projectId) {
      const project = projectsData[projectId]
      if (!project) return
  
      currentProject = project
      currentImageIndex = 0
  
      // Actualizar el contenido del modal
      modalTitle.textContent = project.title
      galleryMainImg.src = project.images[0]
      galleryMainImg.alt = project.title
      projectDescription.textContent = project.description
  
      // Actualizar características
      projectFeatures.innerHTML = ""
      project.features.forEach((feature) => {
        const li = document.createElement("li")
        li.textContent = feature
        projectFeatures.appendChild(li)
      })
  
      // Actualizar tecnologías
      projectTechTags.innerHTML = ""
      project.technologies.forEach((tech) => {
        const span = document.createElement("span")
        span.textContent = tech
        projectTechTags.appendChild(span)
      })
  
      // Actualizar enlaces
      codeLink.href = project.codeUrl
  
      // Crear miniaturas
      galleryThumbs.innerHTML = ""
      project.images.forEach((img, index) => {
        const thumb = document.createElement("div")
        thumb.classList.add("gallery-thumb")
        if (index === 0) thumb.classList.add("active")
  
        const thumbImg = document.createElement("img")
        thumbImg.src = img
        thumbImg.alt = `Miniatura ${index + 1}`
  
        thumb.appendChild(thumbImg)
        thumb.addEventListener("click", () => {
          currentImageIndex = index
          updateGalleryImage()
        })
  
        galleryThumbs.appendChild(thumb)
      })
  
      // Mostrar el modal
      projectModal.classList.add("active")
      document.body.style.overflow = "hidden" // Evitar scroll en el body
    }
  
    // Función para actualizar la imagen principal de la galería
    function updateGalleryImage() {
      if (!currentProject) return
  
      galleryMainImg.src = currentProject.images[currentImageIndex]
  
      // Actualizar miniaturas activas
      const thumbs = document.querySelectorAll(".gallery-thumb")
      thumbs.forEach((thumb, index) => {
        thumb.classList.toggle("active", index === currentImageIndex)
      })
    }
  
    // Navegación de imágenes
    prevImgBtn.addEventListener("click", () => {
      if (!currentProject) return
      currentImageIndex = (currentImageIndex - 1 + currentProject.images.length) % currentProject.images.length
      updateGalleryImage()
    })
  
    nextImgBtn.addEventListener("click", () => {
      if (!currentProject) return
      currentImageIndex = (currentImageIndex + 1) % currentProject.images.length
      updateGalleryImage()
    })
  
    // Cerrar el modal
    closeModal.addEventListener("click", () => {
      projectModal.classList.remove("active")
      document.body.style.overflow = "" // Restaurar scroll
    })
  
    // Cerrar el modal al hacer clic fuera del contenido
    projectModal.addEventListener("click", (e) => {
      if (e.target === projectModal) {
        projectModal.classList.remove("active")
        document.body.style.overflow = ""
      }
    })
  
    // Abrir modal al hacer clic en un proyecto
    projectCards.forEach((card) => {
      const projectId = card.getAttribute("data-project")
      card.querySelector(".view-project-btn").addEventListener("click", (e) => {
        e.stopPropagation() // Evitar que el clic se propague a la tarjeta
        openProjectModal(projectId)
      })
    })
  
    // Observador de intersección para las barras de progreso
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll(".progress")
            progressBars.forEach((bar) => {
              const width = bar.getAttribute("style").split(":")[1].trim()
              bar.style.width = "0"
              setTimeout(() => {
                bar.style.width = width
              }, 100)
            })
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 },
    )
  
    // Observar la sección de habilidades técnicas
    const techSkillsSection = document.getElementById("habilidades-tecnicas")
    if (techSkillsSection) {
      observer.observe(techSkillsSection)
    }
  
    // Efecto de scroll para la navegación
    window.addEventListener("scroll", () => {
      const header = document.querySelector("header")
  
      if (window.scrollY > 50) {
        header.style.padding = "1rem 5%"
        header.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.3)"
      } else {
        header.style.padding = "1.5rem 5%"
        header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.3)"
      }
    })
  
    // Animación de entrada para las secciones
    const allSections = document.querySelectorAll(".section")
  
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1"
            entry.target.style.transform = "translateY(0)"
            sectionObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 },
    )
  
    allSections.forEach((section) => {
      section.style.opacity = "0"
      section.style.transform = "translateY(20px)"
      section.style.transition = "opacity 0.6s ease, transform 0.6s ease"
      sectionObserver.observe(section)
    })
  })
  