import React, { useState, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Loader2, Clock, Info } from 'lucide-react';
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  isSameMonth,
  isToday,
  addMonths,
  subMonths,
  isSameDay,
  parseISO,
} from 'date-fns';
import { supabase } from '../lib/supabase';
import './VenueCalendar.css';

export default function VenueCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [hoveredDate, setHoveredDate] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, [currentDate]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const start = format(startOfMonth(currentDate), 'yyyy-MM-dd');
      const end = format(endOfMonth(currentDate), 'yyyy-MM-dd');
      
      const { data, error: fetchError } = await supabase
        .from('venue_bookings')
        .select('*')
        .gte('date', start)
        .lte('date', end);

      if (fetchError) throw new Error(fetchError.message);
      
      setBookings(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  const getBookingStatus = (date) => {
    return bookings.find(booking => 
      isSameDay(parseISO(booking.date), date)
    );
  };

  const getStatusStyles = (date) => {
    const booking = getBookingStatus(date);
    if (!booking) return 'day-cell available';
    
    switch (booking.status) {
      case 'booked':
        return 'day-cell booked';
      case 'pending':
        return 'day-cell pending';
      default:
        return 'day-cell available';
    }
  };

  const renderStatusBadge = (status) => {
    switch (status) {
      case 'booked':
        return (
          <span className={`status-badge booked`}>
            <Clock className="status-icon" />
            {status}
          </span>
        );
      case 'pending':
        return (
          <span className={`status-badge pending`}>
            <Clock className="status-icon" />
            {status}
          </span>
        );
      default:
        return (
          <span className={`status-badge available`}>
            <Clock className="status-icon" />
            {status}
          </span>
        );
    }
  };

  const renderCalendarDays = () => {
    const days = eachDayOfInterval({
      start: startOfMonth(currentDate),
      end: endOfMonth(currentDate),
    });

    const firstDayOfMonth = startOfMonth(currentDate).getDay();
    const emptyDays = Array(firstDayOfMonth).fill(null);

    return (
      <>
      
      </>
    );
  };




  return (
    <div className="venue-calendar-container">
     
      {renderLegend()}

      {loading ? (
        <div className="loading-container">
          <Loader2 className="spinner" />
        </div>
      ) : (
        <div className="calendar-grid" role="grid" aria-label="Venue availability calendar">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="day-header" role="columnheader">
              <span className="sr-only">{day}</span>
              <span aria-hidden="true">{day}</span>
            </div>
          ))}
          {renderCalendarDays()}
        </div>
      )}
    </div>
  );
}