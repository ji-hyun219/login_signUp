var mongoose = require('mongoose');
var db = require('../models')

module.exports = {
    addBook : (req, res) => {
        try {
            if(!req.body) {
                return res.json({
                    success : 0,
                    status : 400,
                    msg : 'Required parameters not set.'
                });
            }
            var book = new db.book({
                title : req.body.title,
                author : req.body.author,
                published_date : new Date(req.body.published_date)
            });
            // book 데이터를 데이터베이스에 저장하는 API 입니다
            // .save 메소드는 데이터를 데이터베이스에 저장합니다.
            // create 메소드도 있다.
             book.save().then((result) =>{
                console.log(result);
                res.json(result)
        }).catch((err) => {
            console.log(err);
            res.json({
                success :0,
                status : 400,
                msg : 'Oops! Something went wrong. Data is not saved.'
            })
        })
        } catch (error) {
            console.log(error);
            res.json({
                success: 0,
                status: 400,
                msg: 'Something went wrong. Please try again.'
            })
        }
    },
    allBooks : (req, res) => {
        // 검색하기
        db.book.find((err, books) => {
            if(err) return res.status(500).send({
                error :'database failure'
            });
            res.json(books);
        })
    },
    findBookByAuthor : (req, res) => {
        try {
            if(!req.params.author) {
                return res.json({
                    success: 0,
                    status: 400,
                    data: null,
                    msg: 'Required parameters not set'
                })
            }
            // 데이터를 조회할 때는 find() 메서드가 사용됩니다.
            // query 를 파라미터 값으로 전달할 수 있으며, 파라미터가 없을 시
            // 모든 데이터를 조회합니다.
            db.book.find(
                {author : req.params.author},
                (err, result) => {
                    if (err) {
                        return res.json({
                            success: 0,
                            status: 400,
                            data: null,
                            msg: 'Oops. Something went wrong. Please try again.'
                        })
                    }
                    res.json({
                        success: 1,
                        status: 200,
                        data: result
                    })
                }
            );
        } catch (error) {
            res.json({
                success: 1,
                status: 400,
                data: null,
                msg: 'Oops. Something went wrong. Please try again.'
            })
        }
    },
    findBook : (req, res) => {
        try {
                if (!req.params.book_id) {
                    return res.json({
                        success: 0,
                        status: 400,
                        data: null,
                        msg: 'Required parameters not set'
                });
            }
            // 데이터베이스에서 Id 값을 찾아서 book document 를 출력
            db.book.findOne(
                {_id : req.params.book_id},
                (err, book) => {
                    if (err) {
                        return res.json({
                            success: 0,
                            status: 400,
                            data: null,
                            msg: 'Oops. Something went wrong. Please try again.'
                        })
                    }
                res.json(book);
                }
            )
         } catch (err) {
            res.json({
                success: 0,
                status: 400,
                data: [],
                msg: 'Oops! Something went wrong. Please try again.'
            })
         }
    },
    updateBook : (req, res) => {
        //USING UPDATE METHOD
        db.book.updateOne(
            {_id : req.params.book_id},
            { $set : req.body},
            (err, output) => {
                if (err) res.status(500).json({error : 'database failure'})
                console.log(output);
                if (!output.acknowledged) return res.status(404).json({error : 'book not found'});
                res.json({ messge : 'book updated'})
            }
        )
    },
    deleteBook : (req, res) => {
        try {
            if(!req.params.book_id)  {
                return res.json({
                    success: 0,
                    status: 400,
                    data: null,
                    msg: 'Required parameters not set'
                })
            }
        // remove() 메소드에서 좀 더 세분화된
        // deleteOne, deleteMany 가 추가되면서 이 두 메서드 쓸 것을 권장한다.
        // deleteOne, : 첫번째 도큐먼트만 지움
        // delteMany : 매칭되는 모든 도큐먼트를 지움
        db.book.deleteOne(
            {_id : req.params.book_id}, 
            (err) => {
                if(err) {
                    return res.json({
                            success: 0,
                            status: 400,
                            data: null,
                            msg: 'not delete. Please try again.'
                    })
                }
                // delete 성공 후 수행할 내용
                res.json({
                    success: 1,
                    status: 200,
                    data: result
                })
            }
        )
        }
        catch (err){
            res.json({
                success: 0,
                status: 400,
                data: [],
                msg: 'Oops! Something went wrong. Please try again.'
            })
        }
    }


}