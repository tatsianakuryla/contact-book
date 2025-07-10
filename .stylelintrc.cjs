module.exports = {
  extends: ['stylelint-config-standard-scss', 'stylelint-config-prettier'],
  plugins: [],
  rules: {
    'no-empty-source': null,
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
    'property-no-vendor-prefix': null,
    'value-no-vendor-prefix': null,
    'selector-no-vendor-prefix': null,
    'selector-class-pattern': [
      '^[a-z]([a-z0-9]*)(-[a-z0-9]+)*(__(?:[a-z0-9]+(?:-[a-z0-9]+)*))?(_[a-z0-9]+(?:-[a-z0-9]+)*)?$',
      {
        message: 'Expected class name in kebab-case or BEM (block__element_modifier)',
      },
    ],
  },
  overrides: [
    {
      files: ['**/*.scss'],
      customSyntax: 'postcss-scss',
    },
  ],
};
