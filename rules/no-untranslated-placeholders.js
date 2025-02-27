import utils from 'eslint-plugin-vue/lib/utils/index.js';
import { formatText} from "../shared/format.js";

export default {
    meta: {
        type: 'problem',
        docs: {
            description: 'Disallow plain text inside Placeholder attributes in Vue templates',
            category: 'Best Practices',
            recommended: false,
        },
        fixable: 'code',
        schema: [],
    },
    create(context) {
        return utils.defineTemplateBodyVisitor(context, {
            "VAttribute[directive=false][key.name='placeholder']"(node) {
                if (node.value && node.value.type === 'VLiteral') {
                    context.report({
                        node,
                        message: 'Use :placeholder="__(\'text\')" instead of placeholder="text" for localization.',
                        fix(fixer) {
                            const staticText = node.value.value;
                            return fixer.replaceText(
                                node,
                                `:placeholder="__(${formatText(staticText)})"`
                            );
                        },
                    });
                }
            },
        });
    },
};
