
<template>
  <master-layout fill-height>
    <div class="u-container u-container--center">
      <center-piece-template>
        <img src="/svg/email-verified-success.svg"
             alt="Email Verified">
      </center-piece-template>
    </div>
  </master-layout>
</template>

<script>
  export default {
    beforeCreate() {
      this.$http.post('auth/verify', this.$route.params).then(() => {}, error => {
        this.$router.replace('/page-not-found');
      });
    }
  };
</script>
