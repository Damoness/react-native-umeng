package com.damoness.rn.umeng;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;

import com.facebook.react.bridge.ReactMethod;
import com.umeng.commonsdk.UMConfigure;
import com.umeng.socialize.PlatformConfig;

public class ConfigureModule extends ReactContextBaseJavaModule {

  private ReactApplicationContext context;

  public ConfigureModule(ReactApplicationContext reactContext) {
    super(reactContext);
    context = reactContext;
  }

  @Override
  public String getName() {
    return "DMNConfigure";
  }

  @ReactMethod
  public void initApp(String appKey, String channel) {
    // 初始化
    UMConfigure.init(this.getReactApplicationContext(), appKey, channel, UMConfigure.DEVICE_TYPE_PHONE, "");
  }

  @ReactMethod
  public void setWeChat(String appKey, String appSecret) {
    // 微信设置
    PlatformConfig.setWeixin(appKey, appSecret);
    PlatformConfig.setWXFileProvider("com.tencent.sample2.fileprovider");

  }

  @ReactMethod
  public void setWeChatWork(String appKey, String appSecret, String corpId, String agentId) {
    // 企业微信设置
    PlatformConfig.setWXWork(corpId, appSecret, agentId, appKey);
    PlatformConfig.setWXWorkFileProvider("com.tencent.sample2.fileprovider");
  }

}
