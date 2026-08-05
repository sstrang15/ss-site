import "./style.css";
import { renderHome } from "./views/home.js";


const website = {
    header: {
        title: "ss_site",

        subtitle: "data • analytics • technology",

        contact: [
            {
                id: "mail",
                title: "mail",
                value: "strangstep11@gmail.com",
                href: "mailto:strangstep11@gmail.com"
            },

            {
                id: "git",
                title: "git",
                value: "github.com/sstrang15",
                href: "https://github.com/sstrang15"
            },

            {
                id: "linkedin",
                title: "linkedin",
                value: "linkedin.com/in/ss_site",
                href: "https://linkedin.com/in/stephenecon"
            }
        ]
    },

    navigation: {
        activeTab: "projects",

        tabs: [
            {
                id: "projects",
                title: "projects",

                pageIds: [
                    "music-dna",
                    "marketscope"
                ],

                selectedPageId: "music-dna"
            },

            {
                id: "coding",
                title: "coding",

                pageIds: [],

                selectedPageId: null
            },

            {
                id: "writing",
                title: "writing",

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