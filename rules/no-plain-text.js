import utils from 'eslint-plugin-vue/lib/utils/index.js';
import { formatText } from "../shared/format.js";

export default {
    meta: {
        type: 'problem',
        docs: {
            description: 'Disallow plain text inside HTML elements in Vue templates',
            category: 'Best Practices',
            recommended: false,
        },
        fixable: 'code',
        schema: [],
    },
    create(context) {
        return utils.defineTemplateBodyVisitor(context, {
            VText(node) {
                if (node.value.trim() !== '') {
                    if (!/{{.*?}}/.test(node.value)) {
                        context.report({
                            node,
                            message: 'Use Translation interpolation ({{ __(\'text\') }}) instead of plain text.',
                            fix(fixer) {
                                return fixer.replaceText(
                                    node,
                                    `\n{{ __(${formatText(node.value).trim().replace(/[\n\r\t]/gm, "")}) }}\n`
                                );
                            }
                        });
                    }
                }
            },
        })
    },
};
