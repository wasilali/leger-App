import { useState } from "react"
import Tables from './Tables.jsx'
import { toast } from "react-toastify"
import axios from "axios"
import Loading from "./Loading.jsx"

const Home = () => {
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [money,setMoney]=useState()
    const [loading,setLoading]=useState(false)

    const handleSubmit = async(e)=> {

        e.preventDefault();

        try {
          const userData = {
            name,
            email,
            money:Number(money)
        }
          setLoading(true);
          const config= { Headers:{"Content-type":"multipart/form-data"} };
          const { data } = await axios.post(`http://localhost:4000/api/v1/Create`,userData,config);
          if (data) {
            toast.success(data.message);
            setName("");
      setEmail("");
      setMoney("");
          }
        } catch (error) {
          toast.error(error.response?.data?.message);
          setLoading(false);
        } finally {
          setLoading(false);
        }
    }

  return (

    <>
  {/* Hello world */}
  <form className="w-full max-w-lg mx-auto py-10 max-h-screen px-6 md:px-6" onSubmit={handleSubmit}>
    <div className="flex flex-wrap -mx-3 mb-6">
      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <label
          className="block uppercase tracking-wide text-purple-500 text-xs font-bold mb-2"
          htmlFor="grid-first-name"
        >
          User Name
        </label>
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          id="grid-first-name"
          type="text"
          onChange={e=>setName(e.target.value)}
          value={name}
          placeholder="Enter Name"
        />
      </div>
      <div className="w-full md:w-1/2 px-3">
        <label
          className="block uppercase tracking-wide text-purple-500 text-xs font-bold mb-2"
          htmlFor="grid-last-name"
        >
          Email
        </label>
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="grid-last-name"
          type="Email"
          onChange={e=>setEmail(e.target.value)}
          value={email}
          placeholder="Enter mail"
        />
      </div>
    </div>
    <div className="flex flex-wrap -mx-3 mb-6">
      <div className="w-full px-3">
        <label
          className="block uppercase tracking-wide text-purple-500 text-xs font-bold mb-2"
          htmlFor="grid-password"
        >
          Eenter Transsection
        </label>
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="grid-password"
          type="number" name="quantity" min="1" max="" step="1"
          onChange={e=>setMoney(e.target.value)}
          value={money}
          placeholder="Enter Money"
        />
        <p className="text-red-500 text-xs italic">
          Make sure you enter valid information
        </p>
      </div>
    </div>
    <button disabled={loading} type="submit" className=" flex mx-auto bg-green-700 py-2 px-4 mt-3 rounded text-white hover:bg-green-600">Enter User</button>
  </form>
  <div className="px-6">
 {loading?<div className=" w-full h-[40vh] flex justify-center items-center"><Loading/></div>: <Tables/>}
  </div>
</>

  )
}

export default Home