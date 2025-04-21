import { FC, FormEvent, useState } from 'react'

type StepComponentProps = {
    onNext: () => void;
  };

 
  
 
  type FormData = {
    radioQuestion: string;
    checkboxQuestion: string[];
  };

const AboutYou:FC<StepComponentProps> = ({onNext}) => {
    const [formData, setFormData] = useState<FormData>({
        radioQuestion: '',
        checkboxQuestion: []
      });
  

    const handleRadioChange = (value: string) => {
        setFormData({
          ...formData,
          radioQuestion: value
        });
      };

      const handleCheckboxChange = (optionId: string, checked: boolean) => {
        if (checked) {
          setFormData({
            ...formData,
            checkboxQuestion: [...formData.checkboxQuestion, optionId]
          });
        } else {
          setFormData({
            ...formData,
            checkboxQuestion: formData.checkboxQuestion.filter(item => item !== optionId)
          });
        }
      };
 
      const isCheckboxChecked = (optionId: string): boolean => {
        return formData.checkboxQuestion.includes(optionId);
      };
    
      const handleSubmit = (e: FormEvent) => {
        e.preventDefault(); // Prevent default form submission behavior
        
        // Check if radio button has been selected (not empty)
        // AND checkbox array has at least one item
        if (formData.radioQuestion !== '' && formData.checkboxQuestion.length > 0) {
          onNext();
        } 
      };
    
      // Checkbox options
      const checkboxOptions = [
        { id: 'javascript', label: 'JavaScript' },
        { id: 'typescript', label: 'TypeScript' },
        { id: 'python', label: 'Python' },
        { id: 'java', label: 'Java' }
      ];
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
          <p className="text-base mb-3 font-extrabold text-onboard-dark">What kind of work do you do? Please select at least one option</p>
          
          <div className="space-y-2">
            {checkboxOptions.map(option => (
              <div key={option.id} className="flex items-center mb-4">
                <div className="relative flex items-center justify-center">
                  <input
                    type="checkbox"
                    id={`checkbox-${option.id}`}
                    name={`checkbox-${option.id}`}
                    checked={isCheckboxChecked(option.id)}
                    onChange={(e) => handleCheckboxChange(option.id, e.target.checked)}
                    className="w-5 h-5 opacity-0 absolute"
                  />
                  <div className={`w-4 h-4 rounded border border-gray-400 flex items-center justify-center ${isCheckboxChecked(option.id) ? "bg-blue-500 border-blue-500" : "bg-white"}`}>
                    {isCheckboxChecked(option.id) && (
                      <svg className="w-3 h-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
                <label 
                  htmlFor={`checkbox-${option.id}`} 
                  className="ml-2 font-medium text-onboard-dark cursor-pointer"
                >
                  {option.label}
                </label>
              </div>
            ))}
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