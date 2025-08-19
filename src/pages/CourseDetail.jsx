import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import API from '../services/api';

function CourseDetail() {
  const { id } = useParams();
  const navigate=useNavigate();
  const [course, setCourse] = useState(null);
  const [loading,setLoading] = useState(false);

  const user=JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = !!user;

  const fetchCourse = async () => {
    try {
      const res = await API.get(`/course/view/${id}`,{
        withCredentials:true,
      });
      
      setCourse(res.data);
    } catch (error) {
      console.log(error);
    }
  }
  console.log(course)

  useEffect(() => {
    fetchCourse();
  }, [id]);

  const handleBookNow = async()=>{
    if(!isLoggedIn){
      navigate("/login");
      return;
    }
    try{
      setLoading(true);
      const res=await API.post(
        `/booking/create/${id}`,
        {},
        {
          headers:{
            Authorization:`Bearer ${user.token}`,
          },
        }
      );

      if(res.data.booking){
        alert("Booking Successful");
        navigate("/mybooking");
      }else{
        alert(res.data.message || "Booking Failed")
      }
    }catch(error){
      console.log(error)
      alert(error.response?.data?.message || "Something went Wrong");
    }finally{
      setLoading(false);
    }
  };

  if(!course){
    return <div className='text-center my-5'>Loading...</div>
  }

  return (
    <>
      <img src="https://pninfosys.org/bannerFinal.jpg" alt="" className='w-100' style={{ height: "500px" }} />
      <div className="container my-5">
        {" "}
        {/* my-5 = margin top aur bottom */}
        <div className="row">
          <div className="col-md-5">
            <img
              src={course?.image.url}
              alt={course?.title}
              className="img-fluid rounded"
            />
          </div>
          <div className="col-md-7">
            <h2>{course?.title}</h2>
            <p>{course?.description}</p>
            <p>
              <strong>Price:</strong> ₹{course?.price}
            </p>
            <button className="btn btn-success" onClick={handleBookNow} disabled={loading}>{loading ? "Booking..." : isLoggedIn ? "Book Now" : "Login to book"}</button>
          </div>
        </div>
      </div>
    </>
  );

}

export default CourseDetail
