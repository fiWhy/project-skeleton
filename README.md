# Installation

Copy `.env.default` to `.env`

```sh
npm i
source .env
npm run dev:prepare -w @dot/client && npm run dev:prepare -w @dot/intra && npm run dev:prepare -w @dot/server
```

## Client/Intra

```sh
npm run dev -w @dot/{client,intra}
```

## Server

To start work with the server you should use `docker-compose`

```sh
npm run compose:dev
```

If you have problems with `postgres` folder access:

```sh
sudo chown -R $(whoami) ./postgres
```

## Endpoints

- Client: `http://localhost:5173`
- Server: `http://localhost:3030`
- Adminer: `http://localhost:8090`

## Certificate

`
export DOMAIN=<domain>
export EMAIL=<email>

npm run compose:cert
`
