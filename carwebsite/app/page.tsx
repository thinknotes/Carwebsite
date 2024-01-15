import Image from 'next/image'
import Hero from '@/components/Hero'
import SearchBar from '@/components/SearchBar'
import CustomFilter from '@/components/CustomFilter'
import { fetchCars } from '@/utils'
import CardCard from '@/components/CardCard'


export default async function Home() {
  const allCars = await fetchCars();

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

  console.log(allCars)

  return (
    <main className="overflow-hidden">
       <Hero />

       <div className='mt-12 padding-x padding-y max-width' id='discover'>
          <div className='home__text-container'>
            <h1 className='text-4xl font-extrabold'>Car Catalogue
              <p>Explore cars you might like</p>
            </h1>
          </div>

          <div className='home__filters'>
              <SearchBar />

              <div className='home__filter-container'>
                 <CustomFilter title="fuel"/>
                 <CustomFilter title="year"/>
              </div>
          </div>

          {!isDataEmpty ? (
            <section>
               <div className='home__cars-wrapper'>
                  {allCars?.map((cars) => (
                    <CardCard car={cars} /> ))}
               </div>
            </section>
          ) : (
              <div className='home__error-container'>
                 <h2 className='text=black text-xl font-bold'>Opps, no results</h2>
                 <p>{allCars?.message}</p>
              </div>
          )}

       </div>
    </main>
  )
}
