import 'core-js/stable'
import 'regenerator-runtime/runtime'
import './assets/css/style.css';

import Contact from './modules/Contact' 
import Login from './modules/Login';
import Register from './modules/Register'

const alerts = document.querySelectorAll('.alert')

if(location.pathname.includes('register')) {
  const register = new Register()
}

if(location.pathname.includes('login')) {
  const login = new Login
}

if(location.pathname.includes('contact')) {
  const contact = new Contact()
}

const animation = () => {
  setTimeout(() => {
    alerts.forEach(alert =>  {
      alert.classList.remove('fade-in')
      alert.classList.add('fade-out') 
      setTimeout(() => {
        alert.style.display = 'none'
      }, 2000)
    })
  }, 1000)
}

animation()