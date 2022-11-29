/****************************************************************************
  FileName      [ information.js ]
  PackageName   [ src ]
  Author        [ Chin-Yi Cheng ]
  Synopsis      [ display the information of restaurant ]
  Copyright     [ 2022 11 ]
****************************************************************************/

import React from 'react'
import Stars from '../components/stars';
import '../css/restaurantPage.css'

const Information = ({ info, rating }) => {

    const getTag = (tags) => {
        return (
            <>
                {/* TODO Part III-2-a render tags */}
                {tags.map((tag) => {
                    return <div className='tag' key={tag}>{tag}</div>
                })}
            </>
        )
    }
    const getPriceTag = (price) => {
        let priceText = ""
        for (let i = 0; i < price; i++)
            priceText += "$"
        return (
            <>
                {/* TODO Part III-2-a render price tags; hint: convert price number to dollar signs first */}
                <div className='tag' key={priceText}>{priceText}</div>
            </>
        )
    }

    const getBusiness = (time) => {
        let dayArr = ['Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat', 'Sun'];
        if (time.hasOwnProperty("All")) {
            time.Mon = time.All;
            time.Tue = time.All;
            time.Wed = time.All;
            time.Thr = time.All;
            time.Fri = time.All;
            time.Sat = time.All;
            time.Sun = time.All;
        }

        return (
            <div className='businessTime'>
                {/* TODO Part III-2-c: render business time for each day*/}
                <div className='singleDay'>
                  <div className='day'>Mon</div>
                  <div className='time'>{time.hasOwnProperty("Mon") ? time.Mon : "Closed"}</div>
                </div>
                <div className='singleDay'>
                  <div className='day'>Tue</div>
                  <div className='time'>{time.hasOwnProperty("Tue") ? time.Tue : "Closed"}</div>
                </div>
                <div className='singleDay'>
                  <div className='day'>Wed</div>
                  <div className='time'>{time.hasOwnProperty("Wed") ? time.Wed : "Closed"}</div>
                </div>
                <div className='singleDay'>
                  <div className='day'>Thr</div>
                  <div className='time'>{time.hasOwnProperty("Thr") ? time.Thr : "Closed"}</div>
                </div>
                <div className='singleDay'>
                  <div className='day'>Fri</div>
                  <div className='time'>{time.hasOwnProperty("Fri") ? time.Fri : "Closed"}</div>
                </div>
                <div className='singleDay'>
                  <div className='day'>Sat</div>
                  <div className='time'>{time.hasOwnProperty("Sat") ? time.Sat : "Closed"}</div>
                </div>
                <div className='singleDay'>
                  <div className='day'>Sun</div>
                  <div className='time'>{time.hasOwnProperty("Sun") ? time.Sun : "Closed"}</div>
                </div>
            </div>
        )
    }

    return (
        <div className='infoContainer'>
            <h2>{info.name}</h2>
            <div className='infoRow'>
                <div className='rate'>
                    {rating === 0 ? <p>No Rating</p> : <Stars rating={rating} displayScore={true} />}

                </div>
                <div className='distance'>{info.distance / 1000} km</div>
            </div>
            <div className='infoRow'>
                {getPriceTag(info.price)}
                {getTag(info.tag)}
            </div>
            <h5>Business hours:</h5>
            {getBusiness(info.time)}
        </div>
    )
}
export default Information