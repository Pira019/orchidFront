<template>
  <div class="container">
  <div class="video-js">
    <video ref="videoPlayer">
      <source :src="videoSource"   class="embed-responsive-item" type="application/x-mpegURL"/>
    </video>
  </div>
</div>
</template>

<script>

import videojs from 'video.js';
import 'video.js/dist/video-js.css'; 
export default {
  name: 'VideoPlayer',
  data() {
    return {
      videoSource:
        'https://customer-r8ri4hho38gthy2c.cloudflarestream.com/e0be0d497e2846327160647f0db29947/manifest/video.m3u8',
    };
  },
  mounted() {
    // Initialize Video.js when the component is mounted
    this.player = videojs(this.$refs.videoPlayer, {
      controls: true,
      responsive: true,
      language:'fr',
      suppressNotSupportedError:true,
      controlBar: {
        skipButtons: {
          forward: 5,
          backward: 5
        }
      }
    }, function () {

    });
  },
  beforeDestroy() {
    // Dispose of the Video.js player when the component is destroyed
    if (this.player) {
      this.player.dispose();
    }
  },
};
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
