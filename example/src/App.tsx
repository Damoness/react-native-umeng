import * as React from 'react';

import { StyleSheet, View, Button, Alert } from 'react-native';
import { ShareUtil, Platform } from '@damoness/react-native-umeng';

export default function App() {
  return (
    <View style={styles.container}>
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
            [Platform.Wechat, Platform.Wechat_TimeLine]
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
            [Platform.Wechat, Platform.Wechat_TimeLine]
          );
        }}
        title="分享面板 - 分享图片"
      />
    </View>
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
