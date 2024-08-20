export default defineEventHandler(async (event) => {
  console.log('Header: ', getHeaders(event))
  console.log('URL: ', getRequestURL(event))
})
