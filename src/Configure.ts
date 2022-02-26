import { NativeModules, Platform } from 'react-native';

const Configure = NativeModules.DMNConfigure;

/**
 *
 * @param appKey //友盟Key
 * @param channel //渠道
 * @returns
 */
export function initApp(appKey: string, channel: string) {
  return Configure.initApp(appKey, channel);
}

/**
 * 设置微信
 * @param appKey
 * @param appSecret
 * @param universalLink
 */
export function setWeChat(
  appKey: string,
  appSecret: string,
  universalLink: string
) {
  if (Platform.OS === 'ios') {
    Configure.setWeChat(appKey, appSecret, universalLink);
  } else if (Platform.OS === 'android') {
    Configure.setWeChat(appKey, appSecret);
  }
}

/**
 * 设置企业微信
 * @param appKey
 * @param corpId
 * @param agentId
 */
export function setWeChatWork(appKey: string, corpId: string, agentId: string) {
  Configure.setWeChatWork(appKey, corpId, agentId);
}
