#!/usr/bin/env bash

if [[ "$EUID" -ne 0 ]]; then
  echo Running as root
  exec sudo $0
fi

tee -a /etc/hosts > /dev/null << EOF 
127.0.0.1 storage.unify.com
127.0.0.1 s3-console.unify.com
127.0.0.1 api.unify.com
127.0.0.1 unify.com
EOF

echo Installed domains successfully
