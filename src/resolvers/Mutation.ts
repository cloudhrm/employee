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

async function addEducation(parent, args, context, info) {
  const userId = await getUserId(context)
  const employee = await context.prisma.employee({ userId })
  return await context.prisma.createEducation({
    fromYear: args.fromYear,
    toYear: args.toYear,
    degree: args.degree,
    fieldOfStudy: args.fieldOfStudy,
    school: args.school,
    locationText: args.locationText,
    locationId: args.locationId,
    notes: args.notes,
    current: args.current,
    employee: { connect: { id: employee.id } }
  })
}

async function addExpierience(parent, args, context, info) {
  const userId = await getUserId(context)
  const employee = await context.prisma.employee({ userId })
  return await context.prisma.createExperience({
    position: args.position,
    company: args.company,
    locationText: args.locationText,
    locationId: args.locationId,
    fromYear: args.fromYear,
    toYear: args.toYear,
    current: args.current,
    employee: { connect: { id: employee.id } }
  })
}

async function addLink(parent, args, context, info) {
  const userId = await getUserId(context)
  const employee = await context.prisma.employee({ userId })
  return await context.prisma.createLink({
    link: args.link,
    employee: { connect: { id: employee.id } }
  })
}

export const Mutation = {
  createCV,
  addSkill,
  addEducation,
  addExpierience,
  addLink
}
