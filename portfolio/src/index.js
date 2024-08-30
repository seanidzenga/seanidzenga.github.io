import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import './styles/output.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

document.body.classList.add("macchiato"); // sets the default catppuccin flavour but can be swapped dynamically
document.body.classList.add("bg-base"); // adds the bg-base class to the body ensuring we always have a dark background.
document.body.classList.add("text-text") // set base text colour to --ctp-text

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
