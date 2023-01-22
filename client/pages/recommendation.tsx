import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

const Recommendations: NextPage = () => {
    const list = ["Action", "Adventure", "Comedy", "Drama", "Fantasy", "Horror", "Magic", "Mecha", "Mystery", "Romance", "Sci-Fi", "School", "Sports", "Supernatural", "Shounen"]
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2 text-white">
        <video className='videoTag absolute -z-10' autoPlay loop muted>
    <source src="/animeHypeMix.mp4" type='video/mp4' />
    </video>
      <Head>
        <title>Recommendations</title>
      </Head>
      
    
      <main className="flex w-full flex-1 flex-col text-center">
        
      <div className="p-4">
        <h1 className="text-3xl text-white rounded-xl font-bold float-left p-2 hover:text-blue-600 transition duration-700 ease-in-out">
          <a className="" href="/">
        Home
          </a>
        </h1>
        </div>
        <h1 className="text-4xl sm:text-6xl text-white font-bold  hover:text-black transition duration-700 ease-in-out">
          <a className="" href="/recommendation">
            Recommendations!
          </a>
        </h1>
 
        
        <div className="mt-6 flex flex-wrap items-center justify-center sm:w-full">
        <div className="grid grid-cols-5 gap-10 items-center justify-center">

        {list.map(genre => (<Link href={`/${genre}`}><button className="mt-6 w-6/12 sm:w-56 rounded-xl border p-6 py-10 text-left text-white hover:bg-white 
        text-2xl font-bold hover:text-black transition duration-1000 ease-in-out focus:text-purple-600 text-center">
            {genre} &rarr;
            </button></Link>))}

        
          </div>
        </div>
      </main>

     
    </div>
  )
}

export default Recommendations
