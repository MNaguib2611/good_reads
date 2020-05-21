import React, {useState} from "react";

const RatingBar = (props) => {
    // const {avgRate} = props
    // // console.log((avgRate<=4 && avgRate>3) || null)
    const handleRateChange = (e) => {
        const {target:{value}} = e
        // e.target.checked=undefined
        setRate(value)
        console.log(value)
    }
    // const divClass = !!avgRate ? "rate-readonly" : "rate"
    // const lableClass = !!avgRate ? "label-readonly" : "label"
    // const inputClass = !!avgRate ? "input-readonly" : "input"
    // const ids = !!avgRate ? ["star1-readonly","star2-readonly","star3-readonly","star4-readonly","star5-readonly"] : ["star1","star2","star3","star4","star5"]
    // return(<div className={divClass}>
    //     <input className={inputClass} type="radio" id={ids[4]} name={divClass} value="5" checked={(avgRate<=5 && avgRate>4) } onChange={handleRateChange}/>
    //     <label className={lableClass} htmlFor={ids[4]} title="text">5 stars</label>
    //
    //     <input className={inputClass} type="radio" id={ids[3]} name={divClass} value="4" checked={(avgRate<=4 && avgRate>3) } onChange={handleRateChange} />
    //     <label className={lableClass} htmlFor={ids[3]} title="text">4 stars</label>
    //
    //     <input className={inputClass} type="radio" id={ids[2]} name={divClass} value="3" checked={(avgRate<=3 && avgRate>2) } onChange={handleRateChange}/>
    //     <label className={lableClass} htmlFor={ids[2]} title="text">3 stars</label>
    //
    //     <input className={inputClass} type="radio" id={ids[1]} name={divClass} value="2" checked={(avgRate<=2 && avgRate>1) } onChange={handleRateChange} />
    //     <label className={lableClass} htmlFor={ids[1]} title="text">2 stars</label>
    //
    //     <input className={inputClass} type="radio" id={ids[0]} name={divClass} value="1" checked={(avgRate<=1 && avgRate>0) }  onChange={handleRateChange} />
    //     <label className={lableClass} htmlFor={ids[0]} title="text">1 star</label>
    // </div>)
    const [rate, setRate] = useState(-1)
    return (<div className="rate">
        <input type="radio" id="star5" name="rate" value="5"/>
        <label htmlFor="star5" title="text">5 stars</label>
        <input type="radio" checked={rate === 4} id="star4" name="rate" value="4" onChange={handleRateChange}/>
        <label htmlFor="star4" title="text">4 stars</label>
        <input type="radio" id="star3" name="rate" value="3"/>
        <label htmlFor="star3" title="text">3 stars</label>
        <input type="radio" id="star2" name="rate" value="2"/>
        <label htmlFor="star2" title="text">2 stars</label>
        <input type="radio" id="star1" name="rate" value="1"/>
        <label htmlFor="star1" title="text">1 star</label>
    </div>)
}

export default RatingBar