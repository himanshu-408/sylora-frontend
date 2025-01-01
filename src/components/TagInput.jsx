import React, { useState } from 'react'

const TagInput = ({tags, setTags}) => {

  const [inputValue, setInputValue] =  useState([]);
  const addNewTag = () => {
    if(inputValue.trim() !== ""){
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  }

  const handleKeyDown = (e) => {
    if(e.key === 'Enter'){
      addNewTag();
    }
  }

  const handleRemoveTag =(tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  return (
    <div>
      {tags.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap mt-2">
          {tags.map((tag, index) => (
            <span key={index} className='flex items-center gap-2 text-sm text-cyan-600 bg-cyan-200/40 px-3 py-1 rounded'>
              <p className='text-sm'>{tag}</p>
              <button onClick={() => handleRemoveTag(tag)}>x</button>
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center gap-4 mt-3">
        <input 
          type="text" 
          className="text-sm bg-transparent border px-3 py-2 rounded outline-none"
          value={inputValue}
          placeholder='Add Location'
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />

        <button className="w-8 h-8 flex items-center justify-center rounded border border-cyan-500 hover:bg-cyan-500" onClick={addNewTag}>
          <p className="text-2xl text-cyan-500 hover:text-white">+</p>
        </button>
      </div>
    </div>
  )
}

export default TagInput