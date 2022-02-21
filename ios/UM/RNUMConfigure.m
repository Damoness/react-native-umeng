//
//  RNUMConfigure.m
//  UMComponent
//
//  Created by wyq.Cloudayc on 14/09/2017.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import "RNUMConfigure.h"
#import <UMShare/UMShare.h>

@implementation RNUMConfigure

RCT_EXPORT_MODULE();

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

RCT_EXPORT_METHOD(initWithAppKey:(NSString *)appkey channel:(NSString *)channel)
{
  SEL sel = NSSelectorFromString(@"setWraperType:wrapperVersion:");
  if ([UMConfigure respondsToSelector:sel]) {
    [UMConfigure performSelector:sel withObject:@"react-native" withObject:@"2.0"];
  }

  [UMConfigure setEncryptEnabled:YES];//打开加密传输
  [UMConfigure setLogEnabled:YES];//设置打开日志

  [UMConfigure initWithAppkey:appkey channel:channel];
}

/**
 设置微信
 */
RCT_EXPORT_METHOD(setWeChat:(NSString *)appkey appSecret:(NSString *)appSecret universalLink:(NSString *)universalLink){


    //配置微信平台的Universal Links
    //微信和QQ完整版会校验合法的universalLink，不设置会在初始化平台失败
    [UMSocialGlobal shareInstance].universalLinkDic = @{@(UMSocialPlatformType_WechatSession):universalLink}; //https://www.jianshu.com/p/b1d62e3004ab
    [UMSocialGlobal shareInstance].isUsingHttpsWhenShareContent = NO;

    /* 设置微信的appKey和appSecret */
    [[UMSocialManager defaultManager] setPlaform:UMSocialPlatformType_WechatSession appKey:appkey appSecret:appSecret redirectURL:nil];

}

RCT_EXPORT_METHOD(setWeChatWork:(NSString *)appkey corpId:(NSString *)corpId agentId:(NSString *)agentId){

    [[UMSocialManager defaultManager] setPlaform:UMSocialPlatformType_WechatWork appKey:appkey appSecret:nil redirectURL:nil];

    //extraInitDic，企业微信增加了corpid和agentid，故在UMSocialGlobal的全局配置里面增加extraInitDic来存储额外的初始化参数。extraInitDic的key:corpId和agentId为固定值
    [UMSocialGlobal shareInstance].extraInitDic =@{
    @(UMSocialPlatformType_WechatWork):@{@"corpId":corpId,@"agentId":agentId}
    };
}

@end
