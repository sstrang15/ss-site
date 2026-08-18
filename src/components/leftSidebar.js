/* =========================================================
   PARENT FUNCTIONS
   ========================================================= */


/**
 * Renders the left sidebar.
 *
 * Input:
 * {
 *   title: String,
 *   sections: Array<SectionLink>
 * }
 */
export function renderLeftSidebar(sidebar) {
    if (!sidebar) {
        return renderError("Left sidebar requires input.");
    }

    if (!sidebar.title) {
        return renderError("Left sidebar requires a title.");
    }

    if (!Array.isArray(sidebar.sections)) {
        return renderError(
            `Left sidebar "${sidebar.title}" requires a sections array.`
        );
    }

    let sectionsHtml = "";

    for (const section of sidebar.sections) {
        const sectionLinkHtml = renderSectionLink(section);

        sectionsHtml += sectionLinkHtml + "\n" + indent(20);
    }

    sectionsHtml = sectionsHtml.trimEnd();

    const leftSidebarHtml = `${indent(12)}<aside class="left-sidebar">
                <header class="left-sidebar-header">
                    <h2>${sidebar.title}</h2>
                </header>
                <nav
                    class="section-navigation"
                    aria-label="${sidebar.title}"
                >
                    ${sectionsHtml}
                </nav>
            </aside>`;

    return leftSidebarHtml;
}

/**
 * Renders one section link.
 *
 * Input:
 * {
 *   id: String,
 *   title: String
 * }
 */
function renderSectionLink(section) {
    if (!section) {
        return renderError("A left-sidebar section is missing.");
    }

    if (!section.id) {
        return renderError("Left-sidebar section requires an id.");
    }

    if (!section.title) {
        return renderError(
            `Left-sidebar section "${section.id}" requires a title.`
        );
    }

    const sectionLinkHtml = `<a
                        class="section-navigation-item"
                        href="#${createName(section.id)}"
                        data-section-link="${createName(section.id)}"
                    >
                    ${section.title}
                    </a>`;

    return sectionLinkHtml;
}


/* =========================================================
   ERROR AND NAMING FUNCTIONS
   ========================================================= */


/**
 * Displays a visible sidebar error.
 */
function renderError(message) {
    return `
        <div
            class="sidebar-error"
            role="alert"
        >
            <strong>Left sidebar error:</strong>
            ${message}
        </div>
    `;
}


/**
 * Converts an id into an HTML-safe name.
 */
function createName(value) {
    return value
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

export function indent(spaces) {
    return " ".repeat(spaces);
}