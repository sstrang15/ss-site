/* =========================================================
   PARENT FUNCTION
   ========================================================= */


/**
 * Renders the website header.
 *
 * Input:
 * {
 *   header: Object,
 *   navigation: Object
 * }
 */
export function renderHeader(website) {
    if (!website) {
        return renderError("Header requires the website object.");
    }

    if (!website.header) {
        return renderError("Website requires header data.");
    }

    if (!website.navigation) {
        return renderError("Website requires navigation data.");
    }

    const header = website.header;
    const navigation = website.navigation;

    if (!header.title) {
        return renderError("Header requires a title.");
    }

    let subtitleHtml = "";

    if (header.subtitle) {
        subtitleHtml = `<p class="site-subtitle">
                    ${header.subtitle}
                </p>`;
        }

    const contactHtml = renderContact(header.contact);
    const navigationHtml = renderNavigation(navigation);

    const headerHtml = `${indent(8)}<header class="site-header">
            <div class="header-content">
                <div class="site-identity">
                <h1 class="site-title">
                    ${header.title}
                </h1>
                ${subtitleHtml}
                </div>
                ${contactHtml}
                ${navigationHtml}
            </div>
        </header>`;

    return headerHtml;
}

/* =========================================================
   CONTACT FUNCTION
   ========================================================= */


/**
 * Renders the contact information.
 *
 * Input:
 * Array<{
 *   id: String,
 *   title: String,
 *   value: String,
 *   href: String
 * }>
 */
function renderContact(contact) {
    if (!Array.isArray(contact)) {
        return renderError("Header requires a contact array.");
    }

    let contactHtml = "";

    for (const item of contact) {
        if (!item.id) {
            return renderError("Contact item requires an id.");
        }

        if (!item.title) {
            return renderError(
                `Contact item "${item.id}" requires a title.`
            );
        }

        if (!item.value) {
            return renderError(
                `Contact item "${item.id}" requires a value.`
            );
        }

        if (!item.href) {
            return renderError(
                `Contact item "${item.id}" requires an href.`
            );
        }

        const contactItemHtml = `<div class="site-contact-item" data-contact="${createName(item.id)}">
                        <span class="site-contact-title">
                        ${item.title}:
                        </span>
                        <a class="site-contact-value" href="${item.href}">
                        ${item.value}
                        </a>
                    </div>`;

        contactHtml += contactItemHtml + "\n" + indent(20);
    }

    contactHtml = contactHtml.trimEnd();

    const siteContactHtml = `<div class="site-contact">
                    ${contactHtml}
                </div>`;

    return siteContactHtml;
}


/* =========================================================
   NAVIGATION FUNCTIONS
   ========================================================= */


/**
 * Renders the top navigation.
 *
 * Input:
 * {
 *   activeTab: String,
 *   tabs: Array<Tab>
 * }
 */
function renderNavigation(navigation) {
    if (!navigation.activeTab) {
        return renderError("Navigation requires an activeTab.");
    }

    if (!Array.isArray(navigation.tabs)) {
        return renderError("Navigation requires a tabs array.");
    }

    let tabsHtml = "";

    for (const tab of navigation.tabs) {
        const navigationTabHtml = renderNavigationTab(
            tab,
            navigation.activeTab
        );

        tabsHtml += navigationTabHtml + "\n" + indent(20);
    }

    tabsHtml = tabsHtml.trimEnd();

    const navigationHtml = `<nav class="top-navigation" aria-label="primary navigation">
                    ${tabsHtml}
                </nav>`;

    return navigationHtml;
}
/**
 * Renders one navigation tab.
 *
 * Input:
 * {
 *   id: String,
 *   title: String
 * }
 */
function renderNavigationTab(tab, activeTab) {
    if (!tab) {
        return renderError("A navigation tab is missing.");
    }

    if (!tab.id) {
        return renderError("Navigation tab requires an id.");
    }

    if (!tab.title) {
        return renderError(
            `Navigation tab "${tab.id}" requires a title.`
        );
    }

    const activeAttribute = tab.id === activeTab
        ? `aria-current="page"`
        : "";

    const navigationTabHtml = `<button type="button" class="top-navigation-tab" data-navigation-tab="${createName(tab.id)}" ${activeAttribute}>
                    ${tab.title}
                    </button>`;

    return navigationTabHtml;
}


/* =========================================================
   NAVIGATION INITIALIZATION
   ========================================================= */


/**
 * Attaches click listeners to top navigation tabs.
 */
export function initializeNavigation(site, renderApp) {
    const navigationTabs = document.querySelectorAll(
        ".top-navigation-tab"
    );

    navigationTabs.forEach(tab => {
        tab.addEventListener("click", () => {
            const tabId = tab.dataset.navigationTab;

            site.navigation.activeTab = tabId;
            console.log(site.navigation.activeTab);

            renderApp();
        });
    });
}


/* =========================================================
   SUPPORT FUNCTIONS
   ========================================================= */


/**
 * Displays a visible header error.
 */
function renderError(message) {
    return `<div class="header-error" role="alert">
    <strong>
        Header error:
    </strong>
    ${message}
</div>`;
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

// HTML fragment
// → split into individual lines
// → add spaces to the front of every line
// → join the lines back together

function indentHtml(html, spaces) {
    const indentation = " ".repeat(spaces);

    return html
        .split("\n")
        .map(line => indentation + line)
        .join("\n");
}

export function indent(spaces) {
    return " ".repeat(spaces);
}