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
  SoonServerApiAuthV1EmailCodeSendReq,
  SoonServerApiAuthV1EmailCodeSendRes,
  SoonServerApiAuthV1EmailCodeVerifyReq,
  SoonServerApiAuthV1EmailCodeVerifyRes,
  SoonServerApiAuthV1TokenLogoutReq,
  SoonServerApiAuthV1TokenLogoutRes,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Email<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Auth
   * @name CodeSendCreate
   * @request POST:/email/code/send
   */
  codeSendCreate = (data: SoonServerApiAuthV1EmailCodeSendReq, params: RequestParams = {}) =>
    this.request<SoonServerApiAuthV1EmailCodeSendRes, any>({
      path: `/email/code/send`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Auth
   * @name CodeVerifyCreate
   * @request POST:/email/code/verify
   */
  codeVerifyCreate = (data: SoonServerApiAuthV1EmailCodeVerifyReq, params: RequestParams = {}) =>
    this.request<SoonServerApiAuthV1EmailCodeVerifyRes, any>({
      path: `/email/code/verify`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Auth
   * @name LoginCreate
   * @request POST:/email/login
   */
  loginCreate = (data: SoonServerApiAuthV1TokenLogoutReq, params: RequestParams = {}) =>
    this.request<SoonServerApiAuthV1TokenLogoutRes, any>({
      path: `/email/login`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
}
