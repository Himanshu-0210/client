import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

function MyBooking() {

  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = !!user;

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    const fetchBookings = async () => {
      try {
        const res = await API.get("/booking/mybookings", {

        });
        setBookings(res.data.bookings || []);
      } catch (error) {
        console.log(error);
        alert("Failed to fetch Bookings")
      }
    }

    useEffect(() => {
      fetchBookings();
    }, [])


  }, [isLoggedIn, navigate, user]);
  if (!isLoggedIn) return null;





  return (
    <div className="container mt-5">
      <h2 className="mb-4">My Booking</h2>
      {booking.length === 0 ? (
        <p>You have no booking yet ..</p>
      ) : (
        <table className="table table-bordered">
          <thead className="table-primary">
            <tr>
              <th>#</th>
              <th>Course</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {booking.map((booking, index) => (
              <tr key={booking._id}>
                <td>{index + 1}</td>
                <td>{booking.course.title}</td>
                <td>Rs{booking.course.price}</td>
                <td>{booking.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default MyBooking






