module.exports = {
  github: {
    token: process.env.GITHUB_TOKEN,
    org: 'copotrzebne-pl',
    repo: 'copotrzebne-frontend'
  },
  ci: {
    // https://github.com/actions/checkout/issues/58
    // prNumber: process.env.GITHUB_EVENT_PATH
    prNumber: 10
  },
  app: {
    prefix: 'copotrzebne-pl-review-app-',
    serverlessConfigFile: 'serverless.review.yml'
  },
  createAppLink: (url, site, appName) =>
    `- [**${site}**](${url}) googoo created "${appName}" for me, googoo is awesome!`.trim()
}
