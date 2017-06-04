
<template>
  <master-layout :show-progress-bar="showProgressBar" fill-height>
    <div class="u-container u-container--center" style="padding-bottom: 48px;">
      <form novalidate @submit.stop.prevent="submitForm" v-show="!isMessageSent">

        <md-input-container :class="{ 'md-input-invalid': errors.has('name') }">
          <label>Name</label>

          <md-input type="text"
                    v-model="contact.name"
                    data-vv-name="name"
                    v-validate="'required|max:50'"></md-input>

          <span class="md-error">{{ errors.first('name') }}</span>
        </md-input-container>


        <md-input-container :class="{ 'md-input-invalid': errors.has('email') }">
          <label>Email</label>

          <md-input type="email"
                    v-model="contact.email"
                    data-vv-name="email"
                    v-validate="'required|email'"></md-input>

          <span class="md-error">{{ errors.first('email') }}</span>
        </md-input-container>

        <md-input-container>
          <label for="topic">Topic</label>

          <md-select v-model="contact.topic">
            <md-option value="Help">I need some help</md-option>
            <md-option value="Feedback">I want to give some feedback</md-option>
            <md-option value="Bug">I want to report a bug</md-option>
          </md-select>
        </md-input-container>


        <md-input-container :class="{ 'md-input-invalid':  errors.has('message') }">
          <label>Message</label>

          <md-textarea v-model="contact.message"
                       data-vv-name="message"
                       maxlength="500"
                       v-validate="'required'"></md-textarea>

          <span class="md-error">{{ errors.first('message') }}</span>
        </md-input-container>

        <md-button type="submit"
                   class="md-raised md-accent"
                   :disabled="errors.any()">Send</md-button>

      </form>

      <center-piece-template v-show="isMessageSent">
        <img src="svg/contact-us-sent.svg" alt="Message Sent">

        <h2>Thank you for contacting us</h2>

        <p>We will get back to you as soon as possible</p>
      </center-piece-template>
    </div>
  </master-layout>
</template>

<script>
  export default {
    data() {
      return {
        showProgressBar: false,
        isMessageSent: false,
        contact: {
          name: '',
          email: '',
          topic: 'Help',
          message: ''
        }
      };
    },

    methods: {
      submitForm() {
        this.$validator.validateAll().then(() => {
          this.showProgressBar = true;

          this.$http.post('contact', this.contact).then(response => {
            this.showProgressBar = false;

            this.isMessageSent = true;
          });
        }).catch(() => {});
      }
    }
  };
</script>
