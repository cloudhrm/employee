async function employee(parent, args, context) {
  return await context.prisma.employeeSkill({ id: parent.id }).employee()
}

async function skill(parent, args, context) {
  return await context.prisma.employeeSkill({ id: parent.id }).skill()
}

export const EmployeeSkill = { employee, skill }
