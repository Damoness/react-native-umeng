import { NativeModules, Platform } from 'react-native';

const Configure = NativeModules.DMNConfigure;

/**
 *
 * @param appKey //友盟Key
 * @param channel //渠道
 * @returns
 */
export async function initApp(appKey: string, channel: string) {
  return await Configure.initApp(appKey, channel);
}

/**
 * 设置微信
 * @param appKey
 * @param appSecret
 * @param universalLink
 */
export async function setWeChat(
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
 * @param appSecret
 * @param corpId
 * @param agentId
 */
export async function setWeChatWork(
  appKey: string,
  appSecret: string,
  corpId: string,
  agentId: string
) {
  return await Configure.setWeChatWork(appKey, appSecret, corpId, agentId);
}
