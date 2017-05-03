
<template>
<div class="u-container">
  <md-progress class="md-accent Progress"
               md-indeterminate
               v-show="inSubmission"></md-progress>

  <div class="u-centerPiece" v-show="!isResetComplete">
    <form novalidate
          @submit.stop.prevent="submitForm">

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
                 class="md-raised md-primary"
                 :disabled="!isPasswordValid">Reset Password</md-button>
    </form>
  </div>

  <div class="u-centerPiece" v-show="isResetComplete">
    <img :src="resetImage"
         alt="Password Reset Complete">
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
      resetImage: ''
    }
  },

  created() {
    this.resetImage = env.mylb.url + '/svg/password-reset-success.svg';
  },

  mounted() {
    this.email = this.$el.querySelector('input[name="_email"]').value;
    this.token = this.$el.querySelector('input[name="token"]').value;

    this.$el.querySelector('input[name="email"]').value = this.email;
  },

  methods: {
    blurPasswordField() {
      if (!this.isPasswordDirty) { this.isPasswordDirty = true; }

      this.validatePassword();
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
      });
    }
  }
};
</script>
