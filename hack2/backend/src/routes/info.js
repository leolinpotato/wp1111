// * ////////////////////////////////////////////////////////////////////////
// *
// * FileName     [ info.js ]
// * PackageName  [ server ]
// * Synopsis     [ Get restaurant info from database ]
// * Author       [ Chin-Yi Cheng ]
// * Copyright    [ 2022 11 ]
// *
// * ////////////////////////////////////////////////////////////////////////

import Info from '../models/info'

exports.GetSearch = async (req, res) => {
    /*******    NOTE: DO NOT MODIFY   *******/
    const priceFilter = req.query.priceFilter
    const mealFilter  = req.query.mealFilter
    const typeFilter  = req.query.typeFilter
    const sortBy      = req.query.sortBy
    /****************************************/

    // NOTE Hint: 
    // use `db.collection.find({condition}).exec(err, data) {...}`

    // When success, 
    //   do `res.status(200).send({ message: 'success', contents: ... })`
    // When fail,
    //   do `res.status(403).send({ message: 'error', contents: ... })` 
    

    // TODO Part I-3-a: find the information to all restaurants
    
    const sortMethod = () => {
        if (sortBy === 'price')
            return { price: 1};
        else
            return { distance: 1};
    }

    Info.find().sort(sortMethod()).exec((err, data) => {
        if (err) 
            res.status(403).send({ message: 'error', contents: err});
        else {
            let newData = data.filter(restaurant => {
                if (!priceFilter && !mealFilter && !typeFilter)
                    return true;
                let legal = false;
                if (priceFilter) {
                    for (let i = 0; i < priceFilter.length; i++) {
                        if (restaurant.price === Number(priceFilter[i]))
                            legal = true;
                    }
                    if (!legal) return false;
                }
                if (mealFilter) {
                    legal = false;
                    for (let i = 0; i < mealFilter.length; i++) {
                        for (let j = 0; j < restaurant.tag.length; j++) {
                            if (restaurant.tag[j] === mealFilter[i])
                                legal = true;
                        }
                    }
                    if (!legal) return false;
                }
                if (typeFilter) {
                    legal = false;
                    for (let i = 0; i < typeFilter.length; i++) {
                        for (let j = 0; j < restaurant.tag.length; j++) {
                            if (restaurant.tag[j] === typeFilter[i])
                                legal = true;
                        }
                    }
                }
                return legal;
            })
            res.status(200).send({ message: 'success', contents: newData});
        }
    });

    // TODO Part II-2-a: revise the route so that the result is filtered with priceFilter, mealFilter and typeFilter
    // TODO Part II-2-b: revise the route so that the result is sorted by sortBy
}

exports.GetInfo = async (req, res) => {
    /*******    NOTE: DO NOT MODIFY   *******/
    const id = req.query.id
    /****************************************/

    // NOTE USE THE FOLLOWING FORMAT. Send type should be 
    // if success:
    // {
    //    message: 'success'
    //    contents: the data to be sent. Hint: A dictionary of the restaruant's information.
    // }
    // else:
    // {
    //    message: 'error'
    //    contents: []
    // }

    // TODO Part III-2: find the information to the restaurant with the id that the user requests
    Info.find({id: id}).exec((err, data) => {
        if (err)
            res.status(403).send({ message: 'error', contents: []});
        else
            res.status(200).send({ message: 'success', contents: data});
    })
}