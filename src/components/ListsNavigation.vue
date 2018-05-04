<template>
  <div id="lists-nav" v-bind:class="isCollapsed">
    <div class="lists-inner" tabindex="0">
      <div class="search-toolbar">
        <a class="toggle-icon" tabindex="0" title="toggle-slidebar" v-on:click="collapse">
          <svg class="list-toggle" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve"> <g> <path d="M0.5,3.5l19,0" style="fill:none;stroke-width:1px;stroke:white;"></path> <path d="M0.5,9.53l19,0" style="fill:none;stroke-width:1px;stroke:white;"></path> <path d="M0.5,15.5l19,0" style="fill:none;stroke-width:1px;stroke:white;"></path> </g> </svg>
        </a>

        <div class="search-input-wrapper">
          <input class="search-input chromeless" type="text" v-model="searchText" ref="search" @click="changeSearchIcon($event)">
        </div>

        <div class="search-icon-wrapper">
          <label class="search-icon" v-if="searchIcon === 'searchingIcon'">
            <svg class="search rtl-flip" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g stroke="none" stroke-width="1" fill-rule="evenodd"> <g> <path d="M8.5025,15 C4.9225,15 2.0025,12.08 2.0025,8.5 C2.0025,4.92 4.9225,2 8.5025,2 C12.0825,2 15.0025,4.92 15.0025,8.5 C15.0025,12.08 12.0825,15 8.5025,15 L8.5025,15 Z M8.5025,3 C5.4625,3 3.0025,5.46 3.0025,8.5 C3.0025,11.54 5.4625,14 8.5025,14 C11.5425,14 14.0025,11.54 14.0025,8.5 C14.0025,5.46 11.5425,3 8.5025,3 L8.5025,3 Z M17.5025,18 C17.3825,18 17.2425,17.96 17.1425,17.86 L13.6425,14.36 C13.4625,14.16 13.4625,13.84 13.6425,13.64 C13.8425,13.46 14.1625,13.46 14.3625,13.64 L17.8625,17.14 C18.0425,17.34 18.0425,17.66 17.8625,17.86 C17.7625,17.96 17.6225,18 17.5025,18 L17.5025,18 Z" id="z"></path> </g> </g> </svg>
            <input type="radio" class="hidden" name="search-icon" value="stopSearchingIcon" v-model="searchIcon">
          </label>
          <label class="search-stop-icon" v-else>
            <svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;"> <g> <path d="M9.991,10.832c-1.716,1.671 -3.445,3.329 -5.137,5.022c-0.058,0.052 -0.12,0.095 -0.195,0.12c-0.039,0.013 -0.05,0.014 -0.09,0.021c-0.046,0.004 -0.046,0.004 -0.092,0.004c-0.078,-0.007 -0.151,-0.024 -0.22,-0.062c-0.193,-0.108 -0.294,-0.336 -0.244,-0.551c0.018,-0.078 0.055,-0.143 0.102,-0.205c1.627,-1.785 3.329,-3.499 5.053,-5.19c-1.671,-1.716 -3.329,-3.445 -5.022,-5.137c-0.052,-0.058 -0.095,-0.12 -0.12,-0.195c-0.081,-0.242 0.039,-0.513 0.272,-0.616c0.056,-0.025 0.117,-0.04 0.179,-0.042c0.128,-0.006 0.242,0.038 0.342,0.114c1.785,1.627 3.499,3.329 5.19,5.053c1.716,-1.671 3.445,-3.329 5.137,-5.022c0.058,-0.052 0.12,-0.095 0.195,-0.12c0.059,-0.02 0.121,-0.028 0.182,-0.025c0.255,0.011 0.465,0.221 0.476,0.476c0.006,0.128 -0.038,0.242 -0.114,0.342c-1.627,1.785 -3.329,3.499 -5.053,5.19c1.671,1.716 3.329,3.445 5.022,5.137c0.052,0.058 0.095,0.12 0.12,0.195c0.07,0.21 -0.009,0.447 -0.191,0.571c-0.066,0.045 -0.137,0.069 -0.214,0.083c-0.046,0.004 -0.046,0.004 -0.092,0.004c-0.078,-0.007 -0.151,-0.024 -0.22,-0.062c-0.036,-0.02 -0.044,-0.028 -0.076,-0.052c-1.785,-1.627 -3.499,-3.329 -5.19,-5.053Z"></path> </g> </svg>
            <input type="radio" class="hidden" name="search-icon" value="searchingIcon" v-model="searchIcon">
          </label>
        </div>
      </div>

      <div class="user-toolbar">
        <a class="user" tabindex="0">
          <span class="user-avatar">
            <img src="http://via.placeholder.com/50x50" alt="" class="avatar medium">
          </span>
          <span class="user-name">{{ username }}</span>
          <span class="user-arrow">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;"> <g> <path d="M10.502,13c-0.132,0 -0.26,-0.053 -0.354,-0.146l-4.002,-4c-0.195,-0.195 -0.195,-0.512 0,-0.708c0.195,-0.195 0.512,-0.195 0.707,0l3.649,3.647l3.644,-3.647c0.195,-0.195 0.512,-0.195 0.707,0c0.195,0.195 0.195,0.512 0,0.708l-3.997,4c-0.094,0.093 -0.221,0.146 -0.354,0.146"></path> </g> </svg>
          </span>
          <div id="sync">
            <span class="offline-wrapper hidden">
              <svg class="offline" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;"> <g> <path d="M7.472,9.999l2.028,0c0.147,0 0.287,0.064 0.382,0.177c0.095,0.112 0.136,0.26 0.111,0.405l-0.587,3.525l3.192,-5.107l-2.098,0c-0.15,0 -0.291,-0.067 -0.386,-0.183c-0.095,-0.116 -0.133,-0.268 -0.104,-0.415l0.543,-2.716l-3.081,4.314ZM8.5,16.999c-0.059,0 -0.119,-0.011 -0.177,-0.032c-0.223,-0.085 -0.355,-0.315 -0.316,-0.55l0.903,-5.418l-2.41,0c-0.187,0 -0.359,-0.104 -0.444,-0.271c-0.086,-0.167 -0.071,-0.367 0.038,-0.52l4.999,-7c0.138,-0.192 0.394,-0.26 0.607,-0.168c0.215,0.094 0.336,0.326 0.291,0.557l-0.88,4.402l2.389,0c0.182,0 0.35,0.099 0.438,0.258c0.088,0.159 0.083,0.353 -0.014,0.507l-5,8c-0.093,0.15 -0.255,0.235 -0.424,0.235"></path> </g> </svg>
            </span>
            <span class="syncing-wrapper hidden">
              <svg class="sync" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;"> <g> <g> <path d="M10,16c-0.281,-0.002 -0.56,-0.019 -0.839,-0.058c-0.562,-0.079 -1.113,-0.238 -1.631,-0.472c-1.098,-0.497 -2.035,-1.328 -2.661,-2.359c-0.317,-0.521 -0.553,-1.091 -0.698,-1.684c-0.157,-0.641 -0.206,-1.307 -0.147,-1.964c0.052,-0.594 0.194,-1.179 0.42,-1.731c0.264,-0.648 0.644,-1.248 1.115,-1.766c0.501,-0.553 1.106,-1.01 1.774,-1.342c0.688,-0.342 1.44,-0.548 2.206,-0.606c0.579,-0.044 1.161,-0.003 1.727,0.125c0.311,0.07 0.613,0.168 0.91,0.281l0.042,0.018c0.111,0.061 0.198,0.147 0.245,0.266c0.087,0.221 0.002,0.481 -0.199,0.607c-0.053,0.033 -0.111,0.055 -0.171,0.067c-0.078,0.015 -0.153,0.008 -0.229,-0.009c-0.089,-0.03 -0.176,-0.065 -0.265,-0.096c-0.219,-0.074 -0.441,-0.136 -0.668,-0.183c-0.431,-0.09 -0.877,-0.113 -1.316,-0.079c-0.496,0.037 -0.986,0.149 -1.448,0.332c-0.861,0.339 -1.62,0.921 -2.174,1.662c-0.339,0.453 -0.6,0.963 -0.768,1.504c-0.169,0.542 -0.243,1.113 -0.221,1.681c0.023,0.601 0.154,1.197 0.389,1.752c0.258,0.611 0.64,1.168 1.114,1.632c0.475,0.463 1.042,0.832 1.66,1.075c0.562,0.222 1.164,0.339 1.768,0.347c0.566,0.007 1.133,-0.081 1.669,-0.263c0.649,-0.219 1.251,-0.575 1.758,-1.036c0.565,-0.514 1.011,-1.157 1.291,-1.868c0.183,-0.462 0.295,-0.952 0.332,-1.448c0.037,-0.479 0.003,-0.961 -0.103,-1.431c-0.06,-0.264 -0.144,-0.521 -0.24,-0.774l-0.015,-0.044c-0.028,-0.123 -0.022,-0.245 0.036,-0.359c0.027,-0.055 0.065,-0.105 0.111,-0.146c0.177,-0.159 0.45,-0.171 0.638,-0.026c0.063,0.048 0.108,0.108 0.146,0.177c0.035,0.081 0.033,0.081 0.065,0.164c0.092,0.258 0.174,0.52 0.234,0.788c0.111,0.491 0.158,0.995 0.139,1.498c-0.023,0.6 -0.136,1.195 -0.335,1.762c-0.257,0.73 -0.658,1.408 -1.172,1.987c-0.559,0.63 -1.251,1.141 -2.019,1.489c-0.659,0.298 -1.365,0.468 -2.085,0.518c-0.128,0.007 -0.256,0.011 -0.385,0.012Z"></path> </g> </g> </svg>
            </span>
          </div>
        </a>
        <div class="stream-counts">
          <a class="activities-count">
            <svg class="bell" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g stroke="none" stroke-width="1" fill-rule="evenodd"> <g id="bell"> <path d="M15.2,10.14 C14.74,9.6 14.46,8.92 14.4,8.2 L14.28,6.94 C14.14,5.08 12.76,3.54 11,3.12 L11,3 C11,2.44 10.56,2 10,2 C9.44,2 9,2.44 9,3 L9,3.12 C7.24,3.54 5.86,5.08 5.72,6.94 L5.6,8.2 C5.54,8.92 5.28,9.6 4.8,10.16 L4.04,11.06 C3.38,11.88 3,12.9 3,13.94 L3,14.5 C3,14.78 3.22,15 3.5,15 L16.5,15 C16.78,15 17,14.78 17,14.5 L17,13.94 C17,12.9 16.62,11.88 15.96,11.06 L15.2,10.14 Z M16,14 L4,14 L4,13.94 C4,13.14 4.28,12.34 4.82,11.7 L5.58,10.8 C6.18,10.08 6.52,9.2 6.6,8.28 L6.7,7.02 C6.84,5.34 8.3,4 10,4 C11.7,4 13.16,5.34 13.3,7.02 L13.4,8.28 C13.48,9.2 13.84,10.08 14.42,10.8 L15.18,11.7 C15.72,12.34 16,13.14 16,13.94 L16,14 Z M12.3,16.1 C12.08,15.94 11.76,15.98 11.58,16.2 C10.82,17.22 9.18,17.22 8.4,16.2 C8.24,15.98 7.92,15.94 7.7,16.1 C7.48,16.26 7.44,16.58 7.62,16.8 C8.18,17.56 9.06,18 10,18 C10.94,18 11.82,17.56 12.38,16.8 C12.56,16.58 12.52,16.26 12.3,16.1 L12.3,16.1 Z" id="m"></path> </g> </g> </svg>
            <span class="count hidden">10</span>
          </a>
          <a class="conversations-count">
            <svg class="conversations rtl-flip" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g stroke="none" stroke-width="1" fill-rule="evenodd"> <g id="conversations"> <path d="M3.46,18 C3.28,17.98 3.1,17.86 3.04,17.68 C2.96,17.5 3,17.3 3.12,17.16 C4.1,16.08 4.3,14.12 3.54,13.12 C3.18,12.64 2.72,12 2.42,11.26 C2.14,10.52 2,9.76 2,9 C2,5.14 5.58,2 10,2 C14.42,2 18,5.14 18,9 C18,12.82 14.46,15.96 10.08,16 L10,16 C8.7,16 7.42,15.72 6.28,15.2 C6.02,15.08 5.92,14.78 6.04,14.54 C6.14,14.28 6.44,14.18 6.7,14.28 C7.68,14.74 8.8,14.98 9.92,15 L10,15 C13.86,15 17,12.3 17,9 C17,5.68 13.86,3 10,3 C6.14,3 3,5.68 3,9 C3,9.64 3.12,10.28 3.36,10.88 C3.6,11.52 4,12.08 4.34,12.52 C5.2,13.64 5.22,15.52 4.48,16.96 C5.2,16.84 5.92,16.56 6.52,16.1 C6.74,15.94 7.06,15.98 7.22,16.2 C7.38,16.42 7.34,16.74 7.12,16.9 C6.16,17.62 5,18 3.82,18 L3.46,18 Z" id="I"></path> </g> </g> </svg>
            <span class="count hidden">0</span>
          </a>
        </div>
      </div>

      <div class="lists-scroll">
        <ul class="filters-collection">
          <li v-for="(item, index) in filtersCollection" class="sidebar-item" v-bind:tabindex="item.isAnimateUp ? -1 : 0" v-bind:class="{'animate-up': item.isAnimateUp, active: item.active, overdue: item.overdue}" @click="selectItem($event, index, 'filters')">
            <a v-bind:href="'#/lists/' + item.className">
              <span class="list-icon" :title="item.title"><svg :class="item.className" v-html="item.listIcon" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"></svg></span>
              <span class="title">{{item.title}}</span>
              <span class="overdue-count">{{item.overdueCount}}</span>
              <span class="count">{{item.count}}</span>
              <span class="list-options" title="清单选项"><svg class="options rtl-flip" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g stroke="none" stroke-width="1" fill-rule="evenodd"> <g id="options"> <path d="M17.1330617,2.8594383 C15.9930617,1.7194383 14.0130617,1.7194383 12.8930617,2.8594383 L5.5130617,10.2394383 C5.3330617,10.4394383 5.3330617,10.7594383 5.5130617,10.9594383 C5.7130617,11.1394383 6.0330617,11.1394383 6.2330617,10.9594383 L13.5930617,3.5594383 C14.3530617,2.7994383 15.6730617,2.7994383 16.4130617,3.5594383 C17.1730617,4.3194383 17.1930617,5.5594383 16.4130617,6.3394383 L9.0330617,13.7594383 C8.7130617,14.0794383 8.9330617,14.6194383 9.3730617,14.6194383 C9.5130617,14.6194383 9.6330617,14.5594383 9.7330617,14.4594383 L17.1330617,7.0394383 C18.2930617,5.8794383 18.2930617,4.0194383 17.1330617,2.8594383 L17.1330617,2.8594383 Z M8.4930617,15.3594383 C8.0330617,13.4594383 6.5130617,11.9394383 4.6130617,11.4794383 C4.3530617,11.4194383 4.0930617,11.5794383 4.0130617,11.8194383 L2.0330617,17.3194383 C1.8730617,17.7194383 2.2730617,18.1194383 2.6730617,17.9594383 C8.6730617,15.7794383 8.2530617,15.9594383 8.3730617,15.8194383 C8.4930617,15.6994383 8.5330617,15.5194383 8.4930617,15.3594383 L8.4930617,15.3594383 Z M3.3330617,16.6594383 L4.8130617,12.5794383 C6.0130617,12.9994383 6.9730617,13.9794383 7.3930617,15.1794383 L3.3330617,16.6594383 Z" id="N"></path> </g> </g> </svg></span>
            </a>
          </li>
        </ul>

        <ul class="lists-collection">
          <li v-for="(item, index) in listsCollection" class="sidebar-item owner list draggable" :class="{active: item.active}" @click="selectItem($event, index, 'lists')">
            <a v-bind:href="item.href">
              <span class="list-icon" :title="item.title"><svg class="list rtl-flip" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g id="Web-svgs" stroke="none" stroke-width="1" fill-rule="evenodd"> <g id="list"> <path d="M3,7 C2.44,7 2,6.56 2,6 L2,5 C2,4.44 2.44,4 3,4 L4,4 C4.56,4 5,4.44 5,5 L5,6 C5,6.56 4.56,7 4,7 L3,7 Z M4,5 L3,5 L3,6 L4,6 L4,5 Z M7.5,6 C7.22,6 7,5.78 7,5.5 C7,5.22 7.22,5 7.5,5 L17.5,5 C17.78,5 18,5.22 18,5.5 C18,5.78 17.78,6 17.5,6 L7.5,6 Z M3,12 C2.44,12 2,11.56 2,11 L2,10 C2,9.44 2.44,9 3,9 L4,9 C4.56,9 5,9.44 5,10 L5,11 C5,11.56 4.56,12 4,12 L3,12 Z M4,10 L3,10 L3,11 L4,11 L4,10 Z M7.5,11 C7.22,11 7,10.78 7,10.5 C7,10.22 7.22,10 7.5,10 L17.5,10 C17.78,10 18,10.22 18,10.5 C18,10.78 17.78,11 17.5,11 L7.5,11 Z M3,17 C2.44,17 2,16.56 2,16 L2,15 C2,14.44 2.44,14 3,14 L4,14 C4.56,14 5,14.44 5,15 L5,16 C5,16.56 4.56,17 4,17 L3,17 Z M4,15 L3,15 L3,16 L4,16 L4,15 Z M7.5,16 C7.22,16 7,15.78 7,15.5 C7,15.22 7.22,15 7.5,15 L17.5,15 C17.78,15 18,15.22 18,15.5 C18,15.78 17.78,16 17.5,16 L7.5,16 Z" id="K"> </path> </g> </g> </svg></span>
              <span class="title">{{item.title}}</span>
              <span class="overdue-count">{{item.overdueCount}}</span>
              <span class="count">{{item.count}}</span>
              <span class="list-options" title="清单选项"><svg class="options rtl-flip" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g stroke="none" stroke-width="1" fill-rule="evenodd"> <g id="options"> <path d="M17.1330617,2.8594383 C15.9930617,1.7194383 14.0130617,1.7194383 12.8930617,2.8594383 L5.5130617,10.2394383 C5.3330617,10.4394383 5.3330617,10.7594383 5.5130617,10.9594383 C5.7130617,11.1394383 6.0330617,11.1394383 6.2330617,10.9594383 L13.5930617,3.5594383 C14.3530617,2.7994383 15.6730617,2.7994383 16.4130617,3.5594383 C17.1730617,4.3194383 17.1930617,5.5594383 16.4130617,6.3394383 L9.0330617,13.7594383 C8.7130617,14.0794383 8.9330617,14.6194383 9.3730617,14.6194383 C9.5130617,14.6194383 9.6330617,14.5594383 9.7330617,14.4594383 L17.1330617,7.0394383 C18.2930617,5.8794383 18.2930617,4.0194383 17.1330617,2.8594383 L17.1330617,2.8594383 Z M8.4930617,15.3594383 C8.0330617,13.4594383 6.5130617,11.9394383 4.6130617,11.4794383 C4.3530617,11.4194383 4.0930617,11.5794383 4.0130617,11.8194383 L2.0330617,17.3194383 C1.8730617,17.7194383 2.2730617,18.1194383 2.6730617,17.9594383 C8.6730617,15.7794383 8.2530617,15.9594383 8.3730617,15.8194383 C8.4930617,15.6994383 8.5330617,15.5194383 8.4930617,15.3594383 L8.4930617,15.3594383 Z M3.3330617,16.6594383 L4.8130617,12.5794383 C6.0130617,12.9994383 6.9730617,13.9794383 7.3930617,15.1794383 L3.3330617,16.6594383 Z" id="N"></path> </g> </g> </svg></span>
            </a>
          </li>
        </ul>

        <a class="more-button" v-on:click="collapse">
          <svg class="more-vertical" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;"> <g> <path d="M8,15.5c0,-0.828 0.672,-1.5 1.5,-1.5c0.828,0 1.5,0.672 1.5,1.5c0,0.828 -0.672,1.5 -1.5,1.5c-0.828,0 -1.5,-0.672 -1.5,-1.5Z"></path> <path d="M8,9.5c0,-0.828 0.672,-1.5 1.5,-1.5c0.828,0 1.5,0.672 1.5,1.5c0,0.828 -0.672,1.5 -1.5,1.5c-0.828,0 -1.5,-0.672 -1.5,-1.5Z"></path> <path d="M8,3.5c0,-0.828 0.672,-1.5 1.5,-1.5c0.828,0 1.5,0.672 1.5,1.5c0,0.828 -0.672,1.5 -1.5,1.5c-0.828,0 -1.5,-0.672 -1.5,-1.5Z"></path> </g> </svg>
        </a>
      </div>
      <div class="sidebar-actions">
        <a class="sidebar-actions-addList">
          <span class="sidebar-actions-icon">
            <svg class="plus-small" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve"> <g> <path d="M10,10l0,6.5c-0.003,0.053 -0.008,0.103 -0.024,0.155c-0.038,0.116 -0.12,0.217 -0.226,0.278c-0.047,0.027 -0.094,0.042 -0.146,0.056c-0.052,0.008 -0.051,0.008 -0.104,0.011c-0.053,-0.003 -0.103,-0.008 -0.155,-0.024c-0.15,-0.05 -0.271,-0.171 -0.321,-0.321c-0.016,-0.052 -0.021,-0.102 -0.024,-0.155l0,-6.5l-6.5,0c-0.046,-0.002 -0.058,-0.001 -0.104,-0.011c-0.103,-0.022 -0.197,-0.076 -0.268,-0.154c-0.169,-0.188 -0.169,-0.482 0,-0.67c0.035,-0.038 0.077,-0.072 0.122,-0.098c0.078,-0.045 0.161,-0.062 0.25,-0.067l6.5,0l0,-6.5c0.005,-0.089 0.022,-0.172 0.067,-0.25c0.126,-0.219 0.406,-0.31 0.636,-0.207c0.048,0.022 0.093,0.05 0.132,0.085c0.078,0.071 0.132,0.165 0.154,0.268c0.01,0.046 0.009,0.058 0.011,0.104l0,6.5l6.5,0c0.046,0.002 0.058,0.001 0.104,0.011c0.103,0.022 0.197,0.076 0.268,0.154c0.169,0.188 0.169,0.482 0,0.67c-0.035,0.038 -0.077,0.072 -0.122,0.098c-0.078,0.045 -0.161,0.062 -0.25,0.067l-6.5,0Z"></path> </g> </svg>
          </span>
          <span class="sidebar-actions-label">创建清单</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListsNavigation',
  props: ['username'],
  data() {
    return {
      searchIcon: 'searchingIcon',
      searchText: '',
      isCollapsed: '',
      filtersCollection: [
        {
          isAnimateUp: false,
          href: '#/lists/index',
          className: 'inbox',
          title: '收件箱',
          listIcon: '<g stroke="none" stroke-width="1" fill-rule="evenodd"> <g> <path d="M10,15 C8.8,15 7.78,14.14 7.56,13 L2.5,13 C2.22,13 2,12.78 2,12.5 L2,3.5 C2,2.68 2.68,2 3.5,2 L16.5,2 C17.32,2 18,2.68 18,3.5 L18,12.5 C18,12.78 17.78,13 17.5,13 L12.44,13 C12.22,14.14 11.2,15 10,15 L10,15 Z M3,12 L8,12 C8.28,12 8.5,12.22 8.5,12.5 C8.5,13.32 9.18,14 10,14 C10.82,14 11.5,13.32 11.5,12.5 C11.5,12.22 11.72,12 12,12 L17,12 L17,3.5 C17,3.22 16.78,3 16.5,3 L3.5,3 C3.22,3 3,3.22 3,3.5 L3,12 Z M5.5,6 C5.22,6 5,5.78 5,5.5 C5,5.22 5.22,5 5.5,5 L14.5,5 C14.78,5 15,5.22 15,5.5 C15,5.78 14.78,6 14.5,6 L5.5,6 Z M5.5,8 C5.22,8 5,7.78 5,7.5 C5,7.22 5.22,7 5.5,7 L14.5,7 C14.78,7 15,7.22 15,7.5 C15,7.78 14.78,8 14.5,8 L5.5,8 Z M5.5,10 C5.22,10 5,9.78 5,9.5 C5,9.22 5.22,9 5.5,9 L14.5,9 C14.78,9 15,9.22 15,9.5 C15,9.78 14.78,10 14.5,10 L5.5,10 Z M3.5,18 C2.68,18 2,17.32 2,16.5 L2,14.5 C2,14.22 2.22,14 2.5,14 C2.78,14 3,14.22 3,14.5 L3,16.5 C3,16.78 3.22,17 3.5,17 L16.5,17 C16.78,17 17,16.78 17,16.5 L17,14.5 C17,14.22 17.22,14 17.5,14 C17.78,14 18,14.22 18,14.5 L18,16.5 C18,17.32 17.32,18 16.5,18 L3.5,18 Z" id="A"></path> </g> </g>',
          overdueCount: 10,
          count: 1,
          active: false,
          overdue: true,
        },{
          isAnimateUp: true,
          className: 'assigned',
          title: '分配给我',
          listIcon: '<g stroke="none" stroke-width="1" fill-rule="evenodd"> <g> <g id="Rectangle-3-+-A" transform="translate(1.000000, 2.000000)"> <path d="M10,10 C12.28,10 14,6.84 14,4 C14,1.8 12.2,0 10,0 C7.8,0 6,1.8 6,4 C6,6.5 7.52,10 10,10 L10,10 Z M4.94,7.74 C4.98,7.66 5,7.58 5,7.5 C5,7.42 4.98,7.34 4.94,7.26 C4.92,7.22 4.9,7.18 4.86,7.14 L2.86,5.14 C2.66,4.96 2.34,4.96 2.14,5.14 C1.96,5.34 1.96,5.66 2.14,5.86 L3.3,7 L0.5,7 C0.22,7 0,7.22 0,7.5 C0,7.78 0.22,8 0.5,8 L3.3,8 L2.14,9.14 C1.96,9.34 1.96,9.66 2.14,9.86 C2.24,9.96 2.38,10 2.5,10 C2.62,10 2.76,9.96 2.86,9.86 L4.86,7.86 C4.9,7.82 4.92,7.78 4.94,7.74 L4.94,7.74 Z M16.76,12.88 C16.56,12 15.9,11.28 15.02,11.04 L12.72,10.36 C12.58,10.32 12.46,10.26 12.36,10.14 C12.16,9.96 11.84,9.96 11.66,10.16 C11.46,10.34 8.54,10.34 8.36,10.14 C8.16,9.96 7.84,9.96 7.64,10.14 C7.54,10.24 7.42,10.32 7.28,10.36 L5.04,10.96 C4.14,11.2 3.46,11.92 3.24,12.82 L3.02,13.9 C2.98,14.06 3.02,14.24 3.14,14.36 C3.22,14.42 4.86,16 10,16 C15.14,16 16.78,14.42 16.86,14.36 C16.98,14.24 17.02,14.06 16.98,13.9 L16.76,12.88 Z" fill-opacity="0.06"></path> <path d="M10,10 C12.28,10 14,6.84 14,4 C14,1.8 12.2,0 10,0 C7.8,0 6,1.8 6,4 C6,6.5 7.52,10 10,10 L10,10 Z M10,1 C11.66,1 13,2.34 13,4 C13,6.26 11.62,9 10,9 C8.34,9 7,6.26 7,4 C7,2.34 8.34,1 10,1 L10,1 Z M4.94,7.74 C4.98,7.66 5,7.58 5,7.5 C5,7.42 4.98,7.34 4.94,7.26 C4.92,7.22 4.9,7.18 4.86,7.14 L2.86,5.14 C2.66,4.96 2.34,4.96 2.14,5.14 C1.96,5.34 1.96,5.66 2.14,5.86 L3.3,7 L0.5,7 C0.22,7 0,7.22 0,7.5 C0,7.78 0.22,8 0.5,8 L3.3,8 L2.14,9.14 C1.96,9.34 1.96,9.66 2.14,9.86 C2.24,9.96 2.38,10 2.5,10 C2.62,10 2.76,9.96 2.86,9.86 L4.86,7.86 C4.9,7.82 4.92,7.78 4.94,7.74 L4.94,7.74 Z M16.76,12.88 C16.56,12 15.9,11.28 15.02,11.04 L12.72,10.36 C12.58,10.32 12.46,10.26 12.36,10.14 C12.16,9.96 11.84,9.96 11.66,10.16 C11.46,10.34 11.46,10.66 11.66,10.86 C11.88,11.08 12.14,11.24 12.44,11.32 L14.74,12 C15.26,12.14 15.66,12.58 15.78,13.1 L15.94,13.8 C15.4,14.16 13.7,15 10,15 C6.3,15 4.6,14.14 4.06,13.8 L4.22,13.04 C4.34,12.5 4.76,12.06 5.3,11.92 L7.54,11.32 C7.84,11.24 8.12,11.08 8.36,10.86 C8.54,10.66 8.54,10.34 8.36,10.14 C8.16,9.96 7.84,9.96 7.64,10.14 C7.54,10.24 7.42,10.32 7.28,10.36 L5.04,10.96 C4.14,11.2 3.46,11.92 3.24,12.82 L3.02,13.9 C2.98,14.06 3.02,14.24 3.14,14.36 C3.22,14.42 4.86,16 10,16 C15.14,16 16.78,14.42 16.86,14.36 C16.98,14.24 17.02,14.06 16.98,13.9 L16.76,12.88 Z"> </path> </g> </g> </g>',
          overdueCount: 10,
          count: 1,
          active: false,
          overdue: false,
        },{
          isAnimateUp: false,
          className: 'starred',
          title: '已加星标',
          listIcon: '<g id="Web-svgs" stroke="none" stroke-width="1" fill-rule="evenodd"> <g id="starred"> <g id="Rectangle-3-+-A" transform="translate(1.000000, 0.000000)"> <path d="M3.74,18 C3.64,18 3.54,17.96 3.46,17.9 C3.28,17.76 3.2,17.54 3.28,17.34 L5.16,11.5 L0.2,7.9 C0.04,7.78 -0.04,7.56 0.02,7.34 C0.1,7.14 0.28,7 0.5,7 L6.64,7 L8.52,1.16 C8.66,0.76 9.34,0.76 9.48,1.16 L11.38,7 L17.5,7 C17.72,7 17.9,7.14 17.98,7.34 C18.04,7.56 17.96,7.78 17.8,7.9 L12.84,11.5 L14.72,17.34 C14.8,17.54 14.72,17.76 14.54,17.9 C14.38,18.02 14.14,18.02 13.96,17.9 L9,14.3 L4.04,17.9 C3.96,17.96 3.84,18 3.74,18 L3.74,18 Z M9,13.18 C9.1,13.18 9.2,13.2 9.3,13.28 L13.3,16.18 L11.78,11.46 C11.7,11.26 11.78,11.04 11.96,10.92 L15.96,8 L11,8 C10.8,8 10.6,7.86 10.54,7.66 L9,2.94 L7.46,7.66 C7.4,7.86 7.22,8 7,8 L2.04,8 L6.04,10.92 C6.22,11.04 6.3,11.26 6.22,11.46 L4.7,16.18 L8.7,13.28 C8.8,13.2 8.9,13.18 9,13.18 L9,13.18 Z" id="C"></path> <path d="M3.74,18 C3.64,18 3.54,17.96 3.46,17.9 C3.28,17.76 3.2,17.54 3.28,17.34 L5.16,11.5 L0.2,7.9 C0.04,7.78 -0.04,7.56 0.02,7.34 C0.1,7.14 0.28,7 0.5,7 L6.64,7 L8.52,1.16 C8.66,0.76 9.34,0.76 9.48,1.16 L11.38,7 L17.5,7 C17.72,7 17.9,7.14 17.98,7.34 C18.04,7.56 17.96,7.78 17.8,7.9 L12.84,11.5 L14.72,17.34 C14.8,17.54 14.72,17.76 14.54,17.9 C14.38,18.02 14.14,18.02 13.96,17.9 L9,14.3 L4.04,17.9 C3.96,17.96 3.84,18 3.74,18 L3.74,18 Z" id="D" opacity="0.06"> </path> </g> </g>',
          overdueCount: 10,
          count: 1,
          active: false,
          overdue: false,
        },{
          isAnimateUp: true,
          className: 'today',
          title: '今天',
          listIcon: '<g stroke="none" stroke-width="1" fill-rule="evenodd"> <g id="today"> <path d="M2.5,7 C2.22,7 2,6.78 2,6.5 L2,3.5 C2,2.68 2.68,2 3.5,2 L16.5,2 C17.32,2 18,2.68 18,3.5 L18,6.5 C18,6.78 17.78,7 17.5,7 L2.5,7 Z M3,6 L17,6 L17,3.5 C17,3.22 16.78,3 16.5,3 L3.5,3 C3.22,3 3,3.22 3,3.5 L3,6 Z M3.5,18 C2.68,18 2,17.32 2,16.5 L2,8.5 C2,8.22 2.22,8 2.5,8 C2.78,8 3,8.22 3,8.5 L3,16.5 C3,16.78 3.22,17 3.5,17 L16.5,17 C16.78,17 17,16.78 17,16.5 L17,8.5 C17,8.22 17.22,8 17.5,8 C17.78,8 18,8.22 18,8.5 L18,16.5 C18,17.32 17.32,18 16.5,18 L3.5,18 Z" id="E"></path> </g> </g>',
          overdueCount: 10,
          count: 1,
          active: false,
          overdue: false,
        },{
          isAnimateUp: true,
          className: 'week',
          title: '周',
          listIcon: '<g stroke="none" stroke-width="1" fill-rule="evenodd"> <g id="week"> <path d="M2.5,7 C2.22,7 2,6.78 2,6.5 L2,3.5 C2,2.68 2.68,2 3.5,2 L16.5,2 C17.32,2 18,2.68 18,3.5 L18,6.5 C18,6.78 17.78,7 17.5,7 L2.5,7 Z M3,6 L17,6 L17,3.5 C17,3.22 16.78,3 16.5,3 L3.5,3 C3.22,3 3,3.22 3,3.5 L3,6 Z M3.5,18 C2.68,18 2,17.32 2,16.5 L2,8.5 C2,8.22 2.22,8 2.5,8 C2.78,8 3,8.22 3,8.5 L3,16.5 C3,16.78 3.22,17 3.5,17 L16.5,17 C16.78,17 17,16.78 17,16.5 L17,8.5 C17,8.22 17.22,8 17.5,8 C17.78,8 18,8.22 18,8.5 L18,16.5 C18,17.32 17.32,18 16.5,18 L3.5,18 Z M5.5,15 C5.22,15 5,14.78 5,14.5 L5,9.5 C5,9.22 5.22,9 5.5,9 C5.78,9 6,9.22 6,9.5 L6,14.5 C6,14.78 5.78,15 5.5,15 L5.5,15 Z M8.5,15 C8.22,15 8,14.78 8,14.5 L8,9.5 C8,9.22 8.22,9 8.5,9 C8.78,9 9,9.22 9,9.5 L9,14.5 C9,14.78 8.78,15 8.5,15 L8.5,15 Z M11.5,15 C11.22,15 11,14.78 11,14.5 L11,9.5 C11,9.22 11.22,9 11.5,9 C11.78,9 12,9.22 12,9.5 L12,14.5 C12,14.78 11.78,15 11.5,15 L11.5,15 Z M14.5,15 C14.22,15 14,14.78 14,14.5 L14,9.5 C14,9.22 14.22,9 14.5,9 C14.78,9 15,9.22 15,9.5 L15,14.5 C15,14.78 14.78,15 14.5,15 L14.5,15 Z" id="F"></path> </g> </g>',
          overdueCount: 10,
          count: 1,
          active: false,
          overdue: false,
        },{
          isAnimateUp: true,
          className: 'all',
          title: '全部',
          listIcon: '<g stroke="none" stroke-width="1" fill-rule="evenodd"> <g> <g transform="translate(1.000000, 5.000000)"> <path d="M10.04,7.78 C9.88,7.56 10.16,7.1 10.16,7.1 L9.44,5.24 C9.44,5.24 6.92,10 4.5,10 C2.02,10 0,7.76 0,5 C0,2.24 2.02,0 4.5,0 C6.22,0 7.3,1.26 7.96,2.22 C8.12,2.44 7.84,2.92 7.84,2.92 L8.56,4.76 C8.56,4.76 11.08,0 13.5,0 C15.98,0 18,2.24 18,5 C18,7.76 15.98,10 13.5,10 C11.78,10 10.7,8.74 10.04,7.78 Z" fill-opacity="0.06"></path> <path d="M13.5,10 C11.78,10 10.7,8.74 10.04,7.78 C9.88,7.56 9.94,7.24 10.16,7.1 C10.38,6.94 10.7,6.98 10.86,7.22 C11.72,8.44 12.54,9 13.5,9 C15.42,9 17,7.2 17,5 C17,2.8 15.42,1 13.5,1 C11.68,1 10.6,3.06 9.44,5.24 C8.2,7.58 6.92,10 4.5,10 C2.02,10 0,7.76 0,5 C0,2.24 2.02,0 4.5,0 C6.22,0 7.3,1.26 7.96,2.22 C8.12,2.44 8.06,2.76 7.84,2.92 C7.62,3.06 7.3,3.02 7.14,2.78 C6.28,1.56 5.46,1 4.5,1 C2.58,1 1,2.8 1,5 C1,7.2 2.58,9 4.5,9 C6.32,9 7.4,6.94 8.56,4.76 C9.8,2.42 11.08,0 13.5,0 C15.98,0 18,2.24 18,5 C18,7.76 15.98,10 13.5,10 L13.5,10 Z"></path> </g> </g> </g>',
          overdueCount: 10,
          count: 4,
          active: false,
          overdue: false,
        },{
          isAnimateUp: false,
          className: 'completed',
          title: '已完成',
          listIcon: '<g stroke="none" stroke-width="1" fill-rule="evenodd"> <g id="completed"> <path d="M7.48412073,16.9975 C7.36412073,16.9975 7.24412073,16.9375 7.14412073,16.8575 C5.66412073,15.3575 4.00412073,14.0375 2.24412073,12.9175 C2.00412073,12.7775 1.92412073,12.4575 2.08412073,12.2375 C2.22412073,11.9975 2.54412073,11.9375 2.76412073,12.0775 C4.42412073,13.1175 5.98412073,14.3375 7.38412073,15.6975 C10.3441207,10.8175 13.3841207,6.9175 17.1441207,3.1375 C17.3441207,2.9575 17.6641207,2.9575 17.8641207,3.1375 C18.0441207,3.3375 18.0441207,3.6575 17.8641207,3.8575 C14.0041207,7.6975 10.9441207,11.6775 7.92412073,16.7575 C7.84412073,16.8775 7.70412073,16.9775 7.56412073,16.9975 L7.48412073,16.9975 Z" id="H"></path> </g> </g>',
          overdueCount: undefined,
          count: undefined,
          active: false,
          overdue: false,
        },
      ],
      listsCollection:[
        {
          isAnimateUp: false,
          href: '#/lists/3429677865',
          title: '工作',
          listIcon: '<g id="Web-svgs" stroke="none" stroke-width="1" fill-rule="evenodd"> <g id="list"> <path d="M3,7 C2.44,7 2,6.56 2,6 L2,5 C2,4.44 2.44,4 3,4 L4,4 C4.56,4 5,4.44 5,5 L5,6 C5,6.56 4.56,7 4,7 L3,7 Z M4,5 L3,5 L3,6 L4,6 L4,5 Z M7.5,6 C7.22,6 7,5.78 7,5.5 C7,5.22 7.22,5 7.5,5 L17.5,5 C17.78,5 18,5.22 18,5.5 C18,5.78 17.78,6 17.5,6 L7.5,6 Z M3,12 C2.44,12 2,11.56 2,11 L2,10 C2,9.44 2.44,9 3,9 L4,9 C4.56,9 5,9.44 5,10 L5,11 C5,11.56 4.56,12 4,12 L3,12 Z M4,10 L3,10 L3,11 L4,11 L4,10 Z M7.5,11 C7.22,11 7,10.78 7,10.5 C7,10.22 7.22,10 7.5,10 L17.5,10 C17.78,10 18,10.22 18,10.5 C18,10.78 17.78,11 17.5,11 L7.5,11 Z M3,17 C2.44,17 2,16.56 2,16 L2,15 C2,14.44 2.44,14 3,14 L4,14 C4.56,14 5,14.44 5,15 L5,16 C5,16.56 4.56,17 4,17 L3,17 Z M4,15 L3,15 L3,16 L4,16 L4,15 Z M7.5,16 C7.22,16 7,15.78 7,15.5 C7,15.22 7.22,15 7.5,15 L17.5,15 C17.78,15 18,15.22 18,15.5 C18,15.78 17.78,16 17.5,16 L7.5,16 Z" id="K"> </path> </g> </g>',
          overdueCount: 10,
          count: 2,
          active: false,
        },{
          isAnimateUp: false,
          href: '#/lists/3429676336',
          title: '生活',
          listIcon: '<g id="Web-svgs" stroke="none" stroke-width="1" fill-rule="evenodd"> <g id="list"> <path d="M3,7 C2.44,7 2,6.56 2,6 L2,5 C2,4.44 2.44,4 3,4 L4,4 C4.56,4 5,4.44 5,5 L5,6 C5,6.56 4.56,7 4,7 L3,7 Z M4,5 L3,5 L3,6 L4,6 L4,5 Z M7.5,6 C7.22,6 7,5.78 7,5.5 C7,5.22 7.22,5 7.5,5 L17.5,5 C17.78,5 18,5.22 18,5.5 C18,5.78 17.78,6 17.5,6 L7.5,6 Z M3,12 C2.44,12 2,11.56 2,11 L2,10 C2,9.44 2.44,9 3,9 L4,9 C4.56,9 5,9.44 5,10 L5,11 C5,11.56 4.56,12 4,12 L3,12 Z M4,10 L3,10 L3,11 L4,11 L4,10 Z M7.5,11 C7.22,11 7,10.78 7,10.5 C7,10.22 7.22,10 7.5,10 L17.5,10 C17.78,10 18,10.22 18,10.5 C18,10.78 17.78,11 17.5,11 L7.5,11 Z M3,17 C2.44,17 2,16.56 2,16 L2,15 C2,14.44 2.44,14 3,14 L4,14 C4.56,14 5,14.44 5,15 L5,16 C5,16.56 4.56,17 4,17 L3,17 Z M4,15 L3,15 L3,16 L4,16 L4,15 Z M7.5,16 C7.22,16 7,15.78 7,15.5 C7,15.22 7.22,15 7.5,15 L17.5,15 C17.78,15 18,15.22 18,15.5 C18,15.78 17.78,16 17.5,16 L7.5,16 Z" id="K"> </path> </g> </g>',
          overdueCount: 10,
          count: 1,
          active: false,
        },
      ],
    }
  },
  watch: {
    searchIcon: function(){
      if (this.searchIcon === 'stopSearchingIcon'){
        this.$refs.search.focus()
      }else{
        this.searchText = ''
      }
    },
  },
  methods: {
    changeSearchIcon: function($event){
      this.searchIcon = 'stopSearchingIcon'
    },
    collapse: function (){
      this.isCollapsed = this.isCollapsed ? '' : 'collapsed'
    },
    selectItem: function($event, index, listArea){
      this.filtersCollection.forEach(function(item, index){item.active = false})
      this.listsCollection.forEach(function(item, index){item.active = false})
      if(listArea === 'filters'){
        this.filtersCollection[index]['active'] = 'true'
      }
      if(listArea === 'lists'){
        this.listsCollection[index]['active'] = 'true'
      }
    },
  }
}

