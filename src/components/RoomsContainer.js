import React from 'react'
import RoomsFilter from './RoomsFilter'
import RoomsList from './RoomsList'
import Loading from './Loading'

// using the custom hook 'useRoomContext' and arrow functions
// import { useRoomContext } from '../context'
// const RoomsContainer = () => {
//   const { loading, rooms, sortedRooms } = useRoomContext()
//   if (loading) return <Loading />
//   return (
//     <div>
//       Hello from rooms container
//       <RoomsFilter rooms={rooms} />
//       <RoomsList rooms={sortedRooms} />
//     </div>
//   )
// }
// export default RoomsContainer

// using the decorator 'withRoomContext' and ES5 functions
import { withRoomContext } from '../context'
function RoomContainer({ context }) {
  const { loading, rooms, sortedRooms } = context
  if (loading) return <Loading />
  return (
    <>
      <RoomsFilter rooms={rooms} />
      <RoomsList rooms={sortedRooms} />
    </>
  )
}
export default withRoomContext(RoomContainer)
