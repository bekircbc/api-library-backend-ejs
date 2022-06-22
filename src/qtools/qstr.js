import MarkdownIt from "markdown-it";
import * as qstr from './qstr.js';

const markdown = MarkdownIt({
  html: true,
});

/**
 * Replaces every occurance of a string with another string.
 * 
 * const path = qstr.replaceAll( 'node-express-mvc', '-', '_');
 * 
 * node_express_mvc
 */
export const replaceAll = function (text, search, replace) {
    return text.split(search).join(replace);
};

/**
 * Removes a string from the left if it exists.
 * 
 * const pathAndFileName = qstr.chopLeft('/src/data/db.json', '/');
 * 
 * src/data/db.json
 */
export const chopLeft = function (main, textToChop) {
    if (main.startsWith(textToChop)) {
        const len = textToChop.length;
        const mainLen = main.length;
        if (len <= mainLen) {
            return main.substring(len, mainLen);
        }
    }
    return main;
};

/**
 * Removes a string from the right if it exists.
 * 
 * const fileName = qstr.chopRight('image001.jpg', '.jpg');
 * 
 * image001
 */
export const chopRight = function (main, textToChop) {
    if (main.endsWith(textToChop)) {
        const len = textToChop.length;
        const mainLen = main.length;
        if (len <= mainLen) {
            return main.substring(0, mainLen - len);
        }
    }
    return main;
};

/**
 * Converts a string block with newlines to an array of strings, one string per line.
 * 
 * const lines = qstr.convertStringBlockToLines(settingsXmlContent);
 * 
 * [
 *   "<settings>",
 *   "\t<user>user001</user>",
 *   "\t<password>123</password>",
 *   "</settings>",
 * ]
 */
export const convertStringBlockToLines = (stringBlock, trimLines = true) => {
    if (qstr.isEmpty(stringBlock)) {
        return [];
    }
    let roughLines = stringBlock.split('\n');
    if (trimLines) {
        roughLines = qstr.trimAllLinesInLinesArray(roughLines);
    }
    roughLines = qstr.trimLinesOfEndBlanks(roughLines);
    return roughLines;
};

/**
 * Returns whether a string is empty, null, undefined, etc.
 * 
 * const isEmpty = qstr.isEmpty('');
 * 
 * true
 */
export const isEmpty = (line) => {
    if (line == undefined || line == null) {
        return true;
    } else {
        line = line.toString();
        if (line.trim() == '') {
            return true;
        } else {
            return false;
        }
    }
};

/**
 * Takes an array of lines and trimes them all. 
 */
export const trimAllLinesInLinesArray = (lines) => {
    const newLines = [];
    lines.forEach(function (line, index) {
        let newLine = line.trim();
        newLine = qstr.chopRight(newLine, '\\r');
        newLines.push(newLine);
    });
    return newLines;
};


/**
 * Removes any empty lines at the beginning and end of an array.
 */
export const trimLinesOfEndBlanks = (lines) => {
    lines = qstr.trimBeginningLinesOfBlanks(lines);
    lines = lines.reverse();
    lines = qstr.trimBeginningLinesOfBlanks(lines);
    lines = lines.reverse();
    return lines;
};

/**
 * Removes empty lines from the beginning of an array.
 */
export const trimBeginningLinesOfBlanks = (lines) => {
    const newLines = [];
    let trimmingBlanks = true;
    lines.forEach(function (line, index) {
        let newLine = line;
        if (trimmingBlanks && line == '') {
            //skip it since it is a preceding blank item
        } else {
            newLines.push(newLine);
            trimmingBlanks = false;
        }
    });
    return newLines;
};

/**
 * Converts an array of lines (e.g. from a file) into a string block (e.g. to be saved into a file).
 */
export const convertLinesToStringBlock = (lines) => {
    let r = '';
    let index = 0;
    for (const line of lines) {
        r += line;
        if (index != lines.length - 1) {
            r += qstr.NEW_LINE();
        }
        index++;
    }
    return r;
};

/**
 * Represents a new line character (\n) but is more explicit and can be changed at one place to e.g. \r\n if need be.
 */
export const NEW_LINE = (numberOfNewLines = 1) => {
    const endOfLine = '\n';
    return endOfLine.repeat(numberOfNewLines);
};

/**
 * Takes markdown text and converts it into HTML.
 */
export const parseMarkDown = (
    markdownText,
    options = {
        suppressParagraphMarks: false,
        suppressOrderedListElements: false
    }
) => {
    let r = markdownText;

    if (options.suppressOrderedListElements) {
        r = qstr.maskText(r, '.');
    }

    r = markdown.render(r);
    if (options.suppressParagraphMarks) {
        r = qstr.chopLeft(r, '<p>');
        r = qstr.chopRight(r, '</p>');
    }

    if (options.suppressOrderedListElements) {
        r = qstr.unmaskText(r, '.');
    }
    return r;
};