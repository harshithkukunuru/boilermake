import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import StarRatings from "react-star-ratings";
import useSWR from "swr";
import useSWRMutation from 'swr';

const Ratings: NextPage = () => {
  const fallbackAnimeData = {
    img_url: "/loading.jpg",
    title: "Loading...",
    synopsis:'Loading...',
  };
  //@ts-ignore
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, mutate } = useSWR(
    "https://ara-flask-production.up.railway.app/rate",
    fetcher,
    {
      fallbackData: fallbackAnimeData,
    }
  );

  const [rating, setRating] = useState(0);

  return (
    <div className="flex min-h-screen flex-col py-2 bg-stone-900 text-white">
      
      <Head>
        <title>Ratings</title>
      </Head>

      <main className="">
        <div className="p-4">
          <h1 className="text-3xl text-whiterounded-xl font-bold float-left p-2 hover:text-blue-600 transition duration-700 ease-in-out">
            <a className="" href="/">
              Home
            </a>
          </h1>
        </div>

        <h1 className="text-white hover:text-white transition duration-700 ease-in-out text-6xl p-10 font-bold text-center">
          <a className="" href="/ratings">
            Rating Anime
          </a>
        </h1>
        <div className="px-10 flex flex-col sm:flex-row gap-10">
          <img
            className="flex-none object-cover w-1/2 sm:w-1/3 max-w-full self-start"
            width="auto"
            height="auto"
            src={data.img_url}
            alt={data.title}
            style={{ borderRadius: "8px" }}
          ></img>

          <div className="grid grid-rows-2 grid-cols-1 gap-8">
            <div className="flex flex-col">
              <h2 className="text-4xl font-bold text-white pb-5">
                {data.title}
              </h2>
              <h3 className="text-2xl text-white float-right">
                {data.synopsis}
              </h3>
            </div>
            <div className="flex flex-col gap-5">
              <h2 className="text-2xl font-bold float-right">
                Give this anime a rating:{" "}
              </h2>
              <div className="flex flex-col sm:flex-row gap-20">
                <StarRatings
                  rating={rating}
                  starRatedColor="#2563eb"
                  numberOfStars={5}
                  changeRating={async (r) => {
                    setRating(r)
                    try {
                      const m = await mutate(
                        fetch('https://ara-flask-production.up.railway.app/rate', {
                          method: 'POST',
                          headers:{
                            'Content-Type': "application/json"
                          },
                          body: JSON.stringify({
                            id: data.id,
                            score: calculateNewRating(data, r)
                          })
                        })
                      )
                      console.log('mutated', m)
                      setRating(0)
                    } catch(err) {
                      console.log('failed to mutate')
                    }
                  }}
                  starHoverColor="#93c5fd"
                  name="rating"
                />

                <button className="text-xl p-3 border rounded-xl hover:bg-white hover:text-blue-600 transition duration-700 ease-in-out" onClick={() => mutate()}>
                  Haven't Watched
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Ratings;



function calculateNewRating(data:any, rating:number){
  return ((.1 * data.score * data.members) +  (rating)) / (.1 * data.members + 1)
}
