# API for HRM authorization

## TODO

- implement permissions guards
- think about nexus-prisma plugin
- add company to token.

## Development

Start docker:

```
docker-compose up -d prisma
```

After start server:

```
yarn prisma:deploy
yarn prisma:generate
yarn start:dev
```

This will first generate code for prisma client, deploy it to prisma, and then start backend.
You can access backend playground at - http://localhost:4000/

## Development notes

### Migrations with example data

