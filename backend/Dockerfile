FROM python:3.13-alpine AS build

RUN python -m pip install --no-cache-dir poetry

WORKDIR /src
COPY . /src
RUN --mount=type=cache,target=/root/.cache/pip \
  poetry install --without dev && poetry build

FROM python:3.13-alpine

WORKDIR /src
COPY --from=build /src/dist/*.whl .
RUN --mount=type=cache,target=/root/.cache/pip \
  python -m pip install *.whl

RUN adduser -D unifyd
USER unifyd
ENTRYPOINT [ "unify-backend" ]