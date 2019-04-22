async function skills({ id }, args, { prisma }) {
  return await prisma.employee({ id }).skills()
}

async function links({ id }, args, { prisma }) {
  return await prisma.employee({ id }).links()
}

async function experience({ id }, args, { prisma }) {
  return await prisma.employee({ id }).experience()
}

async function education({ id }, args, { prisma }) {
  return await prisma.employee({ id }).education()
}

export const Employee = { skills, links, experience, education }
