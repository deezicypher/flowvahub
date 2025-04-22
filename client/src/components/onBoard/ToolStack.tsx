import { FC,  useRef, useState } from 'react'

type StepComponentProps = {
    onNext: () => void;
  };


const ToolStack:FC<StepComponentProps> = ({onNext}) => {
   
    const boxOneRef = useRef<HTMLDivElement>(null);
    const boxTwoRef = useRef<HTMLDivElement>(null);
    const boxThreeRef = useRef<HTMLDivElement>(null);
    const boxFourRef = useRef<HTMLDivElement>(null);
    const boxFiveRef = useRef<HTMLDivElement>(null);
    const boxSixRef = useRef<HTMLDivElement>(null);
    const boxSevenRef = useRef<HTMLDivElement>(null);
    const boxEightRef = useRef<HTMLDivElement>(null);
    const boxNineRef = useRef<HTMLDivElement>(null);
  
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
  
    const toggleSelection = (ref: React.RefObject<HTMLDivElement | null>, name: string) => {
        const classList = ref.current?.classList;
        if (!classList) return;
      
        const isSelected = classList.contains('bg-onboard-primary-light');
      
        if (isSelected) {
          classList.remove('bg-onboard-primary-light','border' ,'border-onboard-primary');
          classList.add('bg-white','border');
          setSelectedItems((prev) => prev.filter((item) => item !== name));
        } else {
          classList.remove('bg-white','border');
          classList.add('bg-onboard-primary-light','border','border-onboard-primary');
          setSelectedItems((prev) => [...prev, name]);
        }
      };
      
  
    // For debugging or saving selected items
    console.log('Selected items:', selectedItems);
  return (
 <div>
    <div className=' min-h-[450px]  flex flex-col '>
      <h2 className='text-2xl mb-4 text-onboard-primary font-extrabold'>Your Tool Stack</h2>
      <p className='mb-6 text-onboard-dark leading-[1.6] font-medium'>Which tools are part of your workflow? We'll pre-load and organize them in your library.</p>

  <div className='grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 gap-5 w-full '>
    <div ref={boxOneRef}
        onClick={() => toggleSelection(boxOneRef, 'Notion')} className="   border text-onboard-dark border-[#ddd] rounded-xl p-4  cursor-pointer stack  ">
        <div  className='flex flex-col items-center'>
        📝
        <p className='font-medium'>Notion</p>
        </div>
    </div>
    <div ref={boxTwoRef}
        onClick={() => toggleSelection(boxTwoRef, 'Trello')} className=" border text-onboard-dark border-[#ddd] rounded-xl p-4  cursor-pointer stack  ">
        <div  className='flex flex-col items-center'>
        📋
        <p className='font-medium'>Trello</p>
        </div>
    </div>
    <div ref={boxThreeRef}
        onClick={() => toggleSelection(boxThreeRef, 'Slack')} className="  border text-onboard-dark border-[#ddd] rounded-xl p-4  cursor-pointer stack  ">
        <div  className='flex flex-col items-center'>
        💬
        <p className='font-medium'>Slack</p>
        </div>
    </div>

    <div ref={boxFourRef}
        onClick={() => toggleSelection(boxFourRef, 'ClickUp')} className="  border text-onboard-dark border-[#ddd] rounded-xl p-4  cursor-pointer stack  ">
        <div  className='flex flex-col items-center'>
        ✅
        <p className='font-medium'>ClickUp</p>
        </div>
    </div>
    <div ref={boxFiveRef}
        onClick={() => toggleSelection(boxFiveRef, 'Canva')} className="  border text-onboard-dark border-[#ddd] rounded-xl p-4  cursor-pointer stack  ">
        <div  className='flex flex-col items-center'>
        🎨
        <p className='font-medium'>Canva</p>
        </div>
    </div>
    <div ref={boxSixRef}
        onClick={() => toggleSelection(boxSixRef, 'Zapier')} className="  border text-onboard-dark border-[#ddd] rounded-xl p-4  cursor-pointer stack  ">
        <div  className='flex flex-col items-center'>
        ⚡
        <p className='font-medium'>Zapier</p>
        </div>
    </div>
    <div ref={boxSevenRef}
        onClick={() => toggleSelection(boxSevenRef, 'Stripe')} className="  border text-onboard-dark border-[#ddd] rounded-xl p-4  cursor-pointer stack  ">
        <div  className='flex flex-col items-center'>
        💳
        <p className='font-medium'>Stripe</p>
        </div>
    </div>
    <div ref={boxEightRef}
        onClick={() => toggleSelection(boxEightRef, 'Figma')} className="  border text-onboard-dark border-[#ddd] rounded-xl p-4  cursor-pointer stack  ">
        <div  className='flex flex-col items-center'>
        ✏️
        <p className='font-medium'>Figma</p>
        </div>
    </div>
    <div ref={boxNineRef}
        onClick={() => toggleSelection(boxNineRef, 'Calendly')} className="  border text-onboard-dark border-[#ddd] rounded-xl p-4  cursor-pointer stack  ">
        <div  className='flex flex-col items-center'>
        📅
        <p className='font-medium'>Calendly</p>
        </div>


    </div>
  </div>
  <p className='mb-6 mt-4 text-sm text-onboard-dark leading-[1.6] font-medium'>You can always add more tools later in your library settings.</p>

    </div>
    <div className="flex w-full items-center gap-5">
    <div onClick={onNext} className='btn-onboard bg-onboard-primary rounded-xl w-4/5 cursor-pointer text-white text-lg py-2 px-6 font-bold text-center'>
            Continue
        </div>
        <p onClick={onNext} className="skip cursor-pointer text-sm w-50">Skip- I'll do them later</p>
        </div>
    </div>
  )
}

export default ToolStack