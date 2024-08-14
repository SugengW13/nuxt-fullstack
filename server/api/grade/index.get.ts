import prisma from "~/lib/prisma"

export default defineEventHandler(async (event) => {
  try {
    const data = await prisma.grade.findMany()

    return {
      code: 200,
      success: true,
      data: data
    }
  } catch (_) {
    return {
      success: false
    }
  }
})