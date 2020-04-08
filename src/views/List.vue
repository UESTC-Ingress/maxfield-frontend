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
        {{
          ["orange", "red"].includes(status2descr(item.status).color)
            ? "--"
            : plusoneday(item.created).toLocaleString()
        }}
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
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>计算任务列表</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn @click="gettasks"><v-icon>mdi-refresh</v-icon>刷新</v-btn>
        </v-toolbar>
      </template>
    </v-data-table>
  </v-container>
</template>
<script>
import idb from "@/utils/idb";

export default {
  data: () => ({
    loading: true,
    headers: [
      {
        text: "任务 ID",
        sortable: false,
        value: "taskid"
      },
      {
        text: "失效时间",
        value: "created"
      },
      {
        text: "状态",
        value: "status"
      },
      {
        text: "操作",
        sortable: false,
        value: "action"
      }
    ],
    tasklist: []
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
        tasklist_s.forEach(el => {
          if ((new Date() - el.created.getTime()) / 1000 > 86400)
            el.status = "EXPIRED";
          else task_status_post.push(el);
        });
        if (task_status_post.length)
          this.axios
            .post(process.env.VUE_APP_API + "/status", {
              tasks: task_status_post.map(e => e.taskid)
            })
            .then(res => {
              for (let index = 0; index < res.data.data.length; index++) {
                tasklist_s[tasklist_s.indexOf(task_status_post[index])].status =
                  res.data.data[index];
                if (res.data.expire[index] != null)
                  tasklist_s[
                    tasklist_s.indexOf(task_status_post[index])
                  ].created = new Date(parseInt(res.data.expire[index]));
              }
              this.tasklist = tasklist_s;
              this.loading = false;
            });
        else {
          this.tasklist = tasklist_s;
          this.loading = false;
        }
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
        case "EXPIRED":
          return { color: "grey", selectable: false, descr: "过期" };
        case null:
          return { color: "orange", selectable: false, descr: "等待中" };
        default:
          return {
            color: "green",
            selectable: true,
            descr: "完成：" + (status ? status : "未知节点")
          };
      }
    }
  },
  mounted() {
    this.gettasks();
  }
};
</script>
