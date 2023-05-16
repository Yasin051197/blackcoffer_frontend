import React, { useEffect, useState } from 'react'
import axios from "axios"
import {Chart,BarElement,CategoryScale,LinearScale,Tooltip,Legend} from 'chart.js/auto';

const getData=async()=>{
    return await axios.get("https://blackcoffer-assignment-server.onrender.com")
}

const Dashboard = () => {
    const [data,setData]=useState([])
    const [searchData, setSearchData] = useState([]);
    const [topicData, setTopicData] = useState([]);
    const [regionData, setRegionData] = useState([]);
    const [showdata,setShowdata]=useState({})
    useEffect(()=>{
      getData().then((res)=>setData(res.data))
    },[])

    const handlClick=(el)=>{
      setShowdata(el)
      setSearchData([])
      setTopicData([])
      setRegionData([])
    }
const handleCountry=(e)=>{
let a=e.target.value
if(a){
  const filteredArray=data.filter(obj=>{
    return Object.values(obj).some(value=>{
      if(typeof value ==='string'){
        return value.includes(a)
      }else{
        return false
      }
    })
  })
  setSearchData(filteredArray)
}else{
  setSearchData([])
}
}
const handleTopic=(e)=>{
  let a=e.target.value
  if(a){
    const filteredArray=data.filter(obj=>{
      return Object.values(obj).some(value=>{
        if(typeof value ==='string'){
          return value.includes(a)
        }else{
          return false
        }
      })
    })
    setTopicData(filteredArray)
  }else{
    setTopicData([])
  }
  }

  const handleRegion=(e)=>{
    let a=e.target.value
    if(a){
      const filteredArray=data.filter(obj=>{
        return Object.values(obj).some(value=>{
          if(typeof value ==='string'){
            return value.includes(a)
          }else{
            return false
          }
        })
      })
      setRegionData(filteredArray)
    }else{
      setRegionData([])
    }
    }

    const da={
      labels: ["Intensity", "Likelihood", "Relevance"],
      datasets: [{
        label: 'Chart Data',
        data: [showdata.intensity,showdata.likelihood,showdata.relevance],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(54, 162, 235, 0.2)',
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(54, 162, 235)',
        ],
        borderWidth: 1
      }]
    }
    useEffect(()=>{
        const config = {
            type: 'bar',
            data: da,
            options: {
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            },
          };
          const myChart = new Chart(document.getElementById('myChart'), config);
        return () => {
          myChart.destroy();
        };
    },[showdata])
   
  return (
    <div>
      <h2>Filters</h2>
      <div style={{display:"flex",justifyContent:"space-evenly"}}>
        {/* Country filter */}
        <div>
        <label htmlFor="country">Country: </label>
        <input type="text" placeholder='Enter country name...' onChange={handleCountry} />
        <br />
        <div style={{display:"fixed",zIndex:2}}>
        {searchData.map((el)=>(
          <div style={{boxShadow:"rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px"}}  onClick={()=>handlClick(el)} key={el.id}>{el.country}</div>
        ))}
        </div>
        </div>
        {/* topic filter */}
        <div>
        <label htmlFor="country"> Topics: </label>
        <input type="text" placeholder='Enter topic name...' onChange={handleTopic} />
        <br />
        <div style={{display:"fixed",zIndex:2}}>
        {topicData.map((el)=>(
          <div  onClick={()=>handlClick(el)} key={el.id}>{el.topic}</div>
        ))}
        </div>
        </div>
        {/* region filter */}
        <div>
        <label htmlFor="country"> Region: </label>
        <input type="text" placeholder='Enter region name...' onChange={handleRegion} />
        <br />
        <div style={{display:"fixed",zIndex:2}}>
        {regionData.map((el)=>(
          <div  onClick={()=>handlClick(el)} key={el.id}>{el.region}</div>
        ))}
        </div>
        </div>


      </div>
        <div>
          {showdata.country?<h2 key={showdata._id}>Country: {showdata.country}</h2>:<></>}
          {showdata.topic?<h3 key={showdata._id}>Topic: {showdata.topic}</h3>:<></>}
          {showdata.region?<h3 key={showdata._id}>Region: {showdata.region}</h3>:<></>}
          <br />
          <div style={{width:"80%",margin:"auto"}}>
          <canvas id="myChart" width="800" height="300"></canvas>
          </div>
          <br />
          <br />
        </div>
    </div>
  )
}

export default Dashboard