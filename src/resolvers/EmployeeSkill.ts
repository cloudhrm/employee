async function employee({ id }, args, { prisma }) {
  return await prisma.employeeSkill({ id }).employee()
}

async function skill({ id }, args, { prisma }) {
  return await prisma.employeeSkill({ id }).skill()
}

export const EmployeeSkill = { employee, skill }
