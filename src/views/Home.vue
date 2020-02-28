<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Max Field by NIA-CN</v-card-title>
          <v-card-subtitle>Insider Preview</v-card-subtitle>
        </v-card> </v-col
      ><v-col cols="12" md="6">
        <QueueInfo />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import QueueInfo from "@/components/Home/QueueInfo.vue";

export default {
  components: {
    QueueInfo
  }
};
</script>
