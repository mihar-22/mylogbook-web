
<template>
  <div class="Landing">
    <section class="Landing_content">
      <h1 class="md-display-1 Landing_heading">Painless learner logbook recordings</h1>

      <md-button id="storeLink"
                 href="https://itunes.apple.com/au/app/apple-store/id1229419388?mt=8"
                 class="md-raised Landing_downloadButton"
                 target="mylogbook app store">
        <img src="svg/apple-logo.svg" alt="Apple Logo">
        <span class="Landing_downloadButton_text">Download on the</span> app store
      </md-button>

      <div class="Landing_content_features">
        <div class="Landing_content_features_item">
          <img src="svg/chart.svg" alt="Bar Chart">

          <p>
            View the number of hours you've logged, your progress towards your P's, data about your trips and more.
          </p>

          <md-button class="md-raised Landing_content_features_item_button"
                     @click.native="openPreview(0)">Preview</md-button>
        </div>

        <div class="Landing_content_features_item">
          <img src="svg/car.svg" alt="Car">

          <p>
            Keep track of all your cars in one place, add and personalise each one to help you manage them.
          </p>

          <md-button class="md-raised Landing_content_features_item_button"
                     @click.native="openPreview(1)">Preview</md-button>
        </div>

        <div class="Landing_content_features_item">
          <img src="svg/supervisor.svg" alt="Supervisor">

          <p>
            Store and manage your supervisors whether they are family, friends or an accredited instructor.
          </p>

          <md-button class="md-raised Landing_content_features_item_button"
                     @click.native="openPreview(2)">Preview</md-button>
        </div>

        <div class="Landing_content_features_item">
          <img src="svg/stopwatch.svg" alt="Stopwatch">

          <p>
            Logged hours prior to Mylogbook? Not a problem, you can easily add it to your progress in the app.
          </p>

          <md-button class="md-raised Landing_content_features_item_button"
                     @click.native="openPreview(3)">Preview</md-button>
        </div>

        <div class="Landing_content_features_item">
          <img src="svg/log.svg" alt="Log Book">

          <p>
            Record each and every detail of your trip easier than ever, no more pen and paper or manual calculations.
          </p>

          <md-button class="md-raised Landing_content_features_item_button"
                     @click.native="openPreview(4)">Preview</md-button>
        </div>

        <div class="Landing_content_features_item">
          <img src="svg/export.svg" alt="iPhone Export">

          <p>
            Export your logbook by email or print, and enjoy it being formatted and designed for your state.
          </p>

          <md-button class="md-raised Landing_content_features_item_button"
                     @click.native="openPreview(5)">Preview</md-button>
        </div>
      </div>
    </section>

    <section class="Landing_preview">
      <div class="Landing_preview_phone">
        <video class="Landing_preview_video"
               ref="iphoneVideoPlayer"
               @ended="nextVideo"></video>
      </div>
    </section>

    <md-dialog class="Landing_previewDialog" ref="previewDialog">
      <video class="Landing_previewDialog_video"
             ref="previewVideoPlayer"></video>
    </md-dialog>

    <md-dialog class="Landing_statesDialog" @close="closedStatesDialog" ref="statesDialog">
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

    <md-menu class="Landing_statesMenu" md-size="5" md-direction="top left">
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
  </div>
</template>

<script>
export default {
  data(){
    return {
      state: 'vic',
      currentVideo: -1,
      didSelectState: false
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

    this.position();

    this.$nextTick(() => { this.setupState(); });

    window.addEventListener('resize', this.position);
  },

  methods: {
    isCompactDevice() {
      return window.innerWidth <= 980;
    },

    setAppStoreLink() {
      const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

      if (iOS) {
        const link = document.getElementById('storeLink');

        storeLink.href = 'itms-apps://itunes.apple.com/app/id1229419388?mt=8';

        storeLink.target = null;
      }
    },

    position() {
      this.positionStatesFab();

      this.positionFooterText();
    },

    positionStatesFab() {
      const fab = document.querySelector('.md-fab');

      if (this.isCompactDevice()) {
        fab.style = null;

        return;
      }

      fab.style.left = '-' + (((window.innerWidth - 1200) / 2) - 28) + 'px';
    },

    positionFooterText() {
      const footer = document.querySelector('.Master_footer_nav');

      if (!(window.innerHeight <= 890)) {
        footer.style = null;

        return;
      }

      footer.style.justifyContent = 'flex-start';
      footer.style.marginLeft = '60px';
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

      this.currentVideo = -1;

      if (!this.isCompactDevice()) {
        this.$refs['statesDialog'].close();

        this.nextVideo();
      }
    },

    closedStatesDialog() {
      if (this.didSelectState) { return; }

      this.nextVideo();
    },

    nextVideo() {
      this.currentVideo = (this.currentVideo + 1) % this.videos.length;

      this.$refs['iphoneVideoPlayer'].src = this.videos[this.currentVideo];

      setTimeout(() => { this.$refs['iphoneVideoPlayer'].play(); }, 1200);
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
  @import "../../../../node_modules/vue-material/src/core/stylesheets/variables";
  @import "../../../../node_modules/vue-material/src/core/stylesheets/mixins";

  .Landing {
    position: relative;

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
      line-height: 50px;

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

        background-image: url('/png/iphone.png');
        background-size: 320px 100%;
        background-repeat: no-repeat;
      }

      &_video {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50.2%, -50.3%);

        width: 270px;
      }
    }

    &_previewDialog {

      &_video {
        width: 430px;
      }
    }

    &_statesDialog {

      @media (max-width: 980px) {
        display: none;
      }

      & > .md-dialog {
        width: 100%;
        height: 100%;
      }

      &_content {
        display: flex;
        flex: 1;
        flex-wrap: wrap;

        & > div {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          flex: 0 1 33.33%;

          & > img {
            max-width: 60%;
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

        @media (min-width: 980px) {
          position: absolute !important;
          right: 0 !important;
          left: -28px;
          bottom: -80px !important;

          background-color: transparent !important;
          box-shadow: none !important;
        }
      }
    }
  }
</style>
