
<template>
  <div class="CenterPiece">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    props: {
      image: String,
      imageAlt: String,
      title: String,
      subtitle: String
    }
  };
</script>

<style lang="scss">

@import "../../util/breakpoint";

.CenterPiece {
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & > h2 {
    font-size: 34px;
    font-weight: 400;
    letter-spacing: 0;
    line-height: 40px;
    color: rgba(0, 0, 0, 0.87) !important;
    margin-top: 48px;
    margin-bottom: 0;
    text-align: center;

    @include breakpoint(xsmall down) {
      font-size: 28px;
      line-height: 34px;
    }

    @include breakpoint(400px down) {
      font-size: 22px;
      line-height: 28px;
    }
  }

  & > p {
    font-size: 24px;
    font-weight: 400;
    letter-spacing: 0;
    line-height: 32px;
    color: rgba(0, 0, 0, 0.64) !important;
    text-align: center;

    @include breakpoint(xsmall down) {
      font-size: 22px;
      line-height: 30px;
    }

    @include breakpoint(400px down) {
      font-size: 18px;
      line-height: 26px;
    }
  }

  & > img {
    max-width: 500px;
  }
}
</style>
