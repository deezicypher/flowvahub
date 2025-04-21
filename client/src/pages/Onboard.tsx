import { useState } from 'react'
import Section from '../components/section';
import Welcome from '../components/onBoard/welcome';
import AboutYou from '../components/onBoard/AboutYou';




const Onboard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  const progress = currentStep === 1 ? 0 : ((currentStep - 1) / (totalSteps - 1)) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <Welcome onNext={handleNext}  />;
      case 2:
        return <AboutYou onNext={handleNext} />;
      default:
        return null;
    }
  };
  return (
    <div>
      <Section className='relative h-screen'>
      <div className='relative bg-white p-8 mx-auto my-8 w-full max-w-[600px]  rounded-xl shadow-2xl'>
      <div className="w-full h-1.5  bg-gray-200 rounded-full overflow-hidden mb-8">
        <div
          className=" bg-onboard-primary h-1.5  transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {renderStepContent()}
        </div>
      </Section>

    </div>
  )
}

export default Onboard