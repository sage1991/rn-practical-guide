import { SerializedError } from "@reduxjs/toolkit"


export class NetworkError extends Error implements SerializedError {
  constructor(public code: string, message?: string) {
    super(message)
  }
}
