import { useState } from "react"

export default function SearchBar() {
  
  const [post, setPost] = useState("")

  const handleChange = (event) => {
    setPost(event.target.value)
    
  }
  return (
    <div>
        <input type="search" placeholder="Busqueda..." onChange={handleChange} value={post} />
    </div>
  )
}

 