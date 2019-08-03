const path = "{*,{src,docs}{/*,/**/*}}";

// eslint-disable-next-line no-undef
module.exports = {
  [`${path}.{js,jsx,json,mdx}`]: "eslint --fix --format friendly --max-warnings=0",
  [`${path}.mdx`]: "markdownlint --config .markdownlint-mdxrc",
  [`${path}.md`]: "markdownlint",
  [`${path}.{js,jsx,json,mdx}`]: "git add",
  ".circleci/config.yml":
    'cross-env-shell test "a$CI" = a1 || circleci config validate',
  ".circleci/images/primary/Dockerfile": "dockerfile-utils lint"
};
