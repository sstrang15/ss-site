import "./style.css";
import { renderHome } from "./views/home.js";


const website = {
    header: {
        brand: {
            title: "Stephen Strang",
            subtitle: "Data, Strategy, Technology, Creative Work"
        },

        contact: [
            "Email",
            "LinkedIn",
            "GitHub"
        ]
    },

    navigation: {
        activeTab: "projects",

        tabs: [
            {
                id: "home",
                title: "Home",
                pageIds: [],
                selectedPageId: null
            },

            {
                id: "projects",
                title: "Projects",

                pageIds: [
                    "music-dna",
                    "marketscope"
                ],

                selectedPageId: "music-dna"
            },

            {
                id: "writing",
                title: "Writing",
                pageIds: [],
                selectedPageId: null
            },

            {
                id: "contact",
                title: "Contact",
                pageIds: [],
                selectedPageId: null
            }
        ]
    },

    pages: [
        {
            id: "music-dna",
            title: "Music DNA",
            description: "A music analytics project.",

            sections: [
                {
                    id: "overview",
                    title: "Overview",

                    elements: [
                        {
                            id: "purpose",
                            type: "text",
                            heading: "Purpose",

                            paragraphs: [
                                "Music DNA analyzes listening patterns."
                            ]
                        }
                    ]
                },

                {
                    id: "story",
                    title: "Story",
                    elements: []
                }
            ]
        },

        {
            id: "marketscope",
            title: "MarketScope",
            description: "A real-estate analysis project.",
            sections: []
        }
    ]
};


const app = document.querySelector("#app");

if (!app) {
    throw new Error("Could not find the #app element.");
}

app.innerHTML = renderHome(website);