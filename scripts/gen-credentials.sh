#!/usr/bin/env bash

gen_credential() {
  dd if=/dev/urandom bs=1M count=1 2> /dev/null | sha1sum | awk '{ print $1 }'
}

HERE=$(dirname $0)
ROOT=$(realpath $HERE/..)
SECRETS="$ROOT/secrets"

PGUSER_FILE="$SECRETS/postgres-user"
PGPASS_FILE="$SECRETS/postgres-pass"
MINIO_FILE="$SECRETS/minio.env"

[[ ! -d "$SECRETS" ]] && mkdir "$SECRETS"
if [[ ! -f "$PGPASS_FILE" ]]; then
  echo Generating Postgres password...
  gen_credential > "$PGPASS_FILE"
fi

if [[ ! -f "$PGUSER_FILE" ]]; then
  echo Generating Postgres user...
  gen_credential > "$PGUSER_FILE"
fi

if [[ ! -f "$MINIO_FILE" ]]; then
  echo Generating MinIO credentials...
  tee "$MINIO_FILE" > /dev/null <<EOF
MINIO_ROOT_USER=$(gen_credential)
MINIO_ROOT_PASSWORD=$(gen_credential)
EOF
fi

echo Credentials have been generated successfully
