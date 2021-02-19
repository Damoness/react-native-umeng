/**
 * Created by Damoness on 19/8/30.
 */

var { NativeModules } = require("react-native");

const AnalyticsModule = NativeModules.UMAnalyticsModule;

export default class AnalyticsUtil {
  static onEvent(eventId: string) {
    AnalyticsModule.onEvent(eventId);
  }

  static onEventWithLabel(eventId: string, eventLabel: string) {
    AnalyticsModule.onEventWithLabel(eventId, eventLabel);
  }

  static onEventWithMap(eventId: string, parameters: any) {
    AnalyticsModule.onEventWithMap(eventId, parameters);
  }

  static onPageBegin(pageName: string) {
    AnalyticsModule.onPageBegin(pageName);
  }
  static onPageEnd(pageName: string) {
    AnalyticsModule.onPageEnd(pageName);
  }
}
