<template>
  <v-data-table
    :headers="headers"
    :items="assignlist"
    :items-per-page="10"
    class="elevation-1"
  >
  </v-data-table>
</template>
<script>
import csvToObj from "@/utils/csv.js";

export default {
  data: () => ({
    assignlist: [],
    headers: [
      {
        text: "Link ID",
        value: "LinkNum",
      },
      {
        text: "Agent",
        value: "Agent",
      },
      {
        text: "从",
        value: "DestinationName",
      },
      {
        text: "至",
        value: "OriginName",
      },
    ],
  }),
  props: ["taskinfo"],
  methods: {
    updateData: function() {
      this.axios
        .get(this.taskinfo.endpoint + "/agent_assignments.csv")
        .then((res) => {
          this.assignlist = csvToObj(res.data);
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
