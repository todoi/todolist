<template>
  <div id="tasks">

    <div class="tasks-main">
      <div class="list-toolbar">
        <h1 class="title">工作</h1>
        <div class="action-bar expanded" @mouseleave="hideActionBar">
          <div class="action-bar-top" :style="`height: ${actionBarTopHeight}`">
            <ul class="action-bar-top-sort" :class="actionBarTopActive === 'sort' && 'active'">
              <!-- 排序列表 -->
              <li tabindex="0" v-for="item in actionBarTopSort" :class="item.sortFn === 'sortByDeadline' ? deadlineSortClass : item.liClassName" @click="sortFn(item.sortFn)">
                <a :class="item.aClassName">

                  <svg :class="item.svgClassName" v-html="item.svgHTML" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                  </svg>

                  <span>{{ item.text }}</span>
                </a>
              </li>
            </ul>

            <ul class="action-bar-top-more" :class="actionBarTopActive === 'more' && 'active'">
              <!-- 更多列表 -->
              <li tabindex="0" v-for="item in actionBarTopMore" :class="item.liClassName">
                <a :class="item.aClassName">

                  <svg :class="item.svgClassName" v-html="item.svgHTML" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                  </svg>

                  <span v-if="typeof item.text === 'string'">{{ item.text }}</span>
                  <template v-if="typeof item.text === 'object'">
                    <span v-for="text in item.text" :class="[text.className.commonClassName, text.className.turnOn]">{{ text.content }}</span>
                  </template>
                </a>
              </li>
              <li tabindex="0">
                <a class="action-bar-top-paste-item">
                  <svg width="20px" height="20px">
                    <use xlink:href="#icon-paste"></use>
                  </svg>
                  <span>粘贴 <i class="token_0">0</i> 个任务</span>
                </a>
              </li>
            </ul>
          </div>

          <div class="action-bar-bottom">
            <a class="tab share first-tab" @click="showActionBarTop('share')" :class="{active: actionBarBottomActive.share}">
              <svg class="share rtl-flip" width="20px" height="20px">
                <use xlink:href="#icon-share"></use>
              </svg>
              <span class="tab-text">共享</span>
            </a>
            <a class="tab sort-az" @click="showActionBarTop('sort')" :class="{active: actionBarBottomActive.sort,}">
              <svg class="sort-az" width="20px" height="20px">
                <use xlink:href="#icon-sort-az"></use>
              </svg>
              <span class="tab-text">排序</span>
            </a>

            <!-- 更多这个功能被砍掉了 -->
            <a class="tab last-tab" @click="showActionBarTop('more')" :class="{active: actionBarBottomActive.more}">
              <svg class="folder-option" width="20px" height="20px">
                <use xlink:href="#icon-folder-option"></use>
              </svg>
              <span class="tab-text">更多</span>
            </a>
          </div>

        </div>
      </div>

      <div class="tasks-scroll">
        <div class="addTask" :class="{focus: addTaskData.focusAddTask}" @focusin="focusAddTaskData" @focusout="blurAddTaskData" tabindex="1" >
          <!-- invisible transparent -->
          <div class="addTask-meta" :class="{'invisible transparent': hiddenAllAddTaskMeta}">
            <a class="addTask-meta-star float-right" title="星标任务" :class="{hidden: addTaskData.hiddenAddTaskMeta.star, starred: addTaskData.starred}" @click="toggleNewTaskStarred">
              <svg class="starred" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g id="Web-svgs" stroke="none" stroke-width="1" fill-rule="evenodd"> <g id="starred"> <g id="Rectangle-3-+-A" transform="translate(1.000000, 0.000000)"> <path d="M3.74,18 C3.64,18 3.54,17.96 3.46,17.9 C3.28,17.76 3.2,17.54 3.28,17.34 L5.16,11.5 L0.2,7.9 C0.04,7.78 -0.04,7.56 0.02,7.34 C0.1,7.14 0.28,7 0.5,7 L6.64,7 L8.52,1.16 C8.66,0.76 9.34,0.76 9.48,1.16 L11.38,7 L17.5,7 C17.72,7 17.9,7.14 17.98,7.34 C18.04,7.56 17.96,7.78 17.8,7.9 L12.84,11.5 L14.72,17.34 C14.8,17.54 14.72,17.76 14.54,17.9 C14.38,18.02 14.14,18.02 13.96,17.9 L9,14.3 L4.04,17.9 C3.96,17.96 3.84,18 3.74,18 L3.74,18 Z M9,13.18 C9.1,13.18 9.2,13.2 9.3,13.28 L13.3,16.18 L11.78,11.46 C11.7,11.26 11.78,11.04 11.96,10.92 L15.96,8 L11,8 C10.8,8 10.6,7.86 10.54,7.66 L9,2.94 L7.46,7.66 C7.4,7.86 7.22,8 7,8 L2.04,8 L6.04,10.92 C6.22,11.04 6.3,11.26 6.22,11.46 L4.7,16.18 L8.7,13.28 C8.8,13.2 8.9,13.18 9,13.18 L9,13.18 Z" id="C"></path> <path d="M3.74,18 C3.64,18 3.54,17.96 3.46,17.9 C3.28,17.76 3.2,17.54 3.28,17.34 L5.16,11.5 L0.2,7.9 C0.04,7.78 -0.04,7.56 0.02,7.34 C0.1,7.14 0.28,7 0.5,7 L6.64,7 L8.52,1.16 C8.66,0.76 9.34,0.76 9.48,1.16 L11.38,7 L17.5,7 C17.72,7 17.9,7.14 17.98,7.34 C18.04,7.56 17.96,7.78 17.8,7.9 L12.84,11.5 L14.72,17.34 C14.8,17.54 14.72,17.76 14.54,17.9 C14.38,18.02 14.14,18.02 13.96,17.9 L9,14.3 L4.04,17.9 C3.96,17.96 3.84,18 3.74,18 L3.74,18 Z" id="D" opacity="0.06"> </path> </g> </g> </g> </svg>
            </a>
            <a class="addTask-meta-assign float-right" :class="{hidden: addTaskData.hiddenAddTaskMeta.assign}" title="分配给">
              <svg class="assigned" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g stroke="none" stroke-width="1" fill-rule="evenodd"> <g> <g id="Rectangle-3-+-A" transform="translate(1.000000, 2.000000)"> <path d="M10,10 C12.28,10 14,6.84 14,4 C14,1.8 12.2,0 10,0 C7.8,0 6,1.8 6,4 C6,6.5 7.52,10 10,10 L10,10 Z M4.94,7.74 C4.98,7.66 5,7.58 5,7.5 C5,7.42 4.98,7.34 4.94,7.26 C4.92,7.22 4.9,7.18 4.86,7.14 L2.86,5.14 C2.66,4.96 2.34,4.96 2.14,5.14 C1.96,5.34 1.96,5.66 2.14,5.86 L3.3,7 L0.5,7 C0.22,7 0,7.22 0,7.5 C0,7.78 0.22,8 0.5,8 L3.3,8 L2.14,9.14 C1.96,9.34 1.96,9.66 2.14,9.86 C2.24,9.96 2.38,10 2.5,10 C2.62,10 2.76,9.96 2.86,9.86 L4.86,7.86 C4.9,7.82 4.92,7.78 4.94,7.74 L4.94,7.74 Z M16.76,12.88 C16.56,12 15.9,11.28 15.02,11.04 L12.72,10.36 C12.58,10.32 12.46,10.26 12.36,10.14 C12.16,9.96 11.84,9.96 11.66,10.16 C11.46,10.34 8.54,10.34 8.36,10.14 C8.16,9.96 7.84,9.96 7.64,10.14 C7.54,10.24 7.42,10.32 7.28,10.36 L5.04,10.96 C4.14,11.2 3.46,11.92 3.24,12.82 L3.02,13.9 C2.98,14.06 3.02,14.24 3.14,14.36 C3.22,14.42 4.86,16 10,16 C15.14,16 16.78,14.42 16.86,14.36 C16.98,14.24 17.02,14.06 16.98,13.9 L16.76,12.88 Z" fill-opacity="0.06"></path> <path d="M10,10 C12.28,10 14,6.84 14,4 C14,1.8 12.2,0 10,0 C7.8,0 6,1.8 6,4 C6,6.5 7.52,10 10,10 L10,10 Z M10,1 C11.66,1 13,2.34 13,4 C13,6.26 11.62,9 10,9 C8.34,9 7,6.26 7,4 C7,2.34 8.34,1 10,1 L10,1 Z M4.94,7.74 C4.98,7.66 5,7.58 5,7.5 C5,7.42 4.98,7.34 4.94,7.26 C4.92,7.22 4.9,7.18 4.86,7.14 L2.86,5.14 C2.66,4.96 2.34,4.96 2.14,5.14 C1.96,5.34 1.96,5.66 2.14,5.86 L3.3,7 L0.5,7 C0.22,7 0,7.22 0,7.5 C0,7.78 0.22,8 0.5,8 L3.3,8 L2.14,9.14 C1.96,9.34 1.96,9.66 2.14,9.86 C2.24,9.96 2.38,10 2.5,10 C2.62,10 2.76,9.96 2.86,9.86 L4.86,7.86 C4.9,7.82 4.92,7.78 4.94,7.74 L4.94,7.74 Z M16.76,12.88 C16.56,12 15.9,11.28 15.02,11.04 L12.72,10.36 C12.58,10.32 12.46,10.26 12.36,10.14 C12.16,9.96 11.84,9.96 11.66,10.16 C11.46,10.34 11.46,10.66 11.66,10.86 C11.88,11.08 12.14,11.24 12.44,11.32 L14.74,12 C15.26,12.14 15.66,12.58 15.78,13.1 L15.94,13.8 C15.4,14.16 13.7,15 10,15 C6.3,15 4.6,14.14 4.06,13.8 L4.22,13.04 C4.34,12.5 4.76,12.06 5.3,11.92 L7.54,11.32 C7.84,11.24 8.12,11.08 8.36,10.86 C8.54,10.66 8.54,10.34 8.36,10.14 C8.16,9.96 7.84,9.96 7.64,10.14 C7.54,10.24 7.42,10.32 7.28,10.36 L5.04,10.96 C4.14,11.2 3.46,11.92 3.24,12.82 L3.02,13.9 C2.98,14.06 3.02,14.24 3.14,14.36 C3.22,14.42 4.86,16 10,16 C15.14,16 16.78,14.42 16.86,14.36 C16.98,14.24 17.02,14.06 16.98,13.9 L16.76,12.88 Z"> </path> </g> </g> </g> </svg>
              <span class="icon input-assign-frame"></span>
              <span class="icon input-assign-delete"></span>
            </a>
            <a class="addTask-meta-date float-right dated" :class="{hidden: addTaskData.hiddenAddTaskMeta.date}" title="设置到期日">
              <span class="addTask-meta-date-label">{{ datePickerDate }}</span>
              <!-- 
                :input-class 输入框的类名，被我隐藏了
                :wrapper-class 最外面的div 的类名
                :calendar-class 日历的类名
                :calendar-button-icon 日历小按钮的类名 被我覆盖在 svg.today 上
                :calendar-button-icon-content="''"  日历小按钮的内容 设置为空
                :calendar-button="true"  
                :clear-button="true" 出现清空按钮
                :highlighted="datePickerState.highlighted 让日期高亮
              -->
              <date-picker 
                v-model="datePickerState.date" 
                :input-class="'date-picker-input'" 
                :wrapper-class="'date-picker-wrapper'"
                :calendar-class="'date-picker-calendar'" 
                :calendar-button-icon="'date-picker-icon'" 
                :calendar-button-icon-content="''" 
                :calendar-button="true" 
                :clear-button="true"
                :highlighted="datePickerState.highlighted"></date-picker>
              <!-- <span class="icon input-assign-delete">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" t="1527738984570" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" p-id="7043" width="200" height="200"><path d="M512 451.6608L403.3536 343.0144a42.606933 42.606933 0 0 0-60.305067 0.034133 42.666667 42.666667 0 0 0-0.034133 60.305067L451.6608 512 343.0144 620.6464a42.606933 42.606933 0 0 0 0.034133 60.305067 42.666667 42.666667 0 0 0 60.305067 0.034133L512 572.3392l108.6464 108.6464a42.606933 42.606933 0 0 0 60.305067-0.034133 42.666667 42.666667 0 0 0 0.034133-60.305067L572.3392 512l108.6464-108.6464a42.606933 42.606933 0 0 0-0.034133-60.305067 42.666667 42.666667 0 0 0-60.305067-0.034133L512 451.6608zM512 1024C229.666133 1024 0 794.333867 0 512S229.666133 0 512 0s512 229.666133 512 512-229.666133 512-512 512z m0-938.666667c-235.264 0-426.666667 191.402667-426.666667 426.666667s191.402667 426.666667 426.666667 426.666667 426.666667-191.402667 426.666667-426.666667-191.402667-426.666667-426.666667-426.666667z" fill="#ffffff" p-id="7044"/></svg>
              </span> -->
              <svg class="today" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g stroke="none" stroke-width="1" fill-rule="evenodd"> <g id="today"> <path d="M2.5,7 C2.22,7 2,6.78 2,6.5 L2,3.5 C2,2.68 2.68,2 3.5,2 L16.5,2 C17.32,2 18,2.68 18,3.5 L18,6.5 C18,6.78 17.78,7 17.5,7 L2.5,7 Z M3,6 L17,6 L17,3.5 C17,3.22 16.78,3 16.5,3 L3.5,3 C3.22,3 3,3.22 3,3.5 L3,6 Z M3.5,18 C2.68,18 2,17.32 2,16.5 L2,8.5 C2,8.22 2.22,8 2.5,8 C2.78,8 3,8.22 3,8.5 L3,16.5 C3,16.78 3.22,17 3.5,17 L16.5,17 C16.78,17 17,16.78 17,16.5 L17,8.5 C17,8.22 17.22,8 17.5,8 C17.78,8 18,8.22 18,8.5 L18,16.5 C18,17.32 17.32,18 16.5,18 L3.5,18 Z" id="E"></path> </g> </g> </svg>
            </a>
          </div>
          <a class="plus-wrapper" :class="{hidden: addTaskData.focusAddTask}">
            <svg class="plus-small" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve"> <g> <path d="M10,10l0,6.5c-0.003,0.053 -0.008,0.103 -0.024,0.155c-0.038,0.116 -0.12,0.217 -0.226,0.278c-0.047,0.027 -0.094,0.042 -0.146,0.056c-0.052,0.008 -0.051,0.008 -0.104,0.011c-0.053,-0.003 -0.103,-0.008 -0.155,-0.024c-0.15,-0.05 -0.271,-0.171 -0.321,-0.321c-0.016,-0.052 -0.021,-0.102 -0.024,-0.155l0,-6.5l-6.5,0c-0.046,-0.002 -0.058,-0.001 -0.104,-0.011c-0.103,-0.022 -0.197,-0.076 -0.268,-0.154c-0.169,-0.188 -0.169,-0.482 0,-0.67c0.035,-0.038 0.077,-0.072 0.122,-0.098c0.078,-0.045 0.161,-0.062 0.25,-0.067l6.5,0l0,-6.5c0.005,-0.089 0.022,-0.172 0.067,-0.25c0.126,-0.219 0.406,-0.31 0.636,-0.207c0.048,0.022 0.093,0.05 0.132,0.085c0.078,0.071 0.132,0.165 0.154,0.268c0.01,0.046 0.009,0.058 0.011,0.104l0,6.5l6.5,0c0.046,0.002 0.058,0.001 0.104,0.011c0.103,0.022 0.197,0.076 0.268,0.154c0.169,0.188 0.169,0.482 0,0.67c-0.035,0.038 -0.077,0.072 -0.122,0.098c-0.078,0.045 -0.161,0.062 -0.25,0.067l-6.5,0Z"></path> </g> </svg>
          </a>
          <input type="text" class="addTask-input chromeless" placeholder="添加任务..." @keypress.enter="addTask" v-model="newTask.title">
          <a class="speech-wrapper" :class="{hidden: !addTaskData.focusAddTask}">
            <svg class="speech" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g stroke="none" stroke-width="1" fill-rule="evenodd"> <g id="speech"> <path d="M10,13 C11.92,13 13.5,11.42 13.5,9.5 L13.5,5.5 C13.5,3.58 11.92,2 10,2 C8.08,2 6.5,3.58 6.5,5.5 L6.5,9.5 C6.5,11.42 8.08,13 10,13 L10,13 Z M7.5,5.5 C7.5,4.12 8.62,3 10,3 C11.38,3 12.5,4.12 12.5,5.5 L12.5,9.5 C12.5,10.88 11.38,12 10,12 C8.62,12 7.5,10.88 7.5,9.5 L7.5,5.5 Z M15.5,8.5 C15.5,8.22 15.28,8 15,8 C14.72,8 14.5,8.22 14.5,8.5 L14.5,9.5 C14.5,11.98 12.48,14 10,14 C7.52,14 5.5,11.98 5.5,9.5 L5.5,8.5 C5.5,8.22 5.28,8 5,8 C4.72,8 4.5,8.22 4.5,8.5 L4.5,9.5 C4.5,12.36 6.7,14.72 9.5,14.98 L9.5,17 L6,17 C5.72,17 5.5,17.22 5.5,17.5 C5.5,17.78 5.72,18 6,18 L14,18 C14.28,18 14.5,17.78 14.5,17.5 C14.5,17.22 14.28,17 14,17 L10.5,17 L10.5,14.98 C13.3,14.72 15.5,12.36 15.5,9.5 L15.5,8.5 Z" id="O"></path> </g> </g> </svg>
          </a>
        </div>

        <div class="task-list starred">
          <h2 class="heading normal">
            <a class="group-header" href="/#/lists/inbox">inbox</a>
          </h2>
          <ol class="tasks">
            <li tabindex="0" class="taskItem" draggable="true" v-for="(item, index) in taskItems" :class="{selected: item.selected}" @click="selectTaskItem($event, index)" @dblclick="editTask(item)">
              <div class="taskItem-body">
                <a class="taskItem-checkboxWrapper checkbox" tabindex="-1" @click.stop="toggleTaskCheck(item)">
                  <span title="标记为已完成">
                    <svg class="task-check" :class="{hidden: item.isCompleted}" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.41421;"> <g> <path d="M17.5,4.5c0,-0.53 -0.211,-1.039 -0.586,-1.414c-0.375,-0.375 -0.884,-0.586 -1.414,-0.586c-2.871,0 -8.129,0 -11,0c-0.53,0 -1.039,0.211 -1.414,0.586c-0.375,0.375 -0.586,0.884 -0.586,1.414c0,2.871 0,8.129 0,11c0,0.53 0.211,1.039 0.586,1.414c0.375,0.375 0.884,0.586 1.414,0.586c2.871,0 8.129,0 11,0c0.53,0 1.039,-0.211 1.414,-0.586c0.375,-0.375 0.586,-0.884 0.586,-1.414c0,-2.871 0,-8.129 0,-11Z" style="fill:none;stroke-width:1px"></path> </g> </svg>
                  </span>  
                  <span title="标记为未完成">
                    <svg class="task-checked" :class="{hidden: !item.isCompleted}" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;"> <g> <path d="M9.5,14c-0.132,0 -0.259,-0.052 -0.354,-0.146c-1.485,-1.486 -3.134,-2.808 -4.904,-3.932c-0.232,-0.148 -0.302,-0.457 -0.153,-0.691c0.147,-0.231 0.456,-0.299 0.69,-0.153c1.652,1.049 3.202,2.266 4.618,3.621c2.964,-4.9 5.989,-8.792 9.749,-12.553c0.196,-0.195 0.512,-0.195 0.708,0c0.195,0.196 0.195,0.512 0,0.708c-3.838,3.837 -6.899,7.817 -9.924,12.902c-0.079,0.133 -0.215,0.221 -0.368,0.24c-0.021,0.003 -0.041,0.004 -0.062,0.004"></path> <path d="M15.5,18l-11,0c-1.379,0 -2.5,-1.121 -2.5,-2.5l0,-11c0,-1.379 1.121,-2.5 2.5,-2.5l10,0c0.276,0 0.5,0.224 0.5,0.5c0,0.276 -0.224,0.5 -0.5,0.5l-10,0c-0.827,0 -1.5,0.673 -1.5,1.5l0,11c0,0.827 0.673,1.5 1.5,1.5l11,0c0.827,0 1.5,-0.673 1.5,-1.5l0,-9.5c0,-0.276 0.224,-0.5 0.5,-0.5c0.276,0 0.5,0.224 0.5,0.5l0,9.5c0,1.379 -1.121,2.5 -2.5,2.5"></path> </g> </svg>
                  </span>
                </a>
                <div class="taskItem-titleWrapper" tabindex="-1">
                  <span class="taskItem-titleWrapper-title">{{ item.title }}</span>
                </div>
                <span class="conversations-wrapper" :class="{hidden: !item.comments.length}" title="此任务已有评论" tabindex="-1">
                  <svg class="conversations-small rtl-flip" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g class="outlined"> <path d="M6.26,15 C5.98,15 5.68,14.96 5.38,14.9 C5.18,14.84 5.04,14.68 5,14.48 C4.98,14.26 5.08,14.06 5.26,13.96 C5.78,13.68 6.02,13.3 6,12.8 C6,12.48 5.84,12.16 5.64,11.76 C5.36,11.18 5,10.48 5,9.5 C5,7.02 7.24,5 10,5 C12.76,5 15,7.02 15,9.5 C15,11.98 12.76,14 10,14 C9.58,14 9.16,13.96 8.76,13.86 C8.38,14.28 7.56,15 6.26,15 L6.26,15 Z M10,6 C7.8,6 6,7.56 6,9.5 C6,10.24 6.28,10.78 6.54,11.32 C6.78,11.8 7,12.26 7,12.78 C7,13.22 6.9,13.62 6.7,13.96 C7.64,13.78 8.12,13.06 8.14,13.02 C8.26,12.84 8.5,12.76 8.7,12.82 C9.14,12.94 9.56,13 10,13 C12.2,13 14,11.42 14,9.5 C14,7.56 12.2,6 10,6 L10,6 Z"></path> </g> <g class="filled"> <path d="M6.26,15 C5.98,15 5.68,14.96 5.38,14.9 C5.18,14.84 5.04,14.68 5,14.48 C4.98,14.28 5.08,14.08 5.26,13.98 C5.78,13.68 6.02,13.32 6,12.8 C6,12.5 5.84,12.16 5.64,11.78 C5.36,11.2 5,10.48 5,9.5 C5,7.02 7.24,5 10,5 C12.76,5 15,7.02 15,9.5 C15,11.98 12.76,14 10,14 C9.58,14 9.16,13.96 8.76,13.88 C8.38,14.28 7.56,15 6.26,15 L6.26,15 Z" opacity="0"></path> </g> </svg>
                </span>
                <span class="attachment-wrapper" :class="{hidden: !item.fileList.length}" title="此任务带有附件" tabindex="-1">
                  <svg class="attachment" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g stroke="none" stroke-width="1" fill-rule="evenodd"> <g id="attachment"> <path d="M13.4075,5.2925 C13.0275,4.9125 12.3675,4.9125 11.9875,5.2925 L10.3075,6.9925 L8.7475,6.9925 C7.8075,6.9925 6.9475,7.3525 6.2675,8.0125 L5.1475,9.1325 C5.0675,9.2325 5.0075,9.3525 5.0075,9.4925 C5.0075,9.6125 5.0675,9.7525 5.1475,9.8325 L7.3075,11.9925 L5.1475,14.1325 C4.9675,14.3325 4.9675,14.6525 5.1475,14.8525 C5.2475,14.9525 5.3875,14.9925 5.5075,14.9925 C5.6475,14.9925 5.7675,14.9525 5.8675,14.8525 L8.0075,12.6925 L10.1675,14.8525 C10.2475,14.9525 10.3875,14.9925 10.5075,14.9925 C10.6475,14.9925 10.7675,14.9525 10.8675,14.8525 L11.9875,13.7325 C12.6475,13.0725 13.0075,12.1925 13.0075,11.2525 L13.0075,9.6925 L14.7075,8.0125 C15.0875,7.6125 15.0875,6.9725 14.7075,6.5925 L13.4075,5.2925 Z M13.9875,7.2925 L12.1675,9.1325 C12.0675,9.2325 12.0075,9.3525 12.0075,9.4925 L12.0075,11.2525 C12.0075,11.9125 11.7475,12.5525 11.2875,13.0125 L10.5075,13.7925 L6.2075,9.4925 L6.9875,8.7125 C7.4475,8.2525 8.0875,7.9925 8.7475,7.9925 L10.5075,7.9925 C10.6475,7.9925 10.7675,7.9325 10.8675,7.8325 L12.7075,6.0125 L13.9875,7.2925 Z" id="Q"></path> </g> </g> </svg>
                </span>
                <!-- 过期为红色，没过期为蓝色，没有倒计时就隐藏元素 -->
                <!-- 时间格式为2018/5/3 -->
                <span class="taskItem-deadline" tabindex="-1" aria-hidden="true" 
                  :class="item.deadline ? (new Date().getTime() > item.deadline && 'overdue')  : 'hidden' ">
                    {{formatDate(item.deadline)}}
                </span>
                <!-- 暂时没有实现 -->
                <span class="recurrence-wrapper hidden" title="Recurring to-do" tabindex="-1">
                  <svg class="recurrence" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g stroke="none" stroke-width="1" fill-rule="evenodd"> <g id="recurrence"> <path d="M17.5193115,10 C17.2393115,10 16.9993115,10.2 16.9793115,10.46 C16.7393115,14.12 13.6793115,17 10.0193115,17 C6.15931146,17 3.01931146,13.86 3.01931146,10 C3.01931146,6.14 6.15931146,3 10.0193115,3 C13.3393115,3 15.2593115,5.48 16.3993115,6.98 C16.4193115,6.98 16.4193115,7 16.4193115,7 L12.9793115,7 C12.7193115,7 12.4793115,7.22 12.4793115,7.5 C12.4793115,7.78 12.7193115,8 12.9793115,8 C17.8393115,8 17.5593115,8.02 17.6793115,7.96 C17.8593115,7.88 17.9793115,7.7 17.9793115,7.5 L17.9793115,2.5 C17.9793115,2.22 17.7593115,2 17.4793115,2 C17.2193115,2 16.9793115,2.22 16.9793115,2.5 L16.9793115,6.08 C15.7793115,4.52 13.6193115,2 10.0193115,2 C5.59931146,2 2.01931146,5.58 2.01931146,10 C2.01931146,14.42 5.59931146,18 10.0193115,18 C14.1993115,18 17.6993115,14.72 17.9793115,10.54 C17.9993115,10.26 17.7993115,10.02 17.5193115,10 L17.5193115,10 Z M9.47931146,5 C9.21931146,5 8.97931146,5.22 8.97931146,5.5 L8.97931146,10.5 C8.97931146,10.78 9.21931146,11 9.47931146,11 L13.4793115,11 C13.7593115,11 13.9793115,10.78 13.9793115,10.5 C13.9793115,10.22 13.7593115,10 13.4793115,10 L9.97931146,10 L9.97931146,5.5 C9.97931146,5.22 9.75931146,5 9.47931146,5 L9.47931146,5 Z" id="f"></path> </g> </g> </svg>
                </span>
                <a class="taskItem-star" tabindex="-1" @click.stop="toggleTaskStarred(index)">
                  <span class="star-wrapper" :class="{hidden: item.taskStarred}" title="标记为星标">
                    <svg width="18px" height="18px" viewBox="0 0 18 18" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve"> <g> <path d="M3.74,18 C3.64,18 3.54,17.96 3.46,17.9 C3.28,17.76 3.2,17.54 3.28,17.34 L5.16,11.5 L0.2,7.9 C0.04,7.78 -0.04,7.56 0.02,7.34 C0.1,7.14 0.28,7 0.5,7 L6.64,7 L8.52,1.16 C8.66,0.76 9.34,0.76 9.48,1.16 L11.38,7 L17.5,7 C17.72,7 17.9,7.14 17.98,7.34 C18.04,7.56 17.96,7.78 17.8,7.9 L12.84,11.5 L14.72,17.34 C14.8,17.54 14.72,17.76 14.54,17.9 C14.38,18.02 14.14,18.02 13.96,17.9 L9,14.3 L4.04,17.9 C3.96,17.96 3.84,18 3.74,18 L3.74,18 Z M9,13.18 C9.1,13.18 9.2,13.2 9.3,13.28 L13.3,16.18 L11.78,11.46 C11.7,11.26 11.78,11.04 11.96,10.92 L15.96,8 L11,8 C10.8,8 10.6,7.86 10.54,7.66 L9,2.94 L7.46,7.66 C7.4,7.86 7.22,8 7,8 L2.04,8 L6.04,10.92 C6.22,11.04 6.3,11.26 6.22,11.46 L4.7,16.18 L8.7,13.28 C8.8,13.2 8.9,13.18 9,13.18 L9,13.18 Z"></path> </g> </svg>
                  </span>
                  <span class="starred-wrapper" :class="{hidden: !item.taskStarred}" title="移除星标">
                    <svg width="22px" height="44px" viewBox="0 0 22 44" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;"> <g> <path d="M0,0l0,40.5c0,0.28 0.22,0.42 0.48,0.32l10.04,-3.64c0.28,-0.1 0.7,-0.1 0.96,0l10.04,3.64c0.28,0.1 0.48,-0.04 0.48,-0.32l0,-40.5l-22,0ZM14.46,24.08l1.68,5.26c0.08,0.18 0,0.38 -0.16,0.5c-0.14,0.1 -0.36,0.1 -0.52,0l-4.46,-3.24l-4.46,3.24c-0.08,0.06 -0.18,0.1 -0.28,0.1c-0.08,0 -0.18,-0.04 -0.24,-0.1c-0.16,-0.12 -0.24,-0.32 -0.16,-0.5l1.68,-5.26l-4.46,-3.24c-0.14,-0.12 -0.22,-0.32 -0.16,-0.52c0.08,-0.18 0.24,-0.32 0.44,-0.32l5.52,0l1.68,-5.24c0.14,-0.36 0.74,-0.36 0.88,0l1.7,5.24l5.5,0c0.2,0 0.36,0.14 0.44,0.32c0.06,0.2 -0.02,0.4 -0.16,0.52l-4.46,3.24Z"></path> </g> </svg>
                  </span>
                </a>
                <div class="taskItem-progress">
                  <span class="taskItem-progress-bar" :style="item.subTasks.length && `width: ${item.subTasksCompletedNumber/item.subTasks.length*100}%`"></span>
                </div>
              </div>
            </li>
          </ol>
          <h2 tabindex="0" class="heading normal" :class="{hidden: !doneTaskItems.length}">
            <a href="/#/lists/342865566" class="group-header" @click="toggleDoneTaskItems">显示已完成任务</a>
          </h2>
          <ol class="tasks" :class="{hidden: this.isShowDoneItems}">
            <!-- 暂不实现拖动的功能 -->
            <li tabindex="0" class="taskItem done" draggable="true" v-for="(item, index) in doneTaskItems" :class="{selected: item.selected}" @click="selectTaskItem($event, index, true)" @dblclick="editTask(item)">
              <div class="taskItem-body">
                <a class="taskItem-checkboxWrapper checkbox checked" tabindex="-1" @click.stop="toggleTaskCheck(item)">
                  <span title="标记为已完成">
                    <svg class="task-check" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.41421;"> <g> <path d="M17.5,4.5c0,-0.53 -0.211,-1.039 -0.586,-1.414c-0.375,-0.375 -0.884,-0.586 -1.414,-0.586c-2.871,0 -8.129,0 -11,0c-0.53,0 -1.039,0.211 -1.414,0.586c-0.375,0.375 -0.586,0.884 -0.586,1.414c0,2.871 0,8.129 0,11c0,0.53 0.211,1.039 0.586,1.414c0.375,0.375 0.884,0.586 1.414,0.586c2.871,0 8.129,0 11,0c0.53,0 1.039,-0.211 1.414,-0.586c0.375,-0.375 0.586,-0.884 0.586,-1.414c0,-2.871 0,-8.129 0,-11Z" style="fill:none;stroke-width:1px"></path> </g> </svg>
                  </span>  
                  <span title="标记为未完成">
                    <svg class="task-checked" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;"> <g> <path d="M9.5,14c-0.132,0 -0.259,-0.052 -0.354,-0.146c-1.485,-1.486 -3.134,-2.808 -4.904,-3.932c-0.232,-0.148 -0.302,-0.457 -0.153,-0.691c0.147,-0.231 0.456,-0.299 0.69,-0.153c1.652,1.049 3.202,2.266 4.618,3.621c2.964,-4.9 5.989,-8.792 9.749,-12.553c0.196,-0.195 0.512,-0.195 0.708,0c0.195,0.196 0.195,0.512 0,0.708c-3.838,3.837 -6.899,7.817 -9.924,12.902c-0.079,0.133 -0.215,0.221 -0.368,0.24c-0.021,0.003 -0.041,0.004 -0.062,0.004"></path> <path d="M15.5,18l-11,0c-1.379,0 -2.5,-1.121 -2.5,-2.5l0,-11c0,-1.379 1.121,-2.5 2.5,-2.5l10,0c0.276,0 0.5,0.224 0.5,0.5c0,0.276 -0.224,0.5 -0.5,0.5l-10,0c-0.827,0 -1.5,0.673 -1.5,1.5l0,11c0,0.827 0.673,1.5 1.5,1.5l11,0c0.827,0 1.5,-0.673 1.5,-1.5l0,-9.5c0,-0.276 0.224,-0.5 0.5,-0.5c0.276,0 0.5,0.224 0.5,0.5l0,9.5c0,1.379 -1.121,2.5 -2.5,2.5"></path> </g> </svg>
                  </span>
                </a>
                <div class="taskItem-titleWrapper" tabindex="-1">
                  <span class="taskItem-titleWrapper-title">{{ item.title }}</span>
                  <div class="taskItem-titleMeta-info">{{item.deltaTime}} 由 {{username}}</div>
                </div>
                <span class="conversations-wrapper" :class="{hidden: !item.comments.length}" title="此任务已有评论" tabindex="-1">
                  <svg class="conversations-small rtl-flip" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g class="outlined"> <path d="M6.26,15 C5.98,15 5.68,14.96 5.38,14.9 C5.18,14.84 5.04,14.68 5,14.48 C4.98,14.26 5.08,14.06 5.26,13.96 C5.78,13.68 6.02,13.3 6,12.8 C6,12.48 5.84,12.16 5.64,11.76 C5.36,11.18 5,10.48 5,9.5 C5,7.02 7.24,5 10,5 C12.76,5 15,7.02 15,9.5 C15,11.98 12.76,14 10,14 C9.58,14 9.16,13.96 8.76,13.86 C8.38,14.28 7.56,15 6.26,15 L6.26,15 Z M10,6 C7.8,6 6,7.56 6,9.5 C6,10.24 6.28,10.78 6.54,11.32 C6.78,11.8 7,12.26 7,12.78 C7,13.22 6.9,13.62 6.7,13.96 C7.64,13.78 8.12,13.06 8.14,13.02 C8.26,12.84 8.5,12.76 8.7,12.82 C9.14,12.94 9.56,13 10,13 C12.2,13 14,11.42 14,9.5 C14,7.56 12.2,6 10,6 L10,6 Z"></path> </g> <g class="filled"> <path d="M6.26,15 C5.98,15 5.68,14.96 5.38,14.9 C5.18,14.84 5.04,14.68 5,14.48 C4.98,14.28 5.08,14.08 5.26,13.98 C5.78,13.68 6.02,13.32 6,12.8 C6,12.5 5.84,12.16 5.64,11.78 C5.36,11.2 5,10.48 5,9.5 C5,7.02 7.24,5 10,5 C12.76,5 15,7.02 15,9.5 C15,11.98 12.76,14 10,14 C9.58,14 9.16,13.96 8.76,13.88 C8.38,14.28 7.56,15 6.26,15 L6.26,15 Z" opacity="0"></path> </g> </svg>
                </span>
                <span class="attachment-wrapper" :class="{hidden: !item.fileList.length}" title="此任务带有附件" tabindex="-1">
                  <svg class="attachment" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g stroke="none" stroke-width="1" fill-rule="evenodd"> <g id="attachment"> <path d="M13.4075,5.2925 C13.0275,4.9125 12.3675,4.9125 11.9875,5.2925 L10.3075,6.9925 L8.7475,6.9925 C7.8075,6.9925 6.9475,7.3525 6.2675,8.0125 L5.1475,9.1325 C5.0675,9.2325 5.0075,9.3525 5.0075,9.4925 C5.0075,9.6125 5.0675,9.7525 5.1475,9.8325 L7.3075,11.9925 L5.1475,14.1325 C4.9675,14.3325 4.9675,14.6525 5.1475,14.8525 C5.2475,14.9525 5.3875,14.9925 5.5075,14.9925 C5.6475,14.9925 5.7675,14.9525 5.8675,14.8525 L8.0075,12.6925 L10.1675,14.8525 C10.2475,14.9525 10.3875,14.9925 10.5075,14.9925 C10.6475,14.9925 10.7675,14.9525 10.8675,14.8525 L11.9875,13.7325 C12.6475,13.0725 13.0075,12.1925 13.0075,11.2525 L13.0075,9.6925 L14.7075,8.0125 C15.0875,7.6125 15.0875,6.9725 14.7075,6.5925 L13.4075,5.2925 Z M13.9875,7.2925 L12.1675,9.1325 C12.0675,9.2325 12.0075,9.3525 12.0075,9.4925 L12.0075,11.2525 C12.0075,11.9125 11.7475,12.5525 11.2875,13.0125 L10.5075,13.7925 L6.2075,9.4925 L6.9875,8.7125 C7.4475,8.2525 8.0875,7.9925 8.7475,7.9925 L10.5075,7.9925 C10.6475,7.9925 10.7675,7.9325 10.8675,7.8325 L12.7075,6.0125 L13.9875,7.2925 Z" id="Q"></path> </g> </g> </svg>
                </span>
                <span class="recurrence-wrapper hidden" :class="{hidden: item.hiddenRecurrence}" title="Recurring to-do" tabindex="-1">
                  <svg class="recurrence" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g stroke="none" stroke-width="1" fill-rule="evenodd"> <g id="recurrence"> <path d="M17.5193115,10 C17.2393115,10 16.9993115,10.2 16.9793115,10.46 C16.7393115,14.12 13.6793115,17 10.0193115,17 C6.15931146,17 3.01931146,13.86 3.01931146,10 C3.01931146,6.14 6.15931146,3 10.0193115,3 C13.3393115,3 15.2593115,5.48 16.3993115,6.98 C16.4193115,6.98 16.4193115,7 16.4193115,7 L12.9793115,7 C12.7193115,7 12.4793115,7.22 12.4793115,7.5 C12.4793115,7.78 12.7193115,8 12.9793115,8 C17.8393115,8 17.5593115,8.02 17.6793115,7.96 C17.8593115,7.88 17.9793115,7.7 17.9793115,7.5 L17.9793115,2.5 C17.9793115,2.22 17.7593115,2 17.4793115,2 C17.2193115,2 16.9793115,2.22 16.9793115,2.5 L16.9793115,6.08 C15.7793115,4.52 13.6193115,2 10.0193115,2 C5.59931146,2 2.01931146,5.58 2.01931146,10 C2.01931146,14.42 5.59931146,18 10.0193115,18 C14.1993115,18 17.6993115,14.72 17.9793115,10.54 C17.9993115,10.26 17.7993115,10.02 17.5193115,10 L17.5193115,10 Z M9.47931146,5 C9.21931146,5 8.97931146,5.22 8.97931146,5.5 L8.97931146,10.5 C8.97931146,10.78 9.21931146,11 9.47931146,11 L13.4793115,11 C13.7593115,11 13.9793115,10.78 13.9793115,10.5 C13.9793115,10.22 13.7593115,10 13.4793115,10 L9.97931146,10 L9.97931146,5.5 C9.97931146,5.22 9.75931146,5 9.47931146,5 L9.47931146,5 Z" id="f"></path> </g> </g> </svg>
                </span>
                <a class="taskItem-star" tabindex="-1" @click.stop="toggleTaskStarred(index, true)">
                  <span class="star-wrapper" :class="{hidden: item.taskStarred}" title="标记为星标">
                    <svg width="18px" height="18px" viewBox="0 0 18 18" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve"> <g> <path d="M3.74,18 C3.64,18 3.54,17.96 3.46,17.9 C3.28,17.76 3.2,17.54 3.28,17.34 L5.16,11.5 L0.2,7.9 C0.04,7.78 -0.04,7.56 0.02,7.34 C0.1,7.14 0.28,7 0.5,7 L6.64,7 L8.52,1.16 C8.66,0.76 9.34,0.76 9.48,1.16 L11.38,7 L17.5,7 C17.72,7 17.9,7.14 17.98,7.34 C18.04,7.56 17.96,7.78 17.8,7.9 L12.84,11.5 L14.72,17.34 C14.8,17.54 14.72,17.76 14.54,17.9 C14.38,18.02 14.14,18.02 13.96,17.9 L9,14.3 L4.04,17.9 C3.96,17.96 3.84,18 3.74,18 L3.74,18 Z M9,13.18 C9.1,13.18 9.2,13.2 9.3,13.28 L13.3,16.18 L11.78,11.46 C11.7,11.26 11.78,11.04 11.96,10.92 L15.96,8 L11,8 C10.8,8 10.6,7.86 10.54,7.66 L9,2.94 L7.46,7.66 C7.4,7.86 7.22,8 7,8 L2.04,8 L6.04,10.92 C6.22,11.04 6.3,11.26 6.22,11.46 L4.7,16.18 L8.7,13.28 C8.8,13.2 8.9,13.18 9,13.18 L9,13.18 Z"></path> </g> </svg>
                  </span>
                  <span class="starred-wrapper" :class="{hidden: !item.taskStarred}" title="移除星标">
                    <svg width="22px" height="44px" viewBox="0 0 22 44" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;"> <g> <path d="M0,0l0,40.5c0,0.28 0.22,0.42 0.48,0.32l10.04,-3.64c0.28,-0.1 0.7,-0.1 0.96,0l10.04,3.64c0.28,0.1 0.48,-0.04 0.48,-0.32l0,-40.5l-22,0ZM14.46,24.08l1.68,5.26c0.08,0.18 0,0.38 -0.16,0.5c-0.14,0.1 -0.36,0.1 -0.52,0l-4.46,-3.24l-4.46,3.24c-0.08,0.06 -0.18,0.1 -0.28,0.1c-0.08,0 -0.18,-0.04 -0.24,-0.1c-0.16,-0.12 -0.24,-0.32 -0.16,-0.5l1.68,-5.26l-4.46,-3.24c-0.14,-0.12 -0.22,-0.32 -0.16,-0.52c0.08,-0.18 0.24,-0.32 0.44,-0.32l5.52,0l1.68,-5.24c0.14,-0.36 0.74,-0.36 0.88,0l1.7,5.24l5.5,0c0.2,0 0.36,0.14 0.44,0.32c0.06,0.2 -0.02,0.4 -0.16,0.52l-4.46,3.24Z"></path> </g> </svg>
                  </span>
                </a>
                <div class="taskItem-progress">
                  <span class="taskItem-progress-bar" :style="item.subTasks.length && `width: ${item.subTasksCompletedNumber/item.subTasks.length*100}%`"></span>
                </div>
              </div>
            </li>
          </ol>
        </div>

        <div class="task-404 hidden" >
          <svg class="search rtl-flip" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g stroke="none" stroke-width="1" fill-rule="evenodd"> <g> <path d="M8.5025,15 C4.9225,15 2.0025,12.08 2.0025,8.5 C2.0025,4.92 4.9225,2 8.5025,2 C12.0825,2 15.0025,4.92 15.0025,8.5 C15.0025,12.08 12.0825,15 8.5025,15 L8.5025,15 Z M8.5025,3 C5.4625,3 3.0025,5.46 3.0025,8.5 C3.0025,11.54 5.4625,14 8.5025,14 C11.5425,14 14.0025,11.54 14.0025,8.5 C14.0025,5.46 11.5425,3 8.5025,3 L8.5025,3 Z M17.5025,18 C17.3825,18 17.2425,17.96 17.1425,17.86 L13.6425,14.36 C13.4625,14.16 13.4625,13.84 13.6425,13.64 C13.8425,13.46 14.1625,13.46 14.3625,13.64 L17.8625,17.14 C18.0425,17.34 18.0425,17.66 17.8625,17.86 C17.7625,17.96 17.6225,18 17.5025,18 L17.5025,18 Z" id="z"></path> </g> </g> </svg>
          <h2>无搜索结果</h2>
        </div>
      </div>
    </div>

    <!-- 编辑任务 -->
    <task-detail :username="username" v-show="showDetail" :taskItem="editItem" @toggleDetailCheckbox="toggleTaskCheck" @close="showDetail = false" @delete="deleteTask"></task-detail>
  </div>
