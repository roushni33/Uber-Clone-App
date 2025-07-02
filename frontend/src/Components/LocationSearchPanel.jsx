import React from 'react'
import 'remixicon/fonts/remixicon.css'

const LocationSearchPanel = ({
    suggestions = [],
    loading = false,
    onSuggestionSelect,
    setPanelOpen,
    setVehiclePanelOpen,
    activeField,
    inputValue
}) => {
    return (
        <div>
            {loading && (
                <div className="p-3 text-gray-500">Loading suggestions...</div>
            )}
            {!loading && suggestions && suggestions.length > 0 ? (
                suggestions.map((elem, idx) => (
                    <div
                        key={idx}
                        onClick={() => {
                            onSuggestionSelect(elem)
                            if (activeField === 'destination') {
                                setVehiclePanelOpen(true)
                                setPanelOpen(false)  
                            }
                        }}

                        className='flex gap-4 border-2 border-gray-50 active:border-black p-3 rounded-xl items-center justify-start my-2 cursor-pointer'
                    >
                        <h2 className='bg-[#eee] h-10 w-12 flex items-center justify-center rounded-full '>
                            <i className="ri-map-pin-fill"></i>
                        </h2>
                        <h4 className='font-medium'>{elem}</h4>
                    </div>
                ))
            ) : (
                !loading &&
                inputValue &&
                inputValue.length >= 3 &&
                suggestions.length === 0 && (
                    <div className="p-3 text-gray-400">No suggestions found.</div>
                )
            )}
        </div>
    )
}

export default LocationSearchPanel