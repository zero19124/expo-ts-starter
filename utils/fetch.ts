import { getAsyncStoreData } from "@/lib/asyncStorage";
import { FetchCache, parseRes, toUrl } from "./fetch-helper";
import { isEmpty } from "lodash-es";
const BASE_URL = "http://10.147.18.1:8000";
const fetchCache = new FetchCache();
// const BASE_URL = "http://104.219.251.173:8000";
interface ResponseType {
  code: number;
  data: any;
  message: string;
}
enum HttpMethod {
  get = "GET",
  post = "POST",
  put = "PUT",
  patch = "PATCH",
  delete = "DELETE",
}
// 自定义错误信息code
const errorWhitelistCodes: string[] = ["0001"];

export interface IRequestInit extends RequestInit {
  /** 会被拼接在 url 上的参数 */
  params?: IRecordValue<any>;
  /** body 参数 */
  body?: any;
  /** restful url参数 */
  paramNames?: string[];
  /** 是否返回所有数据 */
  isAll?: boolean;
  /** 是否需要token */
  noToken?: boolean;
  /** 时间是否不转+8时区 */
  noTranslateTimeZone?: boolean;
  /** 指定接口 */
  domain?: string;
}

type TBeforeFetch = (params: { config: IRequestInit; abort(): void }) => void;

export const post = <T>(url: string, conf?: IRequestInit) => {
  return fetchFn<T>(url, Object.assign({ method: HttpMethod.post }, conf));
};
export const get = <T>(url: string, conf?: IRequestInit) => {
  return fetchFn<T>(url, Object.assign({ method: HttpMethod.get }, conf));
};

let is403 = false;
const logout = () => {};

export const fetchFn = async <T>(
  url: string,
  opts: IRequestInit,
  beforeFetch?: TBeforeFetch
) => {
  let { body = {}, method = "post", noTranslateTimeZone } = opts;
  if (method) {
    method = String(method).toLowerCase();
  }

  let requestUrl = BASE_URL + url;

  const controller = new AbortController();
  const { signal } = controller;

  const config: RequestInit = {
    method,
    signal,
    headers: {
      "Content-Type": "application/json",
    },
  };

  return new Promise<ResponseType>(async (resolve, reject) => {
    let token = "";
    const storeToken = await getAsyncStoreData("token");
    console.log(storeToken?.verified?.accessToken, "storeToken");
    token = storeToken?.verified?.accessToken ?? "";
    if (token && opts.noToken !== true) {
      (config.headers as any)["Authorization"] = " " + token;
    }
    if (method === "get") {
      requestUrl += !isEmpty(body) ? "?" + toUrl(body) : "";
      opts.body = {};
    } else {
      let fetchBody = body;
      if (!isEmpty(body)) {
        config.body = JSON.stringify(fetchBody);
      }
    }

    if (opts.headers) Object.assign(config.headers!, opts.headers);

    // const request = fetchCache.cache(
    //   {
    //     url: requestUrl,
    //     ...config,
    //   },
    //   { resolve, reject },
    //   true
    // );

    try {
      // await request.requestDebounce(150);
      // request.addController(controller);
      await beforeFetch?.({
        config,
        abort() {
          controller.abort();
        },
      });
      console.log(requestUrl, config, "requestUrl, config");
      const fetchRes = await fetch(requestUrl, config);
      const res = await parseRes(fetchRes);
      console.log(res, "-parseRes-fetch--parseRes-fetch--parseRes-fetch-");
      if (fetchRes.status === 403) {
        if (is403) return;
        is403 = true;
        return Promise.reject();
      } else if (fetchRes.status === 401) {
      } else if (fetchRes.status !== 200) {
      }

      if (opts.isAll) {
        // request?.resolve(res);
        resolve(res);
      } else {
        if (res.code === 401) {
          logout();
          return Promise.reject(new Error(res.message));
        }

        if (res.code !== 200) {
          // const isServerError = [res.code, res.status].some(
          //   (code) => Number(code) === 500
          // );
          // const otherMsg = res.localizedMessage || res.message || res.error;
          // // 系统服务报错统一友好提示
          // const message = isServerError ? "系统维护中，请稍后重试" : otherMsg;
          // const error = res.code
          //   ? new Error(res.code + res.message)
          //   : new Error(res.error);
          // // request?.reject(error);
          reject(res);
        } else {
          // request?.resolve(res.data as ResponseType);
          resolve(res as ResponseType);
        }
      }
    } catch (error) {
      if (String(error).includes("aborted") === true) return;
      // request?.reject(error);
      reject(error);
    }
  });
};
