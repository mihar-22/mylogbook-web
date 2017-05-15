
<template>
  <master-layout :show-progress-bar="showProgressBar">
    <div class="Landing">
      <section class="Landing_content u-container">
        <section class="Landing_content_features" ref="features">
          <h1 class="md-display-1 Landing_content_features_heading">
            Painless <span><img class="Landing_content_features_heading_learnerPlate"
                                src="/svg/learner-plate.svg"
                                alt="Learner Plate"></span>earner logbook recordings
          </h1>

          <div class="Landing_content_features_item" @click="selectFeature(-1)">
            <img src="svg/chart.svg" alt="Bar Chart">

            <p>
              View the number of hours you've logged, your progress towards your P's, data about your trips and more.
            </p>

            <md-button class="md-raised Landing_content_features_item_preview"
                       @click.native="openPreview(0)">Preview</md-button>
          </div>

          <div class="Landing_content_features_item" @click="selectFeature(0)">
            <img src="svg/car.svg" alt="Car">

            <p>
              Keep track of all your cars in one place, add and personalise each one to help you manage them.
            </p>

            <md-button class="md-raised Landing_content_features_item_preview"
                       @click.native="openPreview(1)">Preview</md-button>
          </div>

          <div class="Landing_content_features_item" @click="selectFeature(1)">
            <img src="svg/supervisor.svg" alt="Supervisor">

            <p>
              Store and manage your supervisors whether they are family, friends or an accredited instructor.
            </p>

            <md-button class="md-raised Landing_content_features_item_preview"
                       @click.native="openPreview(2)">Preview</md-button>
          </div>

          <div class="Landing_content_features_item" @click="selectFeature(2)">
            <img src="svg/stopwatch.svg" alt="Stopwatch">

            <p>
              Logged hours prior to Mylogbook? Not a problem, you can easily add it to your progress in the app.
            </p>

            <md-button class="md-raised Landing_content_features_item_preview"
                       @click.native="openPreview(3)">Preview</md-button>
          </div>

          <div class="Landing_content_features_item" @click="selectFeature(3)">
            <img src="svg/log.svg" alt="Log Book">

            <p>
              Record each and every detail of your trip easier than ever, no more pen and paper or manual calculations.
            </p>

            <md-button class="md-raised Landing_content_features_item_preview"
                       @click.native="openPreview(4)">Preview</md-button>
          </div>

          <div class="Landing_content_features_item" @click="selectFeature(4)">
            <img src="svg/export.svg" alt="iPhone Export">

            <p>
              Export your logbook by email or print, and enjoy it being formatted and designed for your state.
            </p>

            <md-button class="md-raised Landing_content_features_item_preview"
                       @click.native="openPreview(5)">Preview</md-button>
          </div>
        </section>

        <section class="Landing_content_preview">
          <div class="Landing_content_preview_phone">
            <video class="Landing_content_preview_phone_video"
                   ref="iphoneVideoPlayer"
                   @ended="nextFeature"></video>
          </div>
        </section>
      </section>

      <section class="Landing_storeLinks">
        <a href="https://itunes.apple.com/au/app/apple-store/id1229419388?mt=8"
           ref="appStoreLink"
           target="app store"
           @click="reportConversion">

          <img class="Landing_storeLinks_apple"
               src="svg/app-store-badge.svg"
               alt="Apple Store Badge">

        </a>
      </section>

      <section class="Landing_signUp">
        <h2 class="md-display-2 Landing_signUp_heading">Get started now</h2>

        <form class="Landing_signUp_form" novalidate @submit.stop.prevent="submitSignUpForm">
          <md-input-container :class="{ 'md-input-invalid': errors.has('name') }">
            <label>Name</label>

            <md-input type="text"
                      v-model="newUser.name"
                      data-vv-name="name"
                      v-validate="'required|max:100'"></md-input>

            <span class="md-error">{{ errors.first('name') }}</span>
          </md-input-container>

          <md-input-container :class="{ 'md-input-invalid': errors.has('email') }">
            <label>Email</label>

            <md-input type="email"
                      v-model="newUser.email"
                      data-vv-name="email"
                      v-validate="'required|email'"></md-input>

            <span class="md-error">{{ errors.first('email') }}</span>
          </md-input-container>

          <md-input-container :class="{ 'md-input-invalid': errors.has('password') }">
            <label>Password</label>

            <md-input type="password"
                      v-model="newUser.password"
                      data-vv-name="password"
                      v-validate="'required|min:6'"></md-input>

            <span class="md-error">{{ errors.first('password') }}</span>
          </md-input-container>

          <md-input-container :class="{ 'md-input-invalid': errors.has('birthdate') }">
            <label>Birthdate</label>

            <md-input type="date"
                      v-model="newUser.birthday"
                      data-vv-name="birthdate"
                      v-validate="'required'"></md-input>

            <span class="md-error">{{ errors.first('birthdate') }}</span>
          </md-input-container>

          <md-button type="submit"
                     class="md-raised md-accent"
                     :disabled="errors.any()">
            Sign Up
          </md-button>
        </form>
      </section>

      <section class="Landing_tripScene">
        <img :src="images.tripScene" alt="Trip Scene">
      </section>
    </div>

    <md-dialog-alert :md-title="alert.title"
                     :md-content="alert.content"
                     :md-ok-text="alert.confirm"
                     ref="alertDialog">
    </md-dialog-alert>

    <md-dialog class="Landing_previewDialog" ref="previewDialog" slot="body">
      <video class="Landing_previewDialog_video"
             ref="previewVideoPlayer"></video>
    </md-dialog>

    <md-dialog class="Landing_statesDialog" @close="closedStatesDialog" ref="statesDialog" slot="body">
      <md-dialog-title>Select your state</md-dialog-title>

      <md-dialog-content class="Landing_statesDialog_content">
        <div @click="selectState('vic')">
          <img src="svg/map-vic.svg" alt="Victoria on Map">
          <span>VIC</span>
        </div>

        <div @click="selectState('qld')">
          <img src="svg/map-qld.svg" alt="Queensland on Map">
          <span>QLD</span>
        </div>

        <div @click="selectState('nsw')">
          <img src="svg/map-nsw.svg" alt="New South Whales on Map">
          <span>NSW</span>
        </div>

        <div @click="selectState('wa')">
          <img src="svg/map-wa.svg" alt="Western Australia on Map">
          <span>WA</span>
        </div>

        <div @click="selectState('sa')">
          <img src="svg/map-sa.svg" alt="South Australia on Map">
          <span>SA</span>
        </div>

        <div @click="selectState('tas')">
          <img src="svg/map-tas.svg" alt="Tasmania on Map">
          <span>TAS</span>
        </div>
      </md-dialog-content>
    </md-dialog>

    <md-menu class="Landing_statesMenu" md-size="5" md-direction="top left" slot="footerRightSection">
      <md-button class="md-fab md-fab-bottom-right md-primary Landing_statesMenu_fab"
                 md-menu-trigger>
        <img :src="currentStateMap" alt="Map of Australia" width="40px">
      </md-button>

      <md-menu-content>
        <md-menu-item @click.native="selectState('vic')">
          <span>Victoria</span>
          <img src="svg/map-vic.svg" alt="Victoria on Map" width="32px">
        </md-menu-item>

        <md-menu-item @click.native="selectState('qld')">
          <span>Queensland</span>
          <img src="svg/map-qld.svg" alt="Queensland on Map" width="32px">
        </md-menu-item>

        <md-menu-item @click.native="selectState('nsw')">
          <span>New South Whales</span>
          <img src="svg/map-nsw.svg" alt="New Southwhales on Map" width="32px">
        </md-menu-item>

        <md-menu-item @click.native="selectState('wa')">
          <span>Western Australia</span>
          <img src="svg/map-wa.svg" alt="Western Australia on Map" width="32px">
        </md-menu-item>

        <md-menu-item @click.native="selectState('sa')">
          <span>South Australia</span>
          <img src="svg/map-sa.svg" alt="South Australia on Map" width="32px">
        </md-menu-item>

        <md-menu-item @click.native="selectState('tas')">
          <span>Tasmania</span>
          <img src="svg/map-tas.svg" alt="Tasmania on Map" width="32px">
        </md-menu-item>
      </md-menu-content>
    </md-menu>

  </master-layout>
