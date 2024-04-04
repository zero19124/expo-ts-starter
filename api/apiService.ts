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

import { Email } from "./Email";

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

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== "string" ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
            ? JSON.stringify(property)
            : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title No title
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  email = new Email();
  public = {
    /**
     * No description
     *
     * @tags Auth Public
     * @name EmailCodeSendCreate
     * @request POST:/public/email/code/send
     */
    emailCodeSendCreate: (data: SoonServerApiAuthPublicV1EmailCodeSendPubReq, params: RequestParams = {}) =>
      this.request<SoonServerApiAuthPublicV1EmailCodeSendPubRes, any>({
        path: `/public/email/code/send`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth Public
     * @name EmailCodeVerifyCreate
     * @request POST:/public/email/code/verify
     */
    emailCodeVerifyCreate: (data: SoonServerApiAuthPublicV1EmailCodeVerifyPubReq, params: RequestParams = {}) =>
      this.request<SoonServerApiAuthPublicV1EmailCodeVerifyPubRes, any>({
        path: `/public/email/code/verify`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth Public
     * @name EmailSignInCreate
     * @request POST:/public/email/sign-in
     */
    emailSignInCreate: (data: SoonServerApiAuthPublicV1EmailSignInPubReq, params: RequestParams = {}) =>
      this.request<SoonServerApiAuthPublicV1EmailSignInPubRes, any>({
        path: `/public/email/sign-in`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth Public
     * @name EmailSignUpCreate
     * @request POST:/public/email/sign-up
     */
    emailSignUpCreate: (data: SoonServerApiAuthPublicV1EmailSignUpPubReq, params: RequestParams = {}) =>
      this.request<SoonServerApiAuthPublicV1EmailSignUpPubRes, any>({
        path: `/public/email/sign-up`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth Public
     * @name TokenRefreshCreate
     * @request POST:/public/token/refresh
     */
    tokenRefreshCreate: (data: SoonServerApiAuthPublicV1TokenRefreshReq, params: RequestParams = {}) =>
      this.request<SoonServerApiAuthPublicV1TokenRefreshRes, any>({
        path: `/public/token/refresh`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),
  };
  user = {
    /**
     * No description
     *
     * @tags User
     * @name SignInInfoCreate
     * @request POST:/user/sign-in-info
     */
    signInInfoCreate: (data: SoonServerApiUserV1SignInInfoReq, params: RequestParams = {}) =>
      this.request<SoonServerApiUserV1SignInInfoRes, any>({
        path: `/user/sign-in-info`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),
  };
}
