/**
 * Created by Damoness on 19/8/30.
 */

var { NativeModules } = require("react-native");

const AnalyticsModule = NativeModules.UMAnalyticsModule;

export default class AnalyticsUtil {
  static onEvent(eventId: string) {
    AnalyticsModule.event(eventId);
  }

  static onEventWithLabel(eventId: string, eventLabel: string) {
    AnalyticsModule.event(eventId, eventLabel);
  }

  static onEventWithMap(eventId: string, parameters: any) {
    AnalyticsModule.event(eventId, parameters);
  }

  static onPageBegin(pageName: string) {
    AnalyticsModule.onPageBegin(pageName);
  }
  static onPageEnd(pageName: string) {
    AnalyticsModule.onPageEnd(pageName);
  }
}
