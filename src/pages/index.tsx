import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {

  return (
    <main>
      <Link href='/dashboard'>Dashboard</Link>
    </main>
  );
};

export default Home;