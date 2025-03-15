import React, { useState } from 'react'
import axios from 'axios'


const App = () => {

  const [file, setFile] = useState(null)
  const [fileUrl, setFileUrl] = useState('')

  const handelUpload = async () => {

    if (!file) {
      alert("Please upload a file!")
    }

    const formData = new FormData()
    formData.append("file", file)

    try {

      const response = await axios.post("http://localhost:3000/upload", formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )

      console.log(response.data);


    } catch (error) {
      console.log("Upload Error", error)

    }
  }

  return (
    <div className='bg-black w-full h-screen text-white '  >

      <div className='w-36 h-48 bg-white'>
        <input type="file" onChange={(e) => {
          setFile(e.target.files[0])
        }} />

        <button onClick={handelUpload}>Upload</button>
      </div>

    </div>
  )
}

export default App