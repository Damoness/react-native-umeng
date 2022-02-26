import { NativeModules, Platform } from 'react-native';

const Configure = NativeModules.DMNConfigure;

export function initApp(appKey: string, channel: string) {
  return Configure.initApp(appKey, channel);
}

//
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

export function setWeChatWork(appKey: string, corpId: string, agentId: string) {
  Configure.setWeChatWork(appKey, corpId, agentId);
}
