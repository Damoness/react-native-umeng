//
//  ShareModule.h
//  UMComponent
//
//  Created by wyq.Cloudayc on 11/09/2017.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import "UMShareModule.h"
#import <UMShare/UMShare.h>
#import <UShareUI/UShareUI.h>
#import <React/RCTConvert.h>
#import <React/RCTEventDispatcher.h>

@implementation UMShareModule

RCT_EXPORT_MODULE();

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

- (UMSocialPlatformType)platformType:(NSInteger)platform
{
  switch (platform) {
    case 0: // QQ
      return UMSocialPlatformType_QQ;
    case 1: // Sina
      return UMSocialPlatformType_Sina;
    case 2: // wechat
      return UMSocialPlatformType_WechatSession;
    case 3:
      return UMSocialPlatformType_WechatTimeLine;
    case 4:
        return UMSocialPlatformType_WechatWork;
    default:
      return UMSocialPlatformType_QQ;
  }
}

- (void)shareWithText:(NSString *)text icon:(NSString *)icon link:(NSString *)link title:(NSString *)title platform:(NSInteger)platform completion:(UMSocialRequestCompletionHandler)completion
{
  UMSocialMessageObject *messageObject = [UMSocialMessageObject messageObject];
  
  if (link.length > 0) {
    UMShareWebpageObject *shareObject = [UMShareWebpageObject shareObjectWithTitle:title descr:text thumImage:icon];
    shareObject.webpageUrl = link;
    
    messageObject.shareObject = shareObject;
  } else if (icon.length > 0) {
    id img = nil;
    if ([icon hasPrefix:@"http"]) {
      img = icon;
    } else {
      if ([icon hasPrefix:@"/"]) {
        img = [UIImage imageWithContentsOfFile:icon];
      } else {
        img = [UIImage imageWithContentsOfFile:[[NSBundle mainBundle] pathForResource:icon ofType:nil]];
      }
    }
    UMShareImageObject *shareObject = [[UMShareImageObject alloc] init];
    shareObject.thumbImage = img;
    shareObject.shareImage = img;
    messageObject.shareObject = shareObject;
    
    messageObject.text = text;
  } else if (text.length > 0) {
    messageObject.text = text;
  } else {
    if (completion) {
      completion(nil, [NSError errorWithDomain:@"UShare" code:-3 userInfo:@{@"message": @"invalid parameter"}]);
      return;
    }
  }
  
  [[UMSocialManager defaultManager] shareToPlatform:platform messageObject:messageObject currentViewController:nil completion:completion];
  
}

RCT_EXPORT_METHOD(share:(NSString *)text icon:(NSString *)icon link:(NSString *)link title:(NSString *)title platform:(NSInteger)platform completion:(RCTResponseSenderBlock)completion)
{
  UMSocialPlatformType plf = [self platformType:platform];
  if (plf == UMSocialPlatformType_UnKnown) {
    if (completion) {
      completion(@[@(UMSocialPlatformType_UnKnown), @"invalid platform"]);
      return;
    }
  }
  
  [self shareWithText:text icon:icon link:link title:title platform:plf completion:^(id result, NSError *error) {
    if (completion) {
      if (error) {
        NSString *msg = error.userInfo[@"NSLocalizedFailureReason"];
        if (!msg) {
          msg = error.userInfo[@"message"];
        }if (!msg) {
          msg = @"share failed";
        }
        NSInteger stcode =error.code;
        if(stcode == 2009){
         stcode = -1;
        }
        completion(@[@(stcode), msg]);
      } else {
        completion(@[@200, @"share success"]);
      }
    }
  }];
  
}

RCT_EXPORT_METHOD(shareboard:(NSString *)text icon:(NSString *)icon link:(NSString *)link title:(NSString *)title platform:(NSArray *)platforms completion:(RCTResponseSenderBlock)completion)
{
  NSMutableArray *plfs = [NSMutableArray array];
  for (NSNumber *plf in platforms) {
    [plfs addObject:@([self platformType:plf.integerValue])];
  }
  if (plfs.count > 0) {
    [UMSocialUIManager setPreDefinePlatforms:plfs];
  }
  [UMSocialUIManager showShareMenuViewInWindowWithPlatformSelectionBlock:^(UMSocialPlatformType platformType, NSDictionary *userInfo) {
    [self shareWithText:text icon:icon link:link title:title platform:platformType completion:^(id result, NSError *error) {
      if (completion) {
        if (error) {
          NSString *msg = error.userInfo[@"NSLocalizedFailureReason"];
          if (!msg) {
            msg = error.userInfo[@"message"];
          }if (!msg) {
            msg = @"share failed";
          }
          NSInteger stcode =error.code;
          if(stcode == 2009){
            stcode = -1;
          }
          completion(@[@(stcode), msg]);
        } else {
          completion(@[@200, @"share success"]);
        }
      }
    }];
  }];
}


RCT_EXPORT_METHOD(auth:(NSInteger)platform completion:(RCTResponseSenderBlock)completion)
{
  UMSocialPlatformType plf = [self platformType:platform];
  if (plf == UMSocialPlatformType_UnKnown) {
    if (completion) {
      completion(@[@(UMSocialPlatformType_UnKnown), @"invalid platform"]);
      return;
    }
  }
  
  [[UMSocialManager defaultManager] getUserInfoWithPlatform:plf currentViewController:nil completion:^(id result, NSError *error) {
    if (completion) {
      if (error) {
        NSString *msg = error.userInfo[@"NSLocalizedFailureReason"];
        if (!msg) {
          msg = error.userInfo[@"message"];
        }if (!msg) {
          msg = @"share failed";
        }
        NSInteger stCode = error.code;
        if(stCode == 2009){
          stCode = -1;
        }
        completion(@[@(stCode), @{}, msg]);
      } else {
        UMSocialUserInfoResponse *authInfo = result;
        
        NSMutableDictionary *retDict = [NSMutableDictionary dictionaryWithCapacity:8];
        retDict[@"uid"] = authInfo.uid;
        retDict[@"openid"] = authInfo.openid;
        retDict[@"unionid"] = authInfo.unionId;
        retDict[@"accessToken"] = authInfo.accessToken;
        retDict[@"refreshToken"] = authInfo.refreshToken;
        retDict[@"expiration"] = authInfo.expiration;
        
        retDict[@"name"] = authInfo.name;
        retDict[@"iconurl"] = authInfo.iconurl;
        retDict[@"gender"] = authInfo.unionGender;
        
        NSDictionary *originInfo = authInfo.originalResponse;
        retDict[@"city"] = originInfo[@"city"];
        retDict[@"province"] = originInfo[@"province"];
        retDict[@"country"] = originInfo[@"country"];
        
        completion(@[@200, retDict, @""]);
      }
    }
  }];
  
}
@end
