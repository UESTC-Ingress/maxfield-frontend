<template>
  <div>
    <v-tabs grow :show-arrows="false" centered>
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
  </div>
</template>
<script>
import csvToObj from "@/utils/csv.js";

export default {
  props: ["taskinfo"],
  data: () => ({
    key_list: [],
    loading: true,
    capture_data: "",
    headers: [
      {
        text: "Agent",
        value: "Agent",
      },
      {
        text: "需要Key",
        value: "KeysNeeded",
      },
      {
        text: "Portal",
        value: "Portal Name",
      },
    ],
  }),
  methods: {
    updateData: function() {
      this.axios
        .get(this.taskinfo.endpoint + "/agent_key_preparation.csv")
        .then((res) => {
          this.key_list = csvToObj(res.data);
          this.loading = false;
        });
      this.axios
        .get(this.taskinfo.endpoint + "/ownership_preparation.txt")
        .then((res) => {
          this.capture_data = res.data;
        });
    },
  },
  watch: {
    taskinfo: {
      handler() {
        if (this.taskinfo != null) this.updateData();
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>
