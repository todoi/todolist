<template>
  <div class="popover" :id="id">
    <div class="arrow"></div>
    <div class="inner">
      <h3>{{ header }}</h3>
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Popover',
    props: ['header', 'id']
  }
</script>

<style scoped>
  .popover { 
    position: absolute; background: #fff; min-width: 200px; max-width: 304px; min-height: 15px;
    z-index: 999; color: #262626; box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3); border-radius: 3px;
  }
  .popover .arrow { width: 0; height: 0; position: absolute; top: -24px; border: 12px solid transparent; border-bottom-color: rgba(0, 0, 0, 0.5); left: 50%; transform: translateX(-50%); }
  .popover .arrow:before { content: ''; width: 0; height: 0; position: absolute; top: -12px; left: -12px; border: 12px solid transparent; border-bottom-color: #fff;  }

  .popover .inner { min-height: 100px; overflow: hidden; width: 300px; }
  .popover .inner h3 { text-align: center; border-bottom: 1px solid rgba(0, 0, 0, 0.06); font-size: 16px; font-weight: 600; padding: 9px 0 8px; letter-spacing: 2px;}
  .popover .inner ul { max-height: 370px; overflow-y: auto; color: rgb(30, 30, 30); background: rgb(254, 254, 253); }

  #user-popover .arrow {left: 30px;}
  #user-popover .inner { width: 226px; }
  #user-popover .inner h3 { text-align: left; text-indent: 12px; }

</style>
