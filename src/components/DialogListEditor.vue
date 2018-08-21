<template>
  <div class="dialog">
    <div class="header">
      <h3>编辑清单</h3>
      <div class="separator">
        <input class="list-title" type="text" placeholder="清单名称" value="工作">
      </div>
    </div>

    <div class="owner">
      <div class="owner-content">
        <div class="owner-avatar">
          <img src="blob:https://www.wunderlist.com/6d3f9e57-e647-42aa-8cc8-f80d6327904a" alt="">
        </div>
        <div class="owner-meta">
          <div class="owner-name">
            <span class="owner-name-label">todoi</span>
            <div class="owner-name-badge">
              <span class="badge">所有者</span>
            </div>
          </div>
          <span class="owner-email">todoi@doodf.com</span>
        </div>
      </div>
    </div>

    <div class="footer">
      <div class="clos">
        <div class="col-40">
          <a title="删除清单" class="delete-list">
            <svg class="trash">
              <use xlink:href="#icon-trash"></use>
            </svg>
          </a>
          <a title="复制清单" class="duplicate-list">
            <svg class="trash">
              <use xlink:href="#icon-duplicate-list"></use>
            </svg>
          </a>
        </div>
        <div class="col-30">
          <button class="btn-cancel">取消</button>
        </div>
        <div class="col-30">
          <button class="finish">完成</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DialogListEditor',
  }
</script>

<style scoped>
.dialog { width: 392px; margin: 0 auto; background: #fafafa; box-shadow: 0 1px 25px rgba(0, 0, 0, 0.2); border-radius: 3px; display: flex; flex-direction: column; overflow: hidden; font-size: 14px;
}

.header { padding: 14px 14px 0; border-bottom: 1px solid #ebebeb; flex-shrink: 0; background: #fff; }
.header > h3 { text-align: center; }
.header .separator { margin: 14px 0; }
.header .list-title { padding: 9px 10px 10px; width: 100%; font-weight: 500; color: #262626; background: #fff; border: none; box-shadow: inset 0 0 0 1px #d6d6d6; border-radius: 3px; transition: all 0.15s ease-in-out;  }
</style>
