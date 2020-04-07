<template>
  <div>
    <v-tabs grow v-model="tab_pos" :show-arrows="false" centered>
      <v-tab>
        <v-icon>mdi-key</v-icon>
        Key获取
      </v-tab>
      <v-tab>
        <v-icon>mdi-map-marker</v-icon>
        Portal占领
      </v-tab>
      <v-tab-item>
        <v-data-table
          :loading="loading"
          :headers="headers"
          :items="key_list"
          :items-per-page="10"
          class="elevation-1"
        >
        </v-data-table>
      </v-tab-item>
      <v-tab-item>
        <v-card-text>
          <pre>
        {{ capture_data }}
        </pre
          >
        </v-card-text>
      </v-tab-item>
    </v-tabs>
    <v-btn color="orange" dark top absolute right fab @click="download_file">
      <v-icon>mdi-download</v-icon>
    </v-btn>
  </div>
</template>
<script>
import csvToObj from "@/utils/csv.js";
import downloadFile from "@/utils/download.js";

export default {
  props: ["taskinfo"],
  data: () => ({
    key_list: [],
    loading: true,
    tab_pos: 0,
    capture_data: "",
    headers: [
      {
        text: "Agent",
        value: "Agent"
      },
      {
        text: "需要Key",
        value: "KeysNeeded"
      },
      {
        text: "Portal",
        value: "Portal Name"
      }
    ]
  }),
  methods: {
    download_file: function() {
      if (this.tab_pos == 0)
        downloadFile(
          this.taskinfo.endpoint + "/agent_key_preparation.csv",
          "agent_key_preparation.csv"
        );
      if (this.tab_pos == 1)
        downloadFile(
          this.taskinfo.endpoint + "/ownership_preparation.txt",
          "agent_key_preparation.csv"
        );
    },
    updateData: function() {
      this.axios
        .get(this.taskinfo.endpoint + "/agent_key_preparation.csv")
        .then(res => {
          this.key_list = csvToObj(res.data);
          this.loading = false;
        });
      this.axios
        .get(this.taskinfo.endpoint + "/ownership_preparation.txt")
        .then(res => {
          this.capture_data = res.data;
        });
    }
  },
  watch: {
    taskinfo: {
      handler() {
        if (this.taskinfo != null) this.updateData();
      },
      immediate: true,
      deep: true
    }
  }
};
</script>
