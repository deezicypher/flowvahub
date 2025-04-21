import { FC, FormEvent, useState } from 'react'

type StepComponentProps = {
    onNext: () => void;
  };

 
  
 
  type FormData = {
    radioQuestion: string;
    checkboxQuestion: string[];
    showOtherInput:boolean;
    other:string;
  };

const AboutYou:FC<StepComponentProps> = ({onNext}) => {
    const [formData, setFormData] = useState<FormData>({
        radioQuestion: '',
        checkboxQuestion: [],
        showOtherInput:false,
        other:''
      });
  

    const handleRadioChange = (value: string) => {
        setFormData({
          ...formData,
          radioQuestion: value
        });
      };

      const handleCheckboxChange = (optionId: string, checked: boolean) => {
        if (optionId === 'other') {
          // Only the "other" checkbox affects the showOtherInput property
          setFormData({
            ...formData,
            showOtherInput: checked, // Show/hide based on the other checkbox
            checkboxQuestion: checked 
              ? [...formData.checkboxQuestion.filter(item => item !== 'other'), 'other'] // Add 'other'
              : formData.checkboxQuestion.filter(item => item !== 'other') // Remove 'other'
          });
        } else {
          // Regular options don't affect the Other input visibility
          setFormData({
            ...formData,
            // Maintain the showOtherInput value
            checkboxQuestion: checked
              ? [...formData.checkboxQuestion, optionId] // Add this option
              : formData.checkboxQuestion.filter(item => item !== optionId) // Remove this option
          });
        }
      };
 
      const handleOtherChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
          ...formData,
          other: e.target.value,
          showOtherInput:true
        });
      };

      const isCheckboxChecked = (optionId: string): boolean => {
        return formData.checkboxQuestion.includes(optionId);
      };
    
      const handleSubmit = (e: FormEvent) => {
        e.preventDefault(); // Prevent default form submission behavior
        
        
        if (formData.radioQuestion !== '' && formData.checkboxQuestion.length > 0) {
          
            onNext();
        } 
      };
    
 
  return (
    <div>
    <div className=' min-h-[450px] flex flex-col '>
      <h2 className='text-2xl mb-4 text-onboard-primary font-extrabold'>About You</h2>
      <p className='mb-6 text-onboard-dark leading-[1.6] font-medium'>Help us tailor your library by telling us a bit about yourself.

      </p>

      
      <form onSubmit={handleSubmit}>
        
          <div  className="mb-6">
            <p className="text-base mb-3 font-extrabold text-onboard-dark">What best describes you? Please select an option</p>
            
            <div className="space-y-2">
              <div className="flex items-center mb-4">
                <div className="relative flex items-center justify-center">
                  <input
                    type="radio"
                    id={'radio-freelancer'}
                    name='radioQuestion'
                    value="Freelancer"
                    checked={formData.radioQuestion === "Freelancer"}
                    onChange={() => handleRadioChange("Freelancer")}
                    className="w-5 h-5 opacity-10 absolute"
                  />
                  <div className={`w-3 h-3 rounded-full border border-gray-400 flex items-center justify-center ${formData.radioQuestion === "Freelancer" ? "border-blue-500" : ""}`}>
                    {formData.radioQuestion === "Freelancer" && (
                      <div className="w-3 h-3 rounded-full bg-blue-500 flex items-center justify-center">
                      <div className="w-1 h-1 rounded-full bg-gray-50" />
                    </div>
                    )}
                  </div>
                </div>
                <label 
                  htmlFor="radio-freelancer" 
                  className="ml-2  cursor-pointer font-medium text-onboard-dark"
                >
                  Freelancer
                </label>
              </div>
              
              <div className="flex items-center mb-4">
                <div className="relative flex items-center justify-center">
                  <input
                    type="radio"
                    id="radio-soloE"
                    name="radioQuestion"
                    value="SoloE"
                    checked={formData.radioQuestion === "SoloE"}
                    onChange={() => handleRadioChange("SoloE")}
                    className="w-5 h-5 opacity-0 absolute"
                  />
                  <div className={`w-3 h-3 rounded-full border border-gray-400 flex items-center justify-center ${formData.radioQuestion === "SoloE" ? "border-blue-500" : ""}`}>
                    {formData.radioQuestion === "SoloE" && (
                     <div className="w-3 h-3 rounded-full bg-blue-500 flex items-center justify-center">
                     <div className="w-1 h-1 rounded-full bg-gray-50" />
                   </div>
                    )}
                  </div>
                </div>
                <label 
                  htmlFor="radio-soloE" 
                  className="ml-2 font-medium text-onboard-dark cursor-pointer"
                >
                  Solo entrepreneur
                </label>
              </div>

              <div className="flex items-center mb-4">
                <div className="relative flex items-center justify-center">
                  <input
                    type="radio"
                    id="radio-smallT"
                    name="radioQuestion"
                    value="No"
                    checked={formData.radioQuestion === "SmallT"}
                    onChange={() => handleRadioChange("SmallT")}
                    className="w-5 h-5 opacity-0 absolute"
                  />
                  <div className={`w-3 h-3 rounded-full border border-gray-400 flex items-center justify-center ${formData.radioQuestion === "SmallT" ? "border-blue-500" : ""}`}>
                    {formData.radioQuestion === "SmallT" && (
                      <div className="w-3 h-3 rounded-full bg-blue-500 flex items-center justify-center">
                      <div className="w-1 h-1 rounded-full bg-gray-50" />
                    </div>
                    )}
                  </div>
                </div>
                <label 
                  htmlFor="radio-smallT"
                  className="ml-2 font-medium text-onboard-dark cursor-pointer"
                >
                  Small team
                </label>
              </div>
              
              <div className="flex items-center mb-4">
                <div className="relative flex items-center justify-center">
                  <input
                    type="radio"
                    id="radio-creator"
                    name="radioQuestion"
                    value="No"
                    checked={formData.radioQuestion === "Creator"}
                    onChange={() => handleRadioChange("Creator")}
                    className="w-5 h-5 opacity-0 absolute"
                  />
                  <div className={`w-3 h-3 rounded-full border border-gray-400 flex items-center justify-center ${formData.radioQuestion === "Creator" ? "border-blue-500" : ""}`}>
                    {formData.radioQuestion === "Creator" && (
                      <div className="w-3 h-3 rounded-full bg-blue-500 flex items-center justify-center">
                      <div className="w-1 h-1 rounded-full bg-gray-50" />
                    </div>
                    )}
                  </div>
                </div>
                <label 
                  htmlFor="radio-creator"
                  className="ml-2 font-medium text-onboard-dark cursor-pointer"
                >
                  Creator
                </label>
              </div>
            </div>
          </div>

          <div className="mb-6">
          <p className="text-base mb-3 font-extrabold text-onboard-dark">What kind of work do you do? </p>
          
          <div className="space-y-2">
            
              <div  className="flex items-center mb-4">
                <div className="relative flex items-center justify-center">
                  <input
                    type="checkbox"
                    id="design"
                    name="design"
                    checked={isCheckboxChecked('design')}
                    onChange={(e) => handleCheckboxChange('design', e.target.checked)}
                    className="w-5 h-5 opacity-0 absolute"
                  />
                  <div className={`w-4 h-4 rounded border border-gray-400 flex items-center justify-center ${isCheckboxChecked('design') ? "bg-blue-500 border-blue-500" : "bg-white"}`}>
                    {isCheckboxChecked('design') && (
                      <svg className="w-3 h-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
                <label 
                  htmlFor="design" 
                  className="ml-2 font-medium text-onboard-dark cursor-pointer"
                >
                  Design
                </label>
              </div>

              <div  className="flex items-center mb-4">
                <div className="relative flex items-center justify-center">
                  <input
                    type="checkbox"
                    id="development"
                    name="development"
                    checked={isCheckboxChecked('development')}
                    onChange={(e) => handleCheckboxChange('development', e.target.checked)}
                    className="w-5 h-5 opacity-0 absolute"
                  />
                  <div className={`w-4 h-4 rounded border border-gray-400 flex items-center justify-center ${isCheckboxChecked('development') ? "bg-blue-500 border-blue-500" : "bg-white"}`}>
                    {isCheckboxChecked('development') && (
                      <svg className="w-3 h-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
                <label 
                  htmlFor="development" 
                  className="ml-2 font-medium text-onboard-dark cursor-pointer"
                >
                  Development
                </label>
              </div>

              <div  className="flex items-center mb-4">
                <div className="relative flex items-center justify-center">
                  <input
                    type="checkbox"
                    id="writing"
                    name="writing"
                    checked={isCheckboxChecked('writing')}
                    onChange={(e) => handleCheckboxChange('writing', e.target.checked)}
                    className="w-5 h-5 opacity-0 absolute"
                  />
                  <div className={`w-4 h-4 rounded border border-gray-400 flex items-center justify-center ${isCheckboxChecked('writing') ? "bg-blue-500 border-blue-500" : "bg-white"}`}>
                    {isCheckboxChecked('writing') && (
                      <svg className="w-3 h-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
                <label 
                  htmlFor="writing" 
                  className="ml-2 font-medium text-onboard-dark cursor-pointer"
                >
                  Writing
                </label>
              </div>
   
              <div  className="flex items-center mb-4">
                <div className="relative flex items-center justify-center">
                  <input
                    type="checkbox"
                    id="marketing"
                    name="marketing"
                    checked={isCheckboxChecked('marketing')}
                    onChange={(e) => handleCheckboxChange('marketing', e.target.checked)}
                    className="w-5 h-5 opacity-0 absolute"
                  />
                  <div className={`w-4 h-4 rounded border border-gray-400 flex items-center justify-center ${isCheckboxChecked('marketing') ? "bg-blue-500 border-blue-500" : "bg-white"}`}>
                    {isCheckboxChecked('marketing') && (
                      <svg className="w-3 h-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
                <label 
                  htmlFor="marketing" 
                  className="ml-2 font-medium text-onboard-dark cursor-pointer"
                >
                  Marketing
                </label>
              </div>

              <div  className="flex items-center mb-4">
                <div className="relative flex items-center justify-center">
                  <input
                    type="checkbox"
                    id="other"
                    name="other"
                    checked={isCheckboxChecked('other')}
                    onChange={(e) => handleCheckboxChange('other', e.target.checked)}
                    className="w-5 h-5 opacity-0 absolute"
                  />
                  <div className={`w-4 h-4 rounded border border-gray-400 flex items-center justify-center ${isCheckboxChecked('other') ? "bg-blue-500 border-blue-500" : "bg-white"}`}>
                    {isCheckboxChecked('other') && (
                      <svg className="w-3 h-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
                <label 
                  htmlFor="other" 
                  className="ml-2 font-medium text-onboard-dark cursor-pointer"
                >
                  Other
                </label>
                {formData.showOtherInput && (
                <div className="ml-2 mt-2">
                  <input
                    type="text"
                    value={formData.other}
                    onChange={handleOtherChange}
                    placeholder="Please specify"
                    className="px-3 py-2 border border-gray-300 focus:border-primary focus:shadow-custom-focus rounded-md w-full"
                  />
                </div>
              )}
              </div>

           
          </div>
        </div>

        <button type='submit'  className='btn-onboard w-full mt-8 bg-onboard-primary rounded-xl cursor-pointer text-white text-lg py-2 px-6 font-bold text-center'>
       Continue
      </button>
      </form>

  
    </div>
    </div>
  )
}

export default AboutYou