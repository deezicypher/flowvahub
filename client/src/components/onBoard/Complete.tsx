import  { useState } from 'react'
import CompleteModal from './modal/Complete'

const Complete = () => {
    const[showModal, setShowModal] = useState<boolean>(false)

  return (

<div className="relative">
 {showModal && <CompleteModal setShowModal={setShowModal} /> }
    <div>
<div className=' min-h-[450px] flex flex-col '>
  <h2 className='text-2xl mb-4 text-onboard-primary font-extrabold'>Setup Complete!</h2>
  <p className='mb-6 text-onboard-dark leading-[1.6] font-medium'>Your Flowva library is ready to use. We'll take you to your dashboard now where you can start organizing your tools and tracking your productivity.
  </p>
  </div>
  <div onClick={() => setShowModal(true)} className='btn-onboard bg-onboard-primary rounded-xl cursor-pointer text-white text-lg py-2 px-6 font-bold text-center'>
          Go to Dashboard
        </div>
  </div>
    </div>
  )
}

export default Complete