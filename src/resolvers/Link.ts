async function employee({ id }, args, { prisma }) {
  return await prisma.link({ id }).employee()
}

export const Link = { employee }
