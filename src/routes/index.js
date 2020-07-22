const { Router } = require('express');

const path = require('path');

const router = Router();



router.get('/', (req, res) => {
    
    res.render('index');
});

router.get('/lab', (req, res) => {
    
    res.render('lab');
});


router.get('/algorithm', (req, res) => {
    
    res.render('algorithm');
});


router.get('/about', (req, res) => {
    
    res.render('about');
});



router.get('/contact', (req, res) => {
    
    res.render('contact');
});
module.exports = router