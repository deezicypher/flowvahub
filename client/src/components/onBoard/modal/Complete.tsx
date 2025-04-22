import  { Dispatch, FC, SetStateAction } from 'react'

interface ModalProps {
    setShowModal: Dispatch<SetStateAction<boolean>>
}

const CompleteModal:FC<ModalProps> = ({setShowModal}) => {
  return (
    <div>
         <div className="fixed  inset-0 bg-black opacity-50 flex justify-center items-center " />
  <div className='flex w-full h-full  justify-center'>
  <div className="absolute flex items-center mt-20 flex-col bg-white mb-auto rounded-xl p-8 ">
    <h2 className="text-2xl mb-4 text-onboard-primary font-extrabold">Onboarding Complete!</h2>
    <p className="mb-6 text-onboard-dark leading-[1.6] font-medium">Taking you to your dashboard now.</p>
    <div onClick={()=>setShowModal(false)} className="btn-onboard bg-onboard-primary rounded-xl cursor-pointer text-white text-lg py-2 px-6 font-bold text-center">
      Ok
    </div>
  </div>
  </div>
    </div>
  )
}

export default CompleteModal