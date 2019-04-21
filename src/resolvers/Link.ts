async function employee(parent, args, context) {
  return await context.prisma.link({ id: parent.id }).employee()
}

export const Link = { employee }
