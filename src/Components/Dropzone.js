import React from 'react'
import { useDropzone } from 'react-dropzone'

const Dropzone = ({ onDrop, accept }) => {
    const { getRootProps, /*getInputProps,*/ isDragActive } = useDropzone({
        onDrop,
        accept
    })

    const getClassName = (className, isActive) => {
        if (!isActive) return className;
        return `${className} ${className}-active`;
    }
    return (
        <div className={getClassName("dropzone", isDragActive)} {...getRootProps()}>
            <p>Drop your local images here!</p>
        </div>
    )
}

export default Dropzone