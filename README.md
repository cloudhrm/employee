# API for HRM authorization

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/9c011f88df0e4792be032abcef6d8eda)](https://www.codacy.com/app/cloudhrm/employee?utm_source=github.com&utm_medium=referral&utm_content=cloudhrm/employee&utm_campaign=Badge_Grade)

## TODO

- implement permissions guards

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
You can access backend playground at - [http://localhost:4000/](http://localhost:4000/)

## Development notes

### Migrations with example data

For example queries you should [Auth service](https://github.com/cloudhrm/auth) running.

At first, potential employee should sign in using auth service and enter his CV details.

So, sign in within auth service:

```
mutation {
  signup(
    email: "first.employee@example.com"
    name: "First Employee"
    password: "firstpass"
  ) {
    token
    user {
      name
    }
  }
}
```

Or log in, if you already did sign up:

```
mutation {
  login(
    email: "first.employee@example.com"
    password: "firstpass"
  ) {
    token
    user {
      name
    }
  }
}
```

Add received token to futher requests authorization header:

```
{
  "Authorization": "Bearer TOKEN_GOES_HERE"
}
```

Now you got a token which you can use to do futher operations against employee service.
So fill up CV details to be able to apply for a position.

```
mutation {
  createCV(
    firstName: "Firstname"
    lastName: "Lastname"
  ) {
    firstName
    lastName
  }
}
```
