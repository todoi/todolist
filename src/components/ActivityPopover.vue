<template>
  <Popover class="activity-popover" header="活动">
    <ul>
      <li>
        <div class="clock">
          <img src="../assets/images/clock.png">
        </div>
        <div class="message" tabindex="-1">
          Reminder:
          <a href="/#/tasks/3659895188" class="item">
            ddddddddd
          </a>
          <div class="info">
            <span class="event-icon reminder"></span>
            <span class="timestamp">4 months ago </span>
          </div>
        </div>
      </li>
    </ul>
  </Popover>
</template>

<script>
import Popover from './Popover'

export default {
  name: 'ActivityPopover',
  components: { Popover },
  methods: {
  }
}
</script>

<style scoped>
.activity-popover {top: 103px; left: 70px;}
.activity-popover ul { padding: 5px 0; }
.activity-popover ul li { min-height: 40px; padding: 5px; padding-left: 10px; border-bottom: 1px solid rgb(230, 230, 230); margin: 0 0 5px; line-height: 1.4em; display: flex; }

.activity-popover .clock img { width: 40px; height: 40px; border-radius: 50%; }
.activity-popover .message { flex: 1; padding: 0 4px; word-break: break-word; font-size: 13px; }
.activity-popover .message:focus { box-shadow: 0 0 0 1px #328ad6; border-radius: 3px; }
.activity-popover .message a { display: block; font-weight: bold; color: rgb(63, 63, 63); }
.activity-popover .message .timestamp { color: rgb(119, 119, 119); font-size: 0.9em; vertical-align: middle; line-height: 0.9em; }
.activity-popover .message .event-icon { display: inline-block; width: 18px; height: 18px; vertical-align:middle;
  background-image: url("data:image/svg+xml;base64,IDxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMjAgMjAiIHZlcnNpb249IjEuMSI+CiAgPGcgZmlsbD0iI2ViMjkyZCI+CiAgICAgIDxwYXRoIGQ9Ik0zLjI2LDYuNiBDMy4xLDYuMjQgMyw1Ljg4IDMsNS41IEMzLDQuMTIgNC4xMiwzIDUuNSwzIEM2LjA0LDMgNi41NCwzLjE4IDYuOTgsMy41IEM3LjIsMy42NiA3LjUyLDMuNjIgNy42OCwzLjQgQzcuODYsMy4xOCA3LjgsMi44NiA3LjU4LDIuNyBDNi45OCwyLjI0IDYuMjQsMiA1LjUsMiBDMy41OCwyIDIsMy41OCAyLDUuNSBDMiw2LjAyIDIuMTIsNi41NCAyLjM4LDcuMDQgQzIuNDYsNy4yMiAyLjY0LDcuMzIgMi44Miw3LjMyIEMyLjksNy4zMiAyLjk4LDcuMyAzLjA0LDcuMjggQzMuMyw3LjE0IDMuNCw2Ljg0IDMuMjYsNi42IEwzLjI2LDYuNiBaIE0xNC41LDIgQzEzLjc2LDIgMTMuMDQsMi4yNCAxMi40MiwyLjcgQzEyLjIsMi44NiAxMi4xNiwzLjE4IDEyLjMyLDMuNCBDMTIuNDgsMy42MiAxMi44LDMuNjYgMTMuMDIsMy41IEMxMy40NiwzLjE4IDEzLjk4LDMgMTQuNSwzIEMxNS44OCwzIDE3LDQuMTIgMTcsNS41IEMxNyw1Ljg4IDE2LjkyLDYuMjQgMTYuNzQsNi42IEMxNi42Miw2Ljg0IDE2LjcyLDcuMTQgMTYuOTYsNy4yOCBDMTcuMDQsNy4zIDE3LjEsNy4zMiAxNy4xOCw3LjMyIEMxNy4zNiw3LjMyIDE3LjU0LDcuMjIgMTcuNjQsNy4wNCBDMTcuODgsNi41NCAxOCw2LjAyIDE4LDUuNSBDMTgsMy41OCAxNi40NCwyIDE0LjUsMiBMMTQuNSwyIFogTTE3LDExIEMxNyw3LjE0IDEzLjg2LDQgMTAsNCBDNi4xNCw0IDMsNy4xNCAzLDExIEMzLDEzIDMuODQsMTQuODIgNS4yLDE2LjEgTDQuMTQsMTcuMTQgQzMuOTYsMTcuMzQgMy45NiwxNy42NiA0LjE0LDE3Ljg2IEM0LjI0LDE3Ljk2IDQuMzgsMTggNC41LDE4IEM0LjYyLDE4IDQuNzYsMTcuOTYgNC44NiwxNy44NiBMNS45OCwxNi43MiBDNy4xMiwxNy41MiA4LjUsMTggMTAsMTggQzExLjUsMTggMTIuODgsMTcuNTIgMTQuMDIsMTYuNzIgTDE1LjE0LDE3Ljg2IEMxNS4yNCwxNy45NiAxNS4zOCwxOCAxNS41LDE4IEMxNS42MiwxOCAxNS43NiwxNy45NiAxNS44NiwxNy44NiBDMTYuMDQsMTcuNjYgMTYuMDQsMTcuMzQgMTUuODYsMTcuMTQgTDE0LjgsMTYuMSBDMTYuMTYsMTQuODIgMTcsMTMgMTcsMTEgTDE3LDExIFogTTQsMTEgQzQsNy43IDYuNyw1IDEwLDUgQzEzLjMsNSAxNiw3LjcgMTYsMTEgQzE2LDE0LjMgMTMuMywxNyAxMCwxNyBDNi43LDE3IDQsMTQuMyA0LDExIEw0LDExIFogTTEwLjUsNyBDMTAuMjIsNyAxMCw3LjIyIDEwLDcuNSBMMTAsMTEgTDcuNDYsMTEgQzcuMiwxMSA2Ljk2LDExLjIyIDYuOTYsMTEuNSBDNi45NiwxMS43OCA3LjIsMTIgNy40NiwxMiBMMTAuNSwxMiBDMTAuNzgsMTIgMTEsMTEuNzggMTEsMTEuNSBMMTEsNy41IEMxMSw3LjIyIDEwLjc4LDcgMTAuNSw3IEwxMC41LDcgWiIgLz4KICA8L2c+Cjwvc3ZnPg==");}

</style>
