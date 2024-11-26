export interface ApiResponse<T, E> {
  data?: T | null
  error?: E
}

export interface ErrorResponse {
  data: string
  status: number
}

export interface Error {
  response: ErrorResponse
  status: number
}
