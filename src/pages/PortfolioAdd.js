import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom'
import axios from 'axios'


// file lama tidak dipakai
const PortfolioAdd = () => {

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([])

  // let navigate = useNavigate();


  const portfolioSubmit = (e) => {
    e.preventDefault();

    const bodyFormData = new FormData();
    bodyFormData.append("title", title);
    bodyFormData.append("slug", slug);
    bodyFormData.append("category", category);
    bodyFormData.append("description", description);
    bodyFormData.append("images", images);

    axios({
      method: "post",
      url: "http://localhost:5000/portfolio",
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" }
    })
      .then((res) => console.log("Portfolio Added Success", res))
      .then((response) => {
        setTitle('');
        setSlug('');
        setCategory('graphic');
        setDescription('');
        setImages([]);
      })
      .then(() => window.location('/'))
      .catch((err) => console.log(err.response))

    // navigate("/portfolio/add", { replace: true })
  }


  return (
    <div>
      <h3>Add Portfolio</h3>
      <form onSubmit={portfolioSubmit} className='addPortfolio'>
        <input type='text' name='title' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='title' />
        <input type='text' name='slug' value={slug} onChange={(e) => setSlug(e.target.value)} placeholder='slug' />
        {/* <input type='text' name='category' value={category} onChange={(e) => setCategory(e.target.value)} placeholder='category' /> */}
        <div className='radioBtn'>
          <label>
            <input type='radio' name='category' value='graphic' onChange={(e) => setCategory(e.target.value)} defaultChecked/>
            Graphic
          </label>
          <label>
            <input type='radio' name='category' value='website' onChange={(e) => setCategory(e.target.value)} />
            Website
          </label>
          <label>
            <input type='radio' name='category' value='photography' onChange={(e) => setCategory(e.target.value)} />
            Photography
          </label>
        </div>
        <input type='file' name='images' onChange={(e) => setImages(e.target.files[0])} />
        <textarea rows='5' cols='55' name='description' value={description} onChange={(e) => setDescription(e.target.value)} placeholder='description' />
        <input type='submit' value='submit' />
      </form>
    </div>
  )
}

export default PortfolioAdd