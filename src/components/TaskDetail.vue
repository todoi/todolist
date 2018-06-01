<template>
  <div id="task-detail" class="animate">
      <div class="topbar">
        <a class="detail-checkbox checkbox" tabindex="0"  @click.stop="emitCheckedEvent">
          <span title="标记为已完成">
            <svg class="detail-check" :class="{hidden: taskItem.isCompleted}"  width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.41421;"> <g> <path d="M17.5,4.5c0,-0.53 -0.211,-1.039 -0.586,-1.414c-0.375,-0.375 -0.884,-0.586 -1.414,-0.586c-3.271,0 -9.729,0 -13,0c-0.53,0 -1.039,0.211 -1.414,0.586c-0.375,0.375 -0.586,0.884 -0.586,1.414c0,3.271 0,9.729 0,13c0,0.53 0.211,1.039 0.586,1.414c0.375,0.375 0.884,0.586 1.414,0.586c3.271,0 9.729,0 13,0c0.53,0 1.039,-0.211 1.414,-0.586c0.375,-0.375 0.586,-0.884 0.586,-1.414c0,-3.271 0,-9.729 0,-13Z" style="fill:none;stroke-width:1px"></path> </g> </svg>
          </span>
          <span title="标记为未完成">
            <svg class="detail-checked" :class="{hidden: !taskItem.isCompleted}"  width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;"> <g> <path d="M8.489,15c-0.132,0 -0.259,-0.052 -0.354,-0.146c-1.485,-1.486 -3.134,-2.808 -4.904,-3.932c-0.232,-0.148 -0.302,-0.457 -0.153,-0.691c0.147,-0.232 0.456,-0.299 0.69,-0.153c1.652,1.049 3.202,2.266 4.618,3.621c3.242,-5.361 6.486,-9.443 10.767,-13.559c0.198,-0.192 0.517,-0.185 0.707,0.013c0.192,0.2 0.186,0.516 -0.014,0.707c-4.356,4.189 -7.625,8.344 -10.927,13.896c-0.079,0.133 -0.215,0.221 -0.368,0.24c-0.021,0.003 -0.041,0.004 -0.062,0.004" style="fill-rule:nonzero;"></path> <path d="M15.5,20l-13,0c-1.379,0 -2.5,-1.121 -2.5,-2.5l0,-13c0,-1.379 1.121,-2.5 2.5,-2.5l11,0c0.276,0 0.5,0.224 0.5,0.5c0,0.276 -0.224,0.5 -0.5,0.5l-11,0c-0.827,0 -1.5,0.673 -1.5,1.5l0,13c0,0.827 0.673,1.5 1.5,1.5l13,0c0.827,0 1.5,-0.673 1.5,-1.5l0,-11c0,-0.276 0.224,-0.5 0.5,-0.5c0.276,0 0.5,0.224 0.5,0.5l0,11c0,1.379 -1.121,2.5 -2.5,2.5" style="fill-rule:nonzero;"></path> </g> </svg>
          </span>
        </a>

        <a class="detail-star" tabindex="0" @click.stop="toggleTaskStarred">
          <span class="star-wrapper" title="标记为星标" :class="{hidden: taskItem.taskStarred}">
            <svg width="100%" height="100%" viewBox="0 0 22 49" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;"> <g> <path d="M11,20.48c-0.18,0 -0.36,0.08 -0.44,0.26l-1.68,5.26l-5.54,0c-0.18,0 -0.36,0.12 -0.42,0.3c-0.06,0.2 0.02,0.4 0.16,0.5l4.46,3.24l-1.68,5.26c-0.08,0.18 0,0.38 0.16,0.5c0.06,0.06 0.16,0.1 0.24,0.1c0.1,0 0.2,-0.04 0.28,-0.1l4.46,-3.24l4.46,3.24c0.08,0.06 0.18,0.08 0.28,0.08c0.08,0 0.18,-0.02 0.24,-0.08c0.16,-0.12 0.24,-0.32 0.16,-0.5l-1.68,-5.26l4.46,-3.24c0.14,-0.1 0.22,-0.3 0.16,-0.5c-0.08,-0.18 -0.24,-0.3 -0.42,-0.3l-5.52,0l-1.7,-5.26c-0.08,-0.18 -0.26,-0.26 -0.44,-0.26ZM11,22.66l1.2,3.64l0.22,0.7l4.54,0l-3.68,2.66l0.22,0.7l1.18,3.64l-3.68,-2.66l-3.68,2.66l1.18,-3.64l0.22,-0.7l-3.68,-2.66l4.56,0l0.22,-0.7l1.18,-3.64Z"> </path></g> </svg>
          </span>
          <span class="starred-wrapper" title="移除星标" :class="{hidden: !taskItem.taskStarred}">
            <svg width="100%" height="100%" viewBox="0 0 22 49" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;"> <g> <path d="M0,0l0,48.48c0,0.28 0.22,0.42 0.48,0.34l10.04,-3.66c0.28,-0.1 0.7,-0.1 0.96,0l10.04,3.66c0.28,0.08 0.48,-0.06 0.48,-0.34l0,-48.48l-22,0ZM14.56,30.06l1.68,5.26c0.08,0.18 0,0.38 -0.16,0.5c-0.14,0.1 -0.36,0.1 -0.52,0l-4.46,-3.24l-4.46,3.24c-0.08,0.06 -0.18,0.08 -0.28,0.08c-0.08,0 -0.18,-0.02 -0.24,-0.08c-0.16,-0.12 -0.24,-0.32 -0.16,-0.5l1.68,-5.26l-4.46,-3.24c-0.14,-0.1 -0.22,-0.32 -0.16,-0.52c0.06,-0.16 0.24,-0.3 0.42,-0.3l5.54,0l1.68,-5.26c0.14,-0.36 0.74,-0.36 0.88,0l1.7,5.26l5.5,0c0.2,0 0.36,0.14 0.44,0.3c0.06,0.2 -0.02,0.42 -0.16,0.52l-4.46,3.24Z"> </path></g> </svg>
          </span>
        </a>

        <div class="title-container">
          <div tabindex="0" class="title">
            <span class="title-text">
              <div class="content-fakable" @click="displayView = false">
                <div class="display-view" :class="{hidden: !displayView}">
                  <span>{{ taskItem.title }}</span>
                </div>
                <div class="edit-view" :class="{hidden: displayView}" @focusout="displayView = true">
                  <div class="expandingArea active">
                    <pre>{{taskItem.title}}</pre>
                    <textarea tabindex="0" v-model="taskItem.title" @keypress.enter.prevent="displayView = true">{{taskItem.title}}</textarea>
                  </div>
                </div>
              </div>
            </span>
          </div>
        </div>
      </div>

      <div class="body">
        <!-- <div class="section section-item detail-assign" tabindex="0">
          <div class="section-icon">
            <svg class="assigned" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g stroke="none" stroke-width="1" fill-rule="evenodd"> <g> <g id="Rectangle-3-+-A" transform="translate(1.000000, 2.000000)"> <path d="M10,10 C12.28,10 14,6.84 14,4 C14,1.8 12.2,0 10,0 C7.8,0 6,1.8 6,4 C6,6.5 7.52,10 10,10 L10,10 Z M4.94,7.74 C4.98,7.66 5,7.58 5,7.5 C5,7.42 4.98,7.34 4.94,7.26 C4.92,7.22 4.9,7.18 4.86,7.14 L2.86,5.14 C2.66,4.96 2.34,4.96 2.14,5.14 C1.96,5.34 1.96,5.66 2.14,5.86 L3.3,7 L0.5,7 C0.22,7 0,7.22 0,7.5 C0,7.78 0.22,8 0.5,8 L3.3,8 L2.14,9.14 C1.96,9.34 1.96,9.66 2.14,9.86 C2.24,9.96 2.38,10 2.5,10 C2.62,10 2.76,9.96 2.86,9.86 L4.86,7.86 C4.9,7.82 4.92,7.78 4.94,7.74 L4.94,7.74 Z M16.76,12.88 C16.56,12 15.9,11.28 15.02,11.04 L12.72,10.36 C12.58,10.32 12.46,10.26 12.36,10.14 C12.16,9.96 11.84,9.96 11.66,10.16 C11.46,10.34 8.54,10.34 8.36,10.14 C8.16,9.96 7.84,9.96 7.64,10.14 C7.54,10.24 7.42,10.32 7.28,10.36 L5.04,10.96 C4.14,11.2 3.46,11.92 3.24,12.82 L3.02,13.9 C2.98,14.06 3.02,14.24 3.14,14.36 C3.22,14.42 4.86,16 10,16 C15.14,16 16.78,14.42 16.86,14.36 C16.98,14.24 17.02,14.06 16.98,13.9 L16.76,12.88 Z" fill-opacity="0.06"></path> <path d="M10,10 C12.28,10 14,6.84 14,4 C14,1.8 12.2,0 10,0 C7.8,0 6,1.8 6,4 C6,6.5 7.52,10 10,10 L10,10 Z M10,1 C11.66,1 13,2.34 13,4 C13,6.26 11.62,9 10,9 C8.34,9 7,6.26 7,4 C7,2.34 8.34,1 10,1 L10,1 Z M4.94,7.74 C4.98,7.66 5,7.58 5,7.5 C5,7.42 4.98,7.34 4.94,7.26 C4.92,7.22 4.9,7.18 4.86,7.14 L2.86,5.14 C2.66,4.96 2.34,4.96 2.14,5.14 C1.96,5.34 1.96,5.66 2.14,5.86 L3.3,7 L0.5,7 C0.22,7 0,7.22 0,7.5 C0,7.78 0.22,8 0.5,8 L3.3,8 L2.14,9.14 C1.96,9.34 1.96,9.66 2.14,9.86 C2.24,9.96 2.38,10 2.5,10 C2.62,10 2.76,9.96 2.86,9.86 L4.86,7.86 C4.9,7.82 4.92,7.78 4.94,7.74 L4.94,7.74 Z M16.76,12.88 C16.56,12 15.9,11.28 15.02,11.04 L12.72,10.36 C12.58,10.32 12.46,10.26 12.36,10.14 C12.16,9.96 11.84,9.96 11.66,10.16 C11.46,10.34 11.46,10.66 11.66,10.86 C11.88,11.08 12.14,11.24 12.44,11.32 L14.74,12 C15.26,12.14 15.66,12.58 15.78,13.1 L15.94,13.8 C15.4,14.16 13.7,15 10,15 C6.3,15 4.6,14.14 4.06,13.8 L4.22,13.04 C4.34,12.5 4.76,12.06 5.3,11.92 L7.54,11.32 C7.84,11.24 8.12,11.08 8.36,10.86 C8.54,10.66 8.54,10.34 8.36,10.14 C8.16,9.96 7.84,9.96 7.64,10.14 C7.54,10.24 7.42,10.32 7.28,10.36 L5.04,10.96 C4.14,11.2 3.46,11.92 3.24,12.82 L3.02,13.9 C2.98,14.06 3.02,14.24 3.14,14.36 C3.22,14.42 4.86,16 10,16 C15.14,16 16.78,14.42 16.86,14.36 C16.98,14.24 17.02,14.06 16.98,13.9 L16.76,12.88 Z"> </path> </g> </g> </g> </svg>
          </div>
          <div class="section-content">
            <div class="section-title">分配给</div>
            <div class="section-edit hidden">
              <input type="text" class="assign chromeless" placeholder="分配给">
            </div>
          </div>
          <a class="section-delete" title="删除" tabindex="0">
            <svg class="delete" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g stroke="none" stroke-width="1" fill-rule="evenodd"> <g id="delete"> <path d="M10.72,9.9975 L13.86,6.8575 C14.04,6.6575 14.04,6.3375 13.86,6.1375 C13.66,5.9575 13.34,5.9575 13.14,6.1375 L10,9.2775 L6.86,6.1375 C6.66,5.9575 6.34,5.9575 6.14,6.1375 C5.96,6.3375 5.96,6.6575 6.14,6.8575 L9.28,9.9975 L6.14,13.1375 C5.96,13.3375 5.96,13.6575 6.14,13.8575 C6.24,13.9575 6.38,13.9975 6.5,13.9975 C6.62,13.9975 6.76,13.9575 6.86,13.8575 L10,10.7175 L13.14,13.8575 C13.24,13.9575 13.38,13.9975 13.5,13.9975 C13.62,13.9975 13.76,13.9575 13.86,13.8575 C14.04,13.6575 14.04,13.3375 13.86,13.1375 L10.72,9.9975 Z" id="4"></path> </g> </g> </svg>
          </a>
        </div> -->

        <div class="section section-item detail-date date" tabindex="0" :class="{'overdue' : taskItem.deadline && (new Date().getTime() > taskItem.deadline)}">
          <div class="section-icon">
            <svg class="date" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g stroke="none" stroke-width="1" fill-rule="evenodd"> <g id="date"> <path d="M2.5,7 C2.22,7 2,6.78 2,6.5 L2,3.5 C2,2.68 2.68,2 3.5,2 L16.5,2 C17.32,2 18,2.68 18,3.5 L18,6.5 C18,6.78 17.78,7 17.5,7 L2.5,7 Z M3,6 L17,6 L17,3.5 C17,3.22 16.78,3 16.5,3 L3.5,3 C3.22,3 3,3.22 3,3.5 L3,6 Z M3.5,18 C2.68,18 2,17.32 2,16.5 L2,8.5 C2,8.22 2.22,8 2.5,8 C2.78,8 3,8.22 3,8.5 L3,16.5 C3,16.78 3.22,17 3.5,17 L16.5,17 C16.78,17 17,16.78 17,16.5 L17,8.5 C17,8.22 17.22,8 17.5,8 C17.78,8 18,8.22 18,8.5 L18,16.5 C18,17.32 17.32,18 16.5,18 L3.5,18 Z M8.5,12 C7.68,12 7,11.32 7,10.5 L7,9.5 C7,8.68 7.68,8 8.5,8 C9.32,8 10,8.68 10,9.5 L10,10.5 C10,11.32 9.32,12 8.5,12 L8.5,12 Z M5.5,11 C5.22,11 5,10.78 5,10.5 L5,9.5 C5,9.22 5.22,9 5.5,9 C5.78,9 6,9.22 6,9.5 L6,10.5 C6,10.78 5.78,11 5.5,11 L5.5,11 Z M8.5,9 C8.22,9 8,9.22 8,9.5 L8,10.5 C8,10.78 8.22,11 8.5,11 C8.78,11 9,10.78 9,10.5 L9,9.5 C9,9.22 8.78,9 8.5,9 L8.5,9 Z M11.5,11 C11.22,11 11,10.78 11,10.5 L11,9.5 C11,9.22 11.22,9 11.5,9 C11.78,9 12,9.22 12,9.5 L12,10.5 C12,10.78 11.78,11 11.5,11 L11.5,11 Z M14.5,11 C14.22,11 14,10.78 14,10.5 L14,9.5 C14,9.22 14.22,9 14.5,9 C14.78,9 15,9.22 15,9.5 L15,10.5 C15,10.78 14.78,11 14.5,11 L14.5,11 Z M5.5,15 C5.22,15 5,14.78 5,14.5 L5,13.5 C5,13.22 5.22,13 5.5,13 C5.78,13 6,13.22 6,13.5 L6,14.5 C6,14.78 5.78,15 5.5,15 L5.5,15 Z M8.5,15 C8.22,15 8,14.78 8,14.5 L8,13.5 C8,13.22 8.22,13 8.5,13 C8.78,13 9,13.22 9,13.5 L9,14.5 C9,14.78 8.78,15 8.5,15 L8.5,15 Z M11.5,15 C11.22,15 11,14.78 11,14.5 L11,13.5 C11,13.22 11.22,13 11.5,13 C11.78,13 12,13.22 12,13.5 L12,14.5 C12,14.78 11.78,15 11.5,15 L11.5,15 Z M14.5,15 C14.22,15 14,14.78 14,14.5 L14,13.5 C14,13.22 14.22,13 14.5,13 C14.78,13 15,13.22 15,13.5 L15,14.5 C15,14.78 14.78,15 14.5,15 L14.5,15 Z"></path> </g> </g> </svg>
          </div>
          <div class="section-content">
            <div class="section-title">
                {{ taskItem.deadline ? formatDate(taskItem.deadline) : '设置到期日'}}
            </div>
            <div class="section-description"></div>
          </div>
          <a class="section-delete" title="删除" tabindex="0">
            <svg class="delete" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g stroke="none" stroke-width="1" fill-rule="evenodd"> <g id="delete"> <path d="M10.72,9.9975 L13.86,6.8575 C14.04,6.6575 14.04,6.3375 13.86,6.1375 C13.66,5.9575 13.34,5.9575 13.14,6.1375 L10,9.2775 L6.86,6.1375 C6.66,5.9575 6.34,5.9575 6.14,6.1375 C5.96,6.3375 5.96,6.6575 6.14,6.8575 L9.28,9.9975 L6.14,13.1375 C5.96,13.3375 5.96,13.6575 6.14,13.8575 C6.24,13.9575 6.38,13.9975 6.5,13.9975 C6.62,13.9975 6.76,13.9575 6.86,13.8575 L10,10.7175 L13.14,13.8575 C13.24,13.9575 13.38,13.9975 13.5,13.9975 C13.62,13.9975 13.76,13.9575 13.86,13.8575 C14.04,13.6575 14.04,13.3375 13.86,13.1375 L10.72,9.9975 Z" id="4"></path> </g> </g> </svg>
          </a>
        </div>

        <!-- <div class="section section-item detail-reminder date overdue" tabindex="0">
          <div class="section-icon">
            <svg class="reminder" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g stroke="none" stroke-width="1" fill-rule="evenodd"> <g id="reminder"> <path d="M3.26,6.6 C3.1,6.24 3,5.88 3,5.5 C3,4.12 4.12,3 5.5,3 C6.04,3 6.54,3.18 6.98,3.5 C7.2,3.66 7.52,3.62 7.68,3.4 C7.86,3.18 7.8,2.86 7.58,2.7 C6.98,2.24 6.24,2 5.5,2 C3.58,2 2,3.58 2,5.5 C2,6.02 2.12,6.54 2.38,7.04 C2.46,7.22 2.64,7.32 2.82,7.32 C2.9,7.32 2.98,7.3 3.04,7.28 C3.3,7.14 3.4,6.84 3.26,6.6 L3.26,6.6 Z M14.5,2 C13.76,2 13.04,2.24 12.42,2.7 C12.2,2.86 12.16,3.18 12.32,3.4 C12.48,3.62 12.8,3.66 13.02,3.5 C13.46,3.18 13.98,3 14.5,3 C15.88,3 17,4.12 17,5.5 C17,5.88 16.92,6.24 16.74,6.6 C16.62,6.84 16.72,7.14 16.96,7.28 C17.04,7.3 17.1,7.32 17.18,7.32 C17.36,7.32 17.54,7.22 17.64,7.04 C17.88,6.54 18,6.02 18,5.5 C18,3.58 16.44,2 14.5,2 L14.5,2 Z M17,11 C17,7.14 13.86,4 10,4 C6.14,4 3,7.14 3,11 C3,13 3.84,14.82 5.2,16.1 L4.14,17.14 C3.96,17.34 3.96,17.66 4.14,17.86 C4.24,17.96 4.38,18 4.5,18 C4.62,18 4.76,17.96 4.86,17.86 L5.98,16.72 C7.12,17.52 8.5,18 10,18 C11.5,18 12.88,17.52 14.02,16.72 L15.14,17.86 C15.24,17.96 15.38,18 15.5,18 C15.62,18 15.76,17.96 15.86,17.86 C16.04,17.66 16.04,17.34 15.86,17.14 L14.8,16.1 C16.16,14.82 17,13 17,11 L17,11 Z M4,11 C4,7.7 6.7,5 10,5 C13.3,5 16,7.7 16,11 C16,14.3 13.3,17 10,17 C6.7,17 4,14.3 4,11 L4,11 Z M10.5,7 C10.22,7 10,7.22 10,7.5 L10,11 L7.46,11 C7.2,11 6.96,11.22 6.96,11.5 C6.96,11.78 7.2,12 7.46,12 L10.5,12 C10.78,12 11,11.78 11,11.5 L11,7.5 C11,7.22 10.78,7 10.5,7 L10.5,7 Z" id="…"></path> </g> </g> </svg>
          </div>
          <div class="section-content">
            <div class="section-title repeat">提醒我</div>
            <div class="section-description repeat">今天</div>
          </div>
          <a class="section-delete" title="删除" tabindex="0">
            <svg class="delete" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g stroke="none" stroke-width="1" fill-rule="evenodd"> <g id="delete"> <path d="M10.72,9.9975 L13.86,6.8575 C14.04,6.6575 14.04,6.3375 13.86,6.1375 C13.66,5.9575 13.34,5.9575 13.14,6.1375 L10,9.2775 L6.86,6.1375 C6.66,5.9575 6.34,5.9575 6.14,6.1375 C5.96,6.3375 5.96,6.6575 6.14,6.8575 L9.28,9.9975 L6.14,13.1375 C5.96,13.3375 5.96,13.6575 6.14,13.8575 C6.24,13.9575 6.38,13.9975 6.5,13.9975 C6.62,13.9975 6.76,13.9575 6.86,13.8575 L10,10.7175 L13.14,13.8575 C13.24,13.9575 13.38,13.9975 13.5,13.9975 C13.62,13.9975 13.76,13.9575 13.86,13.8575 C14.04,13.6575 14.04,13.3375 13.86,13.1375 L10.72,9.9975 Z" id="4"></path> </g> </g> </svg>
          </a>
        </div> -->

        <div class="section subtasks hasSubtasks" tabindex="0">
          <ul>
            <!-- done -->
            <li tabindex="0" class="section-item subtask done" draggable="true">
              <div class="section-icon">
                <!-- checked -->
                <a class="subtask-checkbox check-box checked">
                  <svg class="task-check" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.41421;"> <g> <path d="M17.5,4.5c0,-0.53 -0.211,-1.039 -0.586,-1.414c-0.375,-0.375 -0.884,-0.586 -1.414,-0.586c-2.871,0 -8.129,0 -11,0c-0.53,0 -1.039,0.211 -1.414,0.586c-0.375,0.375 -0.586,0.884 -0.586,1.414c0,2.871 0,8.129 0,11c0,0.53 0.211,1.039 0.586,1.414c0.375,0.375 0.884,0.586 1.414,0.586c2.871,0 8.129,0 11,0c0.53,0 1.039,-0.211 1.414,-0.586c0.375,-0.375 0.586,-0.884 0.586,-1.414c0,-2.871 0,-8.129 0,-11Z" style="fill:none;stroke-width:1px"></path> </g> </svg>
                  <svg class="task-checked" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;"> <g> <path d="M9.5,14c-0.132,0 -0.259,-0.052 -0.354,-0.146c-1.485,-1.486 -3.134,-2.808 -4.904,-3.932c-0.232,-0.148 -0.302,-0.457 -0.153,-0.691c0.147,-0.231 0.456,-0.299 0.69,-0.153c1.652,1.049 3.202,2.266 4.618,3.621c2.964,-4.9 5.989,-8.792 9.749,-12.553c0.196,-0.195 0.512,-0.195 0.708,0c0.195,0.196 0.195,0.512 0,0.708c-3.838,3.837 -6.899,7.817 -9.924,12.902c-0.079,0.133 -0.215,0.221 -0.368,0.24c-0.021,0.003 -0.041,0.004 -0.062,0.004"></path> <path d="M15.5,18l-11,0c-1.379,0 -2.5,-1.121 -2.5,-2.5l0,-11c0,-1.379 1.121,-2.5 2.5,-2.5l10,0c0.276,0 0.5,0.224 0.5,0.5c0,0.276 -0.224,0.5 -0.5,0.5l-10,0c-0.827,0 -1.5,0.673 -1.5,1.5l0,11c0,0.827 0.673,1.5 1.5,1.5l11,0c0.827,0 1.5,-0.673 1.5,-1.5l0,-9.5c0,-0.276 0.224,-0.5 0.5,-0.5c0.276,0 0.5,0.224 0.5,0.5l0,9.5c0,1.379 -1.121,2.5 -2.5,2.5"></path> </g> </svg>
                </a>
              </div>
              <div class="section-content top">
                <div class="section-title selectable">
                  <div class="content-fakable">
                    <div class="display-view">份额份额</div>
                    <div class="edit-view hidden">
                      <div class="expandingArea active">
                        <pre>份额份额</pre>
                        <textarea tabindex="0">份额份额</textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <a class="section-delete"><svg class="delete" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g stroke="none" stroke-width="1" fill-rule="evenodd"> <g id="delete"> <path d="M10.72,9.9975 L13.86,6.8575 C14.04,6.6575 14.04,6.3375 13.86,6.1375 C13.66,5.9575 13.34,5.9575 13.14,6.1375 L10,9.2775 L6.86,6.1375 C6.66,5.9575 6.34,5.9575 6.14,6.1375 C5.96,6.3375 5.96,6.6575 6.14,6.8575 L9.28,9.9975 L6.14,13.1375 C5.96,13.3375 5.96,13.6575 6.14,13.8575 C6.24,13.9575 6.38,13.9975 6.5,13.9975 C6.62,13.9975 6.76,13.9575 6.86,13.8575 L10,10.7175 L13.14,13.8575 C13.24,13.9575 13.38,13.9975 13.5,13.9975 C13.62,13.9975 13.76,13.9575 13.86,13.8575 C14.04,13.6575 14.04,13.3375 13.86,13.1375 L10.72,9.9975 Z" id="4"></path> </g> </g> </svg></a>
            </li>
          </ul>
          <div class="section-item subtask-add">
            <div class="section-icon">
              <svg class="plus-small" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve"> <g> <path d="M10,10l0,6.5c-0.003,0.053 -0.008,0.103 -0.024,0.155c-0.038,0.116 -0.12,0.217 -0.226,0.278c-0.047,0.027 -0.094,0.042 -0.146,0.056c-0.052,0.008 -0.051,0.008 -0.104,0.011c-0.053,-0.003 -0.103,-0.008 -0.155,-0.024c-0.15,-0.05 -0.271,-0.171 -0.321,-0.321c-0.016,-0.052 -0.021,-0.102 -0.024,-0.155l0,-6.5l-6.5,0c-0.046,-0.002 -0.058,-0.001 -0.104,-0.011c-0.103,-0.022 -0.197,-0.076 -0.268,-0.154c-0.169,-0.188 -0.169,-0.482 0,-0.67c0.035,-0.038 0.077,-0.072 0.122,-0.098c0.078,-0.045 0.161,-0.062 0.25,-0.067l6.5,0l0,-6.5c0.005,-0.089 0.022,-0.172 0.067,-0.25c0.126,-0.219 0.406,-0.31 0.636,-0.207c0.048,0.022 0.093,0.05 0.132,0.085c0.078,0.071 0.132,0.165 0.154,0.268c0.01,0.046 0.009,0.058 0.011,0.104l0,6.5l6.5,0c0.046,0.002 0.058,0.001 0.104,0.011c0.103,0.022 0.197,0.076 0.268,0.154c0.169,0.188 0.169,0.482 0,0.67c-0.035,0.038 -0.077,0.072 -0.122,0.098c-0.078,0.045 -0.161,0.062 -0.25,0.067l-6.5,0Z"></path> </g> </svg>
            </div>
            <div class="section-content top">
              <div class="section-title">添加子任务</div>
              <div class="section-edit hidden">
                <div class="expandingArea active">
                  <pre>1</pre>
                  <textarea tabindex="0" placeholder="添加子任务">添加子任务</textarea>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="section section-item note hasNote" tabindex="0">
          <div class="section-icon">
            <svg class="options rtl-flip" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g stroke="none" stroke-width="1" fill-rule="evenodd"> <g id="options"> <path d="M17.1330617,2.8594383 C15.9930617,1.7194383 14.0130617,1.7194383 12.8930617,2.8594383 L5.5130617,10.2394383 C5.3330617,10.4394383 5.3330617,10.7594383 5.5130617,10.9594383 C5.7130617,11.1394383 6.0330617,11.1394383 6.2330617,10.9594383 L13.5930617,3.5594383 C14.3530617,2.7994383 15.6730617,2.7994383 16.4130617,3.5594383 C17.1730617,4.3194383 17.1930617,5.5594383 16.4130617,6.3394383 L9.0330617,13.7594383 C8.7130617,14.0794383 8.9330617,14.6194383 9.3730617,14.6194383 C9.5130617,14.6194383 9.6330617,14.5594383 9.7330617,14.4594383 L17.1330617,7.0394383 C18.2930617,5.8794383 18.2930617,4.0194383 17.1330617,2.8594383 L17.1330617,2.8594383 Z M8.4930617,15.3594383 C8.0330617,13.4594383 6.5130617,11.9394383 4.6130617,11.4794383 C4.3530617,11.4194383 4.0930617,11.5794383 4.0130617,11.8194383 L2.0330617,17.3194383 C1.8730617,17.7194383 2.2730617,18.1194383 2.6730617,17.9594383 C8.6730617,15.7794383 8.2530617,15.9594383 8.3730617,15.8194383 C8.4930617,15.6994383 8.5330617,15.5194383 8.4930617,15.3594383 L8.4930617,15.3594383 Z M3.3330617,16.6594383 L4.8130617,12.5794383 C6.0130617,12.9994383 6.9730617,13.9794383 7.3930617,15.1794383 L3.3330617,16.6594383 Z" id="N"></path> </g> </g> </svg>
          </div>
          <div class="section-content top">
            <div class="section-title note-add">添加备注...</div>
            <div class="note-body selectable hidden">
              <div class="content-fakable">
                <div class="display-view"></div>
                <div class="edit-view">
                  <div class="expandingArea active">
                    <pre>0</pre>
                    <textarea tabindex="0" placeholder="添加备注..."></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="section-attachments" title="删除" tabindex="0">
            <a class="open-fullscreen-note" title="全屏打开笔记" tabindex="0">
              <svg class="fullscreen" width="20px" height="20px" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve"> <g> <path d="M12.5,10c-0.276,0-0.5,0.224-0.5,0.5v3c0,0.275-0.225,0.5-0.5,0.5h-6C5.224,14,5,13.775,5,13.5v-6 C5,7.224,5.224,7,5.5,7h3C8.776,7,9,6.776,9,6.5S8.776,6,8.5,6h-3C4.673,6,4,6.673,4,7.5v6C4,14.327,4.673,15,5.5,15h6 c0.827,0,1.5-0.673,1.5-1.5v-3C13,10.224,12.776,10,12.5,10z"></path> <path d="M14.962,4.309c-0.051-0.122-0.148-0.22-0.271-0.271C14.63,4.013,14.565,4,14.5,4h-4 C10.224,4,10,4.224,10,4.5S10.224,5,10.5,5h2.793l-5.146,5.146c-0.195,0.195-0.195,0.512,0,0.707C8.244,10.951,8.372,11,8.5,11 s0.256-0.049,0.354-0.146L14,5.707V8.5C14,8.776,14.224,9,14.5,9S15,8.776,15,8.5v-4C15,4.435,14.987,4.37,14.962,4.309z"></path> </g> </svg>
            </a>
          </div>
        </div>

        <div class="section section-files" tabindex="0">
          <div class="audio-recorder hidden">
            <div class="audio-recorder-container">
              <audio></audio>
              <a class="start-recording-audio" tabindex="0" title="开始/暂停录音"><span class="icon-file record-audio"></span></a>
              <a class="play-recorded-audio disabled" tabindex="0" title="播放"><span class="icon-file play-audio"></span></a>
              <span class="duration">00:00</span>
              <a class="clear-recorded-audio" tabindex="0" title="清除录音"><span class="icon-file clear-audio"></span></a>
              <a class="upload-recorded-audio disabled" tabindex="0" title="上传录音"><span class="icon-file upload-audio"></span></a>
            </div>
          </div>
          <div class="section-item files-add">
            <div class="section-icon add-file" tabindex="0">
              <svg class="clip" width="20" height="20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve"> <g> <path id="XMLID_2_" d="M7,17c-1.335,0-2.591-0.521-3.536-1.465S2,13.336,2,12c0-1.335,0.52-2.591,1.464-3.536l5.312-5.312 c0.195-0.195,0.512-0.195,0.707,0s0.195,0.512,0,0.707L4.171,9.171C3.416,9.927,3,10.932,3,12s0.416,2.073,1.171,2.828 c1.511,1.512,4.146,1.512,5.657,0l6.441-6.441c0.473-0.472,0.732-1.1,0.732-1.768c0-0.668-0.26-1.296-0.732-1.768 c-0.945-0.945-2.592-0.943-3.535,0l-6.441,6.441c-0.39,0.39-0.39,1.024,0,1.414c0.378,0.377,1.036,0.377,1.414,0l4.562-4.562 c0.195-0.195,0.512-0.195,0.707,0s0.195,0.512,0,0.707l-4.562,4.562c-0.755,0.756-2.073,0.756-2.828,0 c-0.78-0.779-0.78-2.049,0-2.828l6.441-6.441c1.32-1.321,3.627-1.323,4.949,0c0.661,0.661,1.025,1.54,1.025,2.475 s-0.364,1.814-1.025,2.475l-6.441,6.441C9.591,16.479,8.335,17,7,17z"></path> </g> </svg>
            </div>
            <div class="section-content">
              <div class="section-title files-add-label">
                <span>添加一个文件</span>
                <input type="file" mutiple style="display:none;">
              </div>
            </div>
            <div class="section-attachments">
              <span class="add-sound" tabindex="0" title="添加录音">
                <svg class="speech" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g stroke="none" stroke-width="1" fill-rule="evenodd"> <g id="speech"> <path d="M10,13 C11.92,13 13.5,11.42 13.5,9.5 L13.5,5.5 C13.5,3.58 11.92,2 10,2 C8.08,2 6.5,3.58 6.5,5.5 L6.5,9.5 C6.5,11.42 8.08,13 10,13 L10,13 Z M7.5,5.5 C7.5,4.12 8.62,3 10,3 C11.38,3 12.5,4.12 12.5,5.5 L12.5,9.5 C12.5,10.88 11.38,12 10,12 C8.62,12 7.5,10.88 7.5,9.5 L7.5,5.5 Z M15.5,8.5 C15.5,8.22 15.28,8 15,8 C14.72,8 14.5,8.22 14.5,8.5 L14.5,9.5 C14.5,11.98 12.48,14 10,14 C7.52,14 5.5,11.98 5.5,9.5 L5.5,8.5 C5.5,8.22 5.28,8 5,8 C4.72,8 4.5,8.22 4.5,8.5 L4.5,9.5 C4.5,12.36 6.7,14.72 9.5,14.98 L9.5,17 L6,17 C5.72,17 5.5,17.22 5.5,17.5 C5.5,17.78 5.72,18 6,18 L14,18 C14.28,18 14.5,17.78 14.5,17.5 C14.5,17.22 14.28,17 14,17 L10.5,17 L10.5,14.98 C13.3,14.72 15.5,12.36 15.5,9.5 L15.5,8.5 Z" id="O"></path> </g> </g> </svg>
              </span>
            </div>
          </div>
          <ul class="files-list"></ul>
        </div>

        <div class="comments-main has-comments">
          <div class="state loading spinner">
            <span class="dark"></span>
            <div class="error hidden">很抱歉，我们无法载入评论，请重试。</div>
          </div>
          <ul class="comments-list">
            <li tabindex="0" class="section-item section-item-comment active-user">
              <div class="section-icon picture">
                <div class="avatar medium" title="totoi">
                  <img src="http://via.placeholder.com/50x50">
                </div>
              </div>
              <div class="section-content">
                <span class="comment-author">todoi</span>
                <span class="comment-time">36 分钟 之前</span>
                <div class="comment-text">fejfieoj</div>
              </div>
              <a class="section-delete" title="删除">
                <svg class="delete" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g stroke="none" stroke-width="1" fill-rule="evenodd"> <g id="delete"> <path d="M10.72,9.9975 L13.86,6.8575 C14.04,6.6575 14.04,6.3375 13.86,6.1375 C13.66,5.9575 13.34,5.9575 13.14,6.1375 L10,9.2775 L6.86,6.1375 C6.66,5.9575 6.34,5.9575 6.14,6.1375 C5.96,6.3375 5.96,6.6575 6.14,6.8575 L9.28,9.9975 L6.14,13.1375 C5.96,13.3375 5.96,13.6575 6.14,13.8575 C6.24,13.9575 6.38,13.9975 6.5,13.9975 C6.62,13.9975 6.76,13.9575 6.86,13.8575 L10,10.7175 L13.14,13.8575 C13.24,13.9575 13.38,13.9975 13.5,13.9975 C13.62,13.9975 13.76,13.9575 13.86,13.8575 C14.04,13.6575 14.04,13.3375 13.86,13.1375 L10.72,9.9975 Z" id="4"></path> </g> </g> </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="dropTarget"></div>
      <div class="bottom">
        <a class="detail-close" tabindex="0" title="隐藏详细视图">
          <svg class="close-right" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g stroke="none" stroke-width="1" fill-rule="evenodd"> <g id="close-right"> <path d="M4.5,18 C3.12,18 2,16.88 2,15.5 L2,4.5 C2,3.12 3.12,2 4.5,2 L15.5,2 C16.88,2 18,3.12 18,4.5 L18,15.5 C18,16.88 16.88,18 15.5,18 L4.5,18 Z M4.5,3 C3.68,3 3,3.68 3,4.5 L3,15.5 C3,16.32 3.68,17 4.5,17 L15.5,17 C16.32,17 17,16.32 17,15.5 L17,4.5 C17,3.68 16.32,3 15.5,3 L4.5,3 Z M7.5,15 C7.38,15 7.24,14.96 7.14,14.86 C6.96,14.66 6.96,14.34 7.14,14.14 L11.3,10 L7.14,5.86 C6.96,5.66 6.96,5.34 7.14,5.14 C7.34,4.96 7.66,4.96 7.86,5.14 L12.36,9.64 C12.54,9.84 12.54,10.16 12.36,10.36 L7.86,14.86 C7.76,14.96 7.62,15 7.5,15 L7.5,15 Z" id="i"></path> </g> </g> </svg>
        </a>
        <a class="detail-trash" tabindex="0" title="删除任务">
          <svg class="trash" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g stroke="none" stroke-width="1" fill-rule="evenodd"> <g id="trash"> <path d="M12,3.5 C12,2.4 11.1,1.5 10,1.5 C8.9,1.5 8,2.4 8,3.5 L5.5,3.5 C4.68,3.5 4,4.18 4,5 L4,7 C4,7.28 4.22,7.5 4.5,7.5 L15.5,7.5 C15.78,7.5 16,7.28 16,7 L16,5 C16,4.18 15.32,3.5 14.5,3.5 L12,3.5 Z M10,2.5 C10.56,2.5 11,2.94 11,3.5 L9,3.5 C9,2.94 9.44,2.5 10,2.5 L10,2.5 Z M15,6.5 L5,6.5 L5,5 C5,4.72 5.22,4.5 5.5,4.5 L14.5,4.5 C14.78,4.5 15,4.72 15,5 L15,6.5 Z M14.5,8.5 C14.22,8.5 14,8.72 14,9 L14,16 C14,16.28 13.78,16.5 13.5,16.5 L6.5,16.5 C6.22,16.5 6,16.28 6,16 L6,9 C6,8.72 5.78,8.5 5.5,8.5 C5.22,8.5 5,8.72 5,9 L5,16 C5,16.82 5.68,17.5 6.5,17.5 L13.5,17.5 C14.32,17.5 15,16.82 15,16 L15,9 C15,8.72 14.78,8.5 14.5,8.5 L14.5,8.5 Z M9,9 C9,8.72 8.78,8.5 8.5,8.5 C8.22,8.5 8,8.72 8,9 L8,15 C8,15.28 8.22,15.5 8.5,15.5 C8.78,15.5 9,15.28 9,15 L9,9 Z M12,9 C12,8.72 11.78,8.5 11.5,8.5 C11.22,8.5 11,8.72 11,9 L11,15 C11,15.28 11.22,15.5 11.5,15.5 C11.78,15.5 12,15.28 12,15 L12,9 Z" id="j"></path> </g> </g> </svg>
        </a>
        <div class="comments">
          <div class="comments-bottom">
            <div class="last-comment hidden">
              <span class="unread-count"></span>
            </div>
            <div class="comments-add">
              <div class="input-fake">
                <div class="expandingArea active">
                  <pre>0</pre>
                  <textarea tabindex="0" placeholder="添加评论..."></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="detail-info">
          <span title="周四, 3月 15">创建于 周四, 3月 15</span>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'TaskDetail',
  props: ['username', 'taskItem'],
  data() {
    return {
      displayView: true,
    }
  },
  methods: {
    toggleTaskStarred(){
      this.taskItem.taskStarred = !this.taskItem.taskStarred
    },
    emitCheckedEvent(){
      // this.taskItem.isCompleted = !this.taskItem.isCompleted
      this.$emit('toggleDetailCheckbox', this.taskItem)
    },
    formatDate(timeStamp){
    // 传入一个时间戳 返回一个 '2018-05-20' 的时间格式
      return new Date(timeStamp).toLocaleString().split(' ')[0].replace(/(\d+)\/(\d+)\/(\d+)/g, function(str,$1, $2, $3){
        return $1 + '-' + (Number($2) < 10 ? '0'+$2 : $2) + '-' + (Number($3) < 10 ? '0'+$3 : $3)
      }) 
    },
  }
}

