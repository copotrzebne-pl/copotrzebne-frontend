# Copotrzebne frontend app

## Providing environment variables:

create .env file in the main project folder. Variables are read by `dotenv-webpack` plugin and accessible in the project
by using `process.env.<VARIABLE_NAME>` syntax

## Server

Files are served by Express JS configured in `index.js` file.

## Hosting

App is hosted on one Convox rack `copotrzebne-pl/pro`, apps:

- dev: `dev-front-copotrzebne-pl`
- pro: `front-copotrzebne-pl`

and exposed to end users using Cloud Front Distribution responsible for caching from 2 AWS accounts (dev and pro).

We are using one Convox rack to minimize costs.

Cache headers are set by application: small for HTML files, big for static files.

To support multiple languages, Cloud Front pass header `Host`. Based on it, in `index.js` file, app detects language
and proper index file is sent - one of:

* `index.html`
* `index_en.html`
* `index_ua.html`

## Logs

To display logs you can use commands:

```bash
convox logs -a dev-front-copotrzebne-pl -r copotrzebne-pl/pro
convox logs -a front-copotrzebne-pl -r copotrzebne-pl/pro
```

## Deployment

Deployment is done using GitHub Actions.

Workflows

* `deploy-dev` - Deployment from branch `develop` to new Dev AWS Account
* `deploy-pro` - Deployment from branch `main` to new Pro AWS Account
