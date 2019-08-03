// eslint-disable-next-line no-undef
module.exports = {
  "{*,{src,docs}{/*,/**/*}}.{js,jsx,json}":
    "eslint --fix --format friendly --max-warnings=0",
  "{*,{src,docs}{/*,/**/*}}.mdx": [
    "eslint --fix --format friendly --max-warnings=0",
    "markdownlint --config .markdownlint-mdxrc"
  ],
  "{*,{src,docs}{/*,/**/*}}.md": "markdownlint",
  "{*,{src,docs}{/*,/**/*}}.{js,jsx,json,mdx}": "git add",
  ".circleci/config.yml":
    'cross-env-shell test "a$CI" = a1 || circleci config validate',
  ".circleci/images/primary/Dockerfile": "dockerfile-utils lint"
};
