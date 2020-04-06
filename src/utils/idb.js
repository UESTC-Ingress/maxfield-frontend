var idb = {
  async init() {
    return new Promise((resolve) => {
      let request = window.indexedDB.open("maxfield", 2);

      request.onsuccess = (e) => {
        resolve(e.target.result);
      };

      request.onupgradeneeded = (e) => {
        let db = e.target.result;
        db.createObjectStore("tasks", { keyPath: "taskid" });
      };
    });
  },
  async insert_task(taskid) {
    var db = await this.init();
    db.transaction(["tasks"], "readwrite")
      .objectStore("tasks")
      .add({ taskid: taskid, created: new Date() });
  },
  async get_task() {
    var db = await this.init();
    return new Promise((resolve) => {
      let trans = db.transaction(["tasks"], "readonly");
      trans.oncomplete = () => {
        resolve(tasks);
      };

      let store = trans.objectStore("tasks");
      let tasks = [];

      store.openCursor().onsuccess = (e) => {
        let cursor = e.target.result;
        if (cursor) {
          tasks.push(cursor.value);
          cursor.continue();
        }
      };
    });
  },
  async del_task(taskid) {
    var db = await this.init();
    return new Promise((resolve) => {
      let trans = db.transaction(["tasks"], "readwrite");
      trans.oncomplete = () => {
        resolve();
      };

      let store = trans.objectStore("tasks");
      store.delete(taskid);
    });
  },
};

export default idb;
