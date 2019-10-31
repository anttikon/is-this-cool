# Is this cool?

Simple React UI with Slack and GCP Firestore integration.

## Requirements / Dev

`process.env.GOOGLE_APPLICATION_CREDENTIALS`: Google Cloud Credentials (https://cloud.google.com/docs/authentication/getting-started)
`process.env.SLACK_TOKEN`: Slack Token

## Requirements / Prod

`process.env.GOOGLE_APPLICATION_FILE`: Contents of process.env.GOOGLE_APPLICATION_CREDENTIALS. This will be written to filesystem during `heroku-prebuild` hook with `./gcp/setup.js`