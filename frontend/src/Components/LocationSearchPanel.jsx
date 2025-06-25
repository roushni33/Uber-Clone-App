import React from 'react'
import 'remixicon/fonts/remixicon.css'

const LocationSearchPanel = (props) => {
    
    const locations = [
        'NIT PATNA Ashok Rajpath patna campus',
        'NIT PATNA kateshar bihar bihta campus',
        "IIT PATNA Patliputra colony patna campus",
    ]
    return (
        <div>
            {
                locations.map(function (elem,idx) {
                    return <div key={idx} onClick={() => {
                        props.setVehiclePanelOpen(true)
                        props.setPanelOpen(false)
                    }} className='flex gap-4 border-2 border-gray-50 active:border-black p-3 rounded-xl  items-center justify-start my-2'>
                        <h2 className='bg-[#eee] h-10 w-12 flex items-center justify-center rounded-full '><i className="ri-map-pin-fill"></i></h2>
                        <h4 className='font-medium'>{elem}</h4>
                    </div>
                })
            }


        </div>
    )
}

export default LocationSearchPanel