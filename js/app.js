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

// store the unordered list in a variable
const navList = document.querySelector('#navbar__list');

// make an empty list to contain the IDs of each section.
const sections = [];

const innerDivList = document.querySelectorAll('.landing__container');

// select each div is parent element and push its id into the sections list
innerDivList.forEach(function(div) {
    const sectionElem = div.parentElement;
    sections.push(sectionElem);
})


/**
 * End Global Variables
 * Start Helper Functions
 * 
 */

/**
 * @description this function make a new anchor element with the neccessary options that we need
 * @constructor
 * @param {number} index - the index that should be used to get the number of the section
 * @returns {HTMLAnchorElement} an anchor html element 
 */
function makeAnchor(index) {
    const aElem = document.createElement('a');
    aElem.textContent = sections[index].getAttribute('data-nav');

    aElem.setAttribute('class', 'menu__link');
    aElem.setAttribute('section-targeted', index);

    return aElem;
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
 */

// build the nav
function buildNav() {

    // make a fragment to use it as a temporary container for the nav items
    const fragment = document.createDocumentFragment();

    // building the sections list items
    for (let i = 0; i < sections.length; i++) {
        const liElem = document.createElement('li');
        const anchor = makeAnchor(i);
        liElem.appendChild(anchor);
        fragment.appendChild(liElem);
    }
    navList.appendChild(fragment);

}

// Add class 'active' to section when near top of viewport
/**
 * @description this function toggle the active class depending on whther the element is inside the viewport or not
 * @param {HTMLElement} section - a section html element to use its boundaries to check if it is inside the view port
 */
function setActive(section) {
    const bounding = section.getBoundingClientRect();
    if (bounding.top >= -53 && bounding.top <= 445) {
        section.classList.add('your-active-class');
    } else {
        section.classList.remove('your-active-class');
    }
}

// Scroll to anchor ID using scrollTO event
/**
 * @description this function scroll to the targeted section
 * @param {MouseEvent} event - since this function is assigned to an event listener, we will pass it an event an get its target
 */
function scrollToSection(event) {
    const anchor = event.target
    const indexOfSection = parseInt(anchor.getAttribute('section-targeted'));
    const sectionTop = sections[indexOfSection].offsetTop;
    window.scrollTo(0, sectionTop);
}

/**
 * End Main Functions
 * Begin Events
 * 
 */

// Build menu 
buildNav();

// Scroll to section on link click
const links = document.querySelectorAll('.menu__link');
for (const link of links) {
    link.addEventListener('click', scrollToSection);
}

// Set sections as active
window.addEventListener('scroll', function() {
    for (const section of sections) {
        setActive(section);
    };
})