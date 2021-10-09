import React from 'react'
import {CircleMarker,Popup} from 'react-leaflet'
import {MARKER_COLORS} from '../../utils/constants'

export default function MarkerData({markers,setmarkers,setMapCenter}) {

    const handleChange = (event,index,zoomPort) => {
        let markCopy=[...markers]
        if (event.type === 'click'){
            markCopy[index].color=MARKER_COLORS[Math.floor(Math.random()*MARKER_COLORS.length)]
            setmarkers(markCopy)    
            setMapCenter(zoomPort.latlng)

        } else if (event.type === 'contextmenu'){
            markCopy.splice(index, 1);
            setmarkers(markCopy);
        }
    }
    
    return (
        <>
        {
            markers && markers.length !==0 && markers.map((marker,index) => (
                <CircleMarker
                    key= {index}
                    color={marker.color}
                    center={marker.latlng}
                    onclick= {(event) => handleChange(event,index,marker)}
                    oncontextmenu={(event) => handleChange(event,index,marker)}
                >
                    <Popup>
                        Color Changed
                    </Popup>

                </CircleMarker>
            ))
        }
        </>
    )
}
