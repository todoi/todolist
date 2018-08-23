<template>
  <Popover class="conversation-popover" header="对话">
    <div class="empty">
      <svg class="conversation-gray">
        <use xlink:href="#icon-conversation-gray"></use>
      </svg>
      <h1>No Conversations</h1>
      <p>Start a conversation now by commenting on a to-do in a shared list.</p>
    </div>
  </Popover>
</template>

<script>
import Popover from './Popover'

export default {
  name: 'ConversationPopover',
  components: { Popover },
  methods: {
  }
}
</script>

<style scoped>
.conversation-popover {top: 100px; left: 110px;}
.conversation-popover .empty { padding: 15px 0; text-align: center; background: rgb(250, 250, 250); }
.conversation-gray { height: 100px; opacity: 0.42694; }
.conversation-popover h1 { color: rgba(91, 91, 91); font-size: 14px; margin-bottom: 10px; }
.conversation-popover p { color: rgb(163, 163, 163); font-size: 11px; padding: 0 20px; zoom: 0.9;}
</style>