</template>

<script>
import DatePicker from 'vuejs-datepicker'
import TaskDetail from './TaskDetail'
// var d
export default {
  name: 'Task',
  components: {DatePicker, TaskDetail},
  props: ['username'],
  data(){
    return {
      // show: true, // 用于显示date-picker
      // date: '', // date-picker 中 date 双向绑定
      datePickerState,
      showDetail: false, // 打开任务编辑区域
      taskItems: [
  {
    selected: false,
    title: '码代码1',
    taskStarred: false,
    createDate: 1525331956726,
    deadline: 1525331976726,
    isCompleted: false,
    subTasks: [{title:'份额份额', isCompleted: false, displayView: true,}, {title: 'dd', isCompleted: true, displayView: true,}, {title: 'hh', isCompleted: true, displayView:true,}],
    subTasksCompletedNumber: 2,
    note: {content: 'jfieji', displayView: true},
    comments:[
      {content:'fjidjifedf', username: 'todoi', createDate: 1525332096726, imgSrc: '//via.placeholder.com/50x50'},
      {content:'fjidjifedfdddddddd', username: 'todoi', createDate: 1525343096726, imgSrc: '//via.placeholder.com/50x50'}
    ],
    fileList:[ 
      {fileExtension: 'jpg', fileName: 'Chrysanthemum.jpg', uploadDate: 1525331956728, fileSrc: '//via.placeholder.com/50x50', creatorName: 'todoi', creatorAvatar: '//via.placeholder.com/50x50', },
    ],
  },{
    selected: false,
    title: '代码3',
    taskStarred: true,
    createDate: 1525331956727,
    deadline: null,
    isCompleted: false,
    subTasks: [],
    subTasksCompletedNumber: 0,
    note: {content: '', displayView: true},
    comments: [],
    fileList: [],
  }
      ],
      actionBarTopSort:[
  // 排序的内容框
  {
    liClassName: 'first-menu-item',
    aClassName: 'action-bar-top-sort-az',
    svgHTML: '<g stroke="none" stroke-width="1" fill-rule="evenodd"> <g id="sort-az"> <path d="M14.2,2.3 C14.12,2.12 13.94,2 13.76,2 L13.26,2 C13.06,2 12.88,2.12 12.8,2.3 L10.04,8.3 C9.94,8.54 10.04,8.84 10.3,8.96 C10.54,9.08 10.84,8.96 10.96,8.7 L11.74,7 L15.26,7 L16.04,8.7 C16.14,8.9 16.32,9 16.5,9 C16.58,9 16.64,8.98 16.7,8.96 C16.96,8.84 17.06,8.54 16.96,8.3 L14.2,2.3 Z M5.64,3.02 C5.56,3 5.48,3 5.4,3 C5.3,3.02 5.22,3.08 5.14,3.16 L3.14,5.14 C2.96,5.34 2.96,5.66 3.14,5.86 C3.34,6.04 3.66,6.04 3.86,5.86 L5,4.7 L5,8.5 C5,8.78 5.22,9 5.5,9 C5.78,9 6,8.78 6,8.5 L6,4.7 L7.14,5.86 C7.24,5.96 7.38,6 7.5,6 C7.62,6 7.76,5.96 7.86,5.86 C8.04,5.66 8.04,5.34 7.86,5.14 C5.68,2.98 5.8,3.08 5.64,3.02 L5.64,3.02 Z M14.8,6 L12.2,6 L13.5,3.16 L14.8,6 Z M6,15.3 L6,11.5 C6,11.22 5.78,11 5.5,11 C5.22,11 5,11.22 5,11.5 L5,15.3 L3.86,14.14 C3.66,13.96 3.34,13.96 3.14,14.14 C2.96,14.34 2.96,14.66 3.14,14.86 C5.28,17 5.2,16.96 5.4,17 C5.56,17.02 5.74,16.98 5.86,16.84 L7.86,14.86 C8.04,14.66 8.04,14.34 7.86,14.14 C7.66,13.96 7.34,13.96 7.14,14.14 L6,15.3 Z M15.94,11.26 C15.86,11.1 15.68,11 15.5,11 L11.5,11 C11.22,11 11,11.22 11,11.5 C11,11.78 11.22,12 11.5,12 L14.56,12 L11.08,17.22 C10.98,17.38 10.98,17.58 11.06,17.74 C11.14,17.9 11.32,18 11.5,18 L15.5,18 C15.78,18 16,17.78 16,17.5 C16,17.22 15.78,17 15.5,17 L12.44,17 L15.92,11.78 C16.02,11.62 16.02,11.42 15.94,11.26 L15.94,11.26 Z" id="sort"></path> </g> </g>',
    svgClassName: 'sort-az',
    text: '按字母顺序排序',
    sortFn: 'sortByLetter',
  },
  {
    // liClassName: console.log(this.taskItems) || 'disabled',
    // liClassName: this.deadlineSortClass ? this.deadlineSortClass() : 'disabled'  ,
    aClassName: 'action-bar-top-sort-date',
    svgHTML: '<g stroke="none" stroke-width="1" fill-rule="evenodd"> <g id="sort-date"> <path d="M2.5,7 C2.22,7 2,6.78 2,6.5 L2,3.5 C2,2.68 2.68,2 3.5,2 L16.5,2 C17.32,2 18,2.68 18,3.5 L18,6.5 C18,6.78 17.78,7 17.5,7 L2.5,7 Z M3,6 L17,6 L17,3.5 C17,3.22 16.78,3 16.5,3 L3.5,3 C3.22,3 3,3.22 3,3.5 L3,6 Z M3.5,18 C2.68,18 2,17.32 2,16.5 L2,8.5 C2,8.22 2.22,8 2.5,8 C2.78,8 3,8.22 3,8.5 L3,16.5 C3,16.78 3.22,17 3.5,17 L16.5,17 C16.78,17 17,16.78 17,16.5 L17,8.5 C17,8.22 17.22,8 17.5,8 C17.78,8 18,8.22 18,8.5 L18,16.5 C18,17.32 17.32,18 16.5,18 L3.5,18 Z M9,13.12 C9.12,13.12 9.2,13.16 9.26,13.22 C9.3,13.28 9.34,13.34 9.34,13.44 L9.34,14 L5.86,14 L5.86,13.68 C5.86,13.62 5.88,13.56 5.9,13.5 C5.94,13.42 5.98,13.36 6.04,13.3 L7.52,11.82 C7.64,11.68 7.76,11.56 7.86,11.46 C7.94,11.34 8.02,11.22 8.1,11.12 C8.16,11 8.2,10.88 8.24,10.78 C8.28,10.66 8.28,10.54 8.28,10.4 C8.28,10.18 8.22,10.02 8.12,9.9 C8,9.78 7.84,9.72 7.62,9.72 C7.54,9.72 7.46,9.74 7.38,9.76 C7.3,9.8 7.22,9.82 7.16,9.88 C7.1,9.92 7.06,9.98 7,10.04 C6.96,10.1 6.94,10.16 6.92,10.24 C6.88,10.36 6.82,10.44 6.74,10.46 C6.68,10.5 6.58,10.52 6.44,10.5 L5.94,10.4 C5.98,10.16 6.04,9.94 6.16,9.76 C6.26,9.58 6.38,9.42 6.54,9.3 C6.68,9.18 6.86,9.1 7.06,9.04 C7.24,8.96 7.46,8.94 7.68,8.94 C7.92,8.94 8.14,8.98 8.32,9.04 C8.52,9.12 8.68,9.22 8.82,9.34 C8.96,9.46 9.08,9.62 9.14,9.8 C9.22,9.96 9.26,10.16 9.26,10.38 C9.26,10.56 9.24,10.74 9.18,10.88 C9.14,11.04 9.06,11.2 8.96,11.34 C8.88,11.48 8.78,11.62 8.66,11.74 L8.28,12.16 L7.2,13.24 C7.32,13.2 7.44,13.18 7.56,13.16 C7.68,13.14 7.78,13.12 7.88,13.12 L9,13.12 Z M10.48,9 L13.96,9 L13.96,9.4 C13.96,9.52 13.96,9.62 13.92,9.7 L13.86,9.88 L12.02,13.68 C11.98,13.78 11.92,13.84 11.84,13.9 C11.76,13.96 11.66,14 11.52,14 L10.84,14 L12.7,10.28 L12.84,10.04 C12.9,9.98 12.94,9.9 13,9.84 L10.7,9.84 C10.64,9.84 10.6,9.82 10.54,9.78 C10.5,9.74 10.48,9.68 10.48,9.62 L10.48,9 Z" id="c"></path> </g> </g>',
    svgClassName: 'sort-date',
    text: '按到期日排序',
    sortFn: 'sortByDeadline',
  },
  {
    liClassName: '',
    aClassName: 'action-bar-top-sort-creation',
    svgHTML: '<g stroke="none" stroke-width="1" fill-rule="evenodd"> <g id="sort-creation"> <path d="M9.5,17 C5.36,17 2,13.64 2,9.5 C2,5.36 5.36,2 9.5,2 C13.64,2 17,5.36 17,9.5 C17,9.78 16.78,10 16.5,10 C16.22,10 16,9.78 16,9.5 C16,5.92 13.08,3 9.5,3 C5.92,3 3,5.92 3,9.5 C3,13.08 5.92,16 9.5,16 C9.78,16 10,16.22 10,16.5 C10,16.78 9.78,17 9.5,17 L9.5,17 Z M6.5,11 C6.22,11 6,10.78 6,10.5 C6,10.22 6.22,10 6.5,10 L10,10 L10,5.5 C10,5.22 10.22,5 10.5,5 C10.78,5 11,5.22 11,5.5 L11,10.5 C11,10.78 10.78,11 10.5,11 L6.5,11 Z M12.5,18 C11.68,18 11,17.32 11,16.5 L11,12.5 C11,11.68 11.68,11 12.5,11 L16.5,11 C17.32,11 18,11.68 18,12.5 L18,16.5 C18,17.32 17.32,18 16.5,18 L12.5,18 Z M12.5,12 C12.22,12 12,12.22 12,12.5 L12,16.5 C12,16.78 12.22,17 12.5,17 L16.5,17 C16.78,17 17,16.78 17,16.5 L17,12.5 C17,12.22 16.78,12 16.5,12 L12.5,12 Z M14.5,16 C14.22,16 14,15.78 14,15.5 L14,14.3 L13.72,14.44 C13.48,14.58 13.18,14.48 13.06,14.22 C12.92,13.98 13.02,13.68 13.28,13.56 L14.28,13.06 C14.44,12.98 14.62,12.98 14.76,13.08 C14.92,13.16 15,13.32 15,13.5 L15,15.5 C15,15.78 14.78,16 14.5,16 L14.5,16 Z" id="≠"></path> </g> </g>',
    svgClassName: 'sort-creation',
    text: '按创建日期排序',
    sortFn: 'sortByCreation',
  },
  {
    // 这个功能不实现
    liClassName: 'disabled',
    aClassName: 'action-bar-top-sort-assign',
    svgHTML: '<g stroke="none" stroke-width="1" fill-rule="evenodd"> <g> <g id="Rectangle-3-+-A" transform="translate(1.000000, 2.000000)"> <path d="M10,10 C12.28,10 14,6.84 14,4 C14,1.8 12.2,0 10,0 C7.8,0 6,1.8 6,4 C6,6.5 7.52,10 10,10 L10,10 Z M4.94,7.74 C4.98,7.66 5,7.58 5,7.5 C5,7.42 4.98,7.34 4.94,7.26 C4.92,7.22 4.9,7.18 4.86,7.14 L2.86,5.14 C2.66,4.96 2.34,4.96 2.14,5.14 C1.96,5.34 1.96,5.66 2.14,5.86 L3.3,7 L0.5,7 C0.22,7 0,7.22 0,7.5 C0,7.78 0.22,8 0.5,8 L3.3,8 L2.14,9.14 C1.96,9.34 1.96,9.66 2.14,9.86 C2.24,9.96 2.38,10 2.5,10 C2.62,10 2.76,9.96 2.86,9.86 L4.86,7.86 C4.9,7.82 4.92,7.78 4.94,7.74 L4.94,7.74 Z M16.76,12.88 C16.56,12 15.9,11.28 15.02,11.04 L12.72,10.36 C12.58,10.32 12.46,10.26 12.36,10.14 C12.16,9.96 11.84,9.96 11.66,10.16 C11.46,10.34 8.54,10.34 8.36,10.14 C8.16,9.96 7.84,9.96 7.64,10.14 C7.54,10.24 7.42,10.32 7.28,10.36 L5.04,10.96 C4.14,11.2 3.46,11.92 3.24,12.82 L3.02,13.9 C2.98,14.06 3.02,14.24 3.14,14.36 C3.22,14.42 4.86,16 10,16 C15.14,16 16.78,14.42 16.86,14.36 C16.98,14.24 17.02,14.06 16.98,13.9 L16.76,12.88 Z" fill-opacity="0.06"></path> <path d="M10,10 C12.28,10 14,6.84 14,4 C14,1.8 12.2,0 10,0 C7.8,0 6,1.8 6,4 C6,6.5 7.52,10 10,10 L10,10 Z M10,1 C11.66,1 13,2.34 13,4 C13,6.26 11.62,9 10,9 C8.34,9 7,6.26 7,4 C7,2.34 8.34,1 10,1 L10,1 Z M4.94,7.74 C4.98,7.66 5,7.58 5,7.5 C5,7.42 4.98,7.34 4.94,7.26 C4.92,7.22 4.9,7.18 4.86,7.14 L2.86,5.14 C2.66,4.96 2.34,4.96 2.14,5.14 C1.96,5.34 1.96,5.66 2.14,5.86 L3.3,7 L0.5,7 C0.22,7 0,7.22 0,7.5 C0,7.78 0.22,8 0.5,8 L3.3,8 L2.14,9.14 C1.96,9.34 1.96,9.66 2.14,9.86 C2.24,9.96 2.38,10 2.5,10 C2.62,10 2.76,9.96 2.86,9.86 L4.86,7.86 C4.9,7.82 4.92,7.78 4.94,7.74 L4.94,7.74 Z M16.76,12.88 C16.56,12 15.9,11.28 15.02,11.04 L12.72,10.36 C12.58,10.32 12.46,10.26 12.36,10.14 C12.16,9.96 11.84,9.96 11.66,10.16 C11.46,10.34 11.46,10.66 11.66,10.86 C11.88,11.08 12.14,11.24 12.44,11.32 L14.74,12 C15.26,12.14 15.66,12.58 15.78,13.1 L15.94,13.8 C15.4,14.16 13.7,15 10,15 C6.3,15 4.6,14.14 4.06,13.8 L4.22,13.04 C4.34,12.5 4.76,12.06 5.3,11.92 L7.54,11.32 C7.84,11.24 8.12,11.08 8.36,10.86 C8.54,10.66 8.54,10.34 8.36,10.14 C8.16,9.96 7.84,9.96 7.64,10.14 C7.54,10.24 7.42,10.32 7.28,10.36 L5.04,10.96 C4.14,11.2 3.46,11.92 3.24,12.82 L3.02,13.9 C2.98,14.06 3.02,14.24 3.14,14.36 C3.22,14.42 4.86,16 10,16 C15.14,16 16.78,14.42 16.86,14.36 C16.98,14.24 17.02,14.06 16.98,13.9 L16.76,12.88 Z"> </path> </g> </g> </g>',
    svgClassName: 'assigned',
    text: '按受托人排序',
    sortFn: 'sortByAssign',
  },
  {
    liClassName: 'last-menu-item',
    aClassName: 'action-bar-top-sort-priority',
    svgHTML: '<g id="Web-svgs" stroke="none" stroke-width="1" fill-rule="evenodd"> <g id="starred"> <g id="Rectangle-3-+-A" transform="translate(1.000000, 0.000000)"> <path d="M3.74,18 C3.64,18 3.54,17.96 3.46,17.9 C3.28,17.76 3.2,17.54 3.28,17.34 L5.16,11.5 L0.2,7.9 C0.04,7.78 -0.04,7.56 0.02,7.34 C0.1,7.14 0.28,7 0.5,7 L6.64,7 L8.52,1.16 C8.66,0.76 9.34,0.76 9.48,1.16 L11.38,7 L17.5,7 C17.72,7 17.9,7.14 17.98,7.34 C18.04,7.56 17.96,7.78 17.8,7.9 L12.84,11.5 L14.72,17.34 C14.8,17.54 14.72,17.76 14.54,17.9 C14.38,18.02 14.14,18.02 13.96,17.9 L9,14.3 L4.04,17.9 C3.96,17.96 3.84,18 3.74,18 L3.74,18 Z M9,13.18 C9.1,13.18 9.2,13.2 9.3,13.28 L13.3,16.18 L11.78,11.46 C11.7,11.26 11.78,11.04 11.96,10.92 L15.96,8 L11,8 C10.8,8 10.6,7.86 10.54,7.66 L9,2.94 L7.46,7.66 C7.4,7.86 7.22,8 7,8 L2.04,8 L6.04,10.92 C6.22,11.04 6.3,11.26 6.22,11.46 L4.7,16.18 L8.7,13.28 C8.8,13.2 8.9,13.18 9,13.18 L9,13.18 Z" id="C"></path> <path d="M3.74,18 C3.64,18 3.54,17.96 3.46,17.9 C3.28,17.76 3.2,17.54 3.28,17.34 L5.16,11.5 L0.2,7.9 C0.04,7.78 -0.04,7.56 0.02,7.34 C0.1,7.14 0.28,7 0.5,7 L6.64,7 L8.52,1.16 C8.66,0.76 9.34,0.76 9.48,1.16 L11.38,7 L17.5,7 C17.72,7 17.9,7.14 17.98,7.34 C18.04,7.56 17.96,7.78 17.8,7.9 L12.84,11.5 L14.72,17.34 C14.8,17.54 14.72,17.76 14.54,17.9 C14.38,18.02 14.14,18.02 13.96,17.9 L9,14.3 L4.04,17.9 C3.96,17.96 3.84,18 3.74,18 L3.74,18 Z" id="D" opacity="0.06"> </path> </g> </g> </g>',
    svgClassName: 'starred',
    text: '按优先级排序',
    sortFn: 'sortByPriority',
  },
      ],
      actionBarTopMore,
      actionBarBottomActive: {share: false, sort: true, more: true,},
      actionBarTopActive: '',
      actionBarTopHeight: '0px',
      addTaskData,
      doneTaskItems,
      isShowDoneItems: true,  // 显示已经完成任务列表
      newTask: this.createTaskTemplate(),
      editItem: this.createTaskTemplate(),
    }
  },
  methods: {
    toggleNewTaskStarred(){
      // 切换输入框处的 星星
      this.addTaskData.starred = !this.addTaskData.starred
      // 更新 newTask 中的 taskStarred 标记
      this.newTask.taskStarred = this.addTaskData.starred
    },
    createTaskTemplate(){
      // 返回一个 任务模板
      return {
        selected: false, // 用于设置被选中时的样式
        title: '',
        taskStarred: false,  // 是否加了星星
        createDate: null, // 创建的时间
        deadline: null, // 到期时间
        isCompleted: false, // 是否已经完成
        subTasks: [],   // 子任务数组
        subTasksCompletedNumber: 0, // 子任务完成的数量
        note: {content: '', displayView: true},  // 备注
        comments: [], // 评论
        fileList: [], // 附件
      }
    },
    addTask (){
      // 在添加任务的输入框中 按下 enter 键时调用
      if(this.newTask.title){
        let item = JSON.parse(JSON.stringify(this.newTask))
        // 写入创建时间 
        item.createDate = new Date().getTime() 
        this.taskItems.unshift(item)
        // 重置 newTask
        this.newTask = this.createTaskTemplate()
        // 去掉 星星 的 starred 类名
        this.addTaskData.starred = false
        // 重置date 上面的日期
        this.datePickerState.date = ''
      }
    },
    toggleDoneTaskItems(){
      // 隐藏或者显示已经完成的任务列表
      if(this.isShowDoneItems){
        for(let i=0; i<this.doneTaskItems.length; i++){
          let item = this.doneTaskItems[i]
          // 更新距离时间
          item.deltaTime = this.showTime(item)
        }
      }
      this.isShowDoneItems = !this.isShowDoneItems
    },
    showActionBarTop: function(type){
    // 显示 排序、更多 下拉框
      if(this.actionBarTopHeight > '0px'){
        // 如果下拉框已经显示，再次点击就隐藏下拉框
        this.actionBarTopHeight = '0px'
        return 
      }
      if (type === 'sort' && this.actionBarBottomActive.sort){
        this.actionBarTopActive = 'sort'
        this.actionBarTopHeight = `${this.actionBarTopSort.length * 38}px`
      }else if (type === 'more' && this.actionBarBottomActive.more){
        this.actionBarTopActive = 'more'
        this.actionBarTopHeight = `${this.actionBarTopMore.length * 42}px`
      }else if (type === 'share' && this.actionBarBottomActive.share){
        this.actionBarTopHeight = `0px`
      }else{
        this.actionBarTopHeight = `0px`
      }
    },
    hideActionBar: function(){
      // 隐藏 排序 更多 下拉框
      this.actionBarTopHeight = '0px'
    },
    focusAddTaskData (){
      // 是否 focus 在添加任务的输入框
      this.addTaskData.focusAddTask = true
    },
    blurAddTaskData (){
      // 是否 blur 在添加任务的输入框
      this.addTaskData.focusAddTask = false
    },
    toggleTaskCheck (item){
    // 点击复选框 完成 或 未完成
      let index
      if(item.isCompleted === true){
      // 用户在已经完成 item 的checkbox 上点击
        index = this.doneTaskItems.indexOf(item)
        this.doneTaskItems = [].concat(this.doneTaskItems.slice(0, index), this.doneTaskItems.slice(index + 1))
        // this.doneTaskItems.splice(this.doneTaskItems.indexOf(item), 1)
        // 重置为 未完成
        item.isCompleted = false
        // 完成时间重置为 null
        item.doneDate = null
        this.taskItems.push(item)
      }else if(item.isCompleted === false){
      // 用户在未完成 item 的checkbox 上点击
        index = this.taskItems.indexOf(item)
        this.taskItems = [].concat(this.taskItems.slice(0, index), this.taskItems.slice(index + 1))
        // this.taskItems.splice(this.taskItems.indexOf(item), 1)
        // 完成时间为当前时间
        item.doneDate = new Date().getTime()
        // 更新距离时间
        item.deltaTime = this.showTime(item)
        // 重置为 已经完成
        item.isCompleted = true
        this.doneTaskItems.push(item)
      }else{
        throw Error('toggleTaskCheck 函数报错')
      }
    },
    toggleTaskStarred (index, isDone){
      if (isDone){
        this.doneTaskItems[index].taskStarred = !this.doneTaskItems[index].taskStarred
      }else{
        this.taskItems[index].taskStarred = !this.taskItems[index].taskStarred
      }
    },
    selectTaskItem ($event,index, isDone){
      this.taskItems.forEach(element => element.selected = false )
      this.doneTaskItems.forEach(element => element.selected = false )
      isDone ? this.doneTaskItems[index].selected = true : this.taskItems[index].selected = true
    },
    showTime(item){
      // 输入一个 完成的任务对象
      // 输出新的时间 和 旧的时间之间的间隔
      let newDate = new Date().getTime()
      let delta = Math.ceil((newDate - item.doneDate)/1000)
      let days, hours, minutes, result //, seconds
      days = Math.floor(delta / (60*60*24))
      hours = Math.floor(delta / (60*60)) % 24
      minutes = Math.floor(delta / 60) % 60
      // seconds = delta % 60
      result = '几秒钟'
      if(minutes) result = `${minutes}分钟`
      if(hours) result = `${hours}小时`
      if(days) result = `${days}天`
      return `${result}之前`
    },
    sortFn(sortFnName){
      // 输入根据什么东西排序，然后调用这个方法
      this[sortFnName].call(this)
    },
    sortByCreation(){
      // 根据创建时间排序
      this.taskItems.sort((a, b)=>{ return a.createDate - b.createDate})
    },
    sortByLetter(){
      // 根据字母排序
      this.taskItems.sort((a, b)=>{
        if(a.title === b.title) return 0
        if(a.title > b.title) return 1
        if(a.title < b.title) return -1
      })
    },
    sortByPriority(){
      // 根据星星排序
      this.taskItems.sort((a, b) => {
        // taskStarred 是个布尔值
        // 加星星的优先级比较高，所以在前面加个 符号
        return -(Number(a.taskStarred) - Number(b.taskStarred))
      })
    },
    sortByDeadline(){
      // 根据到期日排序
      this.taskItems.sort((a, b) => {
        // a，b 都没设置到期日
        if(!a.deadline && !b.deadline) return 0
        // a没设置 b有设置
        if(!a.deadline) return 1
        if(!b.deadline) return -1
        return a.deadline - b.deadline
      })
    },
    editTask(item){
    // 打开任务编辑的区域
      this.showDetail = true
      this.editItem = item
    },
    deleteTask(item){
      if(item.isCompleted){
        this.doneTaskItems.splice(this.doneTaskItems.indexOf(item), 1)
      }else{
        this.taskItems.splice(this.taskItems.indexOf(item), 1)
      }
      this.showDetail = false
    },
    formatDate(timeStamp){
    // 传入一个时间戳 返回一个 '2018-05-20' 的时间格式
      return new Date(timeStamp).toLocaleString().split(' ')[0].replace(/(\d+)\/(\d+)\/(\d+)/g, function(str,$1, $2, $3){
        return $1 + '-' + (Number($2) < 10 ? '0'+$2 : $2) + '-' + (Number($3) < 10 ? '0'+$3 : $3)
      }) 
    },
  },
  computed:{
    hiddenAllAddTaskMeta (){
      return !this.addTaskData.focusAddTask
    },
    datePickerDate(){
    // 当选择日期之时 要改变日历上的数字
      // 更新任务模板中的到期时间
      this.newTask.deadline = this.datePickerState.date ? new Date(this.datePickerState.date).getTime() : null
      return this.datePickerState.date && new Date(this.datePickerState.date).getDate()
    },
    deadlineSortClass(){
    // 用于更新排序下拉框中 到期日排序的 选项是否可以用
      let result = 0
      for(let item of this.taskItems){
        if(item.deadline){
          // 如果有一个task 有设置deadline 那么就可以使用 到期日 排序
          result = 1
          break
        }
      }
      return result ? '' : 'disabled'
    },
  },
}

