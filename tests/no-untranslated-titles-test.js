import { RuleTester } from 'eslint';
import vueParser from 'vue-eslint-parser';
import noUntranslatedTitles from "../rules/no-untranslated-titles.js";

const ruleTester = new RuleTester({
    languageOptions: {
        parser: vueParser, // Use vue-eslint-parser
        parserOptions: {
            ecmaVersion: 2020,
            sourceType: 'module',
        },
    },
});

ruleTester.run('no-untranslated-titles', noUntranslatedTitles, {
    valid: [
        {
            code: `
        <template>
          <input type="text" :title="any">
        </template>
      `,
        },
        {
            code: `
        <template>
          <input type="text" :title="__('translated')">
        </template>
      `,
        },
    ],

    invalid: [
        {
            code: `
        <template>
          <input type="text" title="any">
        </template>
      `,
            errors: [
                {
                    message: 'Use :title="__(\'text\')" instead of title="text" for localization.',
                    type: 'VAttribute',
                },
            ],
            output: `
        <template>
          <input type="text" :title="__('any')">
        </template>
      `,
        },
    ],
});
