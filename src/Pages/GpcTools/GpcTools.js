import React, { useState } from 'react'
import gtrackIcon from '../../Images/gtrackicons.png'
import { BiSolidRightArrow } from 'react-icons/bi';

const GpcTools = () => {
   const [activeTab, setActiveTab] = useState('GPC');
  
   const handleTabChange = (tab) => {
      setActiveTab(tab);
    
    };

    const [isSubmenuVisible, setIsSubmenuVisible] = useState(false);

    const handleSelectChange = (event) => {
        if (event.target.value === 'GPC') {
          setIsSubmenuVisible(true);
        } else {
          setIsSubmenuVisible(false);
        }
      };
    

  return (
    <div>
      <div className="py-1">

        <div className='h-24 w-full flex justify-between bg-gray-100'>
            <div className='p-2 w-[50%]'>
                <label className='font-semibold text-sm text-slate-700'>Source</label>
                <div className='relative'>
                    <select 
                        className='sm:w-[60%] w-full py-2 flex justify-start items-center px-1 rounded-md font-semibold'
                        onChange={handleSelectChange}
                    >
                        <option>-Select Tools-</option>
                        <option value="GPC">GPC</option>
                        <option>HS-CODES</option>
                        <option>UNSPSC</option>
                        <option>EUDAMED</option>
                        <option>NCS</option>
                    </select>
                    {isSubmenuVisible && (
                        <div className="absolute z-10 flex flex-col gap-2 bg-white px-4 py-2 rounded-md shadow-lg mt-2 space-y-1 ml-10 w-full sm:w-[60%]">
                        <div className="flex justify-start items-center gap-2 hover:bg-gray-200 cursor-pointer"><BiSolidRightArrow /> Family</div>
                        <div className="flex justify-start items-center gap-2 hover:bg-gray-200 cursor-pointer"><BiSolidRightArrow /> Segment</div>
                        <div className="flex justify-start items-center gap-2 hover:bg-gray-200 cursor-pointer"><BiSolidRightArrow /> Class title</div>
                        <div className="flex justify-start items-center gap-2 hover:bg-gray-200 cursor-pointer"><BiSolidRightArrow /> Brick Title</div>
                        <div className="flex justify-start items-center gap-2 hover:bg-gray-200 cursor-pointer"><BiSolidRightArrow /> Attribute Title</div>
                        </div>
                    )}
              </div>
            </div>

            <div className='p-2 w-[50%]'>
                <div className='flex justify-end gap-2 pt-5'>
                    <input 
                        className='w-[60%] py-2 flex justify-start items-center px-3 rounded-md font-semibold'
                        placeholder='Airbrushing Equipments'
                        />
                    <button className='w-[20%] text-white font-semibold rounded-md py-2 bg-primary'>
                        Search
                    </button>
                </div>
            </div>
        </div>


        {/* Tabs */}
        <div className="w-full grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-2 mt-6 px-4">
            <span
                className={`w-full py-2 flex justify-start px-1 rounded-md font-bold ${
                    activeTab === 'GPC'
                    ? 'bg-primary text-white'
                    : 'text-black border-2 border-primary'
                } items-center gap-2 cursor-pointer`}
            onClick={() => handleTabChange('GPC')}
            >
            <img src={gtrackIcon} className="w-auto h-5 ml-1" alt="" />
            GPC
            </span>

            <span
                className={`w-full py-2 flex justify-start px-1 rounded-md font-bold ${
                    activeTab === 'HS-CODES'
                    ? 'bg-primary text-white'
                    : 'text-black border-2 border-primary'
                } items-center gap-2 cursor-pointer`}
            onClick={() => handleTabChange('HS-CODES')}
            >
            <img src={gtrackIcon} className="w-auto h-5 ml-1" alt="" />
            HS-CODES
            </span>

            <span
            className={`w-full py-2 flex justify-start px-1 rounded-md font-bold ${
                activeTab === 'UNSPSC'
                ? 'bg-primary text-white'
                : 'text-black border-2 border-primary'
            } items-center gap-2 cursor-pointer`}
            onClick={() => handleTabChange('UNSPSC')}
            >
            <img src={gtrackIcon} className="w-auto h-5 ml-1" alt="" />
            UNSPSC
            </span>

            <span
            className={`w-full py-2 flex justify-start px-1 rounded-md font-bold ${
                activeTab === 'OTHER'
                ? 'bg-primary text-white'
                : 'text-black border-2 border-primary'
            } items-center gap-2 cursor-pointer`}

            onClick={() => handleTabChange('OTHER')}
            >
            <img src={gtrackIcon} className="w-auto h-5 ml-1" alt="" />
            Others
            </span>
        </div>


         {/* Content based on the active tab */}
            {activeTab === 'GPC' && (
                <div>
                {/* Content for the GPC tab */}
                {/* Add your content specific to the GPC tab here */}
                </div>
            )}

            {activeTab === 'HS-CODES' && (
                <div>
                {/* Content for the HS-CODES tab */}
                {/* Add your content specific to the HS-CODES tab here */}
                </div>
            )}

         <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 p-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 mt-4">
            <article className="rounded-lg bg-white p-2 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 ">
                    <div className="relative h-56 flex items-end overflow-hidden rounded-xl">
                        <img 
                            className='' 
                            src="https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="image"
                            style={{
                                objectFit: 'contain',
                                height: '100%', margin: 'auto'
                                }}

                            />
                    </div>

                    <div className="mt-1 p-2 flex flex-col gap-1">
                        <div className='flex justify-between items-center'>
                            <p className="text-sm font-semibold text-slate-700">ADIDAS Men White Sports Shoes</p>
                            {/* <p className="mt-1 font-semibold text-sm text-slate-700">Product Arabic</p> */}
                        </div>
                
                        <div className="">
                            <p className="mt-1 font-bold text-sm text-slate-700">View Similar:</p>
                            <div className="flex gap-1">
                                <p className="mt-1 text-sm text-slate-700 border-2 border-gray-400 rounded-md py-2 px-4 cursor-pointer hover:bg-gray-100">
                                By Text
                                </p>
                                <p className="mt-1 text-sm text-slate-700 border-2 border-gray-400 rounded-md py-2 px-4 cursor-pointer hover:bg-gray-100">
                                By Image
                                </p>
                            </div>
                        </div>
                    </div>                     
                </article>


                <article className="rounded-lg bg-white p-2 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 ">
                    <div className="relative h-56 flex items-end overflow-hidden rounded-xl">
                        <img 
                            className='' 
                            src="https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="image"
                            style={{
                                objectFit: 'contain',
                                height: '100%', margin: 'auto'
                                }}

                            />
                    </div>

                    <div className="mt-1 p-2 flex flex-col gap-1">
                        <div className='flex justify-between items-center'>
                            <p className="text-sm font-semibold text-slate-700">ADIDAS Men White Sports Shoes</p>
                            {/* <p className="mt-1 font-semibold text-sm text-slate-700">Product Arabic</p> */}
                        </div>
                
                        <div className="">
                            <p className="mt-1 font-bold text-sm text-slate-700">View Similar:</p>
                            <div className="flex gap-1">
                                <p className="mt-1 text-sm text-slate-700 border-2 border-gray-400 rounded-md py-2 px-4 cursor-pointer hover:bg-gray-100">
                                By Text
                                </p>
                                <p className="mt-1 text-sm text-slate-700 border-2 border-gray-400 rounded-md py-2 px-4 cursor-pointer hover:bg-gray-100">
                                By Image
                                </p>
                            </div>
                        </div>
                    </div>                     
                </article>


                <article className="rounded-lg bg-white p-2 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 ">
                    <div className="relative h-56 flex items-end overflow-hidden rounded-xl">
                        <img 
                            className='' 
                            src="https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="image"
                            style={{
                                objectFit: 'contain',
                                height: '100%', margin: 'auto'
                                }}

                            />
                    </div>

                    <div className="mt-1 p-2 flex flex-col gap-1">
                        <div className='flex justify-between items-center'>
                            <p className="text-sm font-semibold text-slate-700">ADIDAS Men White Sports Shoes</p>
                            {/* <p className="mt-1 font-semibold text-sm text-slate-700">Product Arabic</p> */}
                        </div>
                
                        <div className="">
                            <p className="mt-1 font-bold text-sm text-slate-700">View Similar:</p>
                            <div className="flex gap-1">
                                <p className="mt-1 text-sm text-slate-700 border-2 border-gray-400 rounded-md py-2 px-4 cursor-pointer hover:bg-gray-100">
                                By Text
                                </p>
                                <p className="mt-1 text-sm text-slate-700 border-2 border-gray-400 rounded-md py-2 px-4 cursor-pointer hover:bg-gray-100">
                                By Image
                                </p>
                            </div>
                        </div>
                    </div>                     
                </article>


                <article className="rounded-lg bg-white p-2 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 ">
                    <div className="relative h-56 flex items-end overflow-hidden rounded-xl">
                        <img 
                            className='' 
                            src="https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="image"
                            style={{
                                objectFit: 'contain',
                                height: '100%', margin: 'auto'
                                }}

                            />
                    </div>

                    <div className="mt-1 p-2 flex flex-col gap-1">
                        <div className='flex justify-between items-center'>
                            <p className="text-sm font-semibold text-slate-700">ADIDAS Men White Sports Shoes</p>
                            {/* <p className="mt-1 font-semibold text-sm text-slate-700">Product Arabic</p> */}
                        </div>
                
                        <div className="">
                            <p className="mt-1 font-bold text-sm text-slate-700">View Similar:</p>
                            <div className="flex gap-1">
                                <p className="mt-1 text-sm text-slate-700 border-2 border-gray-400 rounded-md py-2 px-4 cursor-pointer hover:bg-gray-100">
                                By Text
                                </p>
                                <p className="mt-1 text-sm text-slate-700 border-2 border-gray-400 rounded-md py-2 px-4 cursor-pointer hover:bg-gray-100">
                                By Image
                                </p>
                            </div>
                        </div>
                    </div>                     
                </article>


            </div>
        </div>

    </div>
  )
}

export default GpcTools