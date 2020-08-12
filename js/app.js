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
let navbarListItems;
let contentSections;
let last_known_scroll_position = 0;
const offset = 100;

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
  navbarListItems = Array.from(navbarList.children);
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
  for (let i = 0; i < contentSectionsToUpdate.length; i++) {
    const contentStart = contentSectionsToUpdate[i].offsetTop - offset;
    const contentEnd = contentStart + contentSectionsToUpdate[i].offsetHeight;

    if (
      last_known_scroll_position >= contentStart &&
      last_known_scroll_position <= contentEnd
    ) {
      contentSectionsToUpdate[i].classList.add("active");
      navbarListItems[i].classList.add("active");
    } else {
      contentSectionsToUpdate[i].classList.remove("active");
      navbarListItems[i].classList.remove("active");
    }
  }
}

function scrollToYPosition(scrollYPosition) {
  window.scrollTo({
    top: scrollYPosition,
    behavior: "smooth",
  });
}
