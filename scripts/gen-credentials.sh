#!/usr/bin/env bash

gen_credential() {
  dd if=/dev/urandom bs=1M count=1 2> /dev/null | sha1sum | awk '{ print $1 }'
}

HERE=$(dirname $0)
ROOT=$(realpath $HERE/..)
SECRETS="$ROOT/secrets"

POSTGRES_FILE="$SECRETS/pg.env"
MINIO_FILE="$SECRETS/minio.env"
AUTH_FILE="$SECRETS/auth.env"

[[ ! -d "$SECRETS" ]] && mkdir "$SECRETS"
if [[ ! -f "$POSTGRES_FILE" ]]; then
  echo Generating Postgres credentials...
  tee "$POSTGRES_FILE" > /dev/null <<EOF
POSTGRES_USER=$(gen_credential)
POSTGRES_PASSWORD=$(gen_credential)

# Supertokens
POSTGRESQL_USER=\$POSTGRES_USER
POSTGRESQL_PASSWORD=\$POSTGRES_PASSWORD

# Backend
DATABASE_URL=postgresql+asyncpg://\$POSTGRES_USER:\$POSTGRES_PASSWORD@db/pterano

# Alembic
ALEMBIC_URL=postgresql+asyncpg://\$POSTGRES_USER:\$POSTGRES_PASSWORD@localhost/pterano

EOF
fi


if [[ ! -f "$MINIO_FILE" ]]; then
  echo Generating MinIO credentials...
  tee "$MINIO_FILE" > /dev/null <<EOF
MINIO_ROOT_USER=$(gen_credential)
MINIO_ROOT_PASSWORD=$(gen_credential)
EOF
fi

if [[ ! -f "$AUTH_FILE" ]]; then
  echo Generating auth environment variables
  tee "$AUTH_FILE" > /dev/null <<EOF
POSTGRESQL_HOST=db
POSTGRESQL_DATABASE_NAME=auth
EOF
fi

echo Credentials have been generated successfully
