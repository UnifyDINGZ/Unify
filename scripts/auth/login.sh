#!/usr/bin/env bash
# login.sh

curl -L \
  -c .pterano-cookies  \
  --request POST \
  --url 'http://api.pterano.com/auth/public/signin' \
  --header 'Content-Type: application/json; charset=utf-8' \
  --header 'rid: emailpassword' \
  --data '{
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
