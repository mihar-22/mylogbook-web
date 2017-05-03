
<template>
<div class="Password">
  <md-progress class="md-accent Password_progress"
               md-indeterminate
               v-show="inSubmission"></md-progress>

  <md-dialog-alert :md-title="errorAlert.title"
                   :md-content="errorAlert.content"
                   :md-ok-text="errorAlert.okText"
                   ref="alert">
  </md-dialog-alert>

  <div class="u-centerPiece">
    <form class="Password_form"
          novalidate
          @submit.stop.prevent="submitForm"
          v-show="!isResetComplete">

      <md-input-container>
        <label>Email</label>

        <md-input type="email"
                  name="email"
                  required
                  readonly></md-input>
      </md-input-container>

      <md-input-container :class="{ 'md-input-invalid': isPasswordDirty && !isPasswordValid }">
        <label>Password</label>

        <md-input type="password"
                  name="password"
                  v-model.trim="password"
                  @input.native="validatePassword"
                  @blur.native="blurPasswordField"
                  required></md-input>

        <span class="md-error">{{ passwordError }}</span>
      </md-input-container>

      <slot></slot>

      <md-button type="submit"
                 class="md-raised md-primary Password_form_submit"
                 :disabled="!isPasswordValid">Reset Password</md-button>
    </form>

    <img :src="resetImage"
         alt="Password Reset Complete"
         v-show="isResetComplete">
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      token: '',
      isPasswordValid: false,
      isPasswordDirty: false,
      passwordError: '',
      inSubmission: false,
      isResetComplete: false,
      resetImage: '',
      errorAlert: {
        title: 'Unknown Error',
        content: 'Something has gone wrong on our end. Please try again.',
        okText: 'Okay'
      }
    }
  },

  mounted() {
    this.resetImage = env.mylb.url + '/svg/password-reset-success.svg';

    this.email = this.$el.querySelector('input[name="_email"]').value;
    this.token = this.$el.querySelector('input[name="token"]').value;

    this.$el.querySelector('input[name="email"]').value = this.email;
  },

  methods: {
    blurPasswordField() {
      if (!this.isPasswordDirty) { this.isPasswordDirty = true; };
    },

    validatePassword() {
      const isRequired = (this.password.length > 0);
      const isMinLength = (this.password.length >= 6);

      this.isPasswordValid = (isRequired && isMinLength);

      if (!this.isPasswordValid) {
        this.passwordError = isRequired ? 'Must be at least 6 characters' : 'This field is required';
      }
    },

    submitForm() {
      this.inSubmission = true;

      this.$http.post('auth/reset', {
        email: this.email,
        password: this.password,
        token: this.token
      }).then(response => {
        this.inSubmission = false;

        this.isResetComplete = true;
      }, error => {
        this.inSubmission = false;

        this.$refs['alert'].open();
      });
    }
  }
};
</script>

<style lang="scss">
  .Password {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;

    &_progress {
      position: absolute;
      top: 85px;
      left: 0;

      width: 100%;
    }

    &_form {
      width: 100%;
      max-width: 500px;

      text-align: center;

      &_submit {
        width: 184px;
        height: 36px;
        margin-top: 24px;
      }
    }
  }
</style>
