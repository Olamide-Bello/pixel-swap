import React from 'react'

const CheckDropzone = ({zone, handleZone}) => {
  return (
    <div className='check-zone'>
        {zone ?
        <button onClick={handleZone}>Hide Field</button>
        :
        <><p>Do you know you can drag and drop your own images?😲 Click the button below to show the drop field</p>
        <button onClick={handleZone}>Show Field</button></>
        }
    </div>
  )
}

export default CheckDropzone