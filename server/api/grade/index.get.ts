import prisma from "~/lib/prisma"

export default defineEventHandler(handleAsync(async (event) => {
  const grades = await prisma.grade.findMany()

  return resultOK({ ...grades })
}))