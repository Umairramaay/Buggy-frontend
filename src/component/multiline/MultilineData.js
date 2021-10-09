import React, {useState} from 'react'
import {MARKER_COLORS} from '../../utils/constants'

export default function MultilineData({
    markers,boolenSwitch,setboolenSwitch
}) {

    const [multitext, setmultitext] = useState('')

    function validateLatLng(lat, lng) {    
        let pattern = new RegExp('^-?([1-8]?[1-9]|[1-9]0)\\.{1}\\d{1,6}');
        return pattern.test(lat) && pattern.test(lng);
      }

    const processMultiline = () => {
        let multi_line_data =  multitext.split('\n').map(str => <p>{str}</p>)
        multitext !== '' && multi_line_data.map((marker_data) => {
            var lineData = marker_data.props.children.split(',')
            let m_color = MARKER_COLORS[Math.floor(Math.random()*MARKER_COLORS.length)]
            let validator = validateLatLng(lineData[0], lineData[1])
            if (validator) {
                if (lineData[2] !== undefined){
                    m_color = lineData[2]
                }
                let textMarker = {
                    latlng : [lineData[0], lineData[1]],
                    color: m_color
                }
                markers.push(textMarker)
            }
        })
        setboolenSwitch(!boolenSwitch)
        setmultitext('')
     }
 
     const handleTextChange = (e) => {
         setmultitext(e.target.value)
     }

    return (
        <div style= {{textAlign : 'center',marginTop:'1%'}}>
            <textarea placeholder="Enter latitude and longitude, separated by a comma."
                value={multitext} cols="50" rows="5" onChange={(e) =>handleTextChange(e)} />
            <div style= {{marginTop:'1px'}}>
                <button style={{
                    borderRadius: '10px',cursor:'pointer',color:'white',backgroundColor:'black',padding:'5px 12px',}}
                    onClick = {() => processMultiline()}>
                        Submit
                </button>
            </div>
        </div>
    )
}