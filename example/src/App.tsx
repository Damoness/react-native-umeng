import * as React from 'react';

import {
  StyleSheet,
  SafeAreaView,
  SectionList,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  ShareUtil,
  Configure,
  SharePlatform,
  PushUtil,
} from '@damoness/react-native-umeng';

import { Notifications } from 'react-native-notifications';

import appJSON from '../app.json';

let { umeng, wechatWork, wechat } = appJSON;

const getCommonFunctionData = (platform: SharePlatform) => {
  return [
    {
      title: '登录',
      onPress: async () => {
        try {
          ShareUtil.auth(platform);
        } catch (error) {
          console.log(error);
        }
      },
    },
    {
      title: '分享文字',
      onPress: () => {
        ShareUtil.shareText('这是一段文字', platform);
      },
    },
    {
      title: '分享图片',
      onPress: () => {
        ShareUtil.shareImageUrl(
          'https://static.cnbetacdn.com/article/2021/0807/ac0ec0fe399be7d.jpg',
          platform
        );
      },
    },
    {
      title: '分享链接',
      onPress: async () => {
        try {
          ShareUtil.shareLinkUrl(
            '标题',
            '内容',
            'https://github.com/damoness/react-native-umeng',
            'https://static.cnbetacdn.com/article/2021/0807/ac0ec0fe399be7d.jpg',
            platform
          ).then(
            (data) => {
              console.log(data);
            },
            (error) => {
              console.log('error', error);
            }
          );
        } catch (error) {
          console.log(error);
        }
      },
    },
  ];
};

export default function App() {
  React.useEffect(() => {
    async function init() {
      await Configure.initApp(umeng.appKey, 'RN');
      await Configure.setWeChat(
        wechat.appKey,
        wechat.appSecret,
        wechat.universalLink
      );
      await Configure.setWeChatWork(
        wechatWork.appKey,
        wechatWork.appSecret,
        wechatWork.corpId,
        wechatWork.agentId
      );
    }
    init();

    Notifications.getInitialNotification().then((x) => {
      if (x) {
        console.log('x', JSON.stringify(x));
        Alert.alert(x.payload.aps.alert.title);
      }
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        sections={[
          {
            title: '通用',
            data: [
              {
                title: '分享面板',
                onPress: () => {
                  ShareUtil.shareboard(
                    '内容',
                    'http://t1.qichangv.com/images/logo/favition.png',
                    'https://hot.cnbeta.com/articles/game/1097481.htm',
                    '标题',
                    [
                      SharePlatform.Wechat,
                      SharePlatform.Wechat_TimeLine,
                      SharePlatform.WechatWork,
                    ]
                  );
                },
              },
            ],
          },
          {
            title: '微信',
            data: getCommonFunctionData(SharePlatform.Wechat),
          },
          {
            title: '企业微信',
            data: [
              {
                title: '企业微信登录 - 有问题 - TODO',
                onPress: async () => {
                  try {
                    ShareUtil.auth(SharePlatform.WechatWork);
                  } catch (error) {
                    console.log(error);
                  }
                },
              },
              ...getCommonFunctionData(SharePlatform.WechatWork).slice(1),
            ],
          },
          {
            title: '朋友圈',
            data: [
              ...getCommonFunctionData(SharePlatform.Wechat_TimeLine).slice(1),
            ],
          },

          {
            title: '推送',
            data: [
              {
                title: '请求推送',
                onPress: () => {
                  Notifications.registerRemoteNotifications();

                  Notifications.events().registerRemoteNotificationsRegistered(
                    (event) => {
                      // TODO: Send the token to my server so it could send back push notifications...
                      console.log('Device Token Received', event.deviceToken);
                    }
                  );

                  Notifications.events().registerNotificationReceivedForeground(
                    (notification, completion) => {
                      console.log(
                        `Notification received in foreground: ${notification.title} : ${notification.body}`
                      );
                      completion({ alert: true, sound: true, badge: true });
                    }
                  );

                  Notifications.events().registerNotificationOpened(
                    (notification, completion) => {
                      console.log(
                        `Notification opened: ${JSON.stringify(
                          notification.payload
                        )}`
                      );

                      Alert.alert(notification.payload.aps.alert.title);
                      completion();
                    }
                  );
                },
              },
              {
                title: '增加标签',
                onPress: async () => {
                  let remain = await PushUtil.addTag(
                    'a' + Math.floor(Math.random() * 100)
                  );
                  console.log('remain', remain);
                },
              },
              {
                title: '删除标签',
                onPress: async () => {},
              },
              {
                title: '获取标签列表',
                onPress: async () => {
                  let list = await PushUtil.getTagList();
                  console.log('data', list);
                },
              },
              {
                title: '增加别名',
                onPress: async () => {
                  let r = await PushUtil.addAlias('test1', 'a2');
                  console.log('r', r);
                },
              },
              {
                title: '增加排他别名',
                onPress: async () => {
                  let r = await PushUtil.addExclusiveAlias('test2', 'aaaa');
                  console.log('r', r);
                },
              },
              {
                title: '删除别名',
                onPress: async () => {
                  let r = await PushUtil.deleteAlias('test1', 'aaaa');
                  console.log('r', r);
                },
              },
            ],
          },
        ]}
        keyExtractor={(item, index) => item.title + index}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{title}</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={item.onPress}>
            <Text style={styles.itemTitle}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {},
  item: {
    height: 40,
    justifyContent: 'center',
    backgroundColor: 'gray',
  },
  itemTitle: {
    color: 'white',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
