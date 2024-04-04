/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface SoonServerApiAuthV1EmailCodeSendReq {
  /** @format string */
  tag: "set-password" | "set-wallet";
  /** @format string */
  email: string;
}

export interface SoonServerApiAuthV1EmailCodeSendRes {
  /** @format int64 */
  sendTime?: number;
  /** @format int64 */
  expiration?: number;
}

export interface SoonServerApiAuthV1EmailCodeVerifyReq {
  /** @format string */
  tag: "set-password" | "set-wallet";
  /** @format string */
  email: string;
  /** @format string */
  code: string;
}

export interface SoonServerApiAuthV1EmailCodeVerifyRes {
  verified?: Interface;
}

export type Interface = object;

export type SoonServerApiAuthV1TokenLogoutReq = object;

export type SoonServerApiAuthV1TokenLogoutRes = object;

export interface SoonServerApiAuthPublicV1EmailCodeSendPubReq {
  /** @format string */
  tag: "sign-in" | "sign-up";
  /** @format string */
  email: string;
}

export interface SoonServerApiAuthPublicV1EmailCodeSendPubRes {
  /** @format int64 */
  sendTime?: number;
  /** @format int64 */
  expiration?: number;
}

export interface SoonServerApiAuthPublicV1EmailCodeVerifyPubReq {
  /** @format string */
  tag: "sign-in";
  /** @format string */
  email: string;
  /** @format string */
  code: string;
}

export interface SoonServerApiAuthPublicV1EmailCodeVerifyPubRes {
  verified?: Interface;
}

export interface SoonServerApiAuthPublicV1EmailSignInPubReq {
  /** @format string */
  email: string;
  /** @format string */
  password: string;
}

export interface SoonServerApiAuthPublicV1EmailSignInPubRes {
  Token?: SoonServerInternalModelTokenResult;
}

export interface SoonServerInternalModelTokenResult {
  /** @format string */
  accessToken?: string;
  /** @format string */
  refreshToken?: string;
  /** @format int64 */
  createAt?: number;
  /** @format int64 */
  expire?: number;
}

export interface SoonServerApiAuthPublicV1EmailSignUpPubReq {
  /** @format string */
  email: string;
  /** @format string */
  password: string;
  /** @format string */
  confirmPassword: string;
  /** @format string */
  code: string;
}

export interface SoonServerApiAuthPublicV1EmailSignUpPubRes {
  Token?: SoonServerInternalModelTokenResult;
}

export interface SoonServerApiAuthPublicV1TokenRefreshReq {
  /** @format string */
  refreshToken: string;
}

export interface SoonServerApiAuthPublicV1TokenRefreshRes {
  Token?: SoonServerInternalModelTokenResult;
}

export interface SoonServerApiUserV1SignInInfoReq {
  /** @format string */
  nickname: string;
  /** @format int64 */
  birthday: number;
  /** @format int8 */
  gender: number;
  /** @format int8 */
  want: number;
  /** @format *ghttp.UploadFile */
  avatar: File;
  /** @format []string */
  tags: string[];
}

export type SoonServerApiUserV1SignInInfoRes = object;
