<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="assignlist"
      :items-per-page="10"
      class="elevation-1"
    >
    </v-data-table>
    <v-btn color="orange" dark top absolute right fab @click="download_file">
      <v-icon>mdi-download</v-icon>
    </v-btn>
  </div>
</template>
<script>
import csvToObj from "@/utils/csv.js";
import downloadFile from "@/utils/download.js";

export default {
  data: () => ({
    assignlist: [],
    headers: [
      {
        text: "Link ID",
        value: "LinkNum"
      },
      {
        text: "Agent",
        value: "Agent"
      },
      {
        text: "从",
        value: "OriginName"
      },
      {
        text: "至",
        value: "DestinationName"
      }
    ]
  }),
  props: ["taskinfo"],
  methods: {
    download_file: function() {
      downloadFile(
        this.taskinfo.endpoint + "-agent_assignments.csv",
        "agent_assignments.csv"
      );
    },
    updateData: function() {
      this.axios
        .get(this.taskinfo.endpoint + "-agent_assignments.csv")
        .then(res => {
          this.assignlist = csvToObj(res.data);
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
