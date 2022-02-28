import * as React from 'react';

import {
  StyleSheet,
  SafeAreaView,
  SectionList,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {
  ShareUtil,
  Configure,
  SharePlatform,
} from '@damoness/react-native-umeng';

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
