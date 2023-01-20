import React from 'react';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom'

import { createRoot } from 'react-dom/client';
import BlogProvider from './contextBlog';


const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <BlogProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </BlogProvider>
  </React.StrictMode>,

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();



// react17 versions  //

// import React from 'react';
// // import ReactDOM from 'react-dom/client'; <- This import is only for React version 18
// import { render } from 'react-dom'; // <- This is the correct import statement for React version 17
// import App from './App';
// import { BrowserRouter } from 'react-router-dom'
// import reportWebVitals from './reportWebVitals';

// // const root = ReactDOM.createRoot(document.getElementById('root'));
// const root = document.getElementById('root'); // <- This is the correct method call for React version 17
// render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter >
//   </React.StrictMode>,
//   root
// );

// reportWebVitals();
