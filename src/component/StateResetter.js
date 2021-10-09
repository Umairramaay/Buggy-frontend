import React from 'react'

export default function StateReseter({resetter,state}) {

    const resetState = () => {
        resetter(state)
    }

    return (
        <div style={{textAlign:"center", marginTop:'1%'}}>
            <button style={{backgroundColor:'#f44336',padding:'5px 12px',cursor:'pointer',
            color:'white',borderRadius:'10px'}} onClick = {() => resetState()}>
                Reset Markers
            </button>
        </div>
    )
}
