<template>
  <v-container>
    <v-data-table
      :loading="loading"
      :headers="headers"
      :items="tasklist"
      :items-per-page="5"
      class="elevation-1"
    >
      <template v-slot:item.created="{ item }">
        {{ plusoneday(item.created).toLocaleString() }}
      </template>
      <template v-slot:item.status="{ item }">
        <v-chip :color="status2descr(item.status).color" dark>{{
          status2descr(item.status).descr
        }}</v-chip>
      </template>
      <template v-slot:item.action="{ item }">
        <v-btn
          icon
          v-if="status2descr(item.status).selectable"
          :to="'/info/' + item.status + '/' + item.taskid"
          ><v-icon>mdi-information-outline</v-icon></v-btn
        >
        <v-btn icon @click.stop="deltask(item.taskid)"
          ><v-icon>mdi-delete</v-icon></v-btn
        >
      </template>
    </v-data-table>
  </v-container>
</template>
<script>
import idb from "@/utils/idb";
import nodelist from "@/assets/nodelist.json";

export default {
  data: () => ({
    loading: true,
    headers: [
      {
        text: "任务 ID",
        sortable: false,
        value: "taskid",
      },
      {
        text: "失效时间",
        value: "created",
      },
      {
        text: "状态",
        value: "status",
      },
      {
        text: "操作",
        sortable: false,
        value: "action",
      },
    ],
    tasklist: [],
  }),
  methods: {
    plusoneday(day) {
      day.setDate(day.getDate() + 1);
      return day;
    },
    gettasks: async function() {
      var tasklist_s = await idb.get_task();
      if (tasklist_s.length != 0) {
        tasklist_s = tasklist_s.reverse();
        var task_status_post = [];
        tasklist_s.forEach((el) => {
          task_status_post.push(el.taskid);
        });
        this.axios
          .post(
            "https://maxfield-api-dev-stevecharlesyang.cloud.okteto.net/status",
            {
              tasks: task_status_post,
            }
          )
          .then((res) => {
            for (let index = 0; index < res.data.data.length; index++) {
              tasklist_s[index].status = res.data.data[index];
            }
            this.tasklist = tasklist_s;
            this.loading = false;
          });
      } else {
        this.loading = false;
      }
    },
    deltask: function(taskid) {
      idb.del_task(taskid);
      this.tasklist.splice(
        this.tasklist
          .map(function(e) {
            return e.taskid;
          })
          .indexOf(taskid),
        1
      );
    },
    status2descr: function(status) {
      switch (status) {
        case "FAILED":
          return { color: "red", selectable: false, descr: "失败" };
        case null:
          return { color: "orange", selectable: false, descr: "等待中" };
        default:
          return {
            color: "green",
            selectable: true,
            descr:
              "完成：" +
              (nodelist[status] ? nodelist[status].name : "未知节点"),
          };
      }
    },
  },
  mounted() {
    this.gettasks();
  },
};
</script>
