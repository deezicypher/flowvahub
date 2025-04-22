import { useState } from 'react'
import Section from '../components/section';
import AboutYou from '../components/onBoard/AboutYou';
import Country from '../components/onBoard/Country';
import ToolStack from '../components/onBoard/ToolStack';
import Personalize from '../components/onBoard/Personalize';
import Complete from '../components/onBoard/Complete';
import Welcome from '../components/onBoard/Welcome';
import { Data } from '../types';




const Onboard = () => {
  const [data, setData] = useState<Data>({
    describesYou:'',
    workYoudo:[],
    country:'',
    stack:[],
    goals:[]
  })
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6;
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
        return <AboutYou onNext={handleNext} setData={setData}  />;
      case 3:
        return <Country setData={setData} onNext={handleNext} />;
      case 4:
        return <ToolStack setData={setData}  onNext={handleNext} />;
      case 5:
        return <Personalize onNext={handleNext} setData={setData} data={data} />;
      case 6:
        return <Complete  />;
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