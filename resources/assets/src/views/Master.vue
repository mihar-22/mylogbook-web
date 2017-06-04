
<template>
  <div class="Master">
      <header class="Master_header">
        <section>
          <slot name="headerLeftSection"></slot>
        </section>

        <section>
          <router-link to="/">
            <img class="Master_header_logo" src="/svg/logo.svg" alt="Mylogbook Logo">
          </router-link>
        </section>

        <section>
          <slot name="headerRightSection"></slot>
        </section>
      </header>

      <md-progress class="md-accent Master_progress"
                   md-indeterminate
                   v-show="showProgressBar"></md-progress>

      <main id="app" class="Master_main">
        <div class="Master_main_content" :class="{ 'Master_main_content--fillHeight': fillHeight }">
          <slot></slot>
        </div>
      </main>

      <slot name="body"></slot>

      <footer class="Master_footer">
        <section>
          <nav class="Master_footer_nav">
            <router-link to="/contact-us">Contact Us</router-link>
            <router-link to="/legal/privacy-policy">Privacy Policy</router-link>
            <router-link to="/legal/terms-of-service">Terms of Service</router-link>
          </nav>
        </section>

        <section>
          <slot name="footerCenterSection"></slot>
        </section>

        <section>
          <slot name="footerRightSection"></slot>
        </section>
      </footer>
  </div>
</template>

<script>
  export default {
    props: {
      showProgressBar: Boolean,
      fillHeight: Boolean
    }
  };
</script>

<style lang="scss">

@import "../util/breakpoint";

/* ==========================================================================
  Variables
  ========================================================================== */

  $header-height:         85px;
  $header-bottom-color:   rgba(99, 114, 130, 0.15);

/* ==========================================================================
  Styling
  ========================================================================== */

  .Master {
    display: flex;
    flex: 1;
    flex-direction: column;

    &_header {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 2;
      width: 100%;
      height: $header-height;
      display: flex;
      background-color: #fff;
      border-bottom: 1px solid $header-bottom-color;
      box-shadow: 0 2px 6px -2px $header-bottom-color;

      &_logo {
        width: 275px;

        @include breakpoint(340px down) {
          width: 250px;
        }
      }

      & > section {
        position: relative;
        display: flex;
        flex: 1;
        align-items: center;
      }

      & > section:nth-child(2) {
        position: relative;
        flex: 0 1 300px;
        justify-content: center;
      }
    }

    &_progress {
      position: fixed !important;
      top: 85px;
      left: 0;
      z-index: 2;
      width: 100%;
    }

    &_main {
      position: relative;
      z-index: 0;
      padding-top: $header-height;

      display: flex;
      flex: 1;

      &_content {
        display: flex;
        flex-flow: row wrap;

        &--fillHeight {
          flex: 1;
        }
      }
    }

    &_footer {
      position: relative;
      z-index: 0;
      width: 100%;
      height: 60px;
      display: flex;
      background-color: #313131;

      & > section {
        position: relative;
        display: flex;
        flex: 1;
        align-items: center;
        padding: 0 24px;

        @include breakpoint(small down) {
          padding: 0;
          flex: 0 0 100%;
          justify-content: center;
        }
      }

      & > section:nth-child(3) {
        justify-content: flex-end;
      }

      &_nav {
        position: relative;
        display: flex;
        flex: 1;
        align-items: center;

        @include breakpoint(small down) {
          justify-content: center;
        }

        & > a {
          padding-left: 24px;
          color: white !important;
          font-size: 12px;
          font-weight: 700;
        }

        & > a:first-child {
          padding-left: 0;
        }
      }
    }
  }
</style>
