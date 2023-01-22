import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <video className='videoTag absolute -z-10' autoPlay loop muted>
    <source src="/Y2Mate.is - One Piece AMV - Royalty-xmbxe0Jtxmc-1080p-1655126915625.mp4" type='video/mp4' />
</video>
      <Head>
        <title>Anime Recommendations App And Ratings Also ara ara</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center text-center">
        <h1 className="text-4xl sm:text-6xl text-white font-bold hover:text-black transition duration-700 ease-in-out">
          Welcome to{" "}
          <a className="" href="/">
            Anime Recommendations App
          </a>
        </h1>
        <a
          className=" text-white hover:text-purple-400 transition duration-700 ease-in-out"
          href="/ratings"
        ></a>
        <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full">
          <Link
            href="/ratings"
            className="mt-6 w-11/12 sm:w-96 rounded-xl border p-6 text-left text-white hover:bg-white hover:text-black transition duration-1000 ease-in-out focus:text-black"
          >
            <h3 className="text-2xl font-bold">Rating &rarr;</h3>
            <p className="mt-4 text-xl">Rate anime that you have watched.</p>
          </Link>

          <a
            href="/recommendation"
            className="mt-6 w-11/12 sm:w-96 rounded-xl border p-6 text-left text-white hover:bg-white hover:text-black transition duration-1000 ease-in-out focus:text-black"
          >
            <h3 className="text-2xl font-bold">Recommendations &rarr;</h3>
            <p className="mt-4  text-xl">Browse anime recommendations.</p>
          </a>
        </div>
      </main>
    </div>
  );
};

export default Home;
