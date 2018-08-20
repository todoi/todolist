<template>
  <div id="user-popover" class="popover bottom">
    <div class="arrow"></div>
    <div tabindex="0" class="inner">
      <div class="content">
        <ul class="list-menu">
          <li class="last-sync disabled">
            <span class="icon offline"></span>
            <span class="label" title="6 分钟 之前">最后同步： 6 分钟 之前 </span>
          </li>

          <li class="separator"  tabindex="0">
            <a class="sync-now" title="settings_sync_full">立即同步 </a>
          </li>

          <li tabindex="0"> 
            <a title="userbar_account_settings">帐户设置 </a> 
          </li>

          <li tabindex="0"> 
            <a title="userbar_change_background">更换背景 </a> 
          </li>

          <li class="separator"  tabindex="0">
            <a href="/restore"  target="_blank" title="label_trash_link">恢复已删除的清单 </a>
          </li>

          <li tabindex="0">
            <a href="https://chrome.google.com/webstore/detail/add-to-wunderlist/dmnddeddcgdllibmaodanoonljfdmooc?hl=en"  target="_blank" title="label_install_browser_extension">安装浏览器扩展 </a>
          </li>

          <li tabindex="0">
            <a title="rate_label">喜欢奇妙清单? </a>
          </li>

          <li tabindex="0">
            <a title="label_tell_friends">告诉你的好友... </a>
          </li>

          <li class="separator"  tabindex="0">
            <a href="/home"  target="_blank" title="settings_website_wunderlist">奇妙清单网站 </a>
          </li>

          <li class="email disabled" aria-visible="false">tosteelangel@163.com</li>

          <li  tabindex="0">
            <a class="logout"title="button_log_out">登出</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'UserPopover'
  }
</script>

<style scoped>
  * { box-sizing: content-box; }
  .popover {
    position: absolute; background: #fff; min-height: 15px; min-width: 200px; max-width: 304px;
    z-index: 999; color: #262626; box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2); border-radius: 3px;
    overflow: hidden;
  }
  .icon {
    cursor: pointer; vertical-align: middle; display: inline-block;
    /* background-image: url(//static.wunderlist.com/3215693309f272a6c0ecea9edebf3237ccfe39b2/images/sprites/app.png); */
  }

  #user-popover { left: 5px; top: 90px;}
  .inner { padding: 12px; font-size: 13px; width: 200px; border: 1px solid #f9f9f9;}
  #user-popover .list-menu { margin: -12px; }
  #user-popover .list-menu { margin: -12px; }
  #user-popover .list-menu li { margin-bottom: -5px; }
  #user-popover .list-menu li.disabled { 
    padding: 12px; color: #aaa; white-space: nowrap; 
    overflow: hidden; text-overflow: ellipsis; 
  }
  #user-popover .list-menu li.disabled.last-sync { white-space: normal; overflow: visible; }
  .list-menu li.disabled.last-sync .icon.offline { display: none; margin-top: -2px; }
  #user-popover .list-menu li.separator { 
    padding-bottom: 1px; margin-bottom: 1px; border-bottom: 1px solid  rgba(0, 0, 0, 0.05); 
  }
  #user-popover .list-menu li a { text-shadow: 0 1px 0 #fff; display: block; padding: 10px 12px; color: #262626; }
  #user-popover .list-menu li a:last-child { margin: 0; }
  #user-popover .list-menu li a:hover { color: #fff; background: #328ad6; text-shadow: none; }
</style>
