export class ApiError extends Error {
  status: number
  functionName: string
  constructor(message: string, status: number, functionName: string) {
    super(message)
    this.functionName = functionName
    this.status = status
  }
}
export class UnIdentifiedError extends ApiError {
  error?: any
  constructor(message: string, functionName: string, err?: any) {
    super(message, 500, functionName)
    this.name = 'UnIdentifiedError'
    this.error = err
  }
}
export class NotFoundError extends ApiError {
  constructor(message: string, functionName: string) {
    super(message, 404, functionName)
    this.name = 'NotFoundError'
  }
}
export class UnauthorizedError extends ApiError {
  constructor(message: string, functionName: string) {
    super(message, 401, functionName)
    this.name = 'UnauthorizedError'
  }
}
