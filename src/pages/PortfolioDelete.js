import React, { useEffect, useState } from 'react'
import axios from 'axios';


// file lama tidak dipakai
const PortfolioDelete = () => {

  const [listPortfolio, setListPortfolio] = useState([]);
  const [modalStatus, setModalStatus] = useState(false);

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([])
  const [portfId, setPortfId] = useState('');

  useEffect(() => {
    const getPortfolio = async () => {
      await axios.get('http://localhost:5000/portfolio')
        .then((response) => setListPortfolio(response.data))
        .catch((err) => console.log('error nih ', err))
    }
    getPortfolio();
  }, [listPortfolio])

  const delPortfolio = (id) => {
    axios.delete(`http://localhost:5000/portfolio/delete/${id}`)
      .then(() => { setListPortfolio(listPortfolio.filter(content => content._id !== id)) })
      .catch((err) => console.log(err))
  }

  //edit Portfolio
  const editPortfolio = (portfolio) => {
    console.log('isi portfolio', portfolio);
    setModalStatus(true);

    setTitle(portfolio.title);
    setSlug(portfolio.slug);
    setCategory(portfolio.category);
    setDescription(portfolio.description);
    setImages(portfolio.images)
    setPortfId(portfolio._id)

    window.onclick = (event) => {
      if (event.target.id === 'myModal') {
        setModalStatus(false)
      }
    }
  }

  //update portfolio
  const portfolioUpdate = () => {

    axios({
      method:"put",
      url: `http://localhost:5000/portfolio/update/${portfId}`,
      data: {title, slug, category, description, images}
    })
      .then((res) => console.log("Portfolio Added Success", res))
      .catch((err) => console.log(err.response))
  }

  return (
    <>
      {/* Modal window dan Update form */}
      <div id="myModal" className={modalStatus ? 'modal-editPortfolio show' : 'modal-editPortfolio'}>
        <div className='modal-content'>
        <h3>Update Portfolio</h3>
          <div>
            <form onSubmit={portfolioUpdate} className='addPortfolio'>
              <input type='text' name='title' value={title} onChange={(e) => setTitle(e.target.value)} placeholder={title} />
              <input type='text' name='slug' value={slug} onChange={(e) => setSlug(e.target.value)} placeholder={slug} />
              <div className='radioBtn'>
                <label>
                  <input type='radio' name='category' value='graphic' onChange={(e) => setCategory(e.target.value)} defaultChecked={category === 'graphic' ? true : false} />
                  Graphic
                </label>
                <label>
                  <input type='radio' name='category' value='website' onChange={(e) => setCategory(e.target.value)} defaultChecked={category === 'website' ? true : false}/>
                  Website
                </label>
                <label>
                  <input type='radio' name='category' value='photography' onChange={(e) => setCategory(e.target.value)} 
                  defaultChecked={category === 'photography' ? true : false}/>
                  Photography
                </label>
              </div>
              <input type='file' name='images' onChange={(e) => setImages(e.target.files[0])} />
              <textarea rows='5' cols='55' name='description' value={description} onChange={(e) => setDescription(e.target.value)} placeholder={description} />
              <input type='submit' value='update' />
            </form>
          </div>
          <button onClick={() => setModalStatus(false)} className="closeBtn">X</button>
        </div>
      </div>
      <table className='delPortfolio'>
        <tbody>
          <tr>
            <th>title</th>
            <th>category</th>
            <th>id</th>
            <th>thumbnail</th>
            <th>action</th>
          </tr>
          {
            listPortfolio.map((portfolio, index) => {
              return (
                <tr key={index}>
                  <td>{portfolio.title}</td>
                  <td>{portfolio.category}</td>
                  <td>{portfolio._id}</td>
                  <td><img src={`http://localhost:5000/${portfolio.images}`} alt="portfolio" className='thumb' /></td>
                  <td className='ActionBtn'>
                    <button onClick={() => delPortfolio(portfolio._id)}
                      style={{ marginLeft: 'auto', marginRight: '20px' }}>Delete</button>
                    <button onClick={() => editPortfolio(portfolio)}>Edit</button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </>
  )
}

export default PortfolioDelete