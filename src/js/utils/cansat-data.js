import db from "../database/database";

const ref = db.collection("Serial_Port_Monitor").orderBy("time", "asc");
// .doc("time: 2 seconds");

//   .collection("Serial_Port_Monitor");

const fun = async () => {
  const snapshot = await ref.get();
  return snapshot.docs.map(doc => doc.data());
};

export default fun;

// const ref = db.collection("users");
// ref.get().then(resp => console.log(resp.data()));

// const ref = db.collection("Serial_Port_Monitor").doc("time: 2 seconds");
// ref.get().then(resp => console.log(resp));
// console.log(ref);
// ref.get().then(doc => doc.forEach(el => console.log(el.data()["temperature"])));