</template>

<script>
export default {
  data(){
    return {
      state: 'vic',
      currentFeature: -1,
      didSelectState: false,
      showProgressBar: false,
      features: [],
      images: {
        tripScene: ''
      },
      alert: {
        title: 'Title',
        content: 'content',
        ok: 'ok'
      },
      newUser: {
        name: '',
        email: '',
        password: '',
        birthday: ''
      }
    };
  },

  computed: {
    currentStateMap() {
      return 'svg/map-' + this.state + '.svg';
    },

    videos() {
      const src = 'videos/';

      const videos = [
        'dashboard-' + this.state,
        'cars',
        'supervisors',
        'entry-' + this.state,
        'log',
        'export-' + this.state
      ];

      return videos.map((value) => {
        return src + value + '.mp4';
      });
    },

    posters() {
      const src = 'png/';

      const posters = [
        'dashboard-' + this.state,
        'cars',
        'supervisors',
        'entry',
        'log',
        'export-' + this.state
      ];

      if (this.state === 'qld' || this.state === 'nsw') {
        posters[3] = posters[3] + '-accredited'
      }

      return posters.map((value) => {
        return src + value + '.png';
      });
    }
  },

  mounted() {
    this.setAppStoreLink();

    this.setImages();

    this.features = this.$refs['features'].querySelectorAll('.Landing_content_features_item');

    this.$nextTick(() => { this.setupState(); });

    window.addEventListener('resize', this.resize);
  },

  methods: {
    reportConversion() {
      goog_report_conversion('https://itunes.apple.com/au/app/apple-store/id1229419388?mt=8')
    },

    resize() {
      this.setImages();
    },

    setImages() {
      if (this.isCompactDevice()) {
        this.images.tripScene = '/svg/trip-scene-small.svg';
      } else {
        this.images.tripScene = '/svg/trip-scene.svg';
      }
    },

    submitSignUpForm() {
      this.$validator.validateAll().then(() => {
        this.showProgressBar = true;

        this.$http.post('auth/register', this.newUser).then(response => {
          this.showProgressBar = false;

          this.alert.title = 'One More Step';
          this.alert.content = `
            An email has been sent to you. Please go to your inbox and click on the link.
            This will help verify your account and keep your details safe!
          `;

          this.$refs['alertDialog'].open();
        }, error => {
          this.showProgressBar = false;

          const isEmailTaken = ('email' in error.body.errors);

          if (isEmailTaken) {
            this.alert.title = 'Email Taken';
            this.alert.content = `
              If you have already signed up then try logging in or resetting your password within the app, otherwise, please
              contact us.
            `;

            this.$refs['alertDialog'].open();
          }
        });
      }).catch(() => {});
    },

    isCompactDevice() {
      return window.innerWidth < 1024;
    },

    setAppStoreLink() {
      const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

      if (iOS) {
        const storeLink = this.$refs['appStoreLink'];

        storeLink.href = 'itms-apps://itunes.apple.com/app/id1229419388?mt=8';
      }
    },

    setupState() {
      const state = localStorage.getItem('state')

      if (state) {
        this.selectState(state);

        return;
      }

      this.$refs['statesDialog'].open();
    },

    selectState(state) {
      this.didSelectState = true;

      this.state = state;

      localStorage.setItem('state', this.state);

      this.currentFeature = -1;

      if (!this.isCompactDevice()) {
        this.$refs['statesDialog'].close();

        this.nextFeature();
      }
    },

    closedStatesDialog() {
      if (this.didSelectState) { return; }

      this.nextFeature();
    },

    selectFeature(feature) {
      if (this.isCompactDevice()) { return; }

      this.features[this.currentFeature].style.opacity = 0.4;

      this.currentFeature = feature;

      this.nextFeature();
    },

    nextFeature() {
      const length = this.features.length;
      const next = (this.currentFeature + 1) % length;
      const previous = (next === 0) ? (length - 1) : (next - 1);

      this.features[previous].style.opacity = 0.4;
      this.features[next].style.opacity = 1;

      this.currentFeature = next;

      this.$refs['iphoneVideoPlayer'].src = this.videos[this.currentFeature];

      setTimeout(() => { this.$refs['iphoneVideoPlayer'].play(); }, 1000);
    },

    openPreview(index) {
      this.$refs['previewDialog'].open();

      this.$refs['previewVideoPlayer'].poster = this.posters[index];
      this.$refs['previewVideoPlayer'].src = this.videos[index];
      this.$refs['previewVideoPlayer'].play();
    }
  }
};
</script>

