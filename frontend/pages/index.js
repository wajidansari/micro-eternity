import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Micro Eternity - AI & Cloud Solutions</title>
        <meta name="description" content="Innovating AI and Cloud for the Future" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center px-6">
        <h1 className="text-4xl md:text-6xl font-bold text-center">
          Welcome to <span className="text-blue-500">Micro Eternity</span>
        </h1>
        <p className="mt-4 text-lg text-gray-400 text-center">
          Leading the Future with AI and Cloud Technologies
        </p>
        <a
          href="/about"
          className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-lg transition"
        >
          Learn More
        </a>
      </main>
    </>
  );
}
