import * as core from 'express-serve-static-core'

// if separated into multiple services, separate to multiple files and on a more generic location

export type Request<ReqBody> = core.Request<core.ParamsDictionary, any, ReqBody>

export interface BaseResponse {
  message?: string
  error?: string
}

export type Response<ResBody> = core.Response<ResBody>

export enum ResponseStatus {
  Success = 200,
  Created = 201,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  Conflict = 409,
  InternalServerError = 500
}
