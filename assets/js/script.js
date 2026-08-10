"use strict";

/**
 * Portfolio JavaScript
 * Simple static portfolio - no server required
 */

// Utility: Toggle class
const toggleClass = (elem, className = "active") =>
  elem.classList.toggle(className);

// Sidebar toggle
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");
sidebarBtn?.addEventListener("click", () => toggleClass(sidebar));

// Testimonials modal handling
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");
const modalAvatar = document.querySelector("[data-modal-avatar]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalRole = document.querySelector("[data-modal-role]");
const modalDate = document.querySelector("[data-modal-date]");
const modalText = document.querySelector("[data-modal-text]");

const toggleModal = () => {
  toggleClass(modalContainer);
  toggleClass(overlay);
};

document.querySelectorAll("[data-testimonials-item]").forEach((item) => {
  item.addEventListener("click", () => {
    const avatar = item.querySelector("[data-testimonials-avatar]");
    const title = item.querySelector("[data-testimonials-title]");
    const role = item.querySelector("[data-testimonials-role]");
    const text = item.querySelector("[data-testimonials-text]");

    if (modalAvatar && avatar) modalAvatar.textContent = avatar.textContent;
    if (modalTitle && title) modalTitle.textContent = title.textContent;
    if (modalRole) {
      modalRole.textContent = role ? role.textContent : "";
      modalRole.style.display = role ? "" : "none";
    }
    if (modalDate) {
      modalDate.dateTime = item.dataset.testimonialsDate || "";
      modalDate.textContent = item.dataset.testimonialsDateLabel || "";
    }
    if (modalText && text) modalText.innerHTML = text.innerHTML;

    toggleModal();
  });
});

modalCloseBtn?.addEventListener("click", toggleModal);
overlay?.addEventListener("click", toggleModal);

// Custom select dropdown
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtns = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

const applyFilter = (value) => {
  // Normalize the filter value (lowercase, trim spaces, replace spaces with hyphens)
  const normalizedValue = value.toLowerCase().trim().replace(/\s+/g, "-");
  
  filterItems.forEach((item) => {
    // Always remove active class first
    item.classList.remove("active");
    
    // Get the category list and normalize it
    const itemCategory = (item.dataset.category || "").toLowerCase().trim();
    const categories = itemCategory.split(",").map(s => s.trim().replace(/\s+/g, "-"));
    
    // Check if this item matches the filter
    const match = normalizedValue === "all" || categories.includes(normalizedValue);
    
    // Only add active class if it matches
    if (match) {
      item.classList.add("active");
    }
  });
};

select?.addEventListener("click", () => toggleClass(select));

// Handle select dropdown items
selectItems.forEach((item) => {
  item.addEventListener("click", () => {
    const selected = item.innerText.toLowerCase().trim();
    if (selectValue) selectValue.innerText = item.innerText;
    toggleClass(select);
    applyFilter(selected);
    
    // Update active state in filter buttons
    filterBtns.forEach((btn) => {
      if (btn.innerText.toLowerCase().trim() === selected) {
        filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
      }
    });
  });
});

// Filter button (large screen)
let lastClickedBtn = filterBtns[0];

filterBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const selected = btn.innerText.toLowerCase().trim();
    if (selectValue) selectValue.innerText = btn.innerText;
    
    // Apply the filter immediately
    applyFilter(selected);

    // Update button active states
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    lastClickedBtn = btn;
  });
});

// Page navigation
const navLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const selectedPage = link.innerText.toLowerCase();

    pages.forEach((page) => {
      const isActive = selectedPage === page.dataset.page;
      page.classList.toggle("active", isActive);
    });

    navLinks.forEach((nav) => {
      const isActive = nav.innerText.toLowerCase() === selectedPage;
      nav.classList.toggle("active", isActive);
    });

    window.scrollTo(0, 0);
  });
});

// Initialize filter on page load - show all projects by default
// Run after a short delay to ensure DOM is fully ready
setTimeout(() => {
  if (filterItems.length > 0) {
    applyFilter("all");
  }
}, 100);

// Project Modal Handling
const projectModal = document.querySelector("[data-project-modal]");
const projectOverlay = document.querySelector("[data-project-overlay]");
const projectCloseBtn = document.querySelector("[data-project-close]");
const projectViewBtns = document.querySelectorAll("[data-project-view]");

const projectModalImg = document.querySelector("[data-project-modal-img]");
const projectModalTitle = document.querySelector("[data-project-modal-title]");
const projectModalCategory = document.querySelector("[data-project-modal-category]");
const projectModalRole = document.querySelector("[data-project-modal-role]");
const projectModalDescription = document.querySelector("[data-project-modal-description]");
const projectModalTech = document.querySelector("[data-project-modal-tech]");
const projectModalLink = document.querySelector("[data-project-modal-link]");

const toggleProjectModal = () => {
  toggleClass(projectModal);
  toggleClass(projectOverlay);
  // Prevent body scroll when modal is open
  if (projectModal.classList.contains("active")) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
};

// Handle project view button clicks
projectViewBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Find the parent project item
    const projectItem = btn.closest("[data-project-title]");
    
    if (projectItem) {
      // Populate modal with project data
      if (projectModalImg) {
        projectModalImg.src = projectItem.dataset.projectImg || "";
        projectModalImg.alt = projectItem.dataset.projectTitle || "Project Image";
      }
      
      if (projectModalTitle) {
        projectModalTitle.textContent = projectItem.dataset.projectTitle || "";
      }
      
      if (projectModalCategory) {
        projectModalCategory.textContent = projectItem.dataset.projectCategory || "";
      }
      
      if (projectModalRole) {
        projectModalRole.textContent = projectItem.dataset.projectRole || "";
      }
      
      if (projectModalDescription) {
        projectModalDescription.innerHTML = projectItem.dataset.projectDescription || "";
      }
      
      if (projectModalTech) {
        projectModalTech.textContent = projectItem.dataset.projectTech || "";
      }
      
      if (projectModalLink) {
        const link = projectItem.dataset.projectLink || "#";
        projectModalLink.href = link;
        if (link === "#") {
          projectModalLink.style.display = "none";
        } else {
          projectModalLink.style.display = "inline-flex";
        }
      }
      
      toggleProjectModal();
    }
  });
});

// Close modal handlers
projectCloseBtn?.addEventListener("click", toggleProjectModal);
projectOverlay?.addEventListener("click", toggleProjectModal);

// Close modal on Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && projectModal?.classList.contains("active")) {
    toggleProjectModal();
  }
});
