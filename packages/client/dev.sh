#!/bin/bash

# Api url
export API_URL=${API_URL:=http://localhost:3030}


envsubst '$API_URL' < ./.env.default > $1