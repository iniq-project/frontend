// @ts-check
import eslintConfigPrettier from "eslint-config-prettier";
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt(eslintConfigPrettier, {
  rules: {
    // Rich text from Squidex is rendered as HTML on purpose.
    "vue/no-v-html": "off",
  },
});
