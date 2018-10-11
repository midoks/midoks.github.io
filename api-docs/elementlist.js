var ApiGen = ApiGen || {};
ApiGen.elements = [
    ["c", "ErrorCode"],
    ["c", "PKCS7Encoder"],
    ["c", "Prpcrypt"],
    ["c", "SHA1"],
    ["c", "Weixin_BaseCore"],
    ["c", "WeiXin_SDK"],
    ["c", "Weixin_Template"],
    ["f", "wx_admin_log()"],
    ["f", "wx_is_xml()"],
    ["f", "wx_notice_msg()"],
    ["f", "wx_parse_xml()"],
    ["f", "wx_random_big_pic()"],
    ["f", "wx_random_small_pic()"],
    ["f", "wx_request_array()"],
    ["f", "wx_request_decode()"],
    ["f", "wx_request_is_encode()"],
    ["f", "wx_request_xml()"],
    ["f", "wx_send_encode()"],
    ["c", "WXBizMsgCrypt"],
    ["c", "WxRobot_Admin"],
    ["c", "WxRobot_Admin_Menu_Extends"],
    ["c", "WxRobot_Admin_Menu_Instro"],
    ["c", "WxRobot_Admin_Menu_Menu"],
    ["c", "WxRobot_Admin_Menu_Records"],
    ["c", "WxRobot_Admin_Menu_Reply"],
    ["c", "WxRobot_Admin_Menu_Setting"],
    ["c", "WxRobot_Admin_Menu_Statistics"],
    ["c", "WxRobot_Cmd"],
    ["c", "WxRobot_Cmd_Event"],
    ["c", "WxRobot_Cmd_Event_User"],
    ["c", "WxRobot_Cmd_Text"],
    ["c", "WxRobot_Extends"],
    ["c", "WxRobot_Install"],
    ["c", "WxRobot_Robot"],
    ["c", "WxRobot_SDK"],
    ["c", "WxRobot_Table_Extends"],
    ["c", "WxRobot_Table_Menu"],
    ["c", "WxRobot_Table_Records"],
    ["c", "WxRobot_Table_Reply"],
    ["c", "WxRobot_Uninstall"],
    ["c", "WxRobot_Wp"],
    ["c", "XMLParse"]
];

function isLocal() {
    var local_url = "http://127.0.0.1:4000/";
    if (location.href.substr(0, local_url.length) == local_url) {
        return true;
    }
    return false;
}

if (!isLocal()) {
    var targetProtocol = "https:";
    if (window.location.protocol != targetProtocol) {
        window.location.href = targetProtocol +
            window.location.href.substring(window.location.protocol.length);
    }
}

var _hmt = _hmt || [];
(function() {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?c66706e0fc1b6293a62f8eba588390ec";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
})();

var google = document.createElement("script");
google.src = "//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
var s = document.getElementsByTagName("script")[0];
s.parentNode.insertBefore(google, s);
(adsbygoogle = window.adsbygoogle || []).push({
  google_ad_client: "ca-pub-7736695762519033",
  enable_page_level_ads: true
});