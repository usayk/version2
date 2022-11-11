const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const Category = require('../models/Category')
const User = require('../models/User')

router.get('/', (req, res) => {
    console.log(req.session)
    res.render('site/index')
})

router.get('/admin', (req, res) => {
    res.render('admin/index')
})

// router.get('/blog', (req, res) => {
//     Post.find({}).lean.then(posts => {
//         res.render('site/blog', {posts:posts})

//     })
// })router.get('/blog', (req, res) => {
  
    router.get('/blog', (req, res) => {

        Post.find({}).populate({path:'author', model: User}).sort({$natural:-1}).lean().then(posts => {
          Category.aggregate([
            {
              $lookup:{
                from: 'posts', 
                localField: '_id',
                foreignField: 'category',
                as: 'posts'
                }
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    num_of_posts : {$size: '$posts'}
                }
            }
          ]).then(categories => {
          res.render('site/blog', {posts:posts, categories:categories}) 
          })
        })
      })
      //     res.render('site/blog', {
      //       posts:posts.map(item => item.toJSON())
      //     });
      //   });
      // });

router.get('/contact', (req, res) => {
    res.render('site/contact')
})


module.exports = router