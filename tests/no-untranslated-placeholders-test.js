import { RuleTester } from 'eslint';
import noUntranslatedPlaceholders from "../rules/no-untranslated-placeholders.js";
import vueParser from 'vue-eslint-parser';

const ruleTester = new RuleTester({
    languageOptions: {
        parser: vueParser, // Use vue-eslint-parser
        parserOptions: {
            ecmaVersion: 2020,
            sourceType: 'module',
        },
    },
});

ruleTester.run('no-untranslated-placeholders', noUntranslatedPlaceholders, {
    valid: [
        {
            code: `
        <template>
          <input type="text" :placeholder="any">
        </template>
      `,
        },
        {
            code: `
        <template>
          <input type="text" :placeholder="__('translated')">
        </template>
      `,
        },
    ],

    invalid: [
        {
            code: `
        <template>
          <input type="text" placeholder="any">
        </template>
      `,
            errors: [
                {
                    message: 'Use :placeholder="__(\'text\')" instead of placeholder="text" for localization.',
                    type: 'VAttribute',
                },
            ],
            output: `
        <template>
          <input type="text" :placeholder="__('any')">
        </template>
      `,
        },
    ],
});
