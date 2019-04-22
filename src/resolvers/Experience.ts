async function employee({ id }, args, { prisma }) {
  return await prisma.experience({ id }).employee()
}

export const Experience = { employee }
