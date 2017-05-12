
<template>
  <master-layout :show-progress-bar="showProgressBar" fill-height>
    <div class="u-container u-container--center">
      <form novalidate @submit.stop.prevent="submitForm" v-show="!isPasswordReset">

        <md-input-container :class="{ 'md-input-invalid': errors.has('email') }">
          <label>Email</label>

          <md-input type="email"
                    v-model="reset.email"
                    data-vv-name="email"
                    v-validate="'required|email'"
                    readonly></md-input>

          <span class="md-error">{{ errors.first('email') }}</span>
        </md-input-container>


        <md-input-container :class="{ 'md-input-invalid': errors.has('password') }">
          <label>Password</label>

          <md-input type="password"
                    v-model="reset.password"
                    data-vv-name="password"
                    v-validate="'required|min:6'"></md-input>

          <span class="md-error">{{ errors.first('password') }}</span>
        </md-input-container>

        <md-button type="submit"
                   class="md-raised md-accent"
                   :disabled="errors.any()">Reset Password</md-button>
      </form>

      <center-piece-template v-show="isPasswordReset">
        <img src="/svg/password-reset-success.svg" alt="Password Reset Success">
      </center-piece-template>
    </div>

    <md-dialog-alert :md-title="alert.title"
                     :md-content="alert.content"
                     :md-ok-text="alert.confirm"
                     ref="alertDialog">
    </md-dialog-alert>
  </master-layout>
</template>

<script>
  export default {
    data() {
      return {
        showProgressBar: false,
        isPasswordReset: false,
        alert: {
          title: 'Password Reset Failed',
          content: 'This reset link has expired or is invalid. Please try requesting a new password reset link.',
          confirm: 'ok'
        },
        reset: {
          email: this.$route.params.email,
          password: '',
          token: this.$route.params.token
        }
      };
    },

    methods: {
      submitForm() {
        this.$validator.validateAll().then(() => {
          this.showProgressBar = true;

          this.$http.post('auth/reset', this.reset).then(response => {
            this.showProgressBar = false;

            this.isPasswordReset = true;
          }, error => {
            this.showProgressBar = false;

            this.$refs['alertDialog'].open();
          });
        }).catch(() => {});
      }
    }
  };
</script>