let datePickerState = {
  date: '',
  highlighted: {
    dates: [ // Highlight an array of dates
      new Date(), // 当天高亮
    ],
  }
}

let doneTaskItems = [
  {
    selected: false,
    title: '码代码2',
    taskStarred: false,
    createDate: 1525331956728,
    doneDate: 1525331966728,
    dealine: null,
    isCompleted: true,
    subTasks: [],
    subTasksCompletedNumber: 0,
    note: {content: '', displayView: true},
    comments: [],
    fileList: [],
  },
]

let addTaskData = {
  focusAddTask: false,
  hiddenAddTaskMeta: {star: false, assign: true, date: false,},
  starred: false,
}

let actionBarTopMore = [
// 更多的功能被我砍掉了
  {
    liClassName: 'first-menu-item',
    aClassName: 'action-bar-top-duplicate-list',
    svgHTML: '<g id="Page-1" stroke="none" stroke-width="1" fill-rule="evenodd" sketch:type="MSPage"> <g id="duplicate" sketch:type="MSArtboardGroup"> <path d="M15.5,2 L7.5,2 C6.121,2 5,3.121 5,4.5 L5,6 L4.5,6 C3.121,6 2,7.121 2,8.5 C2,8.776 2.224,9 2.5,9 C2.776,9 3,8.776 3,8.5 C3,7.673 3.673,7 4.5,7 L5,7 L5,12.5 C5,13.879 6.121,15 7.5,15 L13,15 L13,15.5 C13,16.327 12.327,17 11.5,17 C11.224,17 11,17.224 11,17.5 C11,17.776 11.224,18 11.5,18 C12.879,18 14,16.879 14,15.5 L14,15 L15.5,15 C16.879,15 18,13.879 18,12.5 L18,4.5 C18,3.121 16.879,2 15.5,2 L15.5,2 Z M17,12.5 C17,13.327 16.327,14 15.5,14 L7.5,14 C6.673,14 6,13.327 6,12.5 L6,4.5 C6,3.673 6.673,3 7.5,3 L15.5,3 C16.327,3 17,3.673 17,4.5 L17,12.5 Z M2.5,14 C2.776,14 3,13.776 3,13.5 L3,11.5 C3,11.224 2.776,11 2.5,11 C2.224,11 2,11.224 2,11.5 L2,13.5 C2,13.776 2.224,14 2.5,14 Z M8.5,17 L6.5,17 C6.224,17 6,17.224 6,17.5 C6,17.776 6.224,18 6.5,18 L8.5,18 C8.776,18 9,17.776 9,17.5 C9,17.224 8.776,17 8.5,17 Z M4.5,17 C3.673,17 3,16.327 3,15.5 C3,15.224 2.776,15 2.5,15 C2.224,15 2,15.224 2,15.5 C2,16.879 3.121,18 4.5,18 C4.776,18 5,17.776 5,17.5 C5,17.224 4.776,17 4.5,17 Z M14.691,5.038 C14.63,5.013 14.565,5 14.5,5 L10.5,5 C10.224,5 10,5.224 10,5.5 C10,5.776 10.224,6 10.5,6 L13.293,6 L10.146,9.146 C9.951,9.342 9.951,9.658 10.146,9.853 C10.244,9.951 10.372,10 10.5,10 C10.628,10 10.756,9.951 10.853,9.853 L14,6.707 L14,9.5 C14,9.776 14.224,10 14.5,10 C14.776,10 15,9.776 15,9.5 L15,5.5 C15,5.435 14.987,5.37 14.962,5.309 C14.911,5.187 14.813,5.089 14.691,5.038" id="Fill-1" sketch:type="MSShapeGroup"></path> </g> </g>',
    svgClassName: '',
    text: '复制清单',
  },
  {
    liClassName: '',
    aClassName: 'action-bar-top-copy-item',
    svgHTML: '<g id="Page-1" stroke="none" stroke-width="1" fill-rule="evenodd" sketch:type="MSPage"> <g id="copy" sketch:type="MSArtboardGroup"> <path d="M12.7921708,6.5 L8.647,10.646 C8.451,10.842 8.451,11.158 8.647,11.353 C8.744,11.451 8.872,11.5 9,11.5 C9.128,11.5 9.256,11.451 9.354,11.353 L13.5,7.207 L13.5,10 C13.5,10.276 13.724,10.5 14,10.5 C14.276,10.5 14.5,10.276 14.5,10 L14.5,6.01573317 C14.5041978,5.88263558 14.4555311,5.7480518 14.354,5.646 C14.2519482,5.54446887 14.1173644,5.4958022 13.9841257,5.5 L10,5.5 C9.724,5.5 9.5,5.724 9.5,6 C9.5,6.276 9.724,6.5 10,6.5 L12.7921708,6.5 L12.7921708,6.5 Z M2.5,5.5 C2.224,5.5 2,5.276 2,5 L2,4.5 C2,3.121 3.121,2 4.5,2 L5,2 C5.276,2 5.5,2.224 5.5,2.5 C5.5,2.776 5.276,3 5,3 L4.5,3 C3.673,3 3,3.673 3,4.5 L3,5 C3,5.276 2.776,5.5 2.5,5.5 Z M5,18 L4.5,18 C3.121,18 2,16.879 2,15.5 L2,15 C2,14.724 2.224,14.5 2.5,14.5 C2.776,14.5 3,14.724 3,15 L3,15.5 C3,16.327 3.673,17 4.5,17 L5,17 C5.276,17 5.5,17.224 5.5,17.5 C5.5,17.776 5.276,18 5,18 Z M15.5,18 L15,18 C14.724,18 14.5,17.776 14.5,17.5 C14.5,17.224 14.724,17 15,17 L15.5,17 C16.327,17 17,16.327 17,15.5 L17,15 C17,14.724 17.224,14.5 17.5,14.5 C17.776,14.5 18,14.724 18,15 L18,15.5 C18,16.879 16.879,18 15.5,18 Z M17.5,5.5 C17.224,5.5 17,5.276 17,5 L17,4.5 C17,3.673 16.327,3 15.5,3 L15,3 C14.724,3 14.5,2.776 14.5,2.5 C14.5,2.224 14.724,2 15,2 L15.5,2 C16.879,2 18,3.121 18,4.5 L18,5 C18,5.276 17.776,5.5 17.5,5.5 Z M2.5,12.5 C2.224,12.5 2,12.276 2,12 L2,8 C2,7.724 2.224,7.5 2.5,7.5 C2.776,7.5 3,7.724 3,8 L3,12 C3,12.276 2.776,12.5 2.5,12.5 Z M17.5,12.5 C17.224,12.5 17,12.276 17,12 L17,8 C17,7.724 17.224,7.5 17.5,7.5 C17.776,7.5 18,7.724 18,8 L18,12 C18,12.276 17.776,12.5 17.5,12.5 Z M12,3 L8,3 C7.724,3 7.5,2.776 7.5,2.5 C7.5,2.224 7.724,2 8,2 L12,2 C12.276,2 12.5,2.224 12.5,2.5 C12.5,2.776 12.276,3 12,3 Z M12,18 L8,18 C7.724,18 7.5,17.776 7.5,17.5 C7.5,17.224 7.724,17 8,17 L12,17 C12.276,17 12.5,17.224 12.5,17.5 C12.5,17.776 12.276,18 12,18 Z" id="Copy" sketch:type="MSShapeGroup"></path> </g> </g>',
    svgClassName: '',
    text: '复制所选任务',
  },
  {
    liClassName: '',
    aClassName: 'action-bar-top-paste-item',
    svgHTML: '<g id="Page-1" stroke="none" stroke-width="1" fill-rule="evenodd" sketch:type="MSPage"> <g id="paste" sketch:type="MSArtboardGroup"> <path d="M15.5,2 L4.5,2 C3.121,2 2,3.121 2,4.5 L2,15.5 C2,16.879 3.121,18 4.5,18 L15.5,18 C16.879,18 18,16.879 18,15.5 L18,4.5 C18,3.121 16.879,2 15.5,2 L15.5,2 Z M17,15.5 C17,16.327 16.327,17 15.5,17 L4.5,17 C3.673,17 3,16.327 3,15.5 L3,4.5 C3,3.673 3.673,3 4.5,3 L15.5,3 C16.327,3 17,3.673 17,4.5 L17,15.5 L17,15.5 Z M11.353,8.646 C11.158,8.451 10.842,8.451 10.646,8.646 L6.5,12.793 L6.5,10 C6.5,9.724 6.276,9.5 6,9.5 C5.724,9.5 5.5,9.724 5.5,10 L5.5,14 C5.5,14.065 5.513,14.13 5.538,14.191 C5.589,14.313 5.687,14.411 5.809,14.462 C5.87,14.487 5.935,14.5 6,14.5 L10,14.5 C10.276,14.5 10.5,14.276 10.5,14 C10.5,13.724 10.276,13.5 10,13.5 L7.207,13.5 L11.353,9.353 C11.549,9.158 11.549,8.842 11.353,8.646" id="Paste" sketch:type="MSShapeGroup"></path> </g> </g>',
    svgClassName: '',
    text: '粘贴',
  },
  {
    liClassName: '',
    aClassName: 'action-bar-top-email-all',
    svgHTML: '<g stroke="none" stroke-width="1" fill-rule="evenodd"> <g id="email"> <path d="M4.5,17 C3.12,17 2,15.88 2,14.5 L2,5.5 C2,4.12 3.12,3 4.5,3 L15.5,3 C16.88,3 18,4.12 18,5.5 L18,14.5 C18,15.88 16.88,17 15.5,17 L4.5,17 Z M4.5,4 C3.68,4 3,4.68 3,5.5 L3,14.5 C3,15.32 3.68,16 4.5,16 L15.5,16 C16.32,16 17,15.32 17,14.5 L17,5.5 C17,4.68 16.32,4 15.5,4 L4.5,4 Z M10,11.5 C9.88,11.5 9.74,11.46 9.64,11.36 L4.14,5.86 C3.96,5.66 3.96,5.34 4.14,5.14 C4.34,4.96 4.66,4.96 4.86,5.14 L10,10.3 L15.14,5.14 C15.34,4.96 15.66,4.96 15.86,5.14 C16.04,5.34 16.04,5.66 15.86,5.86 L10.36,11.36 C10.26,11.46 10.12,11.5 10,11.5 L10,11.5 Z" id="X"></path> </g> </g>',
    svgClassName: 'email',
    text: '以电子邮件发送清单',
  },
  {
    liClassName: 'disabled',
    aClassName: 'action-bar-top-email-selected',
    svgHTML: '<g stroke="none" stroke-width="1" fill-rule="evenodd"> <g id="email"> <path d="M4.5,17 C3.12,17 2,15.88 2,14.5 L2,5.5 C2,4.12 3.12,3 4.5,3 L15.5,3 C16.88,3 18,4.12 18,5.5 L18,14.5 C18,15.88 16.88,17 15.5,17 L4.5,17 Z M4.5,4 C3.68,4 3,4.68 3,5.5 L3,14.5 C3,15.32 3.68,16 4.5,16 L15.5,16 C16.32,16 17,15.32 17,14.5 L17,5.5 C17,4.68 16.32,4 15.5,4 L4.5,4 Z M10,11.5 C9.88,11.5 9.74,11.46 9.64,11.36 L4.14,5.86 C3.96,5.66 3.96,5.34 4.14,5.14 C4.34,4.96 4.66,4.96 4.86,5.14 L10,10.3 L15.14,5.14 C15.34,4.96 15.66,4.96 15.86,5.14 C16.04,5.34 16.04,5.66 15.86,5.86 L10.36,11.36 C10.26,11.46 10.12,11.5 10,11.5 L10,11.5 Z" id="X"></path> </g> </g>',
    svgClassName: 'email',
    text: '用电子邮件发送所选任务',
  },
  {
    liClassName: '',
    aClassName: 'action-bar-top-print-all',
    svgHTML: '<g stroke="none" stroke-width="1" fill-rule="evenodd"> <g> <path d="M4.5,6 C3.12,6 2,7.12 2,8.5 L2,14.5 C2,14.78 2.22,15 2.5,15 L5,15 L5,17.5 C5,17.78 5.22,18 5.5,18 L14.5,18 C14.78,18 15,17.78 15,17.5 L15,15 L17.5,15 C17.78,15 18,14.78 18,14.5 L18,8.5 C18,7.12 16.88,6 15.5,6 L4.5,6 Z M17,14 L15,14 L15,12 L15.5,12 C15.78,12 16,11.78 16,11.5 C16,11.22 15.78,11 15.5,11 L4.5,11 C4.22,11 4,11.22 4,11.5 C4,11.78 4.22,12 4.5,12 L5,12 L5,14 L3,14 L3,8.5 C3,7.68 3.68,7 4.5,7 L15.5,7 C16.32,7 17,7.68 17,8.5 L17,14 Z M14,12 L14,17 L6,17 L6,12 L14,12 Z" id="Z"></path> <path d="M5.5,5 C5.78,5 6,4.78 6,4.5 L6,3 L14,3 L14,4.5 C14,4.78 14.22,5 14.5,5 C14.78,5 15,4.78 15,4.5 L15,2.5 C15,2.22 14.78,2 14.5,2 L5.5,2 C5.22,2 5,2.22 5,2.5 L5,4.5 C5,4.78 5.22,5 5.5,5 L5.5,5 Z" id="Path"></path> </g> </g>',
    svgClassName: 'print',
    text: '打印清单',
  },
  {
    liClassName: 'disabled',
    aClassName: 'action-bar-top-print-selected',
    svgHTML: '<g stroke="none" stroke-width="1" fill-rule="evenodd"> <g> <path d="M4.5,6 C3.12,6 2,7.12 2,8.5 L2,14.5 C2,14.78 2.22,15 2.5,15 L5,15 L5,17.5 C5,17.78 5.22,18 5.5,18 L14.5,18 C14.78,18 15,17.78 15,17.5 L15,15 L17.5,15 C17.78,15 18,14.78 18,14.5 L18,8.5 C18,7.12 16.88,6 15.5,6 L4.5,6 Z M17,14 L15,14 L15,12 L15.5,12 C15.78,12 16,11.78 16,11.5 C16,11.22 15.78,11 15.5,11 L4.5,11 C4.22,11 4,11.22 4,11.5 C4,11.78 4.22,12 4.5,12 L5,12 L5,14 L3,14 L3,8.5 C3,7.68 3.68,7 4.5,7 L15.5,7 C16.32,7 17,7.68 17,8.5 L17,14 Z M14,12 L14,17 L6,17 L6,12 L14,12 Z" id="Z"></path> <path d="M5.5,5 C5.78,5 6,4.78 6,4.5 L6,3 L14,3 L14,4.5 C14,4.78 14.22,5 14.5,5 C14.78,5 15,4.78 15,4.5 L15,2.5 C15,2.22 14.78,2 14.5,2 L5.5,2 C5.22,2 5,2.22 5,2.5 L5,4.5 C5,4.78 5.22,5 5.5,5 L5.5,5 Z" id="Path"></path> </g> </g>',
    svgClassName: 'print',
    text: '打印所选任务',
  },
  {
    liClassName: 'disabled',
    aClassName: 'action-bar-top-do-not-disturb',
    svgHTML: '<g stroke="none" stroke-width="1" fill-rule="evenodd"> <g id="do-no-disturb"> <path d="M15.474,10.7635 C16.694,9.9435 17.494,8.5635 17.494,7.0035 C17.494,4.5235 15.474,2.5035 12.994,2.5035 C11.434,2.5035 10.054,3.3035 9.234,4.5235 L7.354,2.6435 C7.234,2.5035 7.034,2.4635 6.854,2.5235 C6.674,2.5835 6.534,2.7235 6.514,2.9235 L5.514,9.4235 C5.494,9.5835 5.534,9.7435 5.654,9.8435 L10.154,14.3435 C10.254,14.4435 10.374,14.4835 10.494,14.4835 L10.574,14.4835 L17.074,13.4835 C17.274,13.4635 17.414,13.3235 17.474,13.1435 C17.534,12.9635 17.494,12.7635 17.354,12.6435 L15.474,10.7635 Z M12.994,3.5035 C14.914,3.5035 16.494,5.0835 16.494,7.0035 C16.494,8.3835 15.694,9.5835 14.514,10.1635 C14.474,10.1635 14.414,10.1835 14.374,10.2235 C13.954,10.4035 13.474,10.5035 12.994,10.5035 C11.054,10.5035 9.494,8.9435 9.494,7.0035 C9.494,6.5235 9.594,6.0435 9.774,5.6235 C9.814,5.5835 9.834,5.5235 9.834,5.4835 C10.414,4.3035 11.614,3.5035 12.994,3.5035 L12.994,3.5035 Z M15.954,12.6435 L10.674,13.4635 L6.534,9.3235 L7.354,4.0435 L8.774,5.4635 C8.594,5.9435 8.494,6.4635 8.494,7.0035 C8.494,9.4835 10.514,11.5035 12.994,11.5035 C13.534,11.5035 14.054,11.4035 14.534,11.2235 L15.954,12.6435 Z M11.134,8.8635 C11.234,8.9635 11.374,9.0035 11.494,9.0035 C11.614,9.0035 11.754,8.9635 11.854,8.8635 L12.994,7.7035 L14.134,8.8635 C14.234,8.9635 14.374,9.0035 14.494,9.0035 C14.614,9.0035 14.754,8.9635 14.854,8.8635 C15.034,8.6635 15.034,8.3435 14.854,8.1435 L13.694,7.0035 L14.854,5.8635 C15.034,5.6635 15.034,5.3435 14.854,5.1435 C14.654,4.9635 14.334,4.9635 14.134,5.1435 L12.994,6.3035 L11.854,5.1435 C11.654,4.9635 11.334,4.9635 11.134,5.1435 C10.954,5.3435 10.954,5.6635 11.134,5.8635 L12.294,7.0035 L11.134,8.1435 C10.954,8.3435 10.954,8.6635 11.134,8.8635 L11.134,8.8635 Z M6.994,16.3035 C6.714,16.5635 6.294,16.5635 6.014,16.3035 L3.694,13.9835 C3.434,13.7035 3.434,13.2835 3.694,13.0035 L5.354,11.3435 C5.554,11.1435 5.554,10.8435 5.354,10.6435 C5.154,10.4435 4.854,10.4435 4.654,10.6435 L2.994,12.3035 C2.334,12.9635 2.334,14.0235 2.994,14.6835 L5.314,17.0035 C5.654,17.3435 6.074,17.5035 6.514,17.5035 C6.934,17.5035 7.374,17.3435 7.694,17.0035 L9.354,15.3435 C9.554,15.1435 9.554,14.8435 9.354,14.6435 C9.154,14.4435 8.854,14.4435 8.654,14.6435 L6.994,16.3035 Z" id="®"></path> </g> </g>',
    svgClassName: 'do-no-disturb',
    text: [{className: { commonClassName:'un-mute'}, content: '勿扰',},{className: {commonClassName: 'status-label float-right', turnOn: 'on'}, content: '开启',},{className: { commonClassName:'status-label float-right', turnOn: 'off'}, content: '关闭',}],
  },
  {
    liClassName: 'last-menu-item disabled',
    aClassName: 'action-bar-top-trash disabled',
    svgHTML: '<g stroke="none" stroke-width="1" fill-rule="evenodd"> <g id="trash"> <path d="M12,3.5 C12,2.4 11.1,1.5 10,1.5 C8.9,1.5 8,2.4 8,3.5 L5.5,3.5 C4.68,3.5 4,4.18 4,5 L4,7 C4,7.28 4.22,7.5 4.5,7.5 L15.5,7.5 C15.78,7.5 16,7.28 16,7 L16,5 C16,4.18 15.32,3.5 14.5,3.5 L12,3.5 Z M10,2.5 C10.56,2.5 11,2.94 11,3.5 L9,3.5 C9,2.94 9.44,2.5 10,2.5 L10,2.5 Z M15,6.5 L5,6.5 L5,5 C5,4.72 5.22,4.5 5.5,4.5 L14.5,4.5 C14.78,4.5 15,4.72 15,5 L15,6.5 Z M14.5,8.5 C14.22,8.5 14,8.72 14,9 L14,16 C14,16.28 13.78,16.5 13.5,16.5 L6.5,16.5 C6.22,16.5 6,16.28 6,16 L6,9 C6,8.72 5.78,8.5 5.5,8.5 C5.22,8.5 5,8.72 5,9 L5,16 C5,16.82 5.68,17.5 6.5,17.5 L13.5,17.5 C14.32,17.5 15,16.82 15,16 L15,9 C15,8.72 14.78,8.5 14.5,8.5 L14.5,8.5 Z M9,9 C9,8.72 8.78,8.5 8.5,8.5 C8.22,8.5 8,8.72 8,9 L8,15 C8,15.28 8.22,15.5 8.5,15.5 C8.78,15.5 9,15.28 9,15 L9,9 Z M12,9 C12,8.72 11.78,8.5 11.5,8.5 C11.22,8.5 11,8.72 11,9 L11,15 C11,15.28 11.22,15.5 11.5,15.5 C11.78,15.5 12,15.28 12,15 L12,9 Z" id="j"></path> </g> </g>',
    svgClassName: 'trash',
    text: '删除所选任务',
  },
]
</script>

