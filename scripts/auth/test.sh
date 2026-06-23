#!/usr/bin/env bash
# test.sh

curl -X GET \
  -c .pterano-cookies  \
  -b .pterano-cookies \
  http://api.pterano.com/restricted
