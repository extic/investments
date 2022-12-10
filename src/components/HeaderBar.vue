<template>
  <div class="header-bar">
    <nav class="tabs">
      <router-link to="/security-list" active-class="aaa">
        <div class="tab">
          רשימת ניירות
        </div>
      </router-link>
      <router-link to="/tracking" active-class="aaa">
        <div class="tab">
          מעקב
        </div>
      </router-link>
      <router-link to="/holdings" active-class="aaa">
        <div class="tab">
          תיק
        </div>
      </router-link>
    </nav>
    <div class="under-bar"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HeaderBar",

  setup() {

    return {};
  }
});
</script>

<style lang="scss" scoped>
.header-bar {
  .tabs {
    display: flex;
    margin: 1em 1em 0 1em;

    a:link, a:visited, a:hover, a:active {
      color: white;
      text-decoration: none;;
    }

    .tab {
      color: black;
      padding: 0.2em 1em 0.2em 1em;
      border-radius: 5px 5px 0 0;
    }

    .router-link-exact-active > .tab{
      background-color: #197C63;
      color: white;
    }
  }

  .under-bar {
    height: 1em;
    background-color: #197C63;
  }
}
</style>
