<template>
  <div>
    <v-tabs grow :show-arrows="false" centered v-model="toggle_map">
      <v-tab>
        <v-icon>mdi-map-marker</v-icon>
        Portal地图
      </v-tab>
      <v-tab>
        <v-icon>mdi-link</v-icon>
        Link地图
      </v-tab>
      <v-tab>
        <v-icon>mdi-animation-play</v-icon>
        Gif规划
      </v-tab>
    </v-tabs>
    <v-row justify="center">
      <v-img
        contain
        max-width="60vw"
        :src="taskinfo.endpoint + '-' + filenames[toggle_map]"
      >
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular
              indeterminate
              color="grey lighten-5"
            ></v-progress-circular>
          </v-row>
        </template>
      </v-img>
      <v-btn color="orange" dark top absolute right fab @click="download_pic">
        <v-icon>mdi-download</v-icon>
      </v-btn>
    </v-row>
  </div>
</template>
<script>
import downloadFile from "@/utils/download.js";

export default {
  data: () => ({
    toggle_map: 0,
    filenames: ["portal_map.png", "link_map.png", "plan_movie.gif"]
  }),
  props: ["taskinfo"],
  methods: {
    download_pic: function() {
      downloadFile(
        this.taskinfo.endpoint + "-" + this.filenames[this.toggle_map],
        this.filenames[this.toggle_map]
      );
    }
  }
};
</script>
