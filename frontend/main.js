import 'core-js/stable'
import 'regenerator-runtime/runtime'
import './assets/css/style.css';

import Contact from './modules/Contact' 
import Login from './modules/Login';
import Register from './modules/Register'

const alerts = document.querySelectorAll('.alert')

setTimeout(() => {
  alerts.forEach(alert =>  { 
    alert.style.display = 'none'
  })
}, 2000)

if(location.pathname.includes('register')) {
  const register = new Register()
}

if(location.pathname.includes('login')) {
  const login = new Login
}

if(location.pathname.includes('contact')) {
  const contact = new Contact()
}