</script>
<style scoped>
*{box-sizing: content-box;}
#lists-nav :focus{outline: none;}

#lists-nav{width: 280px; background: #f7f7f7; z-index: 3; overflow: hidden; transition: width 100ms ease; user-select: none;}
#lists-nav.collapsed{width: 42px; flex-basis: 42px;}
#lists-nav.collapsed #sync, #lists-nav.collapsed .count, #lists-nav.collapsed .folder-arrow, #lists-nav.collapsed .folder-option, #lists-nav.collapsed .lists-collection, #lists-nav.collapsed .new-list-dropzone, #lists-nav.collapsed .options, #lists-nav.collapsed .overdue-count, #lists-nav.collapsed .sidebar-actions-label, #lists-nav.collapsed .stream-counts, #lists-nav.collapsed .tagCloud, #lists-nav.collapsed .title, #lists-nav.collapsed .user-arrow, #lists-nav.collapsed .user-name, #lists-nav.collapsed .foldersGuide {
    display: none;
}

.lists-inner{display: flex;position: relative; flex-direction: column; height: 100vh;}
.search-toolbar{height: 45px; background: #0c7fad; display: flex;}
.list-toggle{width: 20px; height: 20px; fill: #fff; padding: 13px 11px 12px 11px; flex-shrink:0; box-sizing: content-box;}
.search-input-wrapper{flex:1;}
.search-input{width: 100%; box-sizing: border-box; transition: all 0.15s ease-in-out;}
.search-icon-wrapper{width: 20px; height: 20px; fill:#fff; padding: 13px 11px 12px 11px; flex-shrink: 0; box-sizing: content-box;}
.search-input{font-size: 18px; color: #fff; height: 45px; -webkit-app-regionter:cover no-repeat;}

.user-toolbar{height: 45px; display: box; display: flex; -webkit-box-align: center; align-items: center; padding-top: 2px; padding-bottom: 4px;}
.user-toolbar svg{fill: #737272;}
.user{height: 45px; display: flex; align-items: center; flex-basis: 42px; flex-shrink: 0; flex-grow: 1; overflow: hidden;}
.user-avatar{ padding: 0 5px; flex-shrink: 0;}
.avatar{width: 32px; height: 32px; border-radius: 50%; vertical-align: middle;}
.user-name{padding: 0 5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-size: 15px; line-height: 32px; color: #262626;}
.user-arrow{width: 20px; height: 20px;}
#sync{min-width: 20px; margin-top: 4px;}
svg.offline{fill: #d74e48;}
.syncing-wrapper{display: inline-block; width: 20px; height: 20px; animation: rotate 0.8s linear infinite;}
.stream-counts{display: flex; margin-top: 3px; flex-shrink: 0;}
.activities-count, .conversations-count{position: relative; padding: 0 10px;}
.user-toolbar .count{position: absolute; top: -8px; right: 6px; font-size: 10px; line-height: 10px; min-width: 11px; border-radius: 20px; padding: 3px 2px 2px 2px; text-align: center; background: #d74e48; color: #fff;}


li.animate-up{transition: height 300ms;}
.sidebar-item.animate-up{height: 0; overflow: hidden;}
.lists-scroll{display: flex; flex:1; overflow-y: auto; overflow-x: hidden; flex-direction: column;}
.lists-scroll .filters-collection, .lists-scroll .lists-collection{flex-shrink: 0;}
.sidebar-item{position: relative; height: 38px; overflow: hidden;}
.sidebar-item a{box-sizing: border-box; height: 38px; user-select: none; color: #1c1c1c; display: flex; align-items: center; padding: 0 8px;}
.sidebar-item.active a{background: #e0eefa; color: #262626; text-shadow: 0 1px 1px rgba(0, 0, 0, 0);}
.sidebar-item .list-icon{height: 20px; width: 20px; padding: 0 3px; text-align: center;}
.sidebar-item .list-icon svg.inbox{fill: #2b8dec;}
.sidebar-item .list-icon svg.assigned{fill: #a33684;}
.sidebar-item .list-icon svg.starred{fill: #db4c3f;}
.sidebar-item .list-icon svg.today{fill: #5fa004;}
.sidebar-item .list-icon svg.week{fill: #e29600;}
.sidebar-item .list-icon svg.all{fill: #9b5c1c;}
.sidebar-item .list-icon svg.completed{fill: #737273;}
.sidebar-item .list-icon svg.list{fill: #b9b9b9;}
.sidebar-item .title{font-size: 15px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: #262626; flex: 1; padding: 0 6px; text-align: left;}
.sidebar-item a .overdue-count{display: none; padding: 2px 6px; margin: 0 4px; border-radius: 12px; font-size: 12px; color: #d74e48; background: rgba(215,78,72,0.1); font-weight: 600;}
.sidebar-item.active a .overdue-count{color: #f7f7f7; background: rgba(215, 78, 72, 0.8);}
.sidebar-item.overdue .overdue-count {display: block; }
.sidebar-item a .count{padding: 0 4px; font-size: 12px; color: #bdbcbb; font-weight: 400;}
.sidebar-item.active a .count{color: rgba(38, 38, 38, 0.75); }
.sidebar-item a .list-options{display: none; height: 20px; width: 20px; padding: 0 4px; opacity: 0.6;}
.sidebar-item.list.active a .list-options{display: block;}
.sidebar-item a .label{position: absolute; width: 32px; height: 32px; top: 13px; left: 13px; transform: scale(0.5); transform-origin: 0 0;  padding-top: 7px; box-sizing: border-box; font-size: 16px; color: #5fa004; font-weight: 600; text-align: center;}
.lists-scroll .more-button{display: none; box-sizing: border-box; height: 38px; padding-top: 9px; fill: #328ad6; text-align: center;}
#lists-nav.collapsed .more-button{display: block;}

.sidebar-actions{border-top: 1px solid rgba(0, 0, 0, 0.1); background: #f7f7f7;}
.sidebar-actions-addList{display: flex; height: 42px; align-items: center; font-size: 15px; color: #328ad6; fill: #328ad6;}
.sidebar-actions-icon{height:20px; padding: 0 10px;}
.sidebar-actions-label{flex: 1; text-align: left;}

</style>
