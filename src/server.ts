import { GraphQLServer } from 'graphql-yoga'
import { prisma } from './generated/prisma-client'
import { Query } from './resolvers/Query'
import { Mutation } from './resolvers/Mutation'
import { Employee } from './resolvers/Employee'
import { EmployeeSkill } from './resolvers/EmployeeSkill'

const resolvers = {
  Query,
  Mutation,
  Employee,
  EmployeeSkill
}

require('dotenv').config()

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: request => {
    return {
      ...request,
      prisma
    }
  }
})

export default server
