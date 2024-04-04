import { IRequestInit } from "./fetch";
import { sortDeepObj } from "./sort";
import cloneDeep from "clone-deep";
export function toUrl(obj: IRecordValue<string>) {
  return Object.entries(obj)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join("&");
}
export interface IFetchCacheItem {
  callbackList: { resolve: any; reject: any }[];
  controller: AbortController | null;
  debounceTimer: any | null;
}

export class FetchCache {
  /** 对象存储数组 */
  private list: Record<string, IFetchCacheItem> = {};

  cache(
    config: any,
    promise: IFetchCacheItem["callbackList"][number],
    isCache = true
  ) {
    const preRequest = this.find(config);
    if (preRequest) {
      // 缓存当前请求的observable可订阅对象
      preRequest.callbackList.push(promise);
      // 取消上一次请求
      preRequest.controller?.abort();
      preRequest.controller = null;
    } else {
      if (isCache) {
        const key = JSON.stringify(sortDeepObj(config));
        this.list[key] = {
          callbackList: [promise],
          controller: null,
          debounceTimer: null,
        };
      }
    }
    return {
      requestDebounce: (time = 100) => {
        return new Promise<void>((resolve) => {
          const request = this.find(config);
          if (!request) {
            resolve();
            return;
          }
          if (request.debounceTimer) {
            clearTimeout(request.debounceTimer);
          }
          request.debounceTimer = setTimeout(resolve, time);
        });
      },
      resolve: (data: any) => {
        const request = this.find(config);
        while (request.callbackList?.length) {
          const cb = request.callbackList.shift();
          cb?.resolve(cloneDeep(data));
        }
      },
      reject: (data: any) => {
        const request = this.find(config);
        while (request.callbackList?.length) {
          const cb = request.callbackList.shift();
          cb?.reject(cloneDeep(data));
        }
      },
      addController: (controller: AbortController) => {
        const request = this.find(config);
        request.controller = controller;
      },
    };
  }
  /**
   * 请求配置参数 查找 IFetchCacheItem 对象
   */
  find(opts: IRequestInit) {
    // 对比对象字符串是否一致
    const requestStr = JSON.stringify(sortDeepObj(opts));
    return this.list[requestStr];
  }
  /**
   * 判断是否存在指定url及options的请求
   *
   * @param {IRequestInit} opts 接口请求的配置
   * @return {boolean} boolean
   * @memberof FetchCache
   */
  has(opts: IRequestInit) {
    return !!this.find(opts);
  }
}

/**
 * 解除vue响应式
 *
 * @export
 * @param {*} body 对象
 * @return {*} T
 */

export const parseRes = async (res: Response) => {
  const contentType = res.headers.get("Content-Type");
  if (contentType) {
    if (contentType.indexOf("json") > -1) {
      return await res.json();
    }
    if (contentType.indexOf("text") > -1) {
      return await res.text();
    }
    if (contentType.indexOf("form") > -1) {
      return await res.formData();
    }
    if (contentType.indexOf("video") > -1) {
      return await res.blob();
    }
    if (contentType.indexOf("stream") > -1) {
      return await res.blob();
    }
  }
  return await res.text();
};
/**
 * fetch 请求后参数处理
 * @param res 返回结果
 * @param isAll 是否把结果全部返回
 * @returns T
 */
