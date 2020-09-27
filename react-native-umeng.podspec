require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "react-native-umeng"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.description  = <<-DESC
                  react-native-umeng
                   DESC
  s.homepage     = "https://github.com/damoness/react-native-umeng"
  s.license      = "MIT"
  # s.license    = { :type => "MIT", :file => "FILE_LICENSE" }
  s.authors      = { "damoness" => "qjwdcool@gmail.com" }
  s.platform     = :ios, "10.0"
  s.source       = { :git => "https://github.com/damoness/react-native-umeng.git", :tag => "#{s.version}" }

  s.source_files = "ios/**/*.{h,m,swift}"
  s.requires_arc = true

  s.dependency "React"
  
  #友盟集成
  s.dependency "UMCCommon"
  s.dependency "UMCSecurityPlugins"
  # s.dependency "UMCAnalytics" ## 统计 SDK
  s.dependency "UMCShare/UI" # U-Share SDK UI模块（分享面板，建议添加）
  s.dependency "UMCShare/Social/WeChat" # 集成微信(完整版14.4M)
  s.dependency "UMCShare/Social/QQ" # 集成QQ/QZone/TIM(完整版7.6M)
  s.dependency "UMCPush"

end

