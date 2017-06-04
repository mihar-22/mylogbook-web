
<template>
  <master-layout>
    <div class="Content u-container" v-once>
      <slot></slot>
    </div>
  </master-layout>
</template>

<script>
  export default {};
</script>

<style lang="scss">

@import "../../util/breakpoint";

.Content {
  padding-top: 32px;
  padding-bottom: 32px;
  max-width: 1200px;
  margin: 0 auto;

  &_heading {
    margin-top: 0;
    font-size: 34px;
    font-weight: 400;
    letter-spacing: 0;
    line-height: 40px;
    text-align: center;
  }

  &_subheading {
    margin: 24px 0;
    line-height: 26px;
  }

  &_content {

    &--highlight {
      font-size: 14px;
      letter-spacing: .01em;
      line-height: 24px;
      font-weight: bold;
    }
  }
}
</style>
