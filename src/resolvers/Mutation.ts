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

async function addSkill(parent, args, context, info) {
  const userId = await getUserId(context)
  const employee = await context.prisma.employee({ userId })
  const employeeSkill = await context.prisma.createEmployeeSkill({
    employee: { connect: { id: employee.id } },
    skill: { connect: { id: args.skillId } }
  })
  return employeeSkill
}

export const Mutation = { createCV, addSkill }
