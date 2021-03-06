const express = require('express'),
      router  = express.Router()

// Importing Services
const {logUserIn, logUserOut, checkLogin} = require('../services/authorization')

// ============================ Register ============================
router.get('/register', checkLogin, (req, res) => {
  res.render('register')
})

// ============================ Login ============================
router.get('/login', checkLogin, (req, res) => {
  res.render('login')
})

// ============================Logging User In============================
router.post('/login', async (req, res) => {
    let loginPattern = ["username", "password"],
        inputKeys    = Object.keys(req.body),
        isDataValid  = loginPattern.every( input => inputKeys.includes(input) && req.body[input].trim() !== "" )
  
    if(!isDataValid) {
      req.flash('error', "لطفا فرم ورود را کامل پر کنید")
      return res.redirect('/login')
    }
  
    try {
      let user = await logUserIn(req.body) 
      req.flash('message', `${user.username} خوش آمدی`) 
      req.session.user = user
      return res.redirect('/dashboard')
      
    } catch (err) {
      req.flash('error', err)
      res.redirect('/login')
    }
  })
  
  // ============================Logout User============================
  router.get('/logout', (req, res) => { logUserOut(req, res)} )

  module.exports = router