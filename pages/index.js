import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import Header from '@/components/header/header'
import { useEffect, useState } from 'react';
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [msg,setMsg] = useState('')
  const a =  async() => {
      let response = await fetch('/api/mongodb');
      let data = await response.json();
      console.log(data);
      setMsg(data);
  }
  useEffect(()=>{
    try{
       a();
    }catch(er){
      console.log(er);
    }
  },[])
  return (
    <h1>
      {msg.message}
    </h1>
  )
}
