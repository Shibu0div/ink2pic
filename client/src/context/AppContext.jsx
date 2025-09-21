import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios';



export const AppContext=createContext()

const AppContextProvider=(props)=>{
      const[user,setUser]=useState(null);
      const [showLogin, setShowLogin]= useState(false);
      const [token,setToken]=useState(localStorage.getItem('token'))
      const[credit,setCredit]=useState(false)
      const backendUrl=import.meta.env.VITE_BACKEND_URL
      const loadCreditsData=async()=>{
        try {
            const {data}=await axios.get(backendUrl+'/api/user/credits',{headers:{token}})

            if(data.success){
                setCredit(data.credits)
                setUser(data.user)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
      }
      const generateImage=async(prompt)=>{
          if(!token){
            setShowLogin(true);
            toast.info("Please login to generate image");
            return null;
          }
          if(!prompt || prompt.trim()===""){
            toast.warning("Please enter a prompt before generating an image");
            return null;
          }
          try {
           const {data}=  await axios.post(backendUrl+'/api/image/generate-image',{prompt},{headers:{token}})
           if(data.success){
            loadCreditsData()
            return data.resultImage
           }
           else{
              toast.error(data.message)
              loadCreditsData()
              if(data.creditBalance===0){
                toast.info("You don't have enough credits, Please recharge")
              }
           }

          } catch (error) {
            toast.error(error.message)
          }
          return null;
      }

       const logout=()=>{
          localStorage.removeItem('token');
          setToken('')
          setUser(null)
       } 
      useEffect(()=>{
        if(token){
            loadCreditsData()
        }
      },[token])

      const value={
        user,setUser,showLogin,setShowLogin,backendUrl,token,setToken,credit,setCredit,loadCreditsData,logout,generateImage
      }
      return(
        <AppContext.Provider value={value}>
               {props.children}
        </AppContext.Provider>
      )
}
export default AppContextProvider