async function employee(parent, args, context) {
  return await context.prisma.education({ id: parent.id }).employee()
}

export const Education = { employee }
