var express = require('express');
var router = express.Router();
var isLoggedIn = require('../helpers/helpers').isLoggedIn;
module.exports = function(passport, posts, tags) {
  // GET /add
  router.get('/', isLoggedIn, function(req, res){
    res.render('add/add',{
       title: 'Add New Image'
    });
  });

 // POST /add
 router.post('/', isLoggedIn, function(req, res){
   var reqdata = req.body;
   var tagsArr = reqdata.tags.split(',').map(function(item) {
     return item.trim();
   });
   // var p = new Promise((resolve, reject) => {
   //   let tagIds = [];
   //   tagsArr.forEach(function(tag){
   //     tags.findOne({
   //       where: {
   //       'body' : tag
   //       }
   //     })
   //     .then(function(t) {
   //       if(!t){
   //         tags.create({
   //           body: tag
   //         })
   //         .then(function(d) {
   //           console.log('new tag');
   //           console.log(d.dataValues.id);
   //           tagIds.push(d.dataValues.id);
   //         });
   //       }
   //       else{
   //         console.log('old tag');
   //         console.log(t.dataValues.id);
   //         tagIds.push(t.dataValues.id);
   //       }
   //     })
   //   }).then(function(){
   //     console.log('tag ids: ' + tagIds);
   //     resolve(tagIds);
   //   });
   // });
   // p.then(function(ids){
     // reqdata.tags = ids;
     reqdata.tags = tagsArr;
     // console.log('ids:');
     // console.log(tagsArr);
     // console.log(reqdata);
     posts.create(reqdata).then(function(data){
       res.redirect('/');
     });
   // });
 });
 return router;
};
