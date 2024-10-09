import React, { useState } from 'react'

const Input = ({ placeholder }) => {
  const [value, setValue] = useState('');

  return (
    <input
      type='text'
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  )
}

export default Input