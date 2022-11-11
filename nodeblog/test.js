const mongoose = require('mongoose')
const Post = require('./models/Post')

mongoose.connect('mongodb://127.0.0.1/nodeblog_db')


/* Post.findByIdAndUpdate('635797fb77c73fcb5eb6b3f7', {
title: 'MY First Post'
},
    (error, post)=> {
    console.log(error, post)
}) */


 Post.findByIdAndDelete('635799860c770acd5808d477', (error, post)=> {
     console.log(error, post)
 })



// Post.create({
//     title: 'İkinci Post Başlığım',
//     content: 'İkinci post içeriği Lorem İpsum'
// }, (error, post) => {
//     console.log(error, post)
// })
