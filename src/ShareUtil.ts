/**
 * Created by Damoness on 19/8/30.
 */
import { NativeModules } from 'react-native';

const ShareModule = NativeModules.DMNShareModule;

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

export enum SharePlatform {
  Wechat = 2, //微信
  Wechat_TimeLine = 3, //朋友圈
  WechatWork = 4, //企业微信
}

/**
 * 授权
 * @param platform 平台
 */
export async function auth(platform: SharePlatform): Promise<AuthUserInfo> {
  return new Promise((resolve, reject) => {
    ShareModule.auth(platform, (code: number, result: any, message: string) => {
      if (code === 200) {
        resolve(result);
      } else {
        reject({
          code,
          message,
        });
      }
    });
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
export async function shareboard(
  text: string,
  icon: string,
  link: string,
  title: string,
  platforms: SharePlatform[]
): Promise<String> {
  return new Promise((resolve, reject) => {
    ShareModule.shareboard(
      text,
      icon,
      link,
      title,
      platforms,
      (code: number, message: string) => {
        code === 200
          ? resolve(message)
          : reject({
              code,
              message,
            });
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
export async function share(
  text: string,
  icon: string,
  link: string,
  title: string,
  platform: SharePlatform
): Promise<string> {
  return new Promise((resolve, reject) => {
    ShareModule.share(
      text,
      icon,
      link,
      title,
      platform,
      (code: number, message: string) => {
        if (code === 200) {
          //成功
          resolve(message);
        } else {
          console.log(code, message);
          reject({
            code,
            message,
          });
        }
      }
    );
  });
}

/**
 * 分享链接
 * @param title : 标题
 * @param content : 内容
 * @param link : 跳转地址
 * @param icon : 图片地址
 * @param platform : 平台
 * @returns
 */
export async function shareLinkUrl(
  title: string,
  content: string,
  link: string,
  icon: string,
  platform: SharePlatform
) {
  return share(content, icon, link, title, platform);
}

/**
 * 分享图片
 * @param imageUrl ：  图片地址
 * @param platform ：  平台
 * @returns
 */
export async function shareImageUrl(imageUrl: string, platform: SharePlatform) {
  return share('', imageUrl, '', '', platform);
}

/**
 * 分享文字
 * @param text
 * @param platform
 * @returns
 */
export async function shareText(text: string, platform: SharePlatform) {
  return share(text, '', '', '', platform);
}

let ShareUtil = {
  share,
  shareImageUrl,
  shareLinkUrl,
  shareText,
  shareboard,
  auth,
};

export default ShareUtil;
