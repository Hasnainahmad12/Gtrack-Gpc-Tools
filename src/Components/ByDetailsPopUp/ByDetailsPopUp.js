import { useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import { FaAngleRight, FaAngleDown } from 'react-icons/fa';
import "./ByDetailsPopUp.css"
import CircularProgress from '@mui/material/CircularProgress';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  height: '75%',
  maxWidth: '80%',
  maxHeight: '80%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};


const ByDetailsPopUp = ({ title, handleOpenPopUp, handleClosePopUp, openPopUp, openFoodLoading,apiResponse }) => {
    const [open, setOpen] = useState(false);
    const [subOpen, setSubOpen] = useState(false);
    const [thirdOpen, setThirdOpen] = useState(false);
    const [fourthOpen, setFourthOpen] = useState(false);

    const toggleOpen = () => {
        setOpen(!open);
      };
    
    const toggleSubOpen = (e) => {
        e.stopPropagation(); // Prevent parent from closing when a sub-item is clicked
        setSubOpen(!subOpen);
      };
    
      const toggleThirdOpen = (e) => {
        e.stopPropagation(); // Prevent parent from closing when a sub-item is clicked
        setThirdOpen(!thirdOpen);
      };
    
      const toggleFourthOpen = (e) => {
        e.stopPropagation(); // Prevent parent from closing when a sub-item is clicked
        setFourthOpen(!fourthOpen);
      }
    

  return (
    <div>
      <button
        onClick={handleOpenPopUp}
        className="mt-1 text-sm text-slate-700 border-2 border-gray-400 rounded-md py-2 px-4 cursor-pointer hover:bg-gray-100">
        {title}
      </button>
      <Modal
        open={openPopUp}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            ...style,
            '@media (max-width: 768px)': {
              width: '90%',
              height: '90%',
            },
          }}
        >
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleClosePopUp}
            aria-label="close"
            sx={{
              position: 'absolute',
              top: '5px',
              right: '15px',
            }}
          >
            <ClearIcon />
          </IconButton>
          {openFoodLoading ? ( // Step 4: Conditionally Render Loader


            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100%', // Ensure the container takes the full height
              }}
            >
              <CircularProgress

              />
            </div>
          ) : (
            <div className="p-3 h-full shadow" style={{ maxHeight: '100%', overflowY: 'auto' }}>
              <h1 className='font-normal bg-primary text-white px-2 py-1'>Detailed Information</h1>
              <ul className='h-[80vh] w-full'>
                <li>
                    <a
                    href="#"
                    onClick={toggleOpen}
                    className={`flex items-center px-4 hover:bg-secondary-100 focus:text-primary active:text-primary ${open ? 'text-primary' : ''}`}
                    >
                    {open ? (
                        <FaAngleDown />
                    ) : (
                        <FaAngleRight />
                    )}
                    {/* <h1 className='font-bold'>Segment: </h1> {gpcData?.data?.SegmentTitle} */}
                    <h1 className='font-bold'>Segment: </h1> Segment Title
                    </a>
                    <ul className={`ml-6 ${open ? 'block' : 'hidden'}`}>
                    {/* <li className="px-2 hover:bg-secondary-100">{gpcData?.data?.SegmentCode}</li> */}
                    <li className="px-2 hover:bg-secondary-100">Segment Code</li>
                    <li>
                        <a
                        href="#"
                        onClick={toggleSubOpen}
                        className={`flex items-center px-2 hover:bg-secondary-100 focus:text-primary active:text-primary ${subOpen ? 'text-primary' : ''}`}
                        >
                        {subOpen ? (
                            <FaAngleDown />
                        ) : (
                            <FaAngleRight />
                        )}
                        {/* <h1 className='font-bold'>FamilyTitle: </h1>{gpcData?.data?.FamilyTitle} */}
                        <h1 className='font-bold'>FamilyTitle: </h1> Fimily Title
                        </a>
                        <ul className={`ml-6 ${subOpen ? 'block' : 'hidden'}`}>
                        {/* <li className="px-2 hover:bg-secondary-100">{gpcData?.data?.FamilyCode}</li> */}
                        <li className="px-2 hover:bg-secondary-100">Family Code</li>
                        <li>
                            <a
                            href="#"
                            onClick={toggleThirdOpen}
                            className={`flex items-center px-4 hover:bg-secondary-100 focus:text-primary active:text-primary ${thirdOpen ? 'text-primary' : ''}`}
                            >
                            {thirdOpen ? (
                                <FaAngleDown />
                            ) : (
                                <FaAngleRight />
                            )}
                            {/* <h1 className='font-bold'>Class: </h1>{gpcData?.data?.ClassTitle} */}
                            <h1 className='font-bold'>Class: </h1> Class Title
                            </a>
                            <ul className={`ml-10 ${thirdOpen ? 'block' : 'hidden'}`}>
                            {/* <li className="px-2 hover:bg-secondary-100">{gpcData?.data?.ClassCode}</li> */}
                            <li className="px-2 hover:bg-secondary-100">Class Code</li>
                            </ul>
                        </li>
                        <li>
                            <a
                            href="#"
                            onClick={toggleFourthOpen}
                            className={`flex items-center px-10 hover:bg-secondary-100 focus:text-primary active:text-primary ${thirdOpen ? 'text-primary' : ''}`}
                            >
                            {fourthOpen ? (
                                <FaAngleDown />
                            ) : (
                                <FaAngleRight />
                            )}
                            {/* <h1 className='font-bold'>Brick: </h1> {gpcData?.data?.BrickTitle} */}
                            <h1 className='font-bold'>Brick: </h1> Title
                            </a>
                            <ul className={`ml-16 ${fourthOpen ? 'block' : 'hidden'}`}>
                            {/* <li className="px-2 hover:bg-secondary-100">{gpcData?.data?.BrickCode}</li> */}
                            <li className="px-2 hover:bg-secondary-100">Brick Code</li>
                            </ul>
                        </li> 
                      </ul>
                    </li>
                    </ul>
                </li>
                </ul>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default ByDetailsPopUp;