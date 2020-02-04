import db from '../database/database'
const fs = require('browserify-fs')
const ref = db.collection('Serial_Port_Monitor').orderBy('time', 'asc')

import pseudo_db from '../dev-data/db-data'
// .doc("time: 2 seconds");

//   .collection("Serial_Port_Monitor");

const fun = async () => {
  let snapshot = await ref.get()
  // console.log(fs)
  snapshot = snapshot.docs.map(doc => doc.data())
  console.log('snapshot:', snapshot)
  // fs.writeFile('test.txt', 'Pliss', () => console.log('NOW!'))
  // fs.mkdir('dupa')
  // fs.writeFile('./data.json', JSON.stringify(snapshot), 'utf8')
  return snapshot
}
// const fun = async () => {
//   return pseudo_db
// }

export default fun

// const ref = db.collection("users");
// ref.get().then(resp => console.log(resp.data()));

// const ref = db.collection("Serial_Port_Monitor").doc("time: 2 seconds");
// ref.get().then(resp => console.log(resp));
// console.log(ref);
// ref.get().then(doc => doc.forEach(el => console.log(el.data()["temperature"])));
