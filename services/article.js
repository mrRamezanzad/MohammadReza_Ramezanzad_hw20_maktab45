const mongoose = require('mongoose'),
      Article  = require('../models/article')

exports.create = async (newArticleInfo, callback) => {
    if (typeof callback !== "function") {
        const func = this.create
        return new Promise ((resolve, reject) => {
            func(newArticleInfo, (err, doc) => {
                if (err) reject(err)
                resolve(doc)
            })
        })
    }

    new Article(newArticleInfo).save((err, doc) => {
        if (err) return callback(err, doc)
        return callback(null, doc)
    } )
}

exports.read = async (articleId, callback) => {
    if (typeof callback !== "function") {
        const func = this.read
        return new Promise((resolve, reject) => {
            func(articleId, (err, doc) => {
                if (err) reject(err)
                resolve(doc)
            })
        })
    }
    
    let article 
    try {
        article = await Article.findById({_id: articleId})
        callback(null, article)

    } catch (err) {
        console.log(err);
        callback("مشکلی در پیدا کردن مفاله وجود دارد", article)
    } 
}

exports.readAll = async (match, callback) => {
    if (typeof callback !== "function") {
        const func = this.readAll
        return new Promise((resolve, reject) => {
            func(match, (err, articles) => {
                if(err) reject(err)
                resolve(articles)
            })
        })
    }

    let articles
    try {
        articles = await Article.find(match)
        callback(null, articles)

    } catch (err) {
        callback("مشکلی در حین پیدا کردن مقالات بوجود آمده است", articles)
    }
}