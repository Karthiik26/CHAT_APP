const express = require('express');
const RegisterUser = require('../controllers/RegisterUser');
const CheckEmailLogin = require('../controllers/Check_Email_phone_Login');
const CheckPassword = require('../controllers/CheckPassword');
const UserDetails = require('../controllers/UserDetails');
const UpdateUser = require('../controllers/UpdateUser');
const LogOut = require('../controllers/Logout');
const SearchUser = require('../controllers/SearchUser');

const router = express.Router();

// Create User Register Api
router.post('/Register', RegisterUser);
router.post('/LoginUser', CheckEmailLogin);
router.post('/CheckPassword', CheckPassword);
router.get('/GetUserDetails', UserDetails);
router.post('/UpdateUser', UpdateUser);
router.get('/LogOut', LogOut);
router.post('/Search-User', SearchUser)



module.exports = router