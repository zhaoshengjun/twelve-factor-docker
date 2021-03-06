# Twelve Factor App

Ref: [12factor.net](12factor.net)

## Use GitFlow

* Default is `master` branch, which is the stable version
* Create a `develop` branch for developing purpose. It's the main branch for
  develop. You need to create `feature` branch to create new feature and always
  named as "feature/xxx". Then merge these features to develop branch.
* Create a `release` branch for staging/testing. You can directly update this
  branch if there's anything needs to be fixed right away but do remember to
  merge it back to `develop` branch.
* Update `master` branch when `release` branch is stable. And you can also give
  it a tag. You can also directly create `hotfix` based on master branch, and
  merge it back to `master` branch. But do remember to merge it to `develop`
  branch once it's done.
* Delete all `feature`/`hotfix` branch once it's done.

## Use `Yarn` as package manager

`Yarn` will ensure every computer will use the same version of every package.
You just need to add `yarn.lock` and `package.json` file into source control.

## Use environment variable

Store cridentials into environment variable will not only increase the
flexibility of the App, but also increase the security level.

To use environment variable, simply append them before the `node` command. E.g.:
change `node index.js` to `MONGO_URL='mongodb://localhost:27017/foo' node
index.js` and you can use `process.env.MONGODB_URL` inside your App.

If you have multiple variables, you can put them into `.env` file and use
`dotenv` package to load them.

## Use Docker

* Run `docker build -t foo/bar:1.0 -t` to build a tagged docker image for
  release.
* Create a `docker-compose.yml` for release configuration.
* Check `.env` is in `.dockerignore` file
* Run `docker-compose up -d app` to start the release.
* Run `docker ps` to verify image is running
* Run `docker logs -f foo_app_1` to check the logs

## Stateless

If we stop/remove (`docker-compose rm -f`) a running docker image, all the data
will be lost (e.g.: uploaded files). In order to fix this, we need to use
persistent volume to store the data/files.

## Mapping ports

By default, docker will lock all ports so you won't be able to access it. You
can change it by exposing the port via:

* Run command `docker run -d -p 8000:8000 foo`
* Specify mapping in `docker-compose.yml`

```yaml
services:
  app:
    build: .
    ports:
      - 8010:8000
```

## Use `nginx` for loading balance

* Build `nodejs` image by using `docker build -t app-nodejs .`
* Run 2 processes with the same image:
  * `docker run -d -e "SERVER_NAME=chicken" --name=chicken app-nodejs`
  * `docker run -d -e "SERVER_NAME=steak" --name=steak app-nodejs`
* Build `nginx` image by using `docker build -t app-nginx .`
* Run `nginx` image by using `docker run -d -p 8080:80 --link chicken --link
  steak app-nginx`

## High-Availability

To ensure the docker image will restart automatcially hence always running, you
can:

* Run `docker run --restart always`
* Specify in `docker-compose.yml`:

```yaml
version: '3'
services:
  helloworld:
    image: helloworld
    restart: always
```

## Run Consistent Dev, Stage & Prod Docker Environments

By using the same image, docker will ensure you can run different images for
dev/staging/production purpose. All the different configurations can be put into
`.env` file and passed into the image when running.

## Pipe Log Output to STDOUT with Docker

For example, if you have a `debug.log` file which will be written by the App,
and you want to see the output directly in console, you can do so in
`dockerfile`

```dockerfile
FROM mhart/alpine-node
COPY index.js .
RUN ln -sf /dev/stdout /debug.log
CMD node index.js
```

After this, you can:

```bash
docker build -t foo .
docker run -d --name=foo foo
docker logs -f foo
docker exec -it foo cat /debug.log           ## make sure no more debug.log will be wrritten
```

## Run One-Off Docker Containers

If you want to run some testing, you can run a docker image and ask to delete it
after stopping.

```bash
docker run -it --rm ubunto bash   # start a Ubuntu image and run with bash command
```

After running this, you can check the status by:

```bash
docker ps -a
```

You will see that the image and process are all gone.