</script>
<style scoped>
#task-detail{display: flex; flex-direction: column; height: 100vh; width: 367px; position: relative; overflow: hidden; background: #fff;}
#task-detail.animate{transition: 100ms width ease;}
textarea{outline: none; background: transparent; font-weight: 500; line-height: 20px;}
textarea::-webkit-input-placeholder{font-weight: 500; line-height: 20px;}

.topbar{min-height: 55px; position: relative;}
.detail-checkbox{position: absolute; left: 18px; top: 18px; z-index: 3;}
.checkbox .detail-check{stroke: rgba(0, 0, 0, 0.35);}
.checkbox .detail-checked{fill: rgba(0, 0, 0, 0.35);}
.detail-star{position: absolute; top: 0; right: 0; z-index: 2;}
.star-wrapper{position: absolute; fill: rgba(0, 0, 0, 0.3); right: 15px; top: -4px; z-index: 1; width: 22px; height: 49px;}
.starred-wrapper{position: absolute; fill: #d74e48; right: 15px; top: -4px; z-index: 1; width: 22px; height: 49px;}
.title-container{position: relative; z-index: 1;}
.title{min-height: 24px; padding: 16px 50px 13px; font-size: 16px; text-align: left; line-height: 24px; font-weight: 600; border-bottom: 1px solid #ebebeb; outline: none; overflow: hidden;}
.content-fakable .display-view{white-space: pre-wrap; word-wrap: break-word; overflow: hidden; margin-top: 1px;}
.content-fakable .display-view span{white-space: pre-wrap; user-select: text;}
.expandingArea{position: relative;}
.expandingArea pre{line-height: 24px; min-height: 24px; font-size: 16px; font-weight: bold; tab-size: 1; margin-top: 1px; padding: 0; border: none;
 visibility: hidden; display: block; white-space: pre-wrap; word-wrap: break-word; word-break: break-all;}
.expandingArea textarea{line-height: 24px; font-size: 16px; 
  overflow: hidden; position: absolute; top: -1px; left: 0; width: 100%; height: 100%;
  font-weight: bold; tab-size: 1; resize: none; color: #262626; margin-top: 1px; padding: 0; 
  border: none; display: block; white-space: pre-wrap; word-wrap: break-word; word-break: break-all; font-family: 'Avenir', Helvetica, Arial, sans-serif;}

.body{flex: 1; padding-bottom: 16px; transition: margin 150ms; background: #fafafa; overflow-x: hidden; overflow-y: auto;}
.section{outline: none; position: relative; padding: 8px 0; text-align: left;}
.section-item{position: relative; outline: none; padding-left: 10px; padding-right: 10px; display: flex; align-items: center;}
.section:before{content: ''; position: absolute; bottom: 0; left: 50px; right: 0; border-bottom: 1px solid #ebebebeb;}
.section-item .section-icon, .section-item .section-attachments{align-self: flex-start; flex-shrink: 0; height: 32px; min-width: 32px; fill:#a3a3a2;}
.section-item .section-icon svg{margin: 6px;}
.section-item .section-content{flex: auto; margin: 0 8px; overflow: hidden;}
.section-item .section-title{font-size: 16px; line-height: 20px; color: #9fa2a6; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.section-item .section-edit .assign{font-size: 16px;}
.section-item .section-delete{visibility: hidden; align-self: flex-start; flex-shrink: 0; height: 32px; min-width: 32px; fill: #a3a3a2; margin-left: auto;}
.section-item:hover .section-delete{visibility: visible;}
.section-item .section-delete svg{margin: 6px; fill: #737372;}
.section-item.date .section-title{color: #328ad6;}
.section-item.date.overdue .section-title{color: #b3312d;}
.section-item.date.overdue .reminder, .section-item.date.overdue .date{fill: #b3312d;}
.section-item.date .reminder, .section-item.date .date{fill: #328ad6;}
.section-item .section-description{font-size: 12px;}

.subtasks a{color: #328ad6;}
.subtasks .section-icon .task-check{stroke: #67ae2b;}
.subtasks .check-box .task-checked{fill: rgba(0, 0, 0, 0.35); display: none;}
.subtasks .check-box.checked .task-check{display: none;}
.subtasks .check-box.checked .task-checked{display: block;}
.section-item .section-content.top{align-self: flex-start; padding: 6px 0;}
.subtask .section-title{color: #262626;}
.subtask.done .display-view{text-decoration: line-through; color: #aaa;}
.subtasks pre{line-height: 20px;}
.subtasks.hasSubtasks .plus-small{fill: #67ae2b;}

.note.hasNote .section-icon svg{fill: #e29600;}
.note .note-body{height:auto; border: none; font-size: 16px; line-height: 20px; word-wrap: break-word;}
.note .note-body .expandingArea pre{min-height: 100px;}
.note .note-body .expandingArea textarea{min-height: 100px;}
.section-attachments{text-align: center;}
.section-attachments svg{margin: 6px;}
.section-attachments span{display: inline-block; width: 32px; height: 32px;}

.audio-recorder-container{border-radius: 3px; border: 1px solid #c9c9c9; margin:11px 0 10px;  background: #fff; text-align: center;}
.audio-recorder-container a, .audio-recorder-container .duration{vertical-align: middle;}
.audio-recorder-container span{display: inline-block;}
.icon-file{background-image: url('../assets/images/files.png');}
.icon-file.record-audio{width: 18px; height: 18px; background-position: -129px -162px;}
.audio-recorder-container a{display: inline-block; width: 48px; padding: 10px 0; margin: 0 2px; font-size: 0; font-weight: bold; text-align: center;}
.audio-recorder-container .start-recording-audio{color: #f00;}
.audio-recorder-container .play-recorded-audio{color: #008000;}
.icon-file.play-audio{width: 18px; height: 18px; background-position: -75px -162px;}
a.disabled .play-audio{width: 18px; height: 18px; background-position: -111px -162px;}
.audio-recorder-container .duration{width: 84px; font-size: 16px; font-weight: bold; color: #737372;}
.audio-recorder-container .icon-file.clear-audio{width: 19px; height: 19px; background-position: 0 -162px;}
.cion-file.upload-audio{width: 19px; height: 19px; background-position: -19px -162px;}
a.disabled .upload-audio{width: 19px; height: 19px; background-position: -162px -137px;}

.comments-main{position: relative;}
.comments-main .spinner{height: 0; transition: all 250ms ease; position: relative;}
.comments-main .dark{opacity: 0.6; margin-top: 10px; position: absolute; left: 50%; top: 0; margin-left: -10px; width: 19px; height: 19px; background: url('../assets/images/loading_black.png'); animation: rotate .8s linear infinite;}
.comments-mian li{line-height: 16px;}
.section-item.section-item-comment{padding-top: 16px;}
.avatar.medium{width: 32px; height: 32px;}
.avatar img{width: 100%; height: 100%; border-radius: 50%; display: block;}
.comments-main li .section-content{text-align: left; font-size: 14px;}
.comments-main li .comment-author{font-weight: bold; max-width: 100px; display: inline-block; vertical-align: top; height: 16px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;}
.comments-main li .comment-time{color: #737272; vertical-align: top;}
.comments-main li .comment-text{line-height: 18px; word-wrap: break-word; white-space: pre-wrap;}

.bottom{position: relative;}
.bottom .detail-close, .bottom .detail-trash{position: absolute; bottom: 8px; opacity: 0.6}
.bottom .detail-close{left: 8px;}
.bottom .detail-trash{right: 6px;}
.comments-bottom{border-top: 1px solid #ebebeb; background: #fff;}
.last-comment{position: absolute; z-index: 1; left: 0; right: 0; top: -44px; border-top: 1px solid #ebebeb;}
.comments-bottom .unread-count{position: absolute; display: none; right: 15px; top: 10px; color: #fff; font-size: 12px; line-height: 12px; border-radius: 20px; padding: 2px; padding-bottom: 3px; text-align: center; min-width: 11px; background: #d74e48;}
.comments-add{padding: 10px; padding-bottom: 0;}
.input-fake{width: 100%; min-height: 32px; padding: 7px; transition: all 150ms ease-in-out; box-shadow: inset 0 0 0 1px #d6d6d6; border-radius: 3px; color: #262626;}
.input-fake textarea{top: 2px;}
.detail-info{font-size: 12px; text-align: center; padding: 14px 35px; color: #a3a3a2;}
.detail-info span{display: inline-block; max-width: 100%; height: 15px; }
</style>
