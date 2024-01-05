import React from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const Heropage = () => {

  const navigator = useNavigate()

  return (
    <div className='w-full h-fit flex flex-col justify-center items-center'>
      <Navbar/>
      <div className="relative text-white text-[90px] font-bold font-['Poppins'] max-sm:text-[26px] flex mt-[8vh]">Affiliate Program</div>
      <div className=" max-sm:text-sm text-white text-4xl font-normal font-['Poppins'] max-sm:w-[209px] text-center">Promote space Tech Training & <span className="text-violet-600 text-4xl font-normal font-['Poppins'] max-sm:text-sm">Earn rewards</span></div>

      {/* block 1  */}
      <div className='flex mt-[5rem] max-sm:mt-[2.2rem]'>
        <div className="absolute text-violet-600 text-[200px] font-bold font-['Prompt'] max-sm:text-[54px] ml-[-3rem] mt-[-7.5vh] max-sm:ml-[-0.8rem] max-sm:mt-[-0.3rem] font-bold">1</div>
        <div className="w-[1133px] h-[188px] bg-zinc-900 rounded-[15px] border border-white max-sm:w-[250px] max-sm:h-[70px] max-sm:rouded-[10px] flex flex-col" >
          <div className="text-white text-[46px] font-semibold font-['Poppins'] max-sm:text-base ml-[6rem] mt-[2vh] max-sm:ml-[1.5rem] max-sm:mt-[1.2vh]">Fill the form</div>
          <div className="w-[943px] text-white text-[25px] font-normal font-['Poppins'] leading-[37px] ml-[6rem] max-sm:ml-[1.5rem] max-sm:mt-[0.1vh] max-sm:w-[218px] max-sm:text-[8px] max-sm:leading-3 max-sm:mt-[-0.1vh]">Fill out our quick form and join our dedicated network of affiliates. It's free and only takes a few minutes!</div>
        </div>
      </div>

      {/* block 2 */}
      <div className='flex mt-[5rem] max-sm:mt-[1.5rem]'>
        <div className="absolute text-violet-600 text-[200px] font-bold font-['Prompt'] max-sm:text-[54px] ml-[-3rem] mt-[-5vh] max-sm:ml-[-0.8rem] max-sm:mt-[0.56rem] font-bold">2</div>
        <div className="w-[1133px] h-[229px] bg-zinc-900 rounded-[15px] border border-white max-sm:w-[250px] max-sm:h-[95px] max-sm:rouded-[10px] flex flex-col" >
          <div className="text-white text-[46px] font-semibold font-['Poppins'] max-sm:text-base ml-[6rem] mt-[2vh] max-sm:ml-[1.5rem] max-sm:mt-[1.2vh]">Refer</div>
          <div className="w-[943px] text-white text-[25px] font-normal font-['Poppins'] leading-[37px] ml-[6rem] max-sm:ml-[1.5rem] max-sm:mt-[0.1vh] max-sm:w-[218px] max-sm:text-[8px] max-sm:leading-3 max-sm:mt-[-0.1vh]">Get access to unique affiliate links, banners, and marketing materials. Share them with your audience and start earning for every purchase made through your links.</div>
        </div>
      </div>

      {/* block 3 */}
      <div className='flex mt-[5rem] max-sm:mt-[1.5rem]'>
        <div className="absolute text-violet-600 text-[200px] font-bold font-['Prompt'] max-sm:text-[54px] ml-[-3rem] mt-[-5vh] max-sm:ml-[-0.8rem] max-sm:mt-[0.56rem] font-bold">3</div>
        <div className="w-[1133px] h-[229px] bg-zinc-900 rounded-[15px] border border-white max-sm:w-[250px] max-sm:h-[109px] max-sm:rouded-[10px] flex flex-col" >
          <div className="text-white text-[46px] font-semibold font-['Poppins'] max-sm:text-base ml-[6rem] mt-[2vh] max-sm:ml-[1.5rem] max-sm:mt-[1.8vh] max-sm:leading-4">Reap the Rewards & Celebrate Success!</div>
          <div className="w-[943px] text-white text-[25px] font-normal font-['Poppins'] leading-[37px] ml-[6rem] max-sm:ml-[1.5rem] max-sm:mt-[0.5vh] max-sm:w-[218px] max-sm:text-[8px] max-sm:leading-3 max-sm:mt-[-0.1vh]">Get access to unique affiliate links, banners, and marketing materials. Share them with your audience and start earning for every purchase made through your links.</div>
        </div>
      </div>

      <button className="w-[250px] h-[67.11px] bg-violet-600 rounded-[10px] border-white text-white text-[25px] font-bold font-['Poppins'] mt-[7rem] mb-[10rem] max-sm:w-[100px] max-sm:h-[26.89px] max-sm:text-[10px] max-sm:mt-[2rem] max-sm:mb-[2rem]" onClick={() => navigator('/page1')}>Fill the form</button>

    </div>
  );
}

export default Heropage;
