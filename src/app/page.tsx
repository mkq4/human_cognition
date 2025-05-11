import { Cards } from '@/components/shared/cards';
import { GetStartedScreen } from "@/components/shared/get-started-screen";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <section>
        <GetStartedScreen />
      </section>
      <section className='my-10'>
        <Cards/>
      </section>
    </>
  );
}
