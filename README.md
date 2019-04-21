# API for HRM authorization

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/9c011f88df0e4792be032abcef6d8eda)](https://www.codacy.com/app/cloudhrm/employee?utm_source=github.com&utm_medium=referral&utm_content=cloudhrm/employee&utm_campaign=Badge_Grade)

## TODO

- implement permissions guards

## Development

Start docker:

```sh
docker-compose up -d prisma
```

After start server:

```sh
# deploy latest schema
yarn prisma:deploy
# [optional] generate javascript client
yarn prisma:generate
# fill in basic datasets
yarn prisma:seed
# start up for development
yarn start:dev
```

This will first generate code for prisma client, deploy it to prisma, and then start backend.
You can access backend playground at - [http://localhost:4000/](http://localhost:4000/)

## Development notes

### Migrations with example data

#### Creating CV

For example queries you should [Auth service](https://github.com/cloudhrm/auth) running.

At first, potential employee should sign in using auth service and enter his CV details.

So, sign in within auth service:

```graphql
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

```graphql
mutation {
  login(email: "first.employee@example.com", password: "firstpass") {
    token
    user {
      name
    }
  }
}
```

Add received token to futher requests authorization header:

```graphql
{
  "Authorization": "Bearer TOKEN_GOES_HERE"
}
```

Now you got a token which you can use to do futher operations against employee service.
So fill up CV details to be able to apply for a position.

```graphql
mutation {
  createCV(firstName: "Firstname", lastName: "Lastname") {
    firstName
    lastName
  }
}
```

You can query that your record is created:

```graphql
query {
  me {
    firstName
    skills {
      skill {
        name
      }
    }
    links {
      link
    }
    experience {
      position
    }
    education {
      school
    }
  }
}
```

Next you probably would like to add your skills and education. Let's search for some:

```graphql
query {
  skill(search: "Java") {
    id
    name
  }
}
```

Find ID of the skill you want to add to yourself and add it by issuing mutation:

```graphql
mutation {
  addSkill(skillId: "your_skill_id_goes_here") {
    id
  }
}
```

And check your profile now using me query above.

Same way you can add Education, Experience and url links. Only difference here is,
you provide full details for added items.

```graphql
mutation {
  addLink(link: "http://your.site.com") {
    id
  }
}
```

```graphql
mutation {
  addExpierience(
    position: "Big boss"
    company: "Very important company"
    locationText: "High End, BigCity, USA"
    locationId: 2345598
    fromYear: 2005
    toYear: 2009
    current: false
  ) {
    id
  }
}
```

```graphql
mutation {
  addEducation(
    fromYear: 2001
    toYear: 2002
    degree: "testdegree"
    fieldOfStudy: "matheatics"
    school: "testhighchool"
    locationText: "Test High school, address, city"
    locationId: 234555
    notes: "Additional notes"
    current: false
  ) {
    id
  }
}
```

Then check again your profile by queriing "me".

#### Company boss posts vacancy

#### Employee apply to vacancy
