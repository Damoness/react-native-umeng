# react-native-umeng

## Getting started

`$ npm install react-native-umeng --save`

### Mostly automatic installation

`$ react-native link react-native-umeng`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-umeng` and add `DMNUmeng.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libDMNUmeng.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainApplication.java`
  - Add `import com.damoness.rn.DMNUmengPackage;` to the imports at the top of the file
  - Add `new DMNUmengPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-umeng'
  	project(':react-native-umeng').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-umeng/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-umeng')
  	```


## Usage
```javascript
import {ShareUtil} from 'react-native-umeng';

// TODO: What to do with the module?
ShareUtil;
```
