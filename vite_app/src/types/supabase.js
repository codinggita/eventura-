/**
 * @typedef {string | number | boolean | null | { [key: string]: Json | undefined } | Json[]} Json
 */

/**
 * @typedef {Object} Database
 * @property {Object} public
 * @property {Object} public.Tables
 * @property {Object} public.Tables.venue_bookings
 * @property {Object} public.Tables.venue_bookings.Row
 * @property {string} public.Tables.venue_bookings.Row.id
 * @property {string} public.Tables.venue_bookings.Row.date
 * @property {'available' | 'pending' | 'booked'} public.Tables.venue_bookings.Row.status
 * @property {string | null} public.Tables.venue_bookings.Row.customer_name
 * @property {string | null} public.Tables.venue_bookings.Row.customer_email
 * @property {string | null} public.Tables.venue_bookings.Row.notes
 * @property {string} public.Tables.venue_bookings.Row.created_at
 * @property {string} public.Tables.venue_bookings.Row.updated_at
 */

/**
 * @typedef {Object} VenueBookingInsert
 * @property {string} [id]
 * @property {string} date
 * @property {'available' | 'pending' | 'booked'} status
 * @property {string | null} [customer_name]
 * @property {string | null} [customer_email]
 * @property {string | null} [notes]
 * @property {string} [created_at]
 * @property {string} [updated_at]
 */

/**
 * @typedef {Object} VenueBookingUpdate
 * @property {string} [id]
 * @property {string} [date]
 * @property {'available' | 'pending' | 'booked'} [status]
 * @property {string | null} [customer_name]
 * @property {string | null} [customer_email]
 * @property {string | null} [notes]
 * @property {string} [created_at]
 * @property {string} [updated_at]
 */

module.exports = {};