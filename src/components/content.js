/*
 * STANDARDIZED PRESENTATION OPTIONS
 *
 * layout.width:
 * "narrow" | "standard" | "wide" | "full"
 *
 * layout.alignment:
 * "left" | "center" | "right"
 *
 * layout.theme:
 * "light" | "dark" | "accent" | "transparent"
 *
 * layout.spacing:
 * "none" | "compact" | "standard" | "large"
 *
 * layout.background.type:
 * "none" | "color" | "image"
 *
 * layout.background.position:
 * "top" | "center" | "bottom" | "left" | "right"
 *
 * layout.background.size:
 * "auto" | "contain" | "cover"
 *
 * layout.background.opacity:
 * Number from 0 through 1
 *
 * behavior.effect:
 * "none" | "flash" | "pixelate" | "wave" | "fade" | "parallax"
 *
 * behavior.trigger:
 * "always" | "hover" | "scroll" | "click"
 *
 * behavior.intensity:
 * "low" | "medium" | "high"
 */


/* =========================================================
   PARENT FUNCTIONS
   ========================================================= */


/**
 * Renders the center content.
 *
 * Input:
 * {
 *   title: String,
 *   description: String,
 *   sections: Array<Section>
 * }
 */
export function renderContent(page) {
    if (!page) {
        return renderError("Content requires a page.");
    }

    if (!page.title) {
        return renderError("Page requires a title.");
    }

    if (!Array.isArray(page.sections)) {
        return renderError(`Page "${page.title}" requires a sections array.`);
    }

    const pageName = createName(page.title);

    const descriptionHtml = page.description
        ? `<p class="page-description">${page.description}</p>`
        : "";

    const sectionsHtml = page.sections
        .map(section => renderSection(section))
        .join("");

    return `
        <main
            class="page"
            data-page="${pageName}"
        >
            <header class="page-header">
                <h1>${page.title}</h1>
                ${descriptionHtml}
            </header>

            <div class="page-sections">
                ${sectionsHtml}
            </div>
        </main>
    `;
}


/**
 * Renders one section.
 *
 * Input:
 * {
 *   id: String,
 *   title: String,
 *   variant: String,
 *   elements: Array<Element>
 * }
 */
function renderSection(section) {
    if (!section) {
        return renderError("A section is missing.");
    }

    if (!section.id) {
        return renderError("Section requires an id.");
    }

    if (!section.title) {
        return renderError(`Section "${section.id}" requires a title.`);
    }

    if (!Array.isArray(section.elements)) {
        return renderError(
            `Section "${section.title}" requires an elements array.`
        );
    }

    const variantAttribute = section.variant
        ? `data-variant="${createName(section.variant)}"`
        : "";

    const elementsHtml = section.elements
        .map(element => renderElement(element))
        .join("");

    return `
        <section
            id="${createName(section.id)}"
            class="section"
            data-section="${createName(section.id)}"
            ${variantAttribute}
        >
            <header class="section-header">
                <h2>${section.title}</h2>
            </header>

            <div class="section-elements">
                ${elementsHtml}
            </div>
        </section>
    `;
}


/**
 * Renders one element based on its type.
 *
 * Input:
 * {
 *   id: String,
 *   type: String,
 *   layout: Object,
 *   behavior: Object
 * }
 */
function renderElement(element) {
    if (!element) {
        return renderError("An element is missing.");
    }

    if (!element.type) {
        return renderError("Element requires a type.");
    }

    if (!element.id && !element.title && !element.heading) {
        return renderError(
            `Element of type "${element.type}" requires an id, title, or heading.`
        );
    }

    const elementName = createName(
        element.id || element.title || element.heading
    );

    const layoutAttributes = renderLayoutAttributes(element.layout);
    const behaviorAttributes = renderBehaviorAttributes(element.behavior);

    let elementHtml;

    switch (element.type) {
        case "text":
            elementHtml = renderTextElement(element);
            break;

        case "image":
            elementHtml = renderImageElement(element);
            break;

        case "video":
            elementHtml = renderVideoElement(element);
            break;

        case "code":
            elementHtml = renderCodeElement(element);
            break;

        case "music-dna":
            elementHtml = renderMusicDnaElement(element);
            break;

        case "story":
            elementHtml = renderStoryElement(element);
            break;

        default:
            return renderError(
                `Unsupported element type: "${element.type}".`
            );
    }

    return `
        <div
            class="element"
            data-element="${elementName}"
            data-type="${createName(element.type)}"
            ${layoutAttributes}
            ${behaviorAttributes}
        >
            ${renderBackground(element.layout?.background)}

            <div class="element-content">
                ${elementHtml}
            </div>
        </div>
    `;
}


/* =========================================================
   ELEMENT FUNCTIONS
   ========================================================= */


/**
 * Renders a text element.
 *
 * Displays paragraphs and headings.
 *
 * Input
 *
 * {
 *     id: String,
 *     type: "text",
 *     heading: String,
 *     body: Array<String>,
 *     layout: Object,
 *     behavior: Object
 * }
 */
function renderTextElement(element) {
    if (!Array.isArray(element.body)) {
        return renderError(
            `Text element "${element.id || element.heading}" requires a paragraphs array.`
        );
    }

    const headingHtml = element.heading
        ? `<h3>${element.heading}</h3>`
        : "";

    const bodyHtml = element.body
        .map(paragraph => `<p>${paragraph}</p>`)
        .join("");

    const background = element.backgroundImage
        ? `background-image: url('${element.backgroundImage}');`
        : "";

    return `
        <div 
            class="text"
            style="${background}"
        >
            ${headingHtml}
            ${bodyHtml}
        </div>
    `;
}


/**
 * Renders an image element.
 *
 * Displays a standalone image with an optional caption.
 *
 * Expected input:
 *
 * {
 *   id: String,
 *   type: "image",
 *   src: String,
 *   alt: String,
 *   caption: String,
 *   layout: Object,
 *   behavior: Object
 * }
 */
function renderImageElement(element) {

    if (!element.src) {
        return renderError(
            `Image element "${element.id || element.heading}" requires a src.`
        );
    }

    const captionHtml = element.caption
        ? `<figcaption>${element.caption}</figcaption>`
        : "";

    return `
        <figure class="image">
            <img
                src="${element.src}"
            />

            ${captionHtml}
        </figure>
    `;

}


/**
 * Renders an embedded video.
 *
 * Expected input:
 *
 * {
 *   id: String,
 *   type: "video",
 *   src: String,
 *   title: String,
 *   layout: Object,
 *   behavior: Object
 * }
 */
function renderVideoElement(element) {
    if (!element.src) {
        return renderError(
            `Video element "${element.id || element.title}" requires a src.`
        );
    }

    if (!element.title) {
        return renderError("Video element requires a title.");
    }

    return `
        <div class="video">
            <iframe
                src="${element.src}"
                title="${element.title}"
                loading="lazy"
                allowfullscreen
            ></iframe>
        </div>
    `;
}


/**
 * Renders a code example.
 *
 * Expected input:
 *
 * {
 *   id: String,
 *   type: "code",
 *   code: String,
 *   language: String,
 *   title: String,
 *   layout: Object,
 *   behavior: Object
 * }
 */
function renderCodeElement(element) {
    if (!element.code) {
        return renderError(
            `Code element "${element.id || element.title}" requires code.`
        );
    }

    const titleHtml = element.title
        ? `<h3>${element.title}</h3>`
        : "";

    const languageClass = element.language
        ? `language-${createName(element.language)}`
        : "language-javascript";

    const escapedCode = element.code
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

    return `
        <div class="code">
            ${titleHtml}

            <pre class="${languageClass}">
                <code class="${languageClass}">
                    ${escapedCode}
                </code>
            </pre>
        </div>
    `;
}


/**
 * Renders a placeholder area for Music DNA content.
 *
 * Expected input:
 *
 * {
 *   id: String,
 *   type: "music-dna",
 *   heading: String,
 *   endpoint: String,
 *   layout: Object,
 *   behavior: Object
 * }
 */
function renderMusicDnaElement(element) {
    if (!element.endpoint) {
        return renderError(
            `Music DNA element "${element.id || element.heading}" requires an endpoint.`
        );
    }

    const headingHtml = element.heading
        ? `<h3>${element.heading}</h3>`
        : "";

    return `
        <div
            class="music-dna"
            data-endpoint="${element.endpoint}"
        >
            ${headingHtml}

            <div class="music-dna-output">
                Music DNA content will load here.
            </div>
        </div>
    `;
}


/**
 * Renders a story element.
 *
 * Expected input:
 *
 * {
 *   id: String,
 *   type: "story",
 *   heading: String,
 *   mode: "scroll" | "timer" | "click",
 *   scenes: Array<Scene>
 * }
 */
function renderStoryElement(element) {
    if (!element.mode) {
        return renderError(
            `Story element "${element.id || element.heading}" requires a mode.`
        );
    }

    if (!Array.isArray(element.scenes)) {
        return renderError(
            `Story element "${element.id || element.heading}" requires a scenes array.`
        );
    }

    const headingHtml = element.heading
        ? `<h3 class="story-title">${element.heading}</h3>`
        : "";

    const scenesHtml = element.scenes
        .map(scene => renderStoryScene(scene))
        .join("");

    return `
        <div
            class="story"
            data-story="${createName(element.id || element.heading)}"
            data-mode="${element.mode}"
        >
            ${headingHtml}

            <div class="story-scenes">
                ${scenesHtml}
            </div>
        </div>
    `;
}


/**
 * Renders one scene inside a story.
 *
 * Expected input:
 *
 * {
 *   id: String,
 *   background: Object,
 *   foreground: {
 *     elements: Array<Element>
 *   }
 * }
 */
function renderStoryScene(scene) {
    if (!scene) {
        return renderError("A story scene is missing.");
    }

    if (!scene.id) {
        return renderError("Story scene requires an id.");
    }

    if (!scene.background) {
        return renderError(
            `Story scene "${scene.id}" requires a background.`
        );
    }

    if (!scene.foreground) {
        return renderError(
            `Story scene "${scene.id}" requires a foreground.`
        );
    }

    if (!Array.isArray(scene.foreground.elements)) {
        return renderError(
            `Story scene "${scene.id}" requires a foreground elements array.`
        );
    }

    const foregroundHtml = scene.foreground.elements
        .map(element => renderElement(element))
        .join("");

    return `
        <article
            class="story-scene"
            data-scene="${createName(scene.id)}"
        >
            <div class="story-scene-background">
                ${renderStoryBackground(scene.background)}
            </div>

            <div class="story-scene-foreground">
                ${foregroundHtml}
            </div>
        </article>
    `;
}


/**
 * Renders a scene background.
 *
 * Expected input:
 *
 * {
 *   type: "image" | "color" | "video",
 *   src: String,
 *   color: String,
 *   alt: String,
 *   opacity: Number
 * }
 */
function renderStoryBackground(background) {
    if (!background.type) {
        return renderError("Story background requires a type.");
    }

    const opacityStyle = background.opacity !== undefined
        ? `opacity: ${background.opacity};`
        : "";

    if (background.type === "image") {
        if (!background.src) {
            return renderError("Image story background requires a src.");
        }

        return `
            <div
                class="story-background-image"
                style="
                    background-image: url('${background.src}');
                    ${opacityStyle}
                "
                role="img"
                aria-label="${background.alt || ""}"
            ></div>
        `;
    }

    if (background.type === "color") {
        if (!background.color) {
            return renderError("Color story background requires a color.");
        }

        return `
            <div
                class="story-background-color"
                style="
                    background-color: ${background.color};
                    ${opacityStyle}
                "
                aria-hidden="true"
            ></div>
        `;
    }

    if (background.type === "video") {
        if (!background.src) {
            return renderError("Video story background requires a src.");
        }

        return `
            <video
                class="story-background-video"
                src="${background.src}"
                autoplay
                muted
                loop
                playsinline
            ></video>
        `;
    }

    return renderError(
        `Unsupported story background type: "${background.type}".`
    );
}


