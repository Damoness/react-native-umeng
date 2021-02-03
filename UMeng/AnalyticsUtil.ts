/**
 * Created by Damoness on 19/8/30.
 */

var { NativeModules } = require("react-native");

const AnalyticsModule = NativeModules.UMAnalyticsModule;

export default class AnalyticsUtil {
  static onPageBegin(pageName: string) {
    AnalyticsModule.onPageBegin(pageName);
  }
  static onPageEnd(pageName: string) {
    AnalyticsModule.onPageEnd(pageName);
  }
}
