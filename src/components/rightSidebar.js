/* =========================================================
   PARENT FUNCTIONS
   ========================================================= */


/**
 * Renders the right sidebar.
 *
 * Input:
 * {
 *   title: String,
 *   items: Array<NavigationItem>
 * }
 */
export function renderRightSidebar(sidebar) {
    if (!sidebar) {
        return renderError("Right sidebar requires input.");
    }

    if (!sidebar.title) {
        return renderError("Right sidebar requires a title.");
    }

    if (!Array.isArray(sidebar.items)) {
        return renderError(
            `Right sidebar "${sidebar.title}" requires an items array.`
        );
    }

    const itemsHtml = sidebar.items
        .map(item => renderNavigationItem(item))
        .join("");

    return `
        <aside class="right-sidebar">
            <header class="right-sidebar-header">
                <h2>${sidebar.title}</h2>
            </header>

            <nav
                class="right-navigation"
                aria-label="${sidebar.title}"
            >
                ${itemsHtml}
            </nav>
        </aside>
    `;
}


/**
 * Renders one right-sidebar navigation button.
 *
 * Input:
 * {
 *   id: String,
 *   title: String,
 *   selected: Boolean
 * }
 */
function renderNavigationItem(item) {
    if (!item) {
        return renderError(
            "A right-sidebar navigation item is missing."
        );
    }

    if (!item.id) {
        return renderError(
            "Right-sidebar navigation item requires an id."
        );
    }

    if (!item.title) {
        return renderError(
            `Right-sidebar item "${item.id}" requires a title.`
        );
    }

    const selectedAttribute = item.selected
        ? `aria-current="page"`
        : "";

    return `
        <button
            type="button"
            class="right-navigation-item"
            data-navigation-item="${createName(item.id)}"
            ${selectedAttribute}
        >
            ${item.title}
        </button>
    `;
}

export function initializePageNavigation(site, renderApp) {
    // find page buttons
    const navigationItems = document.querySelectorAll(".right-navigation-item")
    // attach click listeners
    navigationItems.forEach(item => {
        pageId = item.dataset.navigationItem;

        item.addEventListener("click", () => {
            
        })
    })

    // state that needs to change is what page displays 
    // so it finds the active page (page clicked or a default)
    // that tells page layout what to render

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
            <strong>Right sidebar error:</strong>
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