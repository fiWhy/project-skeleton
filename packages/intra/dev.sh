#!/bin/bash

# Api url
export API_URL=${API_URL:=http://localhost:3030}

# Google client id.
export CLIENT_ID=${CLIENT_ID:=}

# Hosted domain.
export HOSTED_DOMAIN=${HOSTED_DOMAIN:=}


envsubst '$API_URL,$CLIENT_ID,$HOSTED_DOMAIN' < ./.env.default > $1