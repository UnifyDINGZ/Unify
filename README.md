# Running the dev server

> [!IMPORTANT]
> `docker compose` is required to run the server

First install the fake domains which NGINX is expecting:

```sh
# This modifies /etc/hosts
$ ./scripts/install-domains.sh
...
Installed domains successfully
```

> [!NOTE]
> The script requires administration privileges, and
> modifies the `/etc/hosts` file on Unix, and the
> `C:\Windows\System32\drivers\etc\hosts` file on
> Windows with the following:
>
> ```hosts
> 127.0.0.1 storage.unify.com
> 127.0.0.1 s3-console.unify.com
> 127.0.0.1 api.unify.com
> 127.0.0.1 unify.com
> ```

Next, generate random credentials

```sh
$ ./scripts/gen-credentials.sh
Generating Postgres credentials...
Generating MinIO credentials...
Credentials have been generated successfully
```

> [!WARNING]
> The PS1 scripts for Windows are
> AI generated ports of the original
> Bash counterparts and are **not tested**.

Once the credentials are generated, and the hosts file is
modified, running this command should bring up the server
and all the services it needs:

```sh
$ docker  compose up
Attaching to backend-1, db-1, nginx-1, s3-1
...
```

Once started, heading over to either one of these
domains will show you various things:

* `s3-console.unify.com`: S3 Storage Console. Credentials
  can be found in `secrets/minio.env`
* `api.unify.com`: Backend API. Docs are at
  [`api.unify.com/docs`](http://api.unify.com/docs)

## MinIO: S3-compatible self-hosted storage service

For development purposes, MinIO is used as a dummy replacement
for AWS S3. The inner workings of this service do not need to
be investigated, as it is mostly the backend's job to handle files
using this service. Frontend and co only need to receive pre-signed
URLs that allow the end-user to put and fetch content, especially
if the bucket is set to private


