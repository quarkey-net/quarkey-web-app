<template>
  <div>
    <link rel="stylesheet" type="text/css" href="~/assets/reset.css">
    <div id="side-bar">
      <div id="head" class="top-bar">
        <div class="content">
          <img src="~/assets/logo.svg" height="20px">
        </div>
      </div>
      <div class="bottom-bar">
        <div class="content">
          <div class="user-profile">
            <div class="user-profile-icon">
              <span>{{ getAccountInfos['username'][0].toUpperCase() }}</span>
            </div>
            {{ getAccountInfos['username'] }}
            <span class="label">
              PRO
            </span>
          </div>
        </div>
      </div>
      <div class="side-bar-container">
        <div id="side-bar-actions">
          <a class="action" href="#">
            <span class="mdi mdi-magnify" />
            Quick search
          </a>
          <a class="action" href="#">
            <span class="mdi mdi-cog-outline" />
            Settings
          </a>
        </div>
      </div>
      <div id="category-wrapper">
        <div class="content">
          <div class="category-block">
            <div class="category-block-title">
              My vault
            </div>
            <div class="category-block-list">
              <a href="#" class="category-item">
                <div class="category-item-title">All entries</div>
                <div class="category-item-indicator">{{ getPasswordItems.length }}</div>
              </a>
              <hr>
              <a v-for="slot in getTagSlots" :key="slot.id" href="#" class="category-item" @click="changeTargetItems(slot.name)">
                <div class="category-item-title">
                  <i class="category-item-icon twa twa-telephone" />
                  {{ slot.name }}
                </div>
                <div class="category-item-indicator">{{ slot.items.length }}</div>
              </a>
              <!-- <a href="#" class="category-item">
                <div class="category-item-title">
                  <i class="category-item-icon twa twa-telephone" />
                  Social medias
                </div>
                <div class="category-item-indicator">21</div>
              </a>
              <a class="category-item active">
                <div class="category-item-title">
                  <i class="category-item-icon twa twa-necktie" />
                  Work
                </div>
                <div class="category-item-indicator">5</div>
              </a>
              <a href="#" class="category-item">
                <div class="category-item-title">
                  <i class="category-item-icon twa twa-shopping-bags" />
                  Online shops
                </div>
                <div class="category-item-indicator">3</div>
              </a> -->
              <a href="#" class="category-item add">
                <div class="category-item-title">
                  <span class="category-item-icon mdi mdi-plus" />
                  New category
                </div>
              </a>
            </div>
          </div>
          <div class="category-block">
            <div class="category-block-title">
              Shared
            </div>
            <div class="category-block-list">
              <!-- <a href="#" class="category-item">
                <div class="category-item-title">
                  <i class="category-item-icon twa twa-shopping-bags" />
                  Online shops
                </div>
                <div class="category-item-indicator">3</div>
              </a>
              <a href="#" class="category-item">
                <div class="category-item-title">
                  <i class="category-item-icon twa twa-bar-chart" />
                  Marketing
                </div>
                <div class="category-item-indicator">7</div>
              </a> -->
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="workbench">
      <div class="top-bar">
        <div class="content">
          <div id="breadcrumbs">
            <div id="breadcrumbs-path">
              <span> {{ getAccountInfos['username'] }} </span>
              <span>/</span>
              <span id="breadcrumbs-current-page">Work</span>
            </div>
            <span class="label success">
              RSA
              <span class="mdi mdi-lock-outline" />
            </span>
          </div>
          <div id="top-bar-actions">
            <!--
            <div class="collaborator-list">
              <span href="#" class="collaborator-icon">
                <span class="mdi mdi-link-variant"></span>
              </span>
              <span href="#" class="collaborator-icon">
                <span class="mdi mdi-link-variant"></span>
              </span>
              <a href="#" class="btn secondary rounded">
                <span class="mdi mdi-link-variant"></span>
              </a>
            </div>
            -->

            <!-- <a href="#" class="btn secondary" @click="fetchData">
              Share with collaborators
              <span class="mdi mdi-link-variant" />
            </a> -->
            <!--
            <a href="#" class="btn primary">
              New entry
              <span class="mdi mdi-plus"></span>
            </a>
            -->
            <div class="double-btn">
              <a href="#" class="btn primary">
                New entry
              </a>
              <a href="#" onclick="myFunction()" class="btn primary">
                <span class="mdi mdi-chevron-down" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="flow">
        <div class="container">
          <div id="page-wrapper">
            <div id="page-head">
              <div id="page-title">
                <i id="page-icon" class="twa twa-necktie" />
                <span id="page-name" class="title">
                  Work
                </span>
              </div>
              <span id="page-description">All entries relative to my workspace and tools used to build apps.</span>
            </div>
            <!--<hr>-->
            <div id="table-wrapper">
              <table class="table">
                <thead>
                  <tr>
                    <th>
                      <div>
                        <span class="mdi mdi-format-title" />
                        Title
                      </div>
                    </th>
                    <th>
                      <div>
                        <span class="mdi mdi-text" />
                        Description
                      </div>
                    </th>
                    <th>
                      <div>
                        <span class="mdi mdi-format-color-text" />
                        Username
                      </div>
                    </th>
                    <!--  <th>
                      <div>
                        <span class="mdi mdi-at" />
                        Email address
                      </div>
                    </th> -->
                    <th>
                      <div>
                        <span class="mdi mdi-asterisk" />
                        Key
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in getPasswordItems" :key="item.id">
                    <td class="row-title">
                      <div>
                        <div class="row-title-icon">
                          <span>{{ item.name[0].toUpperCase() }}</span>
                        </div>
                        {{ item.name }}
                      </div>
                    </td>
                    <td class="row-textarea">
                      {{ item.description }}
                    </td>
                    <td class="row-text">
                      {{ item.login }}
                    </td>
                    <!-- <td class="row-email">
                      jhon.doe@gmail.com
                    </td> -->
                    <td class="row-key">
                      ***************
                    </td>
                  </tr>
                  <tr>
                    <td id="add-row">
                      <div @click="printItems">
                        <span class="mdi mdi-plus" />
                        Add entry in "work"
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="table-entry-indicator">
                <span>3</span>
                entries
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useAccountStore } from '@/store/account'

