
<template>
  <div class="Landing">
    <section class="Landing_content">
      <h1 class="md-display-1 Landing_heading">Painless learner logbook recordings</h1>

      <md-button class="md-raised Landing_downloadButton">
        <img src="svg/apple-logo.svg" alt="Apple Logo">
        <span class="Landing_downloadButton_text">Download on the</span> app store
      </md-button>

      <div class="Landing_content_features">
        <div class="Landing_content_features_item">
          <img src="svg/chart.svg" alt="Bar Chart">

          <p>
            View the number of hours you've logged, your progress towards your P's, data about your trips and more.
          </p>

          <md-button class="md-raised Landing_content_features_item_button">Preview</md-button>
        </div>

        <div class="Landing_content_features_item">
          <img src="svg/car.svg" alt="Car">

          <p>
            Keep track of all your cars in one place, add and personalise each one to help you manage them.
          </p>

          <md-button class="md-raised Landing_content_features_item_button">Preview</md-button>
        </div>

        <div class="Landing_content_features_item">
          <img src="svg/supervisor.svg" alt="Supervisor">

          <p>
            Store and manage your supervisors whether they are family, friends or an accredited instructor.
          </p>

          <md-button class="md-raised Landing_content_features_item_button">Preview</md-button>
        </div>

        <div class="Landing_content_features_item">
          <img src="svg/stopwatch.svg" alt="Stopwatch">

          <p>
            Logged hours prior to Mylogbook? Not a problem, you can easily add it to your progress in the app.
          </p>

          <md-button class="md-raised Landing_content_features_item_button">Preview</md-button>
        </div>

        <div class="Landing_content_features_item">
          <img src="svg/log.svg" alt="Log Book">

          <p>
            Record each and every detail of your trip easier than ever, no more pen and paper or manual calculations.
          </p>

          <md-button class="md-raised Landing_content_features_item_button">Preview</md-button>
        </div>

        <div class="Landing_content_features_item">
          <img src="svg/export.svg" alt="iPhone Export">

          <p>
            Export your log book by email or print, and enjoy it being formatted and designed for your state.
          </p>

          <md-button class="md-raised Landing_content_features_item_button">Preview</md-button>
        </div>
      </div>
    </section>

    <section class="Landing_preview">
      <div class="Landing_preview_phone">
        <video src="videos/dashboard-vic.mp4"
               class="Landing_preview_video"
               ref="preview"></video>
      </div>
    </section>
  </div>
</template>

<script>
export default {
};
</script>

<style lang="scss">
  @import "../../../../node_modules/vue-material/src/core/stylesheets/variables";
  @import "../../../../node_modules/vue-material/src/core/stylesheets/mixins";

  .Landing {
    display: flex;
    flex: 1;

    &_content {
      margin-right: 40px;

      display: flex;
      flex: 1;
      flex-direction: column;

      @media (max-width: 980px) {
        margin-right: 0;
      }

      &_features {
        margin-top: 16px;

        display: flex;
        flex: 1;
        flex-flow: row wrap;

        &_item {
          padding-right: 16px;

          display: flex;
          flex: 0 1 33.33%;
          flex-direction: column;
          align-items: center;

          @media (max-width: 670px) {
            flex: 0 1 50%;
          }

          @media (max-width: 550px) {
            flex: 0 1 100%;
            padding: 0 16px;
          }

          & > img {
            max-width: 180px;
          }

          & > p {
            margin-top: 0;

            font-weight: 300;
            text-align: center;
          }

          &_button {
            margin-bottom: 24px;

            @media (min-width: 980px) {
              display: none;
            }
          }
        }
      }
    }

    &_heading {
      padding-left: 16px;

      font-size: 38px;
      line-height: 44px;
      color: rgba(0, 0, 0, 0.8) !important;

      @media (max-width: 670px) {
        text-align: center;
      }
    }

    &_downloadButton {
      width: 280px;
      height: 50px;

      @media (max-width: 670px) {
        margin: 0 auto;
      }

      &_text {
        font-weight: 400;
        color: #58595b;
      }

      & > img {
        width: 24px;
        height: 24px;
        padding-bottom: 4px;
        padding-right: 4px;
      }
    }

    &_preview {
      position: relative;

      width: 322px;
      height: 673px;
      margin-top: 33.2px;

      @media (min-width: 1600px) {
        margin-left: 24px;
      }

      @media (max-width: 980px) {
        display: none;
      }

      &_phone {
        position: fixed;

        width: 322px;
        height: 673px;

        background-image: url('http://mylogbook.dev/png/iphone.png');
        background-size: 320px 100%;
        background-repeat: no-repeat;
      }

      &_video {
        padding: 96px 25px;
      }
    }
  }
</style>
