#!/usr/bin/env bash

if [[ "$EUID" -ne 0 ]]; then
  echo Running as root
  exec sudo $0
fi

cat /etc/hosts \
  | sed -E '/(pterano|unify)/d' \
  | sudo tee /etc/hosts > /dev/null

echo Uninstalled domains successfully