export default {
  data () {
    return {
      userStore: useAccountStore(),
      passwordItems: [],
      targetViewTag: 'global',
      username: null
    }
  },

  computed: {
    ...mapState(useAccountStore, ['getPasswordItems']),
    ...mapState(useAccountStore, ['getAccountInfos']),
    ...mapState(useAccountStore, ['getTagSlots'])
  },

  beforeMount () {
    console.log('before mount')
    this.userStore.fetchPasswordItems()
  },

  mounted () {
    console.log('mounted')
  },

  beforeUpdate () {
    // loop
  },

  methods: {
    printItems () {
      console.log('username : ' + this.username)
      console.dir(this.getPasswordItems)
    },
    fetchData () {
      console.log('username : ' + this.username)
      this.userStore.fetchPasswordItems()
    },

    ...mapActions(useAccountStore, ['changeTargetItems'])
  }
}
</script>

<style scoped>

  @import url('https://cdn.jsdelivr.net/npm/@mdi/font@5.9.55/css/materialdesignicons.min.css');
/*@import url('https://rawcdn.githack.com/SebastianAigner/twemoji-amazing/7db0e08356282b226af298b1d9b2151b007cf528/twemoji-amazing.css');  Production cdn */
  @import url('https://raw.githack.com/SebastianAigner/twemoji-amazing/master/twemoji-amazing.css');

  ::-moz-selection,
  ::selection {
    background: var(--color-primary-025);
    /*color: var(--color-primary)*/
  }

  body {
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    font-size: 12px;
    line-height: 16px;
    background-color: var(--color-grey-1);
    color: var(--color-white);
    overflow: hidden;
  }

  /* Layout */

  * {
    font-size: 12px;
  }

  #side-bar {
    position: absolute;
    width: 281px;
    height: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    background-color: var(--color-grey-2);
    border-right: 1px solid var(--color-grey-3);
    z-index: 2;
  }

  #workbench {
    position: absolute;
    height: 100%;
    width: calc(100% - 281px); /*281*/
    top: 0;
    bottom: 0;
    right: 0;
  }

  #page-wrapper {
    display: flex;
    row-gap: 18px;
    flex-direction: column;
  }

  .side-bar-container {
    position: absolute;
    left: 32px;
    right: 32px;
    top: 86px;
    bottom: 0;
  }

  .flow {
    position: absolute;
    background-color: var(--color-grey-1);
    width: 100%;
    height: calc(100% - 64px);
    overflow-x: auto;
    top: 64px;
  }

  .container {
    position: absolute;
    left: 32px;
    right: 32px;
    top: 24px;
    bottom: 0;
  }

  .bottom-bar {
    position: absolute;
    width: 100%;
    height: 64px;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }

  .top-bar {
    position: absolute;
    width: 100%;
    height: 64px;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }

  #side-bar #category-wrapper {
    position: absolute;
    top: 221px;
    left: 0;
    right: 0;
    width: 100%;
    bottom: calc(64px + 24px);
    overflow-x: auto;
  }

  #side-bar #category-wrapper .content {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 24px;
    right: 24px;
    display: flex;
    grid-gap: 48px;
    flex-direction: column;
  }

  .category-block {
    display: flex;
    grid-gap: 12px;
    flex-direction: column;
  }

  .category-block-title,
  .category-block-list hr {
    margin: 0 8px;
    width: auto;
    color: var(--color-grey-4)
  }

  .category-block-list {
    display: flex;
    grid-gap: 6px;
    flex-direction: column;
    width: 100%;
  }

  .category-item {
    display: flex;
    grid-gap: 8px;
    align-items: center;
    justify-content: flex-end;
    height: 32px;
    padding: 8px;
    border-radius: 8px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    transition: 0.3s;
  }
  .category-item > div {
    flex: 1 1 auto;
  }
  .category-item.active {
    background-color: var(--color-grey-3);
  }
  .category-item.add {
    color: var(--color-grey-4);
  }
  .category-item:hover:not(.active) {
    background-color: var(--color-grey-4-010);
  }
  .category-item-icon {
    font-size: 14px;
  }
  .category-item-title {
    display: flex;
    grid-gap: 8px;
    align-items: center;
  }

  .category-item .category-item-indicator {
    flex: 0;
    padding: 2px 8px;
    border-radius: 10px;
    background-color: var(--color-grey-3);
  }
  .category-item.active .category-item-indicator {
    background-color: var(--color-white);
    color: var(--color-grey-3)
  }

  #side-bar .bottom-bar {
    background-color: var(--color-grey-2);
  }

  #side-bar .top-bar {
    background-color: var(--color-grey-2);
  }

  #workbench .top-bar {
    background-color: var(--color-grey-1);
  }

  .top-bar .content,
  .bottom-bar .content {
    position: absolute;
    left: 32px;
    right: 32px;
    top: 22px;
    bottom: 22px;
    display: flex;
    align-items: center;
  }

  .top-bar .content > div,
  .bottom-bar .content > div {
    flex: 1 1 auto;
  }

  #breadcrumbs {
    color: var(--color-grey-4);
    display: flex;
    align-items: center;
    grid-gap: 16px;
  }
  #breadcrumbs-path {
    display: flex;
    grid-gap: 8px;
  }
  #breadcrumbs-current-page {
    transition: 0.3s;
  }

  #top-bar-actions {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    grid-gap: 16px;
  }

  #side-bar-actions {
    display: flex;
    flex-direction: column;
    grid-gap: 16px;
  }
  #side-bar-actions > a {
    display: flex;
    grid-gap: 8px;
    align-items: center;
  }
  #side-bar-actions > a > .mdi {
    font-size: 16px;
  }

  #page-head {
    display: flex;
    grid-gap: 24px;
    align-items: center;
  }
  #page-title {
    display: flex;
    grid-gap: 16px;
    align-items: center;
  }

  #table-wrapper {
    margin-bottom: 64px;
  }

  .user-profile {
    display: flex;
    grid-gap: 12px;
    color: white;
    font-size: 14px;
    align-items: center;
  }

  .collaborator-list {
    display: flex;
  }
  .collaborator-list > * {
    margin-left: -14px;
    outline: 2px solid var(--color-grey-1);
  }
  .collaborator-list > .btn:hover {
    opacity: 1;
  }

  /* Items */

  a {
    text-decoration: none;
    color: var(--color-white);
    transition: 0.3s;
  }

  a.action:hover {
    opacity: 0.75;
  }

  .btn {
    display: flex;
    align-items: center;
    grid-gap: 8px;
    border-radius: 8px;
    padding: 8px;
    font-size: 12px;
    line-height: 16px;
    text-decoration: none;
    transition: 0.3s;
    background-color: var(--color-grey-3);
    color: var(--color-white)
  }
  .btn:hover {
    opacity: 0.75;
  }

  /*
  .btn:active {
    font-size: 11.7px;
  }
  */
  .btn:disabled, .btn.disabled {
    opacity: 0.25;
    cursor: default;
  }
  .btn .mdi {
    font-size: 16px;
  }

  .btn.primary {
    background-color: var(--color-primary);
    color: var(--color-white);
  }

  .btn.secondary {
    background-color: var(--color-grey-1);
    border: 1px solid var(--color-white-025);
    color: var(--color-white);
  }

  .btn.rounded {
    border-radius: 50%;
  }

  .label {
    display: inline-flex;
    text-decoration: none;
    align-items: center;
    grid-gap: 6px;
    border-radius: 4px;
    padding: 3px 5px;
    font-size: 12px;
    line-height: 14px;
    border: 1px solid var(--color-grey-3);
    color: var(--color-grey-4);
    background-color: var(--color-grey-2);
  }
  .label .mdi {
    font-size: 14px;
  }

  .label.success {
    border: 1px solid var(--color-green);
    color: var(--color-green);
    background-color: var(--color-green-010);
  }

  .double-btn {
    display: flex;
    flex-direction: row;
    grid-gap: 0;
  }
  .double-btn > a:first-of-type {
    border-radius: 8px 0 0 8px;
  }
  .double-btn > a:last-of-type {
    border-radius: 0 8px 8px 0;
  }

  hr {
    border: none;
    background-color: var(--color-grey-3);
    width: 100%;
    height: 1px;
  }

  #page-icon {
    font-size: 28px;
    cursor: pointer;
  }
  #page-name {
    font-size: 24px;
  }
  #page-description {
    color: var(--color-grey-4)
  }

  .user-profile-icon {
    background-color: #a552ba;
    color: var(--color-white);
    border-radius: 8px;
    display: inline-block;
    width: 32px;
    height: 32px;
    text-align: center;
  }
  .user-profile-icon > span {
    position: relative;
    top: 32%;
  }

  .collaborator-icon {
    display: flex;
    align-items: center;
    grid-gap: 8px;
    border-radius: 8px;
    padding: 8px;
    border-radius: 50%;
    outline: 2px solid var(--color-grey-1);
    background-color: #a552ba !important;
  }

  .collaborator-icon .mdi {
    font-size: 16px;
    color: transparent;
  }

  /* Table */

  table.table {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid var(--color-grey-3);
    color: var(--color-white);
  }

  table.table td,
  table.table th {
    border: 1px solid var(--color-grey-3);
    transition: 0.3s;
    white-space: nowrap;
  }

  table.table td:hover,
  table.table th:hover {
    background-color: var(--color-grey-4-010);
  }

  table.table td {
    /*height: 64px;*/
    padding: 20px 16px;
  }

  table.table th,
  table.table td#add-row {
    padding: 8px;
    height: 32px;
    text-align: left;
    cursor: pointer;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  table.table th > div,
  table.table td#add-row > div {
    display: flex;
    grid-gap: 8px;
    align-items: center;
  }

  table.table td#add-row {
    color: var(--color-grey-4);
    white-space: nowrap;
  }

  table.table th .mdi,
  table.table td#add-row .mdi {
    font-size: 16px;
    color: var(--color-grey-4);
  }

  table.table th:first-of-type,
  table.table td:first-of-type {
    border-left: 1px solid transparent;
    /*padding-left: 0;*/
  }

  table.table th:last-of-type,
  table.table td:last-of-type {
    border-right: 1px solid transparent;
  }

  table.table tbody tr:last-of-type {
    border-right: 1px solid transparent;
  }

  table.table td.row-title div {
    display: flex;
    grid-gap: 12px;
    align-items: center;
  }
  table.table td.row-title .row-title-icon {
    background-color: #016798;
    color: var(--color-white);
    border-radius: 8px;
    display: inline-block;
    width: 32px;
    height: 32px;
    text-align: center;
  }
  table.table td.row-title .row-title-icon > span {
    position: relative;
    top: 32%;
  }

  table.table td.row-textarea {
    white-space: normal;
    line-height: 16px;
  }

  table.table td.row-title,
  table.table td.row-text,
  table.table td.row-email,
  table.table td.row-key {
    vertical-align: middle;
  }

  .table-entry-indicator {
    position: absolute;
    height: 32px;
    width: 100%;
    left: 0;
    right: 0;
    padding: 8px 16px;
    color: var(--color-grey-4);
    display: flex;
    grid-gap: 8px;
    align-items: center;
  }

  .table-entry-indicator span {
    color: var(--color-white)
  }
</style>
