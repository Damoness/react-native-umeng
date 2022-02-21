import { NativeModules } from 'react-native';

const Configure = NativeModules.RNUMConfigure;

export function initApp(appKey: string, channel: string) {
  return Configure.initWithAppKey(appKey, channel);
}

//
export function setWeChat(
  appKey: string,
  appSecret: string,
  universalLink: string
) {
  Configure.setWeChat(appKey, appSecret, universalLink);
}

export function setWeChatWork(appKey: string, corpId: string, agentId: string) {
  Configure.setWeChatWork(appKey, corpId, agentId);
}
