import { FC, useState } from "react";
import arrow from '../../assets/up-and-down.svg'

type StepComponentProps = {
    onNext: () => void;
  };


const Country:FC<StepComponentProps> = ({onNext}) => {
    const [selectedCountry, setSelectedCountry] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(e.target.value);
    console.log("Selected country:", e.target.value);
  };
  return (

           <div>
    <div className=' min-h-[450px] flex flex-col '>
      <h2 className='text-2xl mb-4 text-onboard-primary font-extrabold'>Where Are You Based?</h2>
      <p className='mb-6 text-onboard-dark leading-[1.6] font-medium'>This helps us personalize tool suggestions, currencies, and rewards for you.</p>

      <p className="text-base mb-3 font-extrabold text-onboard-dark">Country</p>
      <div className="w-ful">
      <div className="relative w-full">
  <select
    id="country"
    name="country"
    value={selectedCountry}
    onChange={handleChange}
    className="w-full appearance-none bg-white px-2  text-onboard-dark font-medium border border-gray-300 rounded focus:border-onboard-primary"
    style={{ boxShadow: "inset 0 2px 10px 0 rgba(0, 0, 0, 0.15)" }}
  >
    <option value="">Select your country</option>
    <option value="US">United States</option>
    <option value="GB">United Kingdom</option>
    <option value="CA">Canada</option>
    <option value="AU">Australia</option>
    <option value="IN">India</option>
    <option value="DE">Germany</option>
    <option value="FR">France</option>
    <option value="JP">Japan</option>
    <option value="BR">Brazil</option>
    <option value="NG">Nigeria</option>
  </select>


  <div className="pointer-events-none absolute top-1 inset-y-0 right-2 flex items-center flex-col">
  <img src={arrow} alt='' className="w-3.5 h-3.5" />
</div>
</div>
            </div>
    </div>
    <div className="flex items-center gap-5">
    <div onClick={onNext} className='btn-onboard bg-onboard-primary rounded-xl w-3/4 cursor-pointer text-white text-lg py-2 px-6 font-bold text-center'>
            Continue
        </div>
        <p className="skip cursor-pointer text-sm">Skip this step</p>
        </div>
    </div>
  )
}

export default Country