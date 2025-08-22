import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import debounce from "lodash.debounce";


function HomePage(){

    const [newarray, isnewarry] = useState([])
    const [search, issearch] =useState("")

    async function datas(keyword) {
        keyword=keyword.trim()
        try{
        const newdata= await axios.get(`http://localhost:4001/trips?keywords=${keyword}`)
        isnewarry(newdata.data.data)
        }catch(error){
            console.log(error)
        }
    }


  // ใช้ debounce // ai gen ให้
  const debouncedFetch = useCallback(
    debounce((value) => {
      datas(value);
    }, 500), // 500ms delay
    []
  );

  // เมื่อ search เปลี่ยน จะเรียก debouncedFetch // ai gen ให้
  useEffect(() => {
    debouncedFetch(search);
  }, [search, debouncedFetch]);


  function addcate(text){
    if(!search.includes(text) ){
        issearch(search+" "+text)
    } 
  }
    


    function ShortDescription({ text }) {
  const maxLength = 100;
  const shortText = text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

  return <p>{shortText}</p>;
}


// ai gen ให้
const copyToClipboard = (text) => {
  const textField = document.createElement('textarea');
  textField.value = text;
  document.body.appendChild(textField);
  textField.select();
  document.execCommand('copy');
  textField.remove();
  alert('คัดลอกเรียบร้อย: ' + text);
}





    return(
        <div id="mainpage" className="flex flex-col items-center bg-blue-100">
            <h1 id="header" className="text-4xl mt-[50px] text-blue-500 font-bold">เที่ยวไหนดี</h1>
            
            <form className="flex flex-col items-center w-[100%] my-[50px] ">
                <div className="w-[50%]">
                <p className="text-xl  ">ค้นหาที่เที่ยว</p>
                </div>
                <input type="text" placeholder="ระบุสถานที่เทียว" 
                className="border-b border-gray-400 outline-none px-2 py-2 text-center w-[50%]" 
                value={search}
                onChange={(e)=>issearch(e.target.value)}
                />

                <div id="tourist-place" 
                className="flex flex-col  gap-[50px] mt-[50px] items-center w-[100%]">
                    {newarray.map((item)=>
                    (
                        <div key={item.eid}  className="flex flex-row gap-[50px] border p-[30px] w-[60%] rounded-xl bg-amber-100
                        hover:-translate-y-2 hover:scale-105 hover:shadow-lg  transform transition duration-300">
                            <img src={item.photos[0]} alt="photo" className="w-[180px] h-[180px] object-cover rounded-2xl"/>

                            <div id="product-detail" className=" flex flex-col gap-1 w-[100%]">
                                <a className="text-2xl font-bold hover:underline" 
                                href={item.url}
                                >
                                    {item.title}</a>

                                <ShortDescription text={item.description} />

                                <a href={item.url}   
                                    className="text-blue-600 underline w-fit">
                                อ่านต่อ</a>

                                <div id="category" className="flex flex-row gap-[15px]">
                                    <p>หมวดหมู่:</p>

                                    {item.tags.map((items,index)=>(
                                    <div key={index} className="hover:underline hover:cursor-pointer" onClick={()=> addcate(items)} >
                                    {items}
                                    </div>
                                    )
                                    )}
                                </div>

                                <div className="flex flex-row justify-between">
                                    <div id="more-photo" className=" flex flex-row gap-[20px] mt-[10px]">
                                        {item.photos.slice(1).map((photo,index)=>(
                                            <div key={index} >
                                                <img src={photo} alt="cate-photo" className="w-[50px] h-[50px] object-cover rounded-2xl"/>
                                            </div>
                                )
                                )}
                                    </div>
                               
                                    <img src="./public/img/link.png" alt="link"  className="w-[50px] hover:cursor-pointer  "
                                    onClick={()=> copyToClipboard(item.url)}
                                    /> 
                                 </div>
                            </div>
                        </div>
                    )         
                    )}
                </div>
            </form>
        </div>
    )
}


export default HomePage;