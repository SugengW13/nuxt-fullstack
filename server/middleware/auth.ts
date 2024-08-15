import jwt from "jsonwebtoken"

export default defineEventHandler((event) => {
  const headers = getHeaders(event)
  const authorizationHeader = headers.authorization
  
  if (authorizationHeader) {
    const token = authorizationHeader.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY || 'SECRET_KEY');
    console.log(decoded)
  }
})