/* =========================================================
   PRESENTATION FUNCTIONS
   ========================================================= */


/**
 * Renders optional element layout attributes.
 *
 * Options:
 *
 * width:
 * "narrow" | "standard" | "wide" | "full"
 *
 * alignment:
 * "left" | "center" | "right"
 *
 * theme:
 * "light" | "dark" | "accent" | "transparent"
 *
 * spacing:
 * "none" | "compact" | "standard" | "large"
 */
function renderLayoutAttributes(layout) {
    if (!layout) {
        return "";
    }

    const attributes = [];

    if (layout.width) {
        attributes.push(`data-width="${layout.width}"`);
    }

    if (layout.alignment) {
        attributes.push(`data-alignment="${layout.alignment}"`);
    }

    if (layout.theme) {
        attributes.push(`data-theme="${layout.theme}"`);
    }

    if (layout.spacing) {
        attributes.push(`data-spacing="${layout.spacing}"`);
    }

    return attributes.join(" ");
}


/**
 * Renders optional element behavior attributes.
 *
 * Options:
 *
 * effect:
 * "flash" | "pixelate" | "wave" | "fade" | "parallax"
 *
 * trigger:
 * "always" | "hover" | "scroll" | "click"
 *
 * intensity:
 * "low" | "medium" | "high"
 */
function renderBehaviorAttributes(behavior) {
    if (!behavior) {
        return "";
    }

    const attributes = [];

    if (behavior.effect) {
        attributes.push(`data-effect="${behavior.effect}"`);
    }

    if (behavior.trigger) {
        attributes.push(`data-trigger="${behavior.trigger}"`);
    }

    if (behavior.intensity) {
        attributes.push(`data-intensity="${behavior.intensity}"`);
    }

    return attributes.join(" ");
}


/**
 * Renders an optional background layer.
 *
 * Input:
 * {
 *   type: "color" | "image",
 *   color: String,
 *   src: String,
 *   position: String,
 *   size: String,
 *   opacity: Number
 * }
 */
function renderBackground(background) {
    if (!background) {
        return "";
    }

    if (!background.type) {
        return renderError("Background requires a type.");
    }

    const opacityStyle = background.opacity !== undefined
        ? `opacity: ${background.opacity};`
        : "";

    if (background.type === "color") {
        if (!background.color) {
            return renderError("Color background requires a color.");
        }

        return `
            <div
                class="element-background"
                data-background="color"
                style="
                    background-color: ${background.color};
                    ${opacityStyle}
                "
                aria-hidden="true"
            ></div>
        `;
    }

    if (background.type === "image") {
        if (!background.src) {
            return renderError("Image background requires a src.");
        }

        const positionStyle = background.position
            ? `background-position: ${background.position};`
            : "";

        const sizeStyle = background.size
            ? `background-size: ${background.size};`
            : "";

        return `
            <div
                class="element-background"
                data-background="image"
                style="
                    background-image: url('${background.src}');
                    ${positionStyle}
                    ${sizeStyle}
                    ${opacityStyle}
                "
                aria-hidden="true"
            ></div>
        `;
    }

    return renderError(
        `Unsupported background type: "${background.type}".`
    );
}


/* =========================================================
   ERROR AND NAMING FUNCTIONS
   ========================================================= */


/**
 * Displays a visible content error without stopping the page.
 */
function renderError(message) {
    return `
        <div
            class="content-error"
            role="alert"
        >
            <strong>Content error:</strong>
            ${message}
        </div>
    `;
}


/**
 * Converts a title or id into an HTML-safe name.
 *
 * "Music DNA Overview" becomes "music-dna-overview".
 */
function createName(value) {
    return value
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}