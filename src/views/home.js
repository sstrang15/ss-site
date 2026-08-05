import { renderHeader } from "../components/header.js";
import { renderContent } from "../components/content.js";
import { renderLeftSidebar } from "../components/leftSidebar.js";
import { renderRightSidebar } from "../components/rightSidebar.js";


/**
 * Renders the complete home view.
 *
 * Input:
 * {
 *   header: Object,
 *   leftSidebar: Object,
 *   content: Object,
 *   rightSidebar: Object
 * }
 */

export function renderHome(website) {
    const activeTab = website.navigation.tabs.find(
        tab => tab.id === website.navigation.activeTab
    );

    if (!activeTab) {
        return `
            <div class="page-error" role="alert">
                <strong>Home error:</strong>
                Active navigation "${website.navigation.activeTab}" was not found.
            </div>
        `;
    }

    const activePage = website.pages.find(
        page => page.id === activeTab.selectedPageId
    );

    if (!activePage) {
        return `
            <div class="page-error" role="alert">
                <strong>Home error:</strong>
                Selected page "${activeTab.selectedPageId}" was not found.
            </div>
        `;
    }

    const rightSidebar = {
        title: activeTab.title,

        items: activeTab.pageIds.map(pageId => {
            const page = website.pages.find(
                page => page.id === pageId
            );

            return {
                id: page.id,
                title: page.title,
                selected: page.id === activeTab.selectedPageId
            };
        })
    };

    const leftSidebar = {
        title: "Sections",
        sections: activePage.sections
    };

    return `
        <div class="site-shell">

            ${renderHeader(website)}

            <div class="page-layout">

                ${renderLeftSidebar(leftSidebar)}

                ${renderContent(activePage)}

                ${renderRightSidebar(rightSidebar)}

            </div>

        </div>
    `;
}