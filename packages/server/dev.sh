#!/bin/bash

# Main contact email.
export CONTACT_EMAIL="${CONTACT_EMAIL:=}"

# Main sender email for callback.
export SENDER_EMAIL="${SENDER_EMAIL:=}"

# Google client secret.
export CLIENT_SECRET="${CLIENT_SECRET:=}"

# Google client id.
export CLIENT_ID="${CLIENT_ID:=}"

# Google refresh token
export REFRESH_TOKEN="${REFRESH_TOKEN:=}"

# Google workspace sender email.
export WORKSPACE_USER="${WORKSPACE_USER:=}"

# Google workspace sender email.
export WORKSPACE_INFO="${WORKSPACE_INFO:=}"

# Google auth redirect uri.
export REDIRECT_URI="${REDIRECT_URI:=http://localhost:5173}"

# Postgres password.
export POSTGRES_PASSWORD="${POSTGRES_PASSWORD:=admin}"

# Postgres database name.
export POSTGRES_DB="${POSTGRES_DB:=dot}"

envsubst '$CONTACT_EMAIL,$SENDER_EMAIL,$CLIENT_SECRET,$CLIENT_ID,$REDIRECT_URI,$POSTGRES_PASSWORD,$POSTGRES_DB,$REFRESH_TOKEN,$WORKSPACE_USER,$WORKSPACE_INFO' <./.env.default > $1
