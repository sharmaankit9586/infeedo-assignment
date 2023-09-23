# Infeedo Backend Assignment

## How to run locally?


Make sure you have docker installed in your machine

```
 docker compose up
```
**Exposed Port** - 8081

**Go to http://localhost:8081**

**To seed random data, use below command**

```
 node seed.js 50
```
This will add 50 random tasks to the database. (Modify the API url in seed.js if not running in a local environment)

## Implementation
**Tech Stack Used** - Node.js, Typescript, Postgres, TypeORM, Docker.

* Implemented REST APIs using Express.js
* Used PostgresSQL as database, TypeORM as ORM.