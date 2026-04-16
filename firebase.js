import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "SUA_KEY",
  authDomain: "SEU_PROJETO.firebaseapp.com",
  databaseURL: "https://SEU_PROJETO.firebaseio.com",
  projectId: "SEU_ID",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

window.salvarHQ = function (hq) {
  const id = push(ref(db, "hqs")).key;
  set(ref(db, "hqs/" + id), {
    conteudo: hq,
    data: Date.now()
  });
};
