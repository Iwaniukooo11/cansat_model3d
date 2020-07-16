import db from '../database/database'
const data_ref_1 = db.collection('P1_stan_1').orderBy('time1', 'asc')
const data_ref_2 = db.collection('P1_stan_2').orderBy('time1', 'asc')
import pseudo_db from '../dev-data/db-data'

const data_cansat = async (num = 1) => {
  let snapshot
  if (num === 1) {
    snapshot = await data_ref_1.get()
  } else if (num == 2) {
    snapshot = await data_ref_2.get()
  } else if (num === 'both') {
    let snap_a = await data_ref_1.get()
    snap_a = snap_a.docs.map((doc) => {
      const data = doc.data()
      data.state = 'state_1'
      return data
    })

    let snap_b = await data_ref_2.get()
    snap_b = snap_b.docs.map((doc) => {
      const data = doc.data()
      data.state = 'state_2'
      return data
    })

    snapshot = snap_a.concat(snap_b)
    return snapshot
  }
  snapshot = snapshot.docs.map((doc) => doc.data())
  return snapshot
}
// const data_cansat = async () => {
//   let snapshot = pseudo_db
//   return snapshot
// }
export { data_cansat }

const coords_ref = db.collection('Map_3D-dron').orderBy('height', 'desc')

const map_3d = async () => {
  let snapshot = await coords_ref.get()
  snapshot = snapshot.docs.map((doc) => {
    const obj = doc.data()
    const { x, y, size, height } = obj
    return [parseInt(x), parseInt(y), parseInt(size), parseInt(height)]
  })
  return snapshot
}
// const map_3d = async () => {
//   let snapshot = [
//     [0, 92, 1080, 96],
//     [199, 253, 1080, 79],
//     [300, 20, 1080, 60],
//     ['last', 'last', 1080, 35],
//   ]

//   return snapshot
// }
export { map_3d }
