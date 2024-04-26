
import React from 'react';  
import Top10 from './Top10';
import Popular from './Popular'


function Featured() {
  return (
    <>
      <section className='max-w-6xl mx-auto  border-red-500'>
        <Top10/>
        <Popular/>
      </section>
    </>
  );
}


export default Featured;
