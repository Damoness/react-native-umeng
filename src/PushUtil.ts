/**
 * Created by Damoness on 2022/05/02.
 */
import { NativeModules } from 'react-native';

const PushModule = NativeModules.DMNPushModule;

/**
 * 增加标签
 * 一个设备最多增加1024个标签
 * @param tag
 * @returns
 */
export function addTag(tag: string) {
  return new Promise<number>((resolve, reject) => {
    PushModule.addTag(tag, (code: number, remain: number) => {
      if (code === 200) {
        return resolve(remain);
      } else {
        reject({
          code,
          remain,
        });
      }
    });
  });
}

/**
 * 删除标签
 * @param tag
 * @returns
 */
export function deleteTag(tag: string) {
  return new Promise((resolve, reject) => {
    PushModule.addTag(tag, (code: number, remain: number) => {
      if (code === 200) {
        return resolve(remain);
      } else {
        reject({
          code,
          remain,
        });
      }
    });
  });
}

/**
 * 获取标签列表
 * @returns
 */
export function getTagList() {
  return new Promise<string[]>((resolve, reject) => {
    PushModule.listTag((code: number, remain: number, list: any[]) => {
      if (code === 200) {
        return resolve(list);
      } else {
        reject({
          code,
          remain,
        });
      }
    });
  });
}

/**
 * 增加别名
 * @param name
 * @returns
 */
export function addAlias(name: string, type: string) {
  return new Promise<boolean>((resolve, reject) => {
    PushModule.addAlias(name, type, (code: number) => {
      if (code === 200) {
        return resolve(true);
      } else {
        reject({
          code,
        });
      }
    });
  });
}

/**
 * 增加排他性别名
 * @param name
 * @returns
 */
export function addExclusiveAlias(name: string, type: string) {
  return new Promise<boolean>((resolve, reject) => {
    PushModule.addExclusiveAlias(name, type, (code: number) => {
      if (code === 200) {
        return resolve(true);
      } else {
        reject({
          code,
        });
      }
    });
  });
}

/**
 * 删除别名
 * @param name
 * @returns
 */
export function deleteAlias(name: string, type: string) {
  return new Promise<boolean>((resolve, reject) => {
    PushModule.deleteAlias(name, type, (code: number) => {
      if (code === 200) {
        return resolve(true);
      } else {
        reject({
          code,
        });
      }
    });
  });
}
