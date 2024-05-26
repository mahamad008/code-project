import React, { useState } from 'react';
import axios from 'axios';
// import { Description } from '@mui/icons-material';
// import './CreateCoursePage.css';

// interface FormData {
//   CategoryId:number,
//   content:any,
//   Description:any,
//   imageUrl:any,
//   TeacherId:number,
//   Shortdescription:any,
//   price:any,
//   Name:any,
//   videoUrl:any;
//   title:String;
// }

const CreateCoursePage: React.FC = () => {
  const [videoUrl, setvideoUrl] = useState<File | null>(null);
  const [imageUrl, setimageUrl] = useState<File | null>(null);
  const [Name, setName] = useState('english');
  const [content, setcontent] = useState('english');
  const [price, setprice] = useState(1);
  const [CategoryId, setCategoryId] = useState(1);;
  const [TeacherId, setTeacherId] = useState(1);;
  const[title,settitle]=useState('titletitle')
  const [shortDescription, setshortDescription] = useState('learning od english');
  const [Description, setDescription] = useState('learning od english');
  // const [formData, setFormData] = useState<FormData>();
    // console.log(setFormData)
  const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setvideoUrl(event.target.files[0]);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setimageUrl(event.target.files[0]);
    }
  };



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // if (!videoUrl || !imageUrl) {
    //   console.error('Video and image files are required');
    //   return;
    // } 

    const uploadData = new FormData();
    uploadData.append('video', videoUrl!);
    uploadData.append('image', imageUrl!);
    uploadData.append('Name', Name);
    uploadData.append('price', String(price));
    uploadData.append('TeacherId', String(TeacherId));
    uploadData.append('CategoryId', String(CategoryId));
    uploadData.append('shortDescription', shortDescription);
    uploadData.append('description',Description)
    uploadData.append('content',content)
    uploadData.append('title',title)



    // for (const key in formData) {
    //   // uploadData.append(key, formData[key].toany());
    // }

    // try {
      const response = await axios.post('http://localhost:5000/api/cource/upload', uploadData);
      console.log(response.data);
      // Handle the response or perform any necessary actions
    // } catch (error) {
      // console.error('Failed to upload video or image', error);
    //   // Handle the error or display an error message
    // }
  };

  return (
    <div className="container">
      <h1>Upload Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="video">Video</label>
          <input style={{backgroundColor:'white'}} type="file" id="video" accept="video/*" onChange={handleVideoChange} />
        </div>

        <div className="form-group">
          <label htmlFor="image">Image</label>
          <input type="file" id="image" accept="image/*" onChange={handleImageChange} />
        </div>

    

        <div className="form-group">
          <label htmlFor="Name">Name</label>
          <input value={Name}  style={{backgroundColor:'white'}} type="text" id="Name" name="Name" onChange={(e)=>setName(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="Name">title</label>
          <input value={title}  style={{backgroundColor:'white'}} type="text" id="Name" name="Name" onChange={(e)=>settitle(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="Name">Drscription</label>
          <input value={Description}  style={{backgroundColor:'white'}} type="text" id="Name" name="Name" onChange={(e)=>setDescription(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="Name">content</label>
          <input value={content}  style={{backgroundColor:'white'}} type="text" id="Name" name="Name" onChange={(e)=>setcontent(e.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="shortDescription">Short Description</label>
          <input type="text" value={shortDescription} id="shortDescription" name="shortDescription" onChange={(e)=>setshortDescription(e.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input type="number" value={price} id="price" name="price" onChange={(e)=>setprice(Number(e.target.value))} />
        </div>

        <div className="form-group">
          <label htmlFor="CategoryId">Category ID</label>
          <input type="number" value={CategoryId}  id="CategoryId" name="CategoryId" onChange={(e)=>setCategoryId(Number(e.target.value))} />
        </div>
        <div className="form-group">
          <label htmlFor="TeacherId">Teacher ID</label>
          <input value={TeacherId} type="number"  id="TeacherId" name="TeacherId" onChange={(e)=>setTeacherId(Number(e.target.value))} />
        </div>

      

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateCoursePage;