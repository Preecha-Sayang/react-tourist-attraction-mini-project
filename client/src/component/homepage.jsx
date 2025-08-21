import { useEffect, useState } from "react";
import axios from "axios";



function HomePage(){

    const [newarray, isnewarry] = useState([])

    async function datas(searchKeyword = "") {
        const newdata= await axios.get(`http://localhost:4001/trips?keywords=${searchKeyword}`)
        isnewarry(newdata.data.data)
    }

     useEffect(() => {
        datas()
    }, [])
    return(
        <div id="mainpage">
            <h1 id="header">เทียวไหนดี</h1>
            
            <form>
                <p>ค้นหาที่เทียว</p>
                <input type="text" placeholder="ระบุสถานที่เทียว" />
                <div id="tourist-place">
                    {newarray.map((item)=>
                    (
                        <div key={item.eid}>
                            <img src={item.photos[0]} alt="photo" />
                            <div id="product-detail">
                                <p4>{item.title}</p4>
                                <p>{item.description}</p>
                                <a href={item.url}>อ่านต่อ</a>
                                {item.tags.map((items,index)=>(
                                    <div key={index}>
                                    {items}
                                    </div>
                                )
                                )}
                                
                                {item.photos.slice(1).map((photo,index)=>(
                                    <div key={index}>
                                        <img src={photo} alt="cate-photo" />
                                    </div>
                                )
                                )}
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