// 自定义 import.meta.env[]
interface ImportMetaEnv {
  TYPE: 'dev' | 'prod' | 'localProd';
  LANG: 'cn' | 'en' | 'hk';
  TARGET: 'local' | '';
}

type IFunction = () => void;

interface IRecordValue<T> {
  [key: string]: T;
  [key: number]: T;
}

type TValueOf<T> = T[keyof T];

declare type TNullable<T> = T | null;

declare type TSubmitType = 'SAVE' | 'SUBMIT';

declare type TAnyFunction<T = unknown> = (...args: any[]) => T;

declare interface ITestItem {
  name: string;
  age: number;
  height: number;
  phone: string;
  list: string[];
}

declare type TVitalModeType = 'edit' | 'view' | 'disable' | 'readonly';

declare module 'json-bigint';

declare module 'fundebug-vue';

declare let AMapUI: any;

type TAction = {
  operation: string;
};
