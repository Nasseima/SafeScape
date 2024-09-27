import React from 'react'

function Textarea() {
  return (
    <>
    <textarea
    placeholder="Type your message here." 
    className="h-24 resize-none"
    onChange={(e) => console.log(e.target.value)} 
    ></textarea>
    </>
  )
}

export default Textarea