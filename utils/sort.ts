import { isObject } from 'lodash-es';
import cloneDeep from 'clone-deep';
/**
 * 排序对象
 * @param obj 对象
 */
export const sortObj = <T>(obj: T): T => {
  if (!isObject(obj)) {
    console.error('params type error');
    return obj;
  }

  const temp: T = {} as any;
  const keys = Object.keys(obj).sort();
  keys.forEach((key): void => {
    temp[key as keyof T] = obj[key as keyof T];
  });
  return temp;
};

/**
 * 深度排序对象
 * @param obj 对象
 * @returns 排序完成的对象
 */
export const sortDeepObj = <T = any>(obj: T): T => {
  const tempObj = cloneDeep<T>(obj);
  const hasDeepObj = (newObj: any) => {
    if (isObject(newObj)) {
      const keys = Object.keys(newObj)
        .map((key) => (isObject(newObj[key]) ? key : ''))
        .filter(Boolean);
      return keys;
    }
    return [];
  };
  const sortLoop = (newObj: any) => {
    const deepKeys = hasDeepObj(newObj);
    if (deepKeys.length > 0) {
      deepKeys.map((key) => {
        newObj[key] = sortLoop(newObj[key]);
      });
    }
    return sortObj(newObj);
  };

  return sortLoop(tempObj);
};