<style lang="scss">

@import "../../util/breakpoint";

.Landing {
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;

  &_content {
    display: flex;
    flex-direction: row;
    padding-bottom: 0 !important;

    &_features {
      margin-right: 32px;
      display: flex;
      flex-flow: row wrap;

      @include breakpoint(1025px up) {
        margin-left: -20px;
      }

      @include breakpoint(1200px up) {
        margin-right: 64px;
      }

      @include breakpoint(1024px down) {
        margin-right: 0;
      }

      &_heading {
        width: 100%;
        margin: 0;
        font-size: 38px !important;
        line-height: 44px !important;
        font-weight: 500 !important;
        color: rgba(0, 0, 0, 0.8) !important;

        @include breakpoint(1025px up) {
          padding-left: 20px;
        }

        @include breakpoint(670px down) {
          text-align: center !important;
        }

        @include breakpoint(400px down) {
          font-size: 34px !important;
          line-height: 40px !important;
        }

        @include breakpoint(341px down) {
          font-size: 32px !important;
          line-height: 38px !important;
        }

        &_learnerPlate {
          width: 38px;
          margin-left: 2px;
          margin-right: 2px;
          padding-bottom: 6px;
        }
      }

      &_item {
        margin-top: 16px;
        padding: 0 32px;
        display: flex;
        flex: 0 1 33.33%;
        flex-direction: column;
        align-items: center;
        transition: opacity 0.8s;

        @include breakpoint(1025px up) {
          opacity: 0.4;
          padding: 0 20px;
          cursor: pointer;
        }

        @include breakpoint(1024px down) {
          opacity: 1 !important;
        }

        @include breakpoint(670px down) {
          flex: 0 1 50%;
          margin-top: 32px;
        }

        @include breakpoint(550px down) {
          flex: 0 1 100%;
          padding: 0 16px;
        }

        & > img {
          max-width: 160px;
        }

        & > p {
          margin-top: 0;
          font-weight: 300;
          text-align: center;

          @include breakpoint(1024px down) {
            height: 70px;
          }

          @include breakpoint(830px down) {
            height: 75px;
          }

          @include breakpoint(795px down) {
            height: 95px;
          }

          @include breakpoint(700px down) {
            height: 100px;
          }

          @include breakpoint(670px down) {
            height: 70px;
          }

          @include breakpoint(550px down) {
            height: auto;
          }
        }

        &_preview {

          @include breakpoint(1025px up) {
            display: none !important;
          }
        }
      }
    }

    &_preview {
      position: relative;
      width: 322px;
      display: flex;
      flex-direction: column;

      @include breakpoint(1024px down) {
        display: none;
      }

      &_phone {
        position: relative;
        width: 322px;
        height: 673px;
        background-image: url('/png/iphone.png');
        background-size: 320px 100%;
        background-repeat: no-repeat;

        &_video {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50.4%, -50.4%);

          width: 270px;
        }
      }
    }
  }

  &_storeLinks {
    margin: 64px 0;
    width: 100%;
    display: flex;
    justify-content: center;

    &_apple {
      width: 156px;
    }
  }

  &_signUp {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 48px;
    background-color: #fafafa;

    &_heading {
      text-align: center;

      @include breakpoint(420px down) {
        font-size: 36px !important;
      }

      @include breakpoint(355px down) {
        font-size: 34px !important;
      }

      @include breakpoint(341px down) {
        font-size: 30px !important;
      }
    }
  }

  &_tripScene {
    padding-top: 24px;
    background-color: #fafafa;
    margin-bottom: -1px;
  }

  &_previewDialog {

    & > .md-dialog {
      max-width: 100% !important;
      max-height: 100% !important;

      @include breakpoint(480px down) {
        max-width: 80% !important;
      }
    }
  }

  &_statesDialog {

    @include breakpoint(980px down) {
      display: none !important;
    }

    & > .md-dialog {
      width: 100%;
      height: 100%;
      max-height: 680px;
    }

    &_content {
      display: flex;
      flex: 1;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;

      & > div {
        padding: 24px;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        flex: 0 1 33.33%;

        & > img {
          width: 60%;
          min-width: 150px;
          max-width: 200px;
        }

        & > span {
          margin-top: 24px;

          font-size: 28px;
          font-weight: bold;
          text-align: center;
          color: #606060;
        }

        &:hover {
          background-color: #fafafa;
          cursor: pointer;
        }
      }
    }
  }

  &_statesMenu {

    &_fab {
      position: fixed !important;

      @include breakpoint(981px up) {
        position: relative !important;
        right: 0 !important;
        bottom: 0 !important;
        background-color: transparent !important;
        box-shadow: none !important;
      }
    }
  }
}
</style>
