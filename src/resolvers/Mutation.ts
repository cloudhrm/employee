import { getUserId } from '../utils'

async function createCV(parent, args, context, info) {
  const userId = await getUserId(context)
  const employee = await context.prisma.createEmployee({
    firstName: args.firstName,
    lastName: args.lastName,
    userId
  })
  return employee
}

export const Mutation = { createCV }
