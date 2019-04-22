import { getUserId } from '../utils'

async function createCV(
  parent,
  { firstName, lastName },
  { prisma, request },
  info
) {
  const userId = await getUserId(prisma, request)
  const employee = await prisma.createEmployee({
    firstName,
    lastName,
    userId
  })
  return employee
}

async function addSkill(parent, { skillId }, { prisma, request }, info) {
  const userId = await getUserId(prisma, request)
  const employee = await prisma.employee({ userId })
  const employeeSkill = await prisma.createEmployeeSkill({
    employee: { connect: { id: employee.id } },
    skill: { connect: { id: skillId } }
  })
  return employeeSkill
}

async function addEducation(
  parent,
  {
    fromYear,
    toYear,
    degree,
    fieldOfStudy,
    school,
    locationText,
    locationId,
    notes,
    current
  },
  { prisma, request },
  info
) {
  const userId = await getUserId(prisma, request)
  const employee = await prisma.employee({ userId })
  return await prisma.createEducation({
    fromYear,
    toYear,
    degree,
    fieldOfStudy,
    school,
    locationText,
    locationId,
    notes,
    current,
    employee: { connect: { id: employee.id } }
  })
}

async function addExpierience(
  parent,
  { position, company, locationText, locationId, fromYear, toYear, current },
  { prisma, request },
  info
) {
  const userId = await getUserId(prisma, request)
  const employee = await prisma.employee({ userId })
  return await prisma.createExperience({
    position,
    company,
    locationText,
    locationId,
    fromYear,
    toYear,
    current,
    employee: { connect: { id: employee.id } }
  })
}

async function addLink(parent, { link }, { prisma, request }, info) {
  const userId = await getUserId(prisma, request)
  const employee = await prisma.employee({ userId })
  return await prisma.createLink({
    link,
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
