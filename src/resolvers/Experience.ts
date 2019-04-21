async function employee(parent, args, context) {
  return await context.prisma.experience({ id: parent.id }).employee()
}

export const Experience = { employee }
