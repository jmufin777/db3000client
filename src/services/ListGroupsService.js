import Api from "@/services/Api";

export default {
  all(user, typ) {
    return Api().get("list_groups", { params: { u: "user", typ: typ } });
  },
  init(user, form, typ) {
    return Api().post("list_groups", { form: form, user: user, typ: typ });
  },
  delete(user, id) {
    return Api().delete("list_groups", { params: { user: user, id: id } });
  },
  update(user, form) {
    return Api().put("list_groups", { form: form, user: user });
  },
  updateMenus(user, form) {
    return Api().put("list_groups-menus", { form: form, user: user });
  },
  updateModules(user, form) {
    return Api().put("list_groups-modules", { form: form, user: user });
  }
};
