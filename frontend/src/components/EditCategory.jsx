import React, { useState } from 'react'
import Axios from '../utilis/Axios'
import SummaryApi from '../common/SummaryApp'
import AxiosToastError from '../utilis/AxiosToastError'
import NoData from './NoData'

const EditCategory = ({close,fetchData}) => {

    const [data,setData] = useState({
            name : "",
            image : ""
        })
        const [loading, setLoading] = useState(false)
    
        const handleChange = (e)=>{
            const {name, value} = e.target
    
            setData((preve)=>{
                return {
                    ...preve,
                    [name] : value
                }
            })   
         }

    const handleSubmit =async(e)=>{
        e.preventDefault()
        if(!data.name || !data.image){
            toast.error("Category name and image are required")
            return
        }

        try {
            setLoading(true)
            const response = await Axios({
                ...SummaryApi.addCategory,
                data : data
            })
            console.log('submit response:', response)
            const responseData = response?.data

            if(responseData?.success){
                toast.success(responseData.message)
                close()
                fetchData()
            }
        } catch (error) {  
            AxiosToastError(error)
        }finally {
            setLoading(false)
        }
     }

     const handleUploadCategoryImage = async(e)=>{
        const file = e.target.files[0]

        if(!file){
            return
        }

        try {
            const response  = await uploadImage(file)
            const ImageResponse = response?.data
    
            if(!ImageResponse || !ImageResponse.data){
                throw new Error("Image upload failed")
            }
            console.log('Upload response:',response)
    
            setData((preve)=>{
                return{
                    ...preve,
                    image : ImageResponse.data.url
                }
            })
        } catch (error) {
            toast.error("Failed to upload image")
            console.error("Image upload error:",error)
        }
    }
  return (

    <section>
    <div className='p-2 bg-white shadow-md flex items-center justify-between'>
        <h2 className='font-semibold'>Category</h2>
        <button onClick={()=>setOpenUploadCategory(true)} className='text-sm border border-primary-light 
        hover: bg-yellow-300 px-3 py-1 rounded'>Add Category</button>
    </div>
    {
        !categoryData [0] && !loading && (
            <NoData/>
        )
    }
   <div className='p-4 grid grid-cols-5 gap-2'>
   {
        categoryData.map((category,index)=>{
            return(
                <div className='w-32 h-56 group rounded shadow-md'>
                    <img
                        alt={category.name}
                        src={category.image}
                        className='w-full object-scale-down'
                    />
                    <div className=' items-center h-9 flex gap-2'>
                        <button onClick={()=>{
                            setOpenEdit(true)
                        }} className='flex-1 bg-green-100 text-green-600 font-medium py-1 rounded'>
                            Edit
                        </button>
                        <button className='flex-1 bg-green-100 text-red-600 font-medium py-1 rounded'>
                            Delete
                        </button>
                    </div>
                </div>
            )
        })
    }
   </div>
    {
        loading && (
            <Loading/> 
        )
    }

    {
        openUploadCategory && (
            <UploadCategoryModel fetchData={fetchCategory} close={()=>setOpenUploadCategory(false)}/>

        )
 }
 
 {
    openEdit && (
        <EditCategory close={()=>setOpenEdit(false)} />
    )
 }
</section>
  )
}

export default EditCategory