import {useEffect, useState} from "react";
import Confetti from 'react-confetti'
import {Fireworks} from '@fireworks-js/react';

const MyButton = ({text, ...rest}) => {
   return <div
      className={`px-9 py-2 border-[1px] border-[rgb(100,100,100)] rounded flex justify-center items-center
                  hover:bg-[rgba(0,0,0,0.3)] cursor-pointer bg-[lightgray]
            `}
      {...rest}
   >
      {text}
   </div>
}

const WarningIcon = () =>
   <img
      src='data:image/png;base64,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'/>

const NapoleonDynamite = () =>
   <iframe src='https://giphy.com/embed/SUtvUAbKeBXiVdqCMB' width='150' height='150' frameBorder='0'
           className='giphy-embed' allowFullScreen/>


const KimCrying = () =>
   <iframe src='https://giphy.com/embed/nB8nDjCQMnp0xLvXfl' width='150' height='150' frameBorder='0'
           className='giphy-embed' allowFullScreen/>

const MichealJackson = () =>
   <iframe src='https://gifer.com/embed/bfR' width='220' height='220' frameBorder='0' allowFullScreen/>


const Dialog = ({text, onClose, isYes, isNo, children}) => {
   return (
      <div className={`w-[500px] h-[230px] border-[1px] border-[gray] rounded flex flex-col 
                        justify-between bg-[white]`}
      >
         <div className='h-[35px] flex justify-end items-center  text-[gray] text-xl'>
            <span className={`border-[1px] border-[rgba(0,0,0,0.3)] px-2 m-[2px] rounded 
                              hover:bg-[gray] hover:text-[white] cursor-pointer`}
                  onClick={onClose}
            >
               X
            </span>
         </div>

         <div className='px-5 mt-[-35px] h-full flex items-center gap-3'>
            {
               isYes
                  ? <NapoleonDynamite/>
                  : <>
                     {
                        isNo
                           ? <KimCrying/>
                           : <WarningIcon/>
                     }
                  </>
            }

            {text}
         </div>


         <div className='flex justify-end gap-1 bg-[lightgray] p-2'>
            {children}
         </div>
      </div>
   )
}

const Celebrate = () => {
   return (
      <div>
         <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
         />
         <Fireworks
            options={{
               rocketsPoint: {
                  min: 0,
                  max: 100
               }
            }}
            style={{
               top: 0,
               left: 0,
               width: '100%',
               height: '100%',
               position: 'fixed',
               // background: '#000'
            }}
         />
      </div>
   )
}

const App = () => {
   const [text, setText] = useState("You've been hacked, LOL")
   const [isYes, setIsYes] = useState(false);
   const [okClickCount, setOkClickCount] = useState(0);
   const [isNo, setIsNo] = useState(false);
   const [noClickCount, setNoClickCount] = useState(0);
   const [noHoverCount, setOnHoverCount] = useState(0);
   const [noText, setNoText] = useState('No ');
   const [yesText, setYesText] = useState('Yes!');
   const [pointer, setPointer] = useState({x: 0, y: 0});
   const [runBtn, setRunBtn] = useState(false);

   const okClick = () => {
      if (okClickCount === 0)
         setText('However, I have just one question for you...')
      if (okClickCount === 1)
         setText('Will you be my valentine?')

      setOkClickCount(okClickCount + 1);
   }

   const yesClick = () => {
      setText('Brilliant 😘')
      setIsYes(true);
   }

   const noClick = () => {
      setText('WILL YOU BE MY VALENTINE PLEASE!!')
      setIsYes(false);
      setIsNo(true);
      setNoClickCount(noClickCount + 1);
   }

   const handleDialogClose = () => {
      console.log('NOOOOOOO')
   }

   const handleMouseMove = (e) => {
      setPointer({x: e.clientX, y: e.clientY});
   };

   const noHover = () => {
      if (isNo && noClickCount < 2) setNoText('💔💔💔')
      if (!isNo && noHoverCount < 5) setNoText('No 😭')
      if (!isNo && noHoverCount > 4) setNoText("No don't 🥺")
      if (noHoverCount < 4 && !isNo) setOnHoverCount(noHoverCount + 1);
      if (noHoverCount > 3 && !isNo && noHoverCount < 5) {
         setOnHoverCount(noHoverCount + 2);
         setYesText('YES!!!🙏');
         setRunBtn(true);
         setNoText("Can't catch me 😝")
         setTimeout(() => {
            setRunBtn(false);
            setNoText("Fine break my heart 🙈")
         }, 4000)
      }
   }

   useEffect(() => {
      if (isNo) {
         setYesText('👉🏻 SAY YESS 👈🏻 ')
         setNoText('💔')
      }
   }, [isNo])

   useEffect(() => {
      if (isNo && noClickCount >= 2) setNoText("NO (final answer)")
      if (isNo && noClickCount >= 3) setText('Fuck you')
   }, [noClickCount])


   const [yes, no] = [
      <MyButton
         key={'yesss'}
         text={yesText}
         onClick={yesClick}
      />,
      <MyButton
         key={'nooo'}
         text={noText}
         onClick={noClick}
         onMouseEnter={noHover}
         style={runBtn ? {
            position: 'fixed',
            top: pointer.x - 150,
            left: pointer.y - 140,
            zIndex: 1
         } : {}}
      />
   ]

   const YesNoBtns = () =>
      noHoverCount % 2 === 0
         ? [no, yes]
         : [yes, no]

   return (
      <div className='w-screen h-screen flex justify-center items-center relative bg-[black]'
           onMouseMove={handleMouseMove}>

         {isYes &&
         <>
            <Celebrate/>
            <div className='absolute bottom-5 right-5'>
               <MichealJackson/>
            </div>

            <div className='absolute bottom-5 left-5'>
               <MichealJackson/>
            </div>
         </>
         }

         <Dialog
            text={text}
            onClose={handleDialogClose}
            isYes={isYes}
            isNo={isNo}
         >
            {okClickCount < 2
               ? <MyButton text={'ok'} onClick={okClick}/>
               : <>
                  {!isYes && <YesNoBtns/>}
               </>
            }
         </Dialog>

      </div>
   );
};

export default App;
