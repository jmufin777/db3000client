import Api from "@/services/Api";

export default {
  all(user, typ, order = "", limit = 0, offset = 0) {
    //typ - typ bud nic nebo where podmoinka, other -  Treba order nebo neco jinyho kdzy mnenapadne, ofset limit
    return Api().get("list-stroj", {
      params: {
        user: user,
        id: typ,
        order: order,
        limit: limit,
        offset: offset
      }
    });
  },
  one(user, typ, id_query = -1, string_query = "") {
    if (string_query == "copy") {
      //        alert('ONO' + typ )
    }

    return Api().get("list-stroj-one", {
      params: {
        user: user,
        id: typ,
        id_query: id_query,
        string_query: string_query
      }
    });
  },

  nema(user, typ, id_query = -1, string_query = "nema") {
    if (string_query == "copy") {
      //        alert('ONO' + typ )
    }

    return Api().get("list-stroj-one", {
      params: {
        user: user,
        id: typ,
        id_query: id_query,
        string_query: string_query
      }
    });
  },
  delete(user, id) {
    return Api().post("list-stroj-delete", { params: { user: user, id: id } });
  },
  setTisk(user, id, anone = true) {
    return Api().post("list-stroj-settisk", {
      params: { user: user, id: id, anone: anone }
    });
  },
  setMereni(user, id, anone = true) {
    return Api().post("list-stroj-setmereni", {
      params: { user: user, id: id, anone: anone }
    });
  },

  update(user, form) {
    return Api().put("list-stroj", { form: form, user: user });
  },
  insert(user, form) {
    return Api().post("list-stroj", { form: form, user: user });
  },
  saveone(user, idefix, form) {
    return Api().post("list-stroj-save-one", {
      form: form,
      user: user,
      idefix: idefix
    });
  },

  moveMod(user, idefix, form) {
    return Api().post("list-stroj-save-one", {
      form: form,
      user: user,
      idefix: idefix,
      moveMod: 1
    });
  },
  copyMod(user, idefix, form) {
    return Api().post("list-stroj-save-one", {
      form: form,
      user: user,
      idefix: idefix,
      copyMod: 1
    });
  }
};
