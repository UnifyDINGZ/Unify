#!/usr/bin/env bash
# signup.sh

curl -L -X POST \
  -c .pterano-cookies  \
  --url 'http://api.pterano.com/auth/public/signup' \
  -H 'Content-Type: application/json; charset=utf8' \
  -d '{
  "formFields": [
    {
      "id": "email",
      "value": "demo@pterano.com"
    },
    {
      "id": "password",
      "value": "testPass123"
    }
  ],
  "shouldTryLinkingWithSessionUser": false
}' \
  | jq .status
