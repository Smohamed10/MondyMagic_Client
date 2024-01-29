import React, { useState } from "react";
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import DatePicker from "react-datepicker";
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import "react-datepicker/dist/react-datepicker.css";
import "../../Assets/css/spinner.css";

import { useParams } from "react-router-dom";
import { getAuthUser } from '../../Helper/Storage';
import { useNavigate } from "react-router-dom";

const Auth = getAuthUser();

const UpdateTrip = () => {
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState(null);
    const [startDate, setStartDate] = useState(new Date());
    const [value, onChange] = useState('10:00');
    let {id}=useParams();
    const navigate = useNavigate();

    const [Post, setPost] = useState({
        master_image: "",
        name: "",
        description: "",
        date: "",
        time: "",
        salary: "",
        admin:"",
        public_id:"",
        loading: false,
        err: []
    });

    const Do_Post = async (e) => {
      e.preventDefault();
    
      try {
          const imageUrl = await uploadImage(); // Wait for image upload to complete
    
          if (imageUrl) {
              const Date = startDate.toISOString().split('T')[0]; // Correct date format
              const Time = value;
    
              setPost({ ...Post, loading: true, err: [] });
    console.log(id)
    axios.put(`https://mondy-magic-server.onrender.com/updatetrip/${id}`, {
        
        master_image: imageUrl,
                  name: Post.name,
                  date: Date,
                  time: Time,
                  salary: Post.salary,
                  description: Post.description,
                  admin:Auth[0].status,
                  public_id:Post.public_id

              },{
                headers: {
                    token: Auth[0].token, 
                  }
              }
              ).then(resp => {
                  console.log(resp);
                  setPost({ ...Post, loading: false, err: [] });
                 navigate("/");

              }).catch((errors) => {
                  console.log(errors);
                  setPost({ ...Post, loading: false, err: [errors.response.data.msg] });
                  console.log([errors.response.data.msg]);
              });
          } else {
              console.error("Image upload failed or master_image is empty.");
          }
      } catch (error) {
          console.log(error);
      }
    };
  
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
        setPreview(reader.result);
    };
};

const handleResetClick = () => {
    setPreview(null);
    setImage(null); // Clear the image state when resetting
};

const uploadImage = async () => {
    if (!image) {
        console.error("No image to upload.");
        return;
    }

    setLoading(true);
    const data = new FormData();
    data.append("file", image);
    data.append(
        "upload_preset",
        process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
    );
    data.append("cloud_name", process.env.REACT_APP_CLOUDINARY_CLOUD_NAME);
    data.append("folder", "Mondy_Magic");

    try {
        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
            {
                method: "POST",
                body: data,
            }
        );
        const res = await response.json();
        Post.public_id=res.public_id
        setUrl(res.secure_url);
        setLoading(false);
        return res.secure_url;
    } catch (error) {
        setLoading(false);
        setPost({ ...Post, loading: false, err: [error.response.data.msg] });
        console.log(error);
        throw error;
    }
};
    return (
        <div>
            <h1>Update Trip</h1>
            {Post.err.map((error, index) => (
                <Alert key={index} variant='danger'>
                    {error}
                </Alert>
            ))}
            <div className="col-md-12 mb-12">
                <form onSubmit={Do_Post} action="#" className="p-5 bg-white">

                    <div className="row form-group">
                        <div className="col-md-8 mb-3 mb-md-0">
                            <label className="text-black" htmlFor="fname">Trip Destination</label>
                            <input required type="text" id="fname" className="form-control" value={Post.name} onChange={(e) => setPost({ ...Post, name: e.target.value })} />
                        </div>

                        <div className="col-md-2 mb-3 mb-md-0">
                            <label className="text-black" htmlFor="fname">Pick The Date</label>
                            <DatePicker required selected={startDate} id="fname" className="form-control" onChange={(date) => setStartDate(date)} />
                            <input type="hidden" name="date" value={startDate.toISOString().split('T')[0]} />
                        </div>

                        <div className="col-md-2 mb-3 mb-md-0">
                            <label className="text-black" htmlFor="lname">Pick The Time</label>
                            <TimePicker required id="lname" className="form-control" onChange={onChange} value={value} />
                            <input type="hidden" name="time" value={value} />
                        </div>

                    </div>

                    <div className="row form-group">
                        <div className="col-md-12">
                            <label className="text-black" htmlFor="subject">Price</label>
                            <input required type="number" id="subject" className="form-control" value={Post.salary} onChange={(e) => setPost({ ...Post, salary: e.target.value })} />
                        </div>
                    </div>

                    <div className="row form-group">
                        <div className="col-md-12">
                            <label className="text-black" htmlFor="Description">Trip Details</label>
                            <textarea required value={Post.description} onChange={(e) => setPost({ ...Post, description: e.target.value })} name="message" id="message" cols="30" rows="7" className="form-control" placeholder="Write Trip Details Here..."></textarea>
                        </div>
                    </div>

                    <div className="row form-group">
                        <div className="col-md-12">
                            <label className="text-black" htmlFor="subject">Upload Destination Photo</label>
                            <input required id="subject" type="file" className="form-control" onChange={handleImageChange} accept="image/*" />
                            {preview && <img src={preview} alt="preview" className="img-fluid rounded" />}
                        </div>
                    </div>

                    <div className="row form-group">
                        <div className="col-md-12">
                        <input disabled={!image} type="submit" value=" Update Trip Information" className="btn btn-primary py-2 px-4 text-white" />
                        </div>
                    </div>

                    <div className="row form-group">
                        <div className="col-md-12">
                            <button onClick={handleResetClick} className="btn btn-primary py-2 px-4 text-white">Reset Image</button>
                        </div>
                    </div>

                    <div className="h-screen sm:px-8 md:px-16 sm:py-8">
                        <div className="container mx-auto max-w-screen-lg h-full">
                        {loading ? (
    <div className="loading-spinner-overlay">
        <div className="loading-spinner-container">
            <div className="loading-spinner">&#9765;</div>
            <span>Loading...</span>
        </div>
    </div>
): url && (
    <div>
        {/* Additional content when not loading */}
    </div>
)}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateTrip;