export function renderHeader() {

    const contact = [
        "Email",
        "LinkedIn",
        "GitHub"
    ];

    const tabs = [
        "Home",
        "Projects",
        "Writing",
        "Contact"
    ];

    const contactHtml = contact
        .map(item => `
            <span class="site-contact__item">
                ${item}
            </span>
        `)
        .join("");

    const navigationHtml = tabs
        .map(item => `
        <button type="button" class="top-navigation__tab">
            ${item}
        </button>
        `)
        .join("");

    return `
        <header class="site-header">

            <div class="site-brand">
                ...
            </div>

            <div class="site-contact">
                ${contactHtml}
            </div>

            <nav class="top-navigation">
                ${navigationHtml}
            </nav>

        </header>
    `;
}