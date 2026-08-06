import headerCsv from "../content/definitions/header.csv?raw";
import contactCsv from "../content/definitions/contact.csv?raw";

import tabsCsv from "../content/definitions/tabs.csv?raw";
import pagesCsv from "../content/definitions/pages.csv?raw";
import sectionsCsv from "../content/definitions/sections.csv?raw";
import elementsCsv from "../content/definitions/elements.csv?raw";


/* =========================================================
   EXPORTED DEFINITIONS
   ========================================================= */


export const header = getSingleDefinition(
    parseCsv(headerCsv),
    "header"
);

export const contact = parseCsv(contactCsv);

export const tabs = parseCsv(tabsCsv);

export const pages = parseCsv(pagesCsv);

export const sections = parseCsv(sectionsCsv);

export const elements = parseCsv(elementsCsv);


/* =========================================================
   CSV FUNCTIONS
   ========================================================= */


/**
 * Converts CSV text into definition objects.
 */
function parseCsv(csvText) {

    const rows = readCsvRows(csvText);

    if (rows.length === 0) {
        return [];
    }

    const columnNames = rows[0];

    const definitions = [];

    for (let rowIndex = 1; rowIndex < rows.length; rowIndex++) {

        const row = rows[rowIndex];

        if (isEmptyRow(row)) {
            continue;
        }

        const definition = {};

        for (
            let columnIndex = 0;
            columnIndex < columnNames.length;
            columnIndex++
        ) {

            const columnName = columnNames[columnIndex];

            const rawValue = row[columnIndex];

            definition[columnName] = parseValue(rawValue);

        }

        definitions.push(definition);

    }

    return definitions;

}


/**
 * Separates CSV text into rows and fields.
 */
function readCsvRows(csvText) {

    const rows = [];

    let row = [];

    let field = "";

    let insideQuotes = false;

    for (let index = 0; index < csvText.length; index++) {

        const character = csvText[index];

        const nextCharacter = csvText[index + 1];


        if (
            character === `"` &&
            insideQuotes &&
            nextCharacter === `"`
        ) {

            field += `"`;

            index++;

            continue;

        }


        if (character === `"`) {

            insideQuotes = !insideQuotes;

            continue;

        }


        if (
            character === "," &&
            !insideQuotes
        ) {

            row.push(field.trim());

            field = "";

            continue;

        }


        if (
            character === "\n" &&
            !insideQuotes
        ) {

            row.push(field.trim());

            rows.push(row);

            row = [];

            field = "";

            continue;

        }


        if (
            character === "\r" &&
            !insideQuotes
        ) {
            continue;
        }


        field += character;

    }


    if (
        field.length > 0 ||
        row.length > 0
    ) {

        row.push(field.trim());

        rows.push(row);

    }

    return rows;

}


/* =========================================================
   UTILITY FUNCTIONS
   ========================================================= */


/**
 * Converts CSV text values into useful JavaScript values.
 */
function parseValue(value) {

    if (
        value === undefined ||
        value === ""
    ) {
        return null;
    }


    if (value === "true") {
        return true;
    }


    if (value === "false") {
        return false;
    }


    if (
        value.startsWith("[") ||
        value.startsWith("{")
    ) {

        try {
            return JSON.parse(value);
        }
        catch {
            return value;
        }

    }


    if (!Number.isNaN(Number(value))) {
        return Number(value);
    }


    return value;

}


/**
 * Returns the only definition in a CSV.
 */
function getSingleDefinition(definitions, definitionName) {

    if (definitions.length === 0) {

        throw new Error(
            `${definitionName}.csv does not contain a definition.`
        );

    }


    if (definitions.length > 1) {

        throw new Error(
            `${definitionName}.csv must contain exactly one definition.`
        );

    }


    return definitions[0];

}


/**
 * Determines whether a CSV row is empty.
 */
function isEmptyRow(row) {

    for (const value of row) {

        if (value !== "") {
            return false;
        }

    }

    return true;

}