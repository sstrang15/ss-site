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

    let itemsHtml = "";

    for (const item of sidebar.items) {
        const navigationItemHtml = renderNavigationItem(item);

        itemsHtml += navigationItemHtml + "\n" + indent(20);
    }

    itemsHtml = itemsHtml.trimEnd();

    const rightSidebarHtml = `${indent(12)}<aside class="right-sidebar">
                <header class="right-sidebar-header">
                    <h2>${sidebar.title}</h2>
                </header>
                <nav
                    class="right-navigation"
                    aria-label="${sidebar.title}"
                >
                    ${itemsHtml}
                </nav>
            </aside>`;

    return rightSidebarHtml;
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

    const navigationItemHtml = `<button
                        type="button"
                        class="right-navigation-item"
                        data-navigation-item="${createName(item.id)}"
                        ${selectedAttribute}
                    >
                    ${item.title}
                    </button>`;

    return navigationItemHtml;
}

export function initializePageNavigation(site, renderApp) {
    // locates the divs with the pageId i am needing are based on class
    const navigationItems = document.querySelectorAll(".right-navigation-item")
    // attach click listeners
    navigationItems.forEach(item => {
        // add a listener for click for every item
        item.addEventListener("click", () => {
            // based on the item that was clicked go inside its dataset anf find its id stored under navigationItem 
            // data-navigation-item=
            const pageId = item.dataset.navigationItem;
            // find the active tab object inside the site data
            const activeTab = site.navigation.tabs.find(
                tab => tab.id === site.navigation.activeTab
            );


            // change the selectedPageId on that active tab object
            activeTab.selectedPageId = pageId;
            
            console.log(activeTab.selectedPageId)

            renderApp()
        })
    })

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

export function indent(spaces) {
    return " ".repeat(spaces);
}