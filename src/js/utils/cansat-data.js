import db from '../database/database'
const fs = require('browserify-fs')
const data_ref = db.collection('SPM').orderBy('time', 'asc')

import pseudo_db from '../dev-data/db-data'
// .doc("time: 2 seconds");

//   .collection("Serial_Port_Monitor");

const data_cansat = async () => {
  let snapshot = await data_ref.get()
  // console.log(fs)
  snapshot = snapshot.docs.map(doc => doc.data())
  // console.log('snapshot:', snapshot)
  // fs.writeFile('test.txt', 'Pliss', () => console.log('NOW!'))
  // fs.mkdir('dupa')
  // fs.writeFile('./data.json', JSON.stringify(snapshot), 'utf8')
  return snapshot
}
// const fun = async () => {
//   return pseudo_db
// }

export { data_cansat }

const coords_ref = db.collection('Map_3D').orderBy('height', 'desc')

const map_3d = async () => {
  console.log('recieve map 3d')

  let snapshot = await coords_ref.get()
  // console.log(fs)
  snapshot = snapshot.docs.map(doc => {
    const obj = doc.data()
    const { x, y, size, height } = obj
    return [parseInt(x), parseInt(y), parseInt(size), parseInt(height)]
  })
  console.log('snapshot:', snapshot)
  // fs.writeFile('test.txt', 'Pliss', () => console.log('NOW!'))
  // fs.mkdir('dupa')
  // fs.writeFile('./data.json', JSON.stringify(snapshot), 'utf8')
  return snapshot
}

export { map_3d }

// const ref = db.collection("users");
// ref.get().then(resp => console.log(resp.data()));

// const ref = db.collection("Serial_Port_Monitor").doc("time: 2 seconds");
// ref.get().then(resp => console.log(resp));
// console.log(ref);
// ref.get().then(doc => doc.forEach(el => console.log(el.data()["temperature"])));