<style scoped>
#tasks{height: 100vh; position: relative; display: flex;}
.tasks-main{height: 100vh; position: relative; display: flex; flex-direction: column; flex:1;}
.list-toolbar{position: relative; height: 45px; min-height: 45px; display: flex; align-items: center; background: #0e91c5;}
.list-toolbar h1{flex:1; font-size: 20px; color: #fff; padding: 10px 14px; font-weight: 200; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; text-align: left;}
.action-bar{position: relative; opacity: 1; filter: none; transition: opacity 200ms ease-in;}

.action-bar-bottom{text-align: center; font-size: 0; height: 45px;}
.action-bar-bottom a{display: inline-block; min-width: 52px; padding: 6px;}
.action-bar-bottom a svg{fill: #fff;}
.action-bar-bottom a .tab-text{font-size: 12px; color: #fff; display: block; text-align: center;}
.action-bar.expanded .action-bar-bottom a{opacity: 0.4;}
.action-bar.expanded .action-bar-bottom a.active{opacity: 1; filter: none;}

.action-bar-top{position: absolute; width: 250px; right: 0; top: 45px; transition: height 120ms linear; z-index: 1; background: #0e91c5; overflow: hidden; }
.action-bar-top ul{position: absolute; z-index: 0; top: 0; left:0; right: 0;}
.action-bar.expanded .action-bar-top ul.active{z-index: 1;}
.action-bar-top li a.disabled{opacity: 0.4;}
.action-bar-top li{position: relative; padding: 2px; padding-top: 1px; opacity: 0; transition: opacity 200ms linear;}
.action-bar.expanded .action-bar-top ul.active li{opacity: 1; filter: none;}
.action-bar.expanded .action-bar-top ul.active li.disabled{opacity: 0.4;}
.action-bar-top li a{display: block; padding: 7px; padding-left: 34px; color: #fff; text-align: left; font-size: 14px;}
.action-bar-top ul.active li.disabled a{display: block; padding: 7px; padding-left: 34px; color: #fff; text-align: left; font-size: 14px;}
.action-bar-top li a svg{position: absolute; fill: #fff; top: 7px; left: 8px;}
.action-bar-top li a .status-label{font-size: 85%; text-transform: uppercase; padding: 1px; display: none; color: #b2b2b2;}
.action-bar-top li a .status-label.active{display: block;}

.tasks-scroll{flex: 1; padding:0 14px; overflow-y: auto; overflow-x: hidden; text-align: left;}
.addTask{position: relative; margin: 14px 0; padding: 0 12px; border-radius: 3px; background: rgba(14, 145, 197, 0.75);}
.addTask-meta{position: absolute; top: 12px; right: 0; opacity: 0; transition: opacity 200ms linear;}
.addTask.focus .addTask-meta{opacity: 1; filter: none;}
.plus-wrapper{position: absolute; width: 20px; height: 20px; top: 14px; left: 10px; opacity: .7; pointer-events: none;}
.plus-small{fill: #fff;}
.addTask-input{width: 100%; padding:13px 60px 14px 28px; font-weight: 500; line-height: 20px; font-size: 16px; color: #fff; user-select: none;}
.addTask-input::placeholder{color: rgba(255, 255, 255, 0.6);}
.speech-wrapper{position: absolute; width: 20px; height: 20px; top: 13px; left: 10px; opacity: .7; pointer-events: none;}
.speech{fill: #fff;}
.addTask-meta > .float-right{margin-right: 15px;}
.addTask-meta > .addTask-meta-star{margin-right: 9px;}

.addTask-meta-star, .addTask-meta-assign, .addTask-meta-date{opacity: 0.7; color: #fff;}
.addTask-meta-star.starred{opacity: 1; filter:none;}
.addTask-meta-star.starred svg path:last-child{opacity: 1; filter: none;}
.addTask-meta svg{fill: #fff;}
.addTask-meta-star.starred svg path:last-child{opacity: 1; filter: none;}

.addTask-meta-date{position: relative;}
.addTask-meta-date.dated{opacity: 1; filter:none;}
.addTask-meta-date .input-assign-delete{position: absolute; top: -8px; right: -8px; z-index: 2;}
.addTask-meta-date .input-assign-delete svg{width: 12px; height: 12px;}
.addTask-meta-date .addTask-meta-date-label{position: absolute; transform: scale(0.5); transform-origin: 0 0; top: 8px; left: 0; height: 20px; width: 40px; color: #fff; font-size: 16px; font-weight: bold; 
  text-align: center;}

.task-list{padding-bottom: 72px;}
.heading{margin-top: 20px; margin-bottom: 10px; font-size: 12px; color: #fff; word-wrap: break-word; word-break: break-word;}
.heading a{padding: 3px 10px; text-transform: uppercase; letter-spacing: 1px; font-weight: 400; line-height: 16px; border-radius: 3px; background: rgba(14, 145, 197, 0.75);}
.taskItem{height: 47px;}
.taskItem-body{height: 46px; display: flex; position: relative; align-items: center; padding: 0 4px; overflow: hidden; border-radius: 3px; background: #fff;}
.taskItem.selected .taskItem-body{background: #e1f2fe;}
.taskItem-checkboxWrapper{padding: 0 8px; height: 20px;}
.checkbox .task-check{stroke: rgba(0, 0, 0, 0.35);}
.checkbox .task-checked{fill: rgba(0, 0, 0, 0.35);}
.taskItem-titleWrapper{flex: 1; color: #262626; font-size: 16px; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-top: -3px;}
.conversations-wrapper{height: 20px; fill: rgba(0, 0, 0, 0.3); padding: 0 2px;}
.attachment-wrapper{width: 22px; height: 20px; fill: rgba(0, 0, 0, 0.3); padding: 0 2px;}
.recurrence-wrapper{height: 14px; fill: #328ad6; padding: 0 2px;}
.recurrence-wrapper svg{width: 14px; height: 14px;}
.star-wrapper{padding: 0 6px; fill: rgba(0, 0, 0, 0.3);}
.starred-wrapper{width: 30px; padding: 0 4px; fill: #d74e48;}

.taskItem-deadline, .taskTtem-assign{padding-left: 4px; padding-right: 4px;}
.taskItem-deadline{font-size:12px; color: #328ad6; max-width: 200px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;}
.taskItem-deadline.overdue{color: #b3312d;}

.task-404{padding: 25px; position: absolute; left: 0; right: 0; text-align: center; top: 50%; margin-top: -110px;}
.task-404 svg{height: 100px; width: 100px; fill: #fff; filter: drop-shadow(0 1px 0 rgba(0, 0, 0, 0.2));}
.task-404 h2{font-size: 18px; color: rgba(255, 255, 255, 0.85); filter: drop-shadow(0 1px 0 rgba(0, 0, 0, 0.2));}

.taskItem.done{opacity: 0.6;}
.checkbox.checked .task-check{display: none;}
.checkbox.checked .task-checked{display: block;}
.taskItem.done .taskItem-titleWrapper-title{text-decoration: line-through;}
.taskItem.done .taskItem-titleMeta-info{font-size: 10px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;}

.taskItem-progress{outline: 1px solid red; position: absolute; top: 0; left: 0; right: 0; height: 100%; opacity: 1; transition: all 225ms ease; pointer-events: none; filter: none;}
.taskItem-progress-bar{background: rgba(14,145,197,0.1); display: block; height: 100%; width: 0%; transition:all 225ms ease; border-right-width: 1px; border-right-style: solid; border-right-color: rgba(14,145,197,0.2);}

</style>

