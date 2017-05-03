
<template>
<div class="u-container">
  <md-progress class="md-accent Progress"
               md-indeterminate
               v-show="inSubmission"></md-progress>

  <div class="u-centerPiece" v-show="!isMessageSent">
    <form novalidate
          @submit.stop.prevent="submitForm">

      <md-input-container :class="{ 'md-input-invalid':  isDirty.name && errors.name }">
        <label>Name</label>

        <md-input type="text"
                  name="name"
                  v-model.trim="name"
                  @input.native="validate('name')"
                  @blur.native="blur('name')"
                  maxlength="50"
                  required></md-input>

        <span class="md-error">{{ errors.name }}</span>
      </md-input-container>

      <md-input-container :class="{ 'md-input-invalid':  isDirty.email && errors.email }">
        <label>Email</label>

        <md-input type="email"
                  name="email"
                  v-model.trim="email"
                  @input.native="validate('email')"
                  @blur.native="blur('email')"
                  required></md-input>

        <span class="md-error">{{ errors.email }}</span>
      </md-input-container>

      <md-input-container>
        <label for="topic">Topic</label>

        <md-select name="topic" id="topic" v-model="topic">
          <md-option value="Help">I need some help</md-option>
          <md-option value="Feedback">I want to give some feedback</md-option>
          <md-option value="Bug">I want to report a bug</md-option>
        </md-select>
      </md-input-container>

      <md-input-container :class="{ 'md-input-invalid':  isDirty.message && errors.message }">
        <label>Message</label>

        <md-textarea maxlength="500"
                     v-model.trim="message"
                     @input.native="validate('message')"
                     @blur.native="blur('message')"
                     required></md-textarea>

        <span class="md-error">{{ errors.message }}</span>
      </md-input-container>

      <md-button type="submit"
                 class="md-raised md-primary"
                 :disabled="!isFormValid">Send</md-button>
    </form>
  </div>

  <div class="u-centerPiece" v-show="isMessageSent">
    <img :src="messageSentImage"
         alt="Message Sent">

    <h1 class="md-display-1">Thank you for contacting us!</h1>

    <p class="md-headline">We will get back to you as soon as possible.</p>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      topic: 'Help',
      message: '',
      inSubmission: false,
      messageSentImage: '',
      isMessageSent: false,
      isDirty: {
        name: false,
        email: false,
        message: false
      },
      errors: {
        name: '',
        email: '',
        message: ''
      }
    }
  },

  computed: {
    isFormValid() {
      let isValid = true;

      Object.keys(this.errors).forEach((key) => {
        if (!this.validate(key)) {
          isValid = false;

          return;
        }
      });

      return isValid;
    }
  },

  created() {
    this.messageSentImage = env.mylb.url + '/svg/contact-us-sent.svg';
  },

  methods: {
    validate(field) {
      const value = this[field];

      this.errors[field] = '';

      if (!value.length > 0) {
        this.errors[field] = 'This field is required';

        return false;
      }

      if (field === 'email' && !(/\S+\@\S+\.\S{2,}/.test(value))) {
        this.errors.email = 'Must be a valid email';

        return false;
      }

      return true;
    },

    blur(field) {
      if (!this.isDirty[field]) { this.isDirty[field] = true; }
    },

    submitForm() {
      this.inSubmission = true;

      this.$http.post('contact', {
        name: this.name,
        email: this.email,
        topic: this.topic,
        message: this.message
      }).then(response => {
        this.inSubmission = false;

        this.isMessageSent = true;
      });
    }
  }
};
</script>
