/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */

let navbarList;
let contentSections;
const offset = 100;
let last_known_scroll_position = 0;

window.addEventListener("DOMContentLoaded", () => {
  navbarList = document.querySelector("#navbar__list");
  contentSections = document.querySelectorAll("section");
  contentSections = Array.from(contentSections);

  createNavMenu();
  addScrollEventListener();
  addClickEventListenerToMainMenu();
});

function createNavMenu() {
  let fragment = document.createDocumentFragment();

  for (let contentSection of contentSections) {
    let li = document.createElement("li");
    li.innerHTML = `
        <a href="#${contentSection.id}" class="menu__link">
            ${contentSection.dataset.nav}
        </a>
    `;
    fragment.appendChild(li);
  }

  navbarList.appendChild(fragment);
}

function addScrollEventListener() {
  document.addEventListener("scroll", () => {
    last_known_scroll_position = window.scrollY;
    updateActiveContentSections(contentSections);
  });
}

// Scroll to anchor ID using scrollTO event
function addClickEventListenerToMainMenu() {
  navbarList.addEventListener("click", (e) => {
    e.preventDefault();
    const contentSectionNumber = Number(e.target.innerText.split(" ")[1] - 1);
    const scrollYPosition = contentSections[contentSectionNumber].offsetTop;
    scrollToYPosition(scrollYPosition);
  });
}

function updateActiveContentSections(contentSectionsToUpdate) {
  for (let contentSection of contentSectionsToUpdate) {
    const contentStart = contentSection.offsetTop - offset;
    const contentEnd = contentStart + contentSection.offsetHeight - offset;

    if (
      last_known_scroll_position >= contentStart &&
      last_known_scroll_position <= contentEnd
    ) {
      contentSection.classList.add("active");
    } else {
      contentSection.classList.remove("active");
    }
  }
}

function scrollToYPosition(scrollYPosition) {
  window.scrollTo({
    top: scrollYPosition,
    behavior: "smooth",
  });
}
