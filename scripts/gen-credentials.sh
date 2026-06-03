#!/usr/bin/env bash

gen_credential() {
  dd if=/dev/urandom bs=1M count=1 2> /dev/null | sha1sum | awk '{ print $1 }'
}

HERE=$(dirname $0)
ROOT=$(realpath $HERE/..)
SECRETS="$ROOT/secrets"

POSTGRES_FILE="$SECRETS/pg.env"
MINIO_FILE="$SECRETS/minio.env"

[[ ! -d "$SECRETS" ]] && mkdir "$SECRETS"
if [[ ! -f "$POSTGRES_FILE" ]]; then
  echo Generating Postgres credentials...
  tee "$POSTGRES_FILE" > /dev/null <<EOF
POSTGRES_USER=$(gen_credential)
POSTGRES_PASSWORD=$(gen_credential)
DATABASE_URL=postgresql+asyncpg://\$POSTGRES_USER:\$POSTGRES_PASSWORD@db/unify
EOF
fi


if [[ ! -f "$MINIO_FILE" ]]; then
  echo Generating MinIO credentials...
  tee "$MINIO_FILE" > /dev/null <<EOF
MINIO_ROOT_USER=$(gen_credential)
MINIO_ROOT_PASSWORD=$(gen_credential)
EOF
fi

echo Credentials have been generated successfully
