import db from '../database/database'
const data_ref = db.collection('real_data').orderBy('height', 'desc')
import pseudo_db from '../dev-data/db-data'

const data_cansat = async () => {
  let snapshot = await data_ref.get()
  snapshot = snapshot.docs.map(doc => doc.data())
  return snapshot
}
// const data_cansat = async () => {
//   let snapshot = pseudo_db
//   return snapshot
// }
export { data_cansat }

const coords_ref = db.collection('Map_3D').orderBy('height', 'desc')

// const map_3d = async () => {
//   let snapshot = await coords_ref.get()
//   snapshot = snapshot.docs.map(doc => {
//     const obj = doc.data()
//     const { x, y, size, height } = obj
//     return [parseInt(x), parseInt(y), parseInt(size), parseInt(height)]
//   })
//   return snapshot
// }
const map_3d = async () => {
  let snapshot = [
    [0, 92, 1080, 96],
    [199, 253, 1080, 79],
    [300, 20, 1080, 60],
    ['last', 'last', 1080, 35]
  ]

  return snapshot
}
export { map_3d }
