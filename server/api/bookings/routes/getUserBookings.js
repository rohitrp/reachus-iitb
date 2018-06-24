const Booking = require('../model/Booking')
const Room = require('../../rooms/model/Room')
const addRoomDetailsToBooking = require('../util/bookingFunctions').addRoomDetailsToBooking

module.exports = {
    method: 'GET',
    path: '/api/user/bookings',
    options: {
        handler: async (request, h) => {
            const bookings = await Booking.find(
                { user: request.auth.credentials.id }
            )
            .select('-_id -__v')
            .lean()

            for (let i = 0; i < bookings.length; i++) {
                bookings[i] = await addRoomDetailsToBooking(request, bookings[i])
            }

            return bookings
        },
        auth: {
            strategy: 'jwt'
        },
        description: 'Get bookings of a user',
        notes: 'Returns all bookings made by a user',
        tags: ['api', 'booking']
    }
}