require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "damoness-react-native-umeng"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.homepage     = package["homepage"]
  s.license      = package["license"]
  s.authors      = package["author"]

  s.platforms    = { :ios => "10.0" }
  s.source       = { :git => "https://github.com/Damoness/react-native-umeng.git", :tag => "#{s.version}" }

  s.source_files = "ios/**/*.{h,m,mm,swift}"

  s.dependency "React-Core"

    #友盟集成
    s.dependency "UMCCommon"
    s.dependency "UMCSecurityPlugins"
    s.dependency "UMCPush"
    s.dependency "UMCShare/UI" # U-Share SDK UI模块（分享面板，建议添加）
    s.dependency "UMCShare/Social/WeChat" # 集成微信(完整版14.4M)
    s.dependency "UMCShare/Social/QQ" # 集成QQ/QZone/TIM(完整版7.6M)

end
