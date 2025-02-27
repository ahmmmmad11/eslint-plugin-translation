# eslint-plugin-translation

An ESLint plugin designed to enforce the use of translation keys instead of static plain text in Vue templates. This plugin improves the developer experience (DX) for localization and internationalization workflows by ensuring that all text in your Vue components is ready for translation.
Why Use This Plugin?

When building applications that support multiple languages, hardcoding static text directly into templates can lead to maintenance challenges and make it difficult to manage translations. This plugin helps by:

    Enforcing best practices: Ensures all text in Vue templates is wrapped in translation functions or uses translation keys.

    Improving DX: Makes it easier to identify and manage translatable text, streamlining the localization process.


## Installation

To install the plugin, first make sure you have eslint package

``` bash
npm install eslint
```

then install eslint-pulgin-vue
``` bash
npm install eslint-plugin-vue
```

and eslint-vue-parser
``` bash
npm install eslint-vue-parser
```

finally you can clone this repo to your Vue project

``` bash
git clone https://github.com/ahmmmmad11/eslint-plugin-translation
```


## Configuration

Add the plugin to your ESLint configuration file (e.g., eslint.config.js):

``` js
import vueParser from 'vue-eslint-parser';
import pluginVue from 'eslint-plugin-vue'
// make sure to write the write path of eslint-plugin-translation
import pluginTranslation from './eslint-plugin-translation/index.js'

export default [
    ...pluginVue.configs['flat/recommended'],

    {
        // Apply custom settings and rules
        files: ['**/*.vue'], // Ensure this applies only to Vue files
        languageOptions: {
            parser: vueParser, // Use vue-eslint-parser explicitly
            parserOptions: {
                parser: '@babel/eslint-parser', // Use Babel parser for script blocks
                requireConfigFile: false, // Don't require an ESLint config file
                sourceType: 'module', // Use ES modules
            },
        },
        plugins: {
            translation: pluginTranslation, // Register your custom plugin
        },
        rules: {
            'translation/no-plain-text': 'error', // Enable your custom rule
            'translation/no-untranslated-placeholders': 'error', // Enable your custom rule
        },
    },
]

```

## Rules
### no-plain-text

This rule ensures that no static plain text is used directly in Vue templates. Instead, it encourages the use of translation keys or functions.
Example

Incorrect:

``` vue
<template>
  <div>Hello, World!</div>
</template>
```

Correct:

``` vue
<template>
  // __('') is a custom translation method
  // yes I'm stealing laravel method 
  <div>{{ __('hello world') }}</div>
</template>
```

### no-untranslated-placeholder

Incorrect:

``` vue
<template>
  <input type="text" placeholder="untranslated">
</template>
```

Correct:

``` vue
<template>
  <input type="text" :placeholder="__('translated')">
</template>
```

## Usage

Once configured, ESLint will flag any static text in your Vue templates. For example:

```
error: Use Translation interpolation ({{ __('text') }}) instead of plain text. (translation/no-plain-text)
```

> **IMPORTANT**  
> This plugin is a custom plugin designed to work with my custom `__()` translation method. It will not work with your files out of the box. You will need to customize it to work with your specific translation method. however you can use it as template, with a little modification it can work with your prefared translation method.


License

This project is licensed under the MIT License. See the LICENSE file for details.

For more information, visit the GitHub repository. If you encounter any issues or have suggestions, please open an issue or submit a pull request. Happy coding! 🚀
