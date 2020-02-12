import db from '../database/database'
const data_ref = db.collection('SPM').orderBy('time', 'asc')
import pseudo_db from '../dev-data/db-data'

const data_cansat = async () => {
  let snapshot = await data_ref.get()
  snapshot = snapshot.docs.map(doc => doc.data())
  return snapshot
}
export { data_cansat }

const coords_ref = db.collection('Map_3D').orderBy('height', 'desc')

const map_3d = async () => {
  let snapshot = await coords_ref.get()
  snapshot = snapshot.docs.map(doc => {
    const obj = doc.data()
    const { x, y, size, height } = obj
    return [parseInt(x), parseInt(y), parseInt(size), parseInt(height)]
  })
  return snapshot
}
export { map_3d }
