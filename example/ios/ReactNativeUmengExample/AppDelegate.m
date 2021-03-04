/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"

#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

// ------
//友盟
#import <UMCommon/UMCommon.h>
#import <UMShare/UMShare.h>
//友盟统计
#import <UMCommon/MobClick.h>

//友盟key
#define UMAppKey @"5c998a3561f564fc5e0011fe"

//微信key
#define WXAppKey @"wx52dafcf5b9efb111"
#define WXAppSecret @"9a41a18395afb5744f2ac73e6ad06bde"
// ------


#ifdef FB_SONARKIT_ENABLED
#import <FlipperKit/FlipperClient.h>
#import <FlipperKitLayoutPlugin/FlipperKitLayoutPlugin.h>
#import <FlipperKitUserDefaultsPlugin/FKUserDefaultsPlugin.h>
#import <FlipperKitNetworkPlugin/FlipperKitNetworkPlugin.h>
#import <SKIOSNetworkPlugin/SKIOSNetworkAdapter.h>
#import <FlipperKitReactPlugin/FlipperKitReactPlugin.h>
static void InitializeFlipper(UIApplication *application) {
  FlipperClient *client = [FlipperClient sharedClient];
  SKDescriptorMapper *layoutDescriptorMapper = [[SKDescriptorMapper alloc] initWithDefaults];
  [client addPlugin:[[FlipperKitLayoutPlugin alloc] initWithRootNode:application withDescriptorMapper:layoutDescriptorMapper]];
  [client addPlugin:[[FKUserDefaultsPlugin alloc] initWithSuiteName:nil]];
  [client addPlugin:[FlipperKitReactPlugin new]];
  [client addPlugin:[[FlipperKitNetworkPlugin alloc] initWithNetworkAdapter:[SKIOSNetworkAdapter new]]];
  [client start];
}
#endif

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  #ifdef FB_SONARKIT_ENABLED
    InitializeFlipper(application);
  #endif
  
  [self initUMeng];
  
  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"ReactNativeUmengExample"
                                            initialProperties:nil];

  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  return YES;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}


#pragma mark - 友盟
- (void)initUMeng{
  
  //配置微信平台的Universal Links
  //微信和QQ完整版会校验合法的universalLink，不设置会在初始化平台失败
  [UMSocialGlobal shareInstance].universalLinkDic = @{@(UMSocialPlatformType_WechatSession):@"https://ae7b.lkme.cc/EzC/"}; //https://www.jianshu.com/p/b1d62e3004ab
  [UMSocialGlobal shareInstance].isUsingHttpsWhenShareContent = NO;

  //友盟统计
  [UMConfigure setEncryptEnabled:YES];//打开加密传输
  [UMConfigure setLogEnabled:YES];//设置打开日志
  [UMConfigure initWithAppkey:UMAppKey channel:@"App Store"];


  /* 设置微信的appKey和appSecret */
  [[UMSocialManager defaultManager] setPlaform:UMSocialPlatformType_WechatSession appKey:WXAppKey appSecret:WXAppSecret redirectURL:nil];
  

}


//URI Scheme 
- (BOOL)application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<NSString*, id> *)options{
  
  NSLog(@"opened app from URL %@", [url description]);

  return [[UMSocialManager defaultManager] handleOpenURL:url options:options];
  
}

//Universal Links
- (BOOL)application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity restorationHandler:(void (^)(NSArray<id<UIUserActivityRestoring>> * _Nullable))restorationHandler{
  
  if (![[UMSocialManager defaultManager] handleUniversalLink:userActivity options:nil]) {
    // 其他SDK的回调
    
  }
  
  return YES;
}

@end
