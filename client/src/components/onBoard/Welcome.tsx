import { FC } from 'react'

type StepComponentProps = {
    onNext: () => void;
  };

const Welcome:FC<StepComponentProps> = ({onNext}) => {
  return (
    <div>
      <div className=' min-h-[450px] flex flex-col justify-center'>
        <h1 className='text-4xl mb-4 text-onboard-primary font-extrabold'>Welcome to Flowva</h1>
        <p className='mb-6 text-onboard-dark leading-[1.6] font-medium'>Your smart library for organizing tools, tracking usage, and turning productivity into rewards. Let's set up your digital library in 2 minutes.

        </p>

        </div>

        <div onClick={onNext} className='btn-onboard bg-onboard-primary rounded-xl cursor-pointer text-white text-lg py-2 px-6 font-bold text-center'>
          Let's Go
        </div>
      </div>
  )
}

export default Welcome