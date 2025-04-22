import { FC, FormEvent, useState } from "react";


type StepComponentProps = {
    onNext: () => void;
  };

 
  
 
  type FormData = {
    checkboxAnswers: string[];
  };

const Personalize:FC<StepComponentProps> = ({onNext}) => {
       const [formData, setFormData] = useState<FormData>({
        checkboxAnswers: []
       });




       const handleCheckboxChange = (optionId: string, checked: boolean) => {
        const currentValues = (formData.checkboxAnswers as string[]) || [];
      
        const updatedValues = checked
          ? [...currentValues, optionId]
          : currentValues.filter((item) => item !== optionId);
      
        setFormData({
          ...formData,
          checkboxAnswers: updatedValues,
        });
      };

      const isCheckboxChecked = (optionId: string): boolean => {
        return formData.checkboxAnswers.includes(optionId);
      };

          
            const handleSubmit = (e: FormEvent) => {
              e.preventDefault(); // Prevent default form submission behavior
   
              if ( formData.checkboxAnswers.length > 0) {
                
                  onNext();
              } 
            };

  return (
    <div>    
        <div>
    <div className=' min-h-[450px] flex flex-col '>
      <h2 className='text-2xl mb-4 text-onboard-primary font-extrabold'>What Do You Want to Track or Improve?</h2>
      <p className='mb-6 text-onboard-dark leading-[1.6] font-medium'>This helps us personalize your dashboard and features.
      </p>
      <form onSubmit={handleSubmit}>
      <div className="mb-6">
          <p className="text-base  font-extrabold text-onboard-dark">Select your goals </p>
          <p className="text-base mb-3 font-extrabold text-onboard-dark">Please select at least one option </p>
          
          <div className="space-y-2">
            
              <div  className="flex items-center mb-4">
                <div className="relative flex items-center justify-center">
                  <input
                    type="checkbox"
                    id="subscription-costs"
                    name="subscription-costs"
                    checked={isCheckboxChecked('subscription-costs')}
                    onChange={(e) => handleCheckboxChange('subscription-costs', e.target.checked)}
                    className="w-5 h-5 opacity-0 absolute"
                  />
                  <div className={`w-4 h-4 rounded border border-gray-400 flex items-center justify-center ${isCheckboxChecked('subscription-costs') ? "bg-blue-500 border-blue-500" : "bg-white"}`}>
                    {isCheckboxChecked('subscription-costs') && (
                      <svg className="w-3 h-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
                <label 
                  htmlFor="subscription-costs" 
                  className="ml-2 font-medium text-onboard-dark cursor-pointer"
                >
                  Subscription Costs
                </label>
              </div>

              <div  className="flex items-center mb-4">
                <div className="relative flex items-center justify-center">
                  <input
                    type="checkbox"
                    id="tool-usage-engagement"
                    name="tool-usage-engagement"
                    checked={isCheckboxChecked('tool-usage-engagement')}
                    onChange={(e) => handleCheckboxChange('tool-usage-engagement', e.target.checked)}
                    className="w-5 h-5 opacity-0 absolute"
                  />
                  <div className={`w-4 h-4 rounded border border-gray-400 flex items-center justify-center ${isCheckboxChecked('tool-usage-engagement') ? "bg-blue-500 border-blue-500" : "bg-white"}`}>
                    {isCheckboxChecked('tool-usage-engagement') && (
                      <svg className="w-3 h-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
                <label 
                  htmlFor="tool-usage-engagement" 
                  className="ml-2 font-medium text-onboard-dark cursor-pointer"
                >
                  Tool Usage and Engagement 
                </label>
              </div>

              <div  className="flex items-center mb-4">
                <div className="relative flex items-center justify-center">
                  <input
                    type="checkbox"
                    id="unused/duplicate-tools"
                    name="unused/duplicate-tools"
                    checked={isCheckboxChecked('unused/duplicate-tools')}
                    onChange={(e) => handleCheckboxChange('unused/duplicate-tools', e.target.checked)}
                    className="w-5 h-5 opacity-0 absolute"
                  />
                  <div className={`w-4 h-4 rounded border border-gray-400 flex items-center justify-center ${isCheckboxChecked('unused/duplicate-tools') ? "bg-blue-500 border-blue-500" : "bg-white"}`}>
                    {isCheckboxChecked('unused/duplicate-tools') && (
                      <svg className="w-3 h-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
                <label 
                  htmlFor="Unused/duplicate-tools" 
                  className="ml-2 font-medium text-onboard-dark cursor-pointer"
                >
                  Unused/duplicate tools
                </label>
              </div>
   
              <div  className="flex items-center mb-4">
                <div className="relative flex items-center justify-center">
                  <input
                    type="checkbox"
                    id="personalized-tool-suggestions"
                    name="personalized-tool-suggestions"
                    checked={isCheckboxChecked('personalized-tool-suggestions')}
                    onChange={(e) => handleCheckboxChange('personalized-tool-suggestions', e.target.checked)}
                    className="w-5 h-5 opacity-0 absolute"
                  />
                  <div className={`w-4 h-4 rounded border border-gray-400 flex items-center justify-center ${isCheckboxChecked('personalized-tool-suggestions') ? "bg-blue-500 border-blue-500" : "bg-white"}`}>
                    {isCheckboxChecked('personalized-tool-suggestions') && (
                      <svg className="w-3 h-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
                <label 
                  htmlFor="personalized-tool-suggestions" 
                  className="ml-2 font-medium text-onboard-dark cursor-pointer"
                >
                  Personalized tool suggestions
                </label>
              </div>

           

           
          </div>
        </div>

        <button type='submit'  className='btn-onboard w-full mt-8 bg-onboard-primary rounded-xl cursor-pointer text-white text-lg py-2 px-6 font-bold text-center'>
       Continue
      </button>
        </form>
      </div>
      </div>
      </div>
  )
}

export default Personalize