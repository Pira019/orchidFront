<template>
  <div class="container">
    <div class="row">
      <video ref="videoPlayer" class="video-js">
        <source :src="videoSource" class="embed-responsive-item" type="application/x-mpegURL" /> 
      </video>
    </div>
  </div>
</template>

<script>


import 'video.js/dist/video-js.css'; 
import videojs from 'video.js'; 
import videoFr from 'video.js/dist/lang/fr.json'; 
export default {
  props: ['videoToken'],
  name: 'VideoPlayer',
  
  computed: {
    videoSource() {
      return `https://customer-r8ri4hho38gthy2c.cloudflarestream.com/${this.videoToken}/manifest/video.m3u8`;
    }
  },

  watch: {
    videoToken(newValue) {
      // When videoToken prop changes, update the video source
      try {
        this.player.src(this.videoSource);
      } catch (e) { }

    }
  },
  mounted() {
    // Initialize Video.js when the component is mounted
    videojs.addLanguage('fr',videoFr)
    this.player = videojs(this.$refs.videoPlayer, {      
      controls: true,
      responsive: true,
      language:'fr', 
      preload:"metadata",
      controlBar: {
        skipButtons: {
          forward: 5,
          backward: 5
        }
      }
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
