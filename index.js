import noPlainText from './rules/no-plain-text.js';
import noUntranslatedPlaceholders from './rules/no-untranslated-placeholders.js';
import noUntranslatedTitles from "./rules/no-untranslated-titles.js";

const plugin = {
    rules: {
        "no-plain-text":  noPlainText,
        'no-untranslated-placeholders': noUntranslatedPlaceholders,
        'no-untranslated-titles': ['error', noUntranslatedTitles],
    }
};

export default plugin;
