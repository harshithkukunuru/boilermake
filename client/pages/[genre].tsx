import { useRouter } from "next/router";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import useSWR from "swr";
import { useState } from "react";
import StarRatings from "react-star-ratings";
import { fetcher } from "./util";

const Genre = () => {
  const router = useRouter();
  const { genre } = router.query;
  const fallbackAnimeData = [
    {
      img_url: "/loading.jpg",
      title: "Loading...",
      synopsis: "Loading...",
    },
  ];
  const { data } = useSWR(
    `https://ara-flask-production.up.railway.app/recs?genre=${genre}`,
    fetcher,
    {
      fallbackData: fallbackAnimeData,
    }
  );
  const { data: creators } = useSWR(
    `https://ara-flask-production.up.railway.app/pick`,
    fetcher,
    {
      fallbackData: fallbackAnimeData,
    }
  );
  const { data: flops } = useSWR(
    `https://ara-flask-production.up.railway.app/bot?genre=${genre}`,
    fetcher,
    {
      fallbackData: fallbackAnimeData,
    }
  );

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2 bg-stone-900 text-white">
      <Head>
        <title>{genre}</title>
      </Head>
      <main className="flex w-full flex-1 flex-col text-center">
        <div className="p-4">
          <h1 className="text-3xl text-white rounded-xl font-bold float-left p-2 hover:text-blue-600 transition duration-700 ease-in-out">
            <a className="" href="/">
              Home
            </a>
          </h1>
        </div>
        <h1 className="text-4xl sm:text-6xl text-white font-bold hover:text-blue-600 transition duration-700 ease-in-out">
          <a className="" href="/recommendation">
            {genre} Anime Recommendations
          </a>
        </h1>
        <div className="flex flex-col flex-wrap sm:flex-row justify-center gap-6">
          <div className="mt-6 border rounded-xl flex max-w-md flex-wrap items-start justify-around  sm:w-full">
            <div className="mt-6 w-11/12 sm:w-96 rounded-xl p-6 text-center text-white transition duration-1000 ease-in-out focus:text-blue-600">
              <h3 className="text-3xl font-bold">Creator's Picks</h3>
              <p className="mt-4 text-xl"></p>
            </div>
            {creators &&
              creators.map((creatorPicks) => (
                <a
                  href={creatorPicks.link}
                  className="mt-6 w-11/12 sm:w-96 rounded-xl border p-6 text-left text-white hover:bg-white hover:text-blue-600 transition duration-1000 ease-in-out focus:text-blue-600"
                >
                  <img
                    className="flex-none float-right object-cover w-1/2 sm:w-1/3 max-w-full self-start"
                    width="auto"
                    height="auto"
                    src={creatorPicks.img_url}
                    alt={data.title}
                    style={{ borderRadius: "8px" }}
                  ></img>
                  <h3 className="pb-4 text-2xl font-bold">
                    {creatorPicks.title}
                  </h3>
                  <StarRatings
                    rating={creatorPicks.score}
                    starRatedColor="#2563eb"
                    numberOfStars={5}
                    name="rating"
                    starDimension="30px"
                  />
                </a>
              ))}
          </div>
          <div className="mt-6 border rounded-xl flex max-w-md flex-wrap items-start justify-around  sm:w-full">
            <div className="mt-6 w-11/12 sm:w-96 rounded-xl p-6 text-center text-white transition duration-1000 ease-in-out focus:text-blue-600">
              <h3 className="text-3xl font-bold"> Your Recommendations</h3>
              <p className="mt-4 text-xl"></p>
            </div>
            {data &&
              data.map((anime) => (
                <a
                  href={anime.link}
                  className="mt-6 w-11/12 sm:w-96 rounded-xl border p-6 text-left text-white hover:bg-white hover:text-blue-600 transition duration-1000 ease-in-out focus:text-blue-600"
                >
                  <img
                    className="flex-none float-right object-cover w-1/2 sm:w-1/3 max-w-full self-start"
                    width="auto"
                    height="auto"
                    src={anime.img_url}
                    alt={data.title}
                    style={{ borderRadius: "8px" }}
                  ></img>
                  <h3 className="pb-4 text-2xl font-bold">{anime.title}</h3>
                  <StarRatings
                    rating={anime.score}
                    starRatedColor="#2563eb"
                    numberOfStars={5}
                    name="rating"
                    starDimension="30px"
                  />
                </a>
              ))}
          </div>
          <div className="mt-6 border rounded-xl flex max-w-md flex-wrap items-start justify-around  sm:w-full">
            <div className="mt-6 w-11/12 sm:w-96 rounded-xl p-6 text-center text-white transition duration-1000 ease-in-out focus:text-blue-600">
              <h3 className="text-3xl font-bold">Busts</h3>
            </div>
            {flops &&
              flops.map((creatorPicks) => (
                <a
                  href={creatorPicks.link}
                  className="mt-6 w-11/12 sm:w-96 rounded-xl border p-6 text-left text-white hover:bg-white hover:text-blue-600 transition duration-1000 ease-in-out focus:text-blue-600"
                >
                  <div className=""><img
                    className="flex-none float-right object-cover w-1/2 sm:w-1/3 max-w-full self-start"
                    width="auto"
                    height="auto"
                    src={creatorPicks.img_url}
                    alt={data.title}
                    style={{ borderRadius: "8px" }}
                  ></img></div>
                  <h3 className="pb-4 text-2xl font-bold">
                    {creatorPicks.title}
                  </h3>
                  <StarRatings
                    rating={creatorPicks.score}
                    starRatedColor="#2563eb"
                    numberOfStars={5}
                    name="rating"
                    starDimension="30px"
                  />
                </a>
              ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Genre;
