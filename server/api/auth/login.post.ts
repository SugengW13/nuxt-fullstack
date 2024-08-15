import prisma from "~/lib/prisma"
import { compare } from 'bcrypt'
import jwt from 'jsonwebtoken'
import { addDays, getUnixTime } from "date-fns"

export default defineEventHandler(async (event) => {
  try {
    const { email, password } = await readBody(event)

    const user = await prisma.user.findUnique({
      where: { email: email }
    })

    console.log(user)

    // if (!user) throw { message: 'Invalid email or password' }

    // const isValidPassword = await compare(password, user.password)

    // if (!isValidPassword) throw { message: 'Invalid email or password' }
    
    // console.log(process.env.JWT_SECRET_KEY, user)

    // const token = jwt.sign(
    //   JSON.stringify({
    //     sub: user.id,
    //     email: user.email,
    //     name: user.name,
    //     role: user.role,
    //     iat: getUnixTime(new Date()),
    //     exp: getUnixTime(addDays(new Date(), 1))
    //   }),
    //   process.env.JWT_SECRET_KEY ?? 'SECRET_KEY',
    //   { expiresIn: 60 * 60 * 24 }
    // )

    // await prisma.user.update({
    //   where: { id: user.id },
    //   data: { token }
    // })
  } catch (e) {
    console.log(e)
  }
})