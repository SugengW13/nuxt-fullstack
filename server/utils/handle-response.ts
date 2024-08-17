export function resultSuccess<T>(code: number, message: string, data: T) {
  return {
    code,
    success: true,
    message,
    data
  }
}

export function resultError(code: number, message: string) {
  return {
    statusCode: code,
    message
  }
}

export function resultOK<T>(data: T) {
  return resultSuccess(200, 'Success', data)
}

export function resultCreated<T>(data: T) {
  return resultSuccess(201, 'Success', data)
}

export function resultUnauthorized() {
  return resultError(401, 'Unauthorized')
}