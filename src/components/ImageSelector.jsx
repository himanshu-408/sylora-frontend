import React, { useEffect } from 'react'
import { useState, useRef } from 'react';

const ImageSelector = ({image, setImage}) => {

    const inputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleImageChange = (event) => {
      const file = event.target.files[0];
      if(file){
        setImage(file);
      }
    };

    const onChooseFile = () => {
      inputRef.current.click();
    }

    // const handleRemovl

    useEffect(() => {
      if(typeof image === 'string'){
        setPreviewUrl(image);
      }
      else if(image){
        setPreviewUrl(URL.createObjectURL(image));
      }
      else{
        setPreviewUrl(null);
      }

      return () => {
        if(previewUrl && typeof previewUrl ==='string' && !image){
          URL.revokeObjectURL(previewUrl);
        }
      }
    }, [image])

  return (
    <div>
        <input
            type='file'
            accept='image/*'
            ref={inputRef}
            onChange={handleImageChange}
            className='hidden'
        />
        {!image ? <button className="w-full h-[220px] flex flex-col items-center justify-center gap-4 bg-slate-50 rounded border border-slate-200/50" onClick={() => onChooseFile()}>
            <p className='text-sm text-slate-500'>Browse image files to upload</p>
        </button> 
        
        : 
        <div className="w-full relative">
          <img src={previewUrl} alt="Selected" className="w-full h-[300px] object-cover rounded-lg " />
          {/* <button className="btn-small btn-delete absolute top-2 right-2"  onClick={handleRemoveImage}></button> */}
        </div>
        
        }
        
    </div>
  )
}

export default ImageSelector