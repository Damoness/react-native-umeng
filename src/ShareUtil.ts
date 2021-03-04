/**
 * Created by Damoness on 19/8/30.
 */
import { NativeModules } from 'react-native';

const ShareModule = NativeModules.UMShareModule;

type AuthUserInfo = {
  uid: string;
  unionid: string;
  openid: string;
  name: string;
  iconurl: string;
  gender: string;
  country: string;
  province: string;
  city: string;
  accessToken: string;
  refreshToken: string;
};

export enum Platform {
  Wechat = 2, //微信
  Wechat_TimeLine = 3, //朋友圈
}

export default class ShareUtil {
  /**
   * 授权
   * @param platform 平台
   */
  static async auth(platform: Platform): Promise<AuthUserInfo> {
    return new Promise((resolve, reject) => {
      ShareModule.auth(
        platform,
        (code: number, result: any, message: string) => {
          if (code === 200) {
            resolve(result);
          } else {
            reject(message);
          }
        }
      );
    });
  }

  /**
   * 分享面板
   * @param text 内容
   * @param icon 图片
   * @param link  跳转链接 : 如果为空,分享的内容为icon的图片, 不为空 则是 标题, 内容, 图标 模式.
   * @param title 标题
   * @param platforms 平台数组
   */
  static async shareboard(
    text: string,
    icon: string,
    link: string,
    title: string,
    platforms: Platform[]
  ) {
    return new Promise((resolve, reject) => {
      ShareModule.shareboard(
        text,
        icon,
        link,
        title,
        platforms,
        (code: number, result: any, message: string) => {
          code === 200 ? resolve(result) : reject(message);
        }
      );
    });
  }

  /**
   * 分享
   * @param text 内容
   * @param icon 图片
   * @param link  跳转链接 : 如果为空,分享的内容为icon的图片, 不为空 则是 标题, 内容, 图标 模式.
   * @param title 标题
   * @param platform 平台
   */
  static async share(
    text: string,
    icon: string,
    link: string,
    title: string,
    platform: Platform
  ) {
    return new Promise((resolve, reject) => {
      ShareModule.share(
        text,
        icon,
        link,
        title,
        platform,
        (code: number, result: any, message: string) => {
          if (code === 200) {
            //成功
            resolve(result);
          } else {
            console.log(code, result, message);
            reject(message);
          }
        }
      );
    });
  }
}
