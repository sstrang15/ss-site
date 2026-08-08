import {
    header,
    contact,
    tabs,
    pages,
    sections,
    elements
} from "./definitions.js";


const textFiles = import.meta.glob(
    "../content/text/*.txt",
    {
        query: "?raw",
        import: "default",
        eager: true
    }
);

const imageFiles = import.meta.glob(
    "../content/images/*.{png,jpg,jpeg,webp,svg}",
    {
        eager: true,
        query: "?url",
        import: "default"
    }
);


/* =========================================================
   PARENT FUNCTION
   ========================================================= */


/**
 * Assembles the complete site object from the
 * repository definitions.
 */
export function assembleSite() {

    return {

        header: assembleHeader(
            header,
            contact
        ),

        navigation: assembleNavigation(
            tabs,
            pages
        ),

        pages: assemblePages(
            pages,
            sections,
            elements
        )

    };

}


/* =========================================================
   ASSEMBLY FUNCTIONS
   ========================================================= */


/**
 * Assembles the site header.
 */
function assembleHeader(header, contact) {

    return {

        title: header.title,

        subtitle: header.subtitle,

        contact: assembleContact(contact)

    };
}

/**
 * Assembles the site's contact information.
 */
function assembleContact(contact) {

    return contact.map(method => {

        return {

            id: method.id,

            title: method.title,

            value: method.value,

            href: method.href

        };

    });

}


/**
 * Assembles the top-level navigation.
 */
function assembleNavigation(tabs) {

    let activeTab = null;

    for (const tab of tabs) {

        if (tab.active) {
            activeTab = tab.id;
        }

    }

    return {

        activeTab: activeTab,

        tabs: assembleTabs(tabs)

    };

}

/**
 * Assembles every navigation tab.
 */
function assembleTabs(tabs) {

    const assembledTabs = [];

    for (const tab of tabs) {

        const assembledTab = {

            id: tab.id,

            title: tab.title,

            pageIds: tab.pageIds,

            selectedPageId: tab.selectedPageId

        };

        assembledTabs.push(assembledTab);

    }

    return assembledTabs;

}
/**
 * Assembles every page in the site.
 */
function assemblePages(pages, sections, elements) {

    const assembledPages = [];

    for (const page of pages) {

        const pageSections = getPageSections(
            page,
            sections
        );

        const assembledPage = {

            id: page.id,

            title: page.title,

            description: page.description,

            sections: assembleSections(pageSections,elements)
        };

        assembledPages.push(assembledPage);
    }

    return assembledPages;

}

/**
 * Assembles every section belonging
 * to a page.
 */
function assembleSections(sections, elements) {

    const assembledSections = [];

    for (const section of sections) {

        const sectionElements = getSectionElements(
            section,
            elements
        );

        const assembledSection = {

            id: section.id,

            title: section.title,

            elements: assembleElements(
                sectionElements
            )

        };

        assembledSections.push(assembledSection);

    }

    return assembledSections;

}

/**
 * Assembles every element belonging
 * to a section.
 */
/**
 * Assembles every element belonging
 * to a section.
 */
function assembleElements(elements) {

    const assembledElements = [];

    for (const element of elements) {

        const assembledElement = {
            id: element.id,
            type: element.type,
            heading: element.heading
        };

        if (element.type === "text") {
            assembledElement.body = acquireText(element.content);
        }

        if (element.type === "image") {
            assembledElement.src = acquireImage(element.content);
        }

        if (element.backgroundImage) {
            assembledElement.backgroundImage = acquireImage(element.backgroundImage);
        }

        assembledElements.push(assembledElement);

    }

    return assembledElements;

}


/* =========================================================
   CONTENT ACQUISITION
   ========================================================= */


/**
 * Acquires text content by id.
 */
function acquireText(elementId) {

    const path = `../content/text/${elementId}.txt`;

    const text = textFiles[path];

    if (!text) {
        throw new Error(`Text file "${elementId}.txt" was not found.`);
    }

    const body = text.trim().split(/\n\s*\n/);

    return body;
}


/**
 * Acquires an image by id.
 */
function acquireImage(imageId) {

    const extensions = [
        "png",
        "jpg",
        "jpeg",
        "webp",
        "svg"
    ];

    for (const extension of extensions) {

        const path = `../content/images/${imageId}.${extension}`;

        const image = imageFiles[path];

        if (image) {
            return image;
        }
    }

    throw new Error(
        `Image "${imageId}" was not found.`
    );

}

/* =========================================================
   UTILITY FUNCTIONS
   ========================================================= */


/**
 * Returns every section belonging to a page.
 */
function getPageSections(page, sections) {

    const pageSections = [];

    for (const section of sections) {

        if (section.page === page.id) {
            pageSections.push(section);
        }
    }

    return pageSections;

}


/**
 * Returns every element belonging to a section.
 */
function getSectionElements(section, elements) {

    const sectionElements = [];

    for (const element of elements) {

        if (element.section === section.id) {
            sectionElements.push(element);
        }
    }

    return sectionElements;

}

