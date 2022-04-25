# Copotrzebne frontend app

## Providing environment variables:

create .env file in the main project folder. Variables are read by `dotenv-webpack` plugin and accessible in the project
by using `process.env.<VARIABLE_NAME>` syntax

## Hosting

App is hosted on S3 and exposed to end users using Cloud Front Distribution responsible for caching.

Cache headers are forced by Cloud Front but could be set as metadata
for each file on S3.

## Deployment

Deployment is done using GitHub Actions.

App is build and uploaded as static files to S3 bucket.

After successful upload cache in Cloud Front Distribution is invalidated.

Workflows

* `deploy-dev` - Deployment from branch `develop` to new Dev AWS Account
* `deploy-pro` - Deployment from branch `main` to new Pro AWS Account
