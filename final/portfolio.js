let portfolioProjects = [];


/* ==========================================================
   LOAD PROJECTS
========================================================== */

fetch("projects.json")
    .then((response) => {
        if (!response.ok) {
            throw new Error("Unable to load projects.json");
        }

        return response.json();
    })

    .then((data) => {
        portfolioProjects = data.projects || [];

        renderProjects(portfolioProjects);
        initializeFilters();
        initializeRevealAnimations();
    })

    .catch((error) => {
        console.error("Portfolio project error:", error);

        const projectGrid = document.getElementById("project-grid");

        if (projectGrid) {
            projectGrid.innerHTML = `
                <p class="project-error">
                    Projects are temporarily unavailable.
                </p>
            `;
        }
    });



/* ==========================================================
   RENDER PROJECT CARDS
========================================================== */

function renderProjects(projects) {

    const projectGrid = document.getElementById("project-grid");

    if (!projectGrid) {
        return;
    }

    projectGrid.innerHTML = "";


    projects.forEach((project, index) => {

        const card = document.createElement("a");

        card.href = `${project.subdomain}.html`;

        card.className = "project-card reveal";

        card.dataset.categories = project.category.join(" ");

        card.id = project.subdomain;


        const categoryLabel = getCategoryLabel(project.category);

        const abstract = Array.isArray(project.abstract)
            ? project.abstract[0]
            : project.abstract;


        card.innerHTML = `

            <div class="project-image">

                <img
                    src="${project.mainimg}"
                    alt="${project.name}"
                    loading="lazy"
                >

                <span class="project-arrow" aria-hidden="true">
                    ↗
                </span>

            </div>


            <div class="project-info">

                <div>

                    <p class="project-category">
                        ${categoryLabel}
                    </p>

                    <h3 class="project-title">
                        ${project.name.trim()}
                    </h3>

                    <p class="project-description">
                        ${abstract}
                    </p>

                </div>


                <p class="project-number">
                    ${String(index + 1).padStart(2, "0")}
                </p>

            </div>
        `;


        projectGrid.appendChild(card);

    });

}



/* ==========================================================
   CLEAN CATEGORY LABELS
========================================================== */

function getCategoryLabel(categories) {

    if (
        categories.includes("design") ||
        categories.includes("branding") ||
        categories.includes("art")
    ) {
        return "Visual Design";
    }


    if (
        categories.includes("research") ||
        categories.includes("ux") ||
        categories.includes("digital-culture")
    ) {
        return "Research & Analysis";
    }


    if (
        categories.includes("game") ||
        categories.includes("python") ||
        categories.includes("c++")
    ) {
        return "Interactive Experience";
    }


    return "Creative Project";
}



/* ==========================================================
   FILTER BUTTONS
========================================================== */

function initializeFilters() {

    const buttons = document.querySelectorAll(
        "#buttons button"
    );


    buttons.forEach((button) => {

        button.addEventListener("click", () => {

            buttons.forEach((item) => {
                item.classList.remove("active");
            });


            button.classList.add("active");


            filterProjects(button.value);

        });

    });

}



function filterProjects(filter) {

    const cards = document.querySelectorAll(
        ".project-card"
    );


    cards.forEach((card) => {

        const categories =
            card.dataset.categories.split(" ");


        let showProject = false;


        if (filter === "all") {

            showProject = true;

        }


        else if (filter === "design") {

            showProject =
                categories.includes("design") ||
                categories.includes("branding") ||
                categories.includes("art") ||
                categories.includes("illustrator") ||
                categories.includes("image");

        }


        else if (filter === "research") {

            showProject =
                categories.includes("research") ||
                categories.includes("ux") ||
                categories.includes("presentation") ||
                categories.includes("digital-culture");

        }


        else if (filter === "game") {

            showProject =
                categories.includes("game") ||
                categories.includes("python") ||
                categories.includes("c++") ||
                categories.includes("animation");

        }


        if (showProject) {

            card.classList.remove("hidden");

        }

        else {

            card.classList.add("hidden");

        }

    });

}



/* ==========================================================
   SCROLL REVEAL
========================================================== */

function initializeRevealAnimations() {

    const revealElements =
        document.querySelectorAll(".reveal");


    if (
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {

        revealElements.forEach((element) => {
            element.classList.add("visible");
        });

        return;
    }


    const observer =
        new IntersectionObserver(

            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },

            {
                threshold: 0.12,
                rootMargin:
                    "0px 0px -40px 0px"
            }

        );


    revealElements.forEach((element) => {
        observer.observe(element);
    });

}



/* ==========================================================
   FOOTER YEAR
========================================================== */

const yearElement =
    document.getElementById("year");


if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();

}



/* ==========================================================
   FADE HERO IN IMMEDIATELY
========================================================== */

window.addEventListener("DOMContentLoaded", () => {

    document
        .querySelectorAll(".hero .reveal")
        .forEach((element, index) => {

            setTimeout(() => {

                element.classList.add("visible");

            }, 120 + index * 100);

        });

});