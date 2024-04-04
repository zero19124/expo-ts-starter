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

import { SoonServerApiUserV1SignInInfoReq, SoonServerApiUserV1SignInInfoRes } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class User<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags User
   * @name SignInInfoCreate
   * @request POST:/user/sign-in-info
   */
  signInInfoCreate = (data: SoonServerApiUserV1SignInInfoReq, params: RequestParams = {}) =>
    this.request<SoonServerApiUserV1SignInInfoRes, any>({
      path: `/user/sign-in-info`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
}
