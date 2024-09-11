// utils/getNearbyEvents.js
// import Event from '../models/event.model.js';

// export const getNearbyEvents = async (lat, lng, maxDistance) => {
//   return Event.aggregate([
//     {
//       $geoNear: {
//         near: { type: 'Point', coordinates: [lng, lat] },
//         distanceField: 'distance',
//         maxDistance: maxDistance,
//         spherical: true
//       }
//     }
//   ]);
// };
