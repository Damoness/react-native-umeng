import * as React from 'react';

import {
  StyleSheet,
  ScrollView,
  Button,
  Alert,
  SafeAreaView,
  Platform as Platform1,
} from 'react-native';
import { ShareUtil, Configure, Platform } from '@damoness/react-native-umeng';

import appJSON from '../app.json';

let { umeng, wechatWork, wechat } = appJSON;

// let wechat = appJSON['wechat-BieXiaBuyCar'];

if (Platform1.OS === 'ios') {
  Configure.initApp(umeng.appKey, 'RN');
  Configure.setWeChat(wechat.appKey, wechat.appSecret, wechat.universalLink);
  Configure.setWeChatWork(
    wechatWork.appKey,
    wechatWork.corpId,
    wechatWork.agentId
  );
}

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentInsetAdjustmentBehavior="always" centerContent>
        <Button
          title={'微信登录'}
          onPress={async () => {
            try {
              let re = await ShareUtil.auth(Platform.Wechat);
              console.log(re);
              Alert.alert(JSON.stringify(re));
            } catch (error) {
              console.log('error', error);
            }
          }}
        />
        <Button
          title={'企业微信登录'}
          onPress={async () => {
            try {
              let re = await ShareUtil.auth(Platform.WechatWork);
              console.log(re);
              Alert.alert(JSON.stringify(re));
            } catch (error) {
              console.log('error', error);
            }
          }}
        />
        <Button
          title={'微信登录 报错'}
          onPress={async () => {
            try {
              await ShareUtil.auth(Platform.Wechat + 2);
            } catch (error) {
              console.log('error', error);
              Alert.alert(JSON.stringify(error));
            }
          }}
        />

        <Button
          onPress={() => {
            ShareUtil.shareboard(
              '内容',
              'http://t1.qichangv.com/images/logo/favition.png',
              'https://hot.cnbeta.com/articles/game/1097481.htm',
              '标题',
              [Platform.Wechat, Platform.Wechat_TimeLine, Platform.WechatWork]
            );
          }}
          title="分享面板 - 分享"
        />

        <Button
          onPress={() => {
            ShareUtil.shareboard(
              '内容',
              'http://t1.qichangv.com/images/logo/favition.png',
              '',
              '标题',
              [Platform.Wechat, Platform.Wechat_TimeLine, Platform.WechatWork]
            );
          }}
          title="分享面板 - 分享图片"
        />

        <Button
          onPress={() => {
            ShareUtil.shareImageUrl(
              'https://static.cnbetacdn.com/article/2021/0807/ac0ec0fe399be7d.jpg',
              Platform.Wechat
            );
          }}
          title="分享图片"
        />

        <Button
          onPress={() => {
            try {
              ShareUtil.shareText('分享文字', Platform.Wechat_TimeLine);
            } catch (error) {
              console.log(error);
            }
          }}
          title="分享文字"
        />

        <Button
          onPress={async () => {
            try {
              ShareUtil.shareLinkUrl(
                '标题',
                '内容',
                'https://github.com/damoness/react-native-umeng',
                'https://static.cnbetacdn.com/article/2021/0807/ac0ec0fe399be7d.jpg',
                Platform.Wechat + 1
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
          }}
          title="分享链接"
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
