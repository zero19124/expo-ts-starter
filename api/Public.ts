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

import {
  SoonServerApiAuthPublicV1EmailCodeSendPubReq,
  SoonServerApiAuthPublicV1EmailCodeSendPubRes,
  SoonServerApiAuthPublicV1EmailCodeVerifyPubReq,
  SoonServerApiAuthPublicV1EmailCodeVerifyPubRes,
  SoonServerApiAuthPublicV1EmailSignInPubReq,
  SoonServerApiAuthPublicV1EmailSignInPubRes,
  SoonServerApiAuthPublicV1EmailSignUpPubReq,
  SoonServerApiAuthPublicV1EmailSignUpPubRes,
  SoonServerApiAuthPublicV1TokenRefreshReq,
  SoonServerApiAuthPublicV1TokenRefreshRes,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Public<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Auth Public
   * @name EmailCodeSendCreate
   * @request POST:/public/email/code/send
   */
  emailCodeSendCreate = (data: SoonServerApiAuthPublicV1EmailCodeSendPubReq, params: RequestParams = {}) =>
    this.request<SoonServerApiAuthPublicV1EmailCodeSendPubRes, any>({
      path: `/public/email/code/send`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Auth Public
   * @name EmailCodeVerifyCreate
   * @request POST:/public/email/code/verify
   */
  emailCodeVerifyCreate = (data: SoonServerApiAuthPublicV1EmailCodeVerifyPubReq, params: RequestParams = {}) =>
    this.request<SoonServerApiAuthPublicV1EmailCodeVerifyPubRes, any>({
      path: `/public/email/code/verify`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Auth Public
   * @name EmailSignInCreate
   * @request POST:/public/email/sign-in
   */
  emailSignInCreate = (data: SoonServerApiAuthPublicV1EmailSignInPubReq, params: RequestParams = {}) =>
    this.request<SoonServerApiAuthPublicV1EmailSignInPubRes, any>({
      path: `/public/email/sign-in`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Auth Public
   * @name EmailSignUpCreate
   * @request POST:/public/email/sign-up
   */
  emailSignUpCreate = (data: SoonServerApiAuthPublicV1EmailSignUpPubReq, params: RequestParams = {}) =>
    this.request<SoonServerApiAuthPublicV1EmailSignUpPubRes, any>({
      path: `/public/email/sign-up`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Auth Public
   * @name TokenRefreshCreate
   * @request POST:/public/token/refresh
   */
  tokenRefreshCreate = (data: SoonServerApiAuthPublicV1TokenRefreshReq, params: RequestParams = {}) =>
    this.request<SoonServerApiAuthPublicV1TokenRefreshRes, any>({
      path: `/public/token/refresh`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
}
