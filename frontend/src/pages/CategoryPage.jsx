import React, { useEffect, useState } from 'react'
import UploadCategoryModel from '../components/UploadCategoryModel'
import Loading from '../components/Loading'
import NoData from '../components/NoData'
import Axios from '../utilis/Axios'
import SummaryApi from '../common/SummaryApp'
import EditCategory from '../components/EditCategory'

const CategoryPage = () => {
    const [openUploadCategory,setOpenUploadCategory] = useState(false)
    const [loading, setLoading ] = useState(false)
    const [categoryData, setCategoryData] = useState([])
    const [openEdit,setOpenEdit] = useState(false)
    const fetchCategory = async()=>{
        try {
            setLoading(true)
            const response = await Axios({
                ...SummaryApi.getCategory
            })
            
            const { data : responseData } = response
            if(responseData.success){
                setCategoryData(responseData.data)
            }
            console.log(responseData)
        } catch (error) {
            
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchCategory()
    },[])
  return (
    <>
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
    </>
  )
}

export default CategoryPage