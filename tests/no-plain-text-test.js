import { RuleTester } from 'eslint';
import noPlainText from '../rules/no-plain-text.js';
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

ruleTester.run('no-plain-text', noPlainText, {
    valid: [
        {
            code: `
        <template>
          <div>{{ interpolatedText }}</div>
        </template>
      `,
        },
        {
            code: `
        <template>
          <p>{{ interpolatedText }}</p>
        </template>
      `,
        },
        {
            code: `
        <template>
          <span>{{ interpolatedText }}</span>
        </template>
      `,
        },
    ],

    invalid: [
        {
            code: `
        <template>
          <div>This is plain text and should be flagged.</div>
        </template>
      `,
            errors: [
                {
                    message: 'Use Translation interpolation ({{ __(\'text\') }}) instead of plain text.',
                    type: 'VText',
                },
            ],
            output: `
        <template>
          <div>
{{ __('This is plain text and should be flagged.') }}
</div>
        </template>
      `,
        },
        {
            code: `
        <template>
          <p>This is plain text inside a paragraph.</p>
        </template>
      `,
            errors: [
                {
                    message: 'Use Translation interpolation ({{ __(\'text\') }}) instead of plain text.',
                    type: 'VText',
                },
            ],
            output: `
        <template>
          <p>
{{ __('This is plain text inside a paragraph.') }}
</p>
        </template>
      `,
        },
        {
            code: `
        <template>
          <span>This is plain text inside a span.</span>
        </template>
      `,
            errors: [
                {
                    message: 'Use Translation interpolation ({{ __(\'text\') }}) instead of plain text.',
                    type: 'VText',
                },
            ],
            output: `
        <template>
          <span>
{{ __('This is plain text inside a span.') }}
</span>
        </template>
      `,
        },
    ],
});
