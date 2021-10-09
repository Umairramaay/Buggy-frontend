import React, {useState,useEffect} from "react";
import { Map as MapContainer, TileLayer, LayersControl,FeatureGroup } from "react-leaflet";
import {MARKER_COLORS, DEFAULT_VIEWPORT} from '../utils/constants'
import MarkerData from '../component/marker/MarkerData'
import MultiLineDataInput from '../component/multiline/MultilineData'
import StateResetter from '../component/StateResetter'

const LeafletMap = () => {

    const [mapCenter, setMapCenter] = useState(DEFAULT_VIEWPORT.center)
    const [markers, setmarkers] = useState([])
    const [viewPort, setviewPort] = useState(DEFAULT_VIEWPORT)
    const [boolenSwitch, setboolenSwitch] = useState(false)

    const { BaseLayer, Overlay } = LayersControl

    useEffect(() => {
        setmarkers(JSON.parse(localStorage.getItem('local_marker_data')))
        setviewPort(JSON.parse(localStorage.getItem('local_view_port')))
    }, [])

    useEffect(() => {
        localStorage.setItem('local_marker_data', JSON.stringify(markers));
        localStorage.setItem('local_view_port', JSON.stringify(viewPort));
    },[markers,viewPort,boolenSwitch])

    const addMarker = (e) => {
        setmarkers([...markers , {latlng: e.latlng,
            color: MARKER_COLORS[Math.floor(Math.random()*MARKER_COLORS.length)]}])
    }

    const onViewportChanged = (changedViewPort) => {
        setviewPort(changedViewPort)
        setMapCenter(changedViewPort.center)
    }

  return (
    <>
        <div id="mapid">
            <MapContainer center={mapCenter} zoom={viewPort.zoom}
            doubleClickZoom={true} animate={true} duration={3} bounceAtZoomLimits={true} maxBoundsViscosity={0.95} 
            maxBounds={[[-360, -180], [360, 180]]} onclick={addMarker} scrollWheelZoom={false} viewport={viewPort} 
            onViewportChanged={onViewportChanged} style={{height:"500px",width: "100%"}}>
                <LayersControl position="topright">
                    <BaseLayer name="OpenStreetMap">
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    </BaseLayer>
                    <BaseLayer checked={true} name="Dark">
                        <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png" />
                    </BaseLayer>

                    <Overlay checked={true} name="Buggy">
                        <FeatureGroup>
                            <MarkerData markers={markers} setMapCenter={setMapCenter} setmarkers={setmarkers} />
                        </FeatureGroup>
                    </Overlay>
                </LayersControl>  
            </MapContainer>
        </div>
        <MultiLineDataInput markers={markers} setboolenSwitch={setboolenSwitch}
        boolenSwitch= {boolenSwitch}/>
        <StateResetter resetter={setmarkers} state={[]}  />
   </>
  );
};
export default LeafletMap;