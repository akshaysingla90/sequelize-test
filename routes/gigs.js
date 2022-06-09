const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Gig = require('../models/Gig');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// Get gig list
router.get('/', (req, res) => 
  Gig.findAll()
    .then(gigs => res.render('gigs', {
        gigs
      }))
    .catch(err => res.render('error', {error: err})));

// Display add gig form
router.get('/add', (req, res) => res.render('add'));

// Add a gig
router.post('/add', (req, res) => {
 // Insert into table
 console.log('===========================')
    Gig.create({
      "id":"1",
            "name" : "sakshi",
            "age":"22",
            "marks1":"66",
            "marks2":"50",
            "marks3":"56"
      })
      .then(gig => res.status(200).json({msg : "ok"}))
      .catch(err => res.render('error', {error:err.message}))
  }
);

// Search for gigs
router.get('/search', (req, res) => {
  let { term } = req.query;

  // Make lowercase

  Gig.findAll({ where: { technologies: { [Op.like]: '%' + term + '%' } } })
    .then(gigs => res.render('gigs', { gigs }))
    .catch(err => res.render('error', {error: err}));
});

router.get('/:id', (req, res) => {
  let idToken = req.params.id;
  Gig.findOne({ where: { id: idToken } } )
  .then(result => res.status(200).json({msg:'ok', data: result}))
  .catch(err => res.status(400).json({msg:'bad request'}))
});

router.get('/:id', async (req, res) => {
  let idToken = req.params.id;
  try{
  let data=await Gig.findOne({ where: { id: idToken } } )
  data.forEach(function (studentObj,index){
    let  result;
   if( studentObj.mark1>35 && studentObj.mark2>35 && studentObj.mark3>35  ){
     result="pass"
      return result
   }
   else
   result="fail"
   return result
  })
  
  res.status(200).json({
    data:{
      msg:'ok',
      data:result
    }
  })

}

  catch (error) {
    console.log(error)
}
});

module.exports = router;