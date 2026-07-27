import imgImageWithFallback from "./a4215559add7a46c7bd16373e4135380ecce7ab1.png";

function ButtonGoToHome() {
  return (
    <div className="relative shrink-0" data-name="Button - Go to home">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center relative size-full">
        <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-black text-center tracking-[-0.1504px] whitespace-nowrap">Shalini Madan</p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="absolute h-[20px] left-0 top-[3px] w-[39.828px]" data-name="Button">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[20px] not-italic text-[#555] text-[14px] text-center top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">About</p>
    </div>
  );
}

function ListItem() {
  return (
    <div className="h-[24px] relative shrink-0 w-[39.828px]" data-name="List Item">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Button />
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute h-[20px] left-0 top-[3px] w-[61.414px]" data-name="Button">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[31px] not-italic text-[#555] text-[14px] text-center top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">Research</p>
    </div>
  );
}

function ListItem1() {
  return (
    <div className="h-[24px] relative shrink-0 w-[61.414px]" data-name="List Item">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Button1 />
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="absolute h-[20px] left-0 top-[3px] w-[52.859px]" data-name="Button">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[26.5px] not-italic text-[#555] text-[14px] text-center top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">Resume</p>
    </div>
  );
}

function ListItem2() {
  return (
    <div className="h-[24px] relative shrink-0 w-[52.859px]" data-name="List Item">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Button2 />
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="absolute h-[20px] left-0 top-[3px] w-[34.594px]" data-name="Button">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[17.5px] not-italic text-[#555] text-[14px] text-center top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">Diary</p>
    </div>
  );
}

function ListItem3() {
  return (
    <div className="h-[24px] relative shrink-0 w-[34.594px]" data-name="List Item">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Button3 />
      </div>
    </div>
  );
}

function List() {
  return (
    <div className="relative shrink-0" data-name="List">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[28px] items-center relative size-full">
        <ListItem />
        <ListItem1 />
        <ListItem2 />
        <ListItem3 />
      </div>
    </div>
  );
}

function NavigationMainNavigation() {
  return (
    <div className="content-stretch flex h-[56px] items-center justify-between max-w-[896px] px-[24px] relative shrink-0 w-[896px]" data-name="Navigation - Main navigation">
      <ButtonGoToHome />
      <List />
    </div>
  );
}

function NavigationMainNavigationMargin() {
  return (
    <div className="relative shrink-0 w-full" data-name="Navigation - Main navigation:margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative size-full">
        <NavigationMainNavigation />
      </div>
    </div>
  );
}

function Nav() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Nav">
      <div aria-hidden className="absolute border-[rgba(0,0,0,0.12)] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-px relative size-full">
        <NavigationMainNavigationMargin />
      </div>
    </div>
  );
}

function ImageWithFallback() {
  return (
    <div className="relative shrink-0 size-[200px]" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImageWithFallback} />
    </div>
  );
}

function ContainerMargin() {
  return (
    <div className="col-2 justify-self-stretch relative row-1 self-start shrink-0" data-name="Container:margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[4px] relative size-full">
        <ImageWithFallback />
      </div>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="relative shrink-0 w-full" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[14px] text-black tracking-[-0.1504px] w-[608px] whitespace-pre-wrap">
          <span className="leading-[22.75px]">{`I am a  PhD student at the `}</span>
          <span className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[22.75px] underline">{`University of Michigan's School of Information`}</span>
          <span className="leading-[22.75px]">, where I am fortunate to be advised by</span>
          <a className="[text-underline-position:from-font] cursor-pointer decoration-from-font decoration-solid leading-[22.75px] underline" href="https://venkateshpotluri.me/" target="_blank">
            <span className="[text-underline-position:from-font] decoration-from-font decoration-solid underline" href="https://venkateshpotluri.me/" target="_blank">{` `}</span>
          </a>
          <a className="[text-decoration-skip-ink:none] [text-underline-position:from-font] cursor-pointer decoration-from-font decoration-solid leading-[22.75px] underline" href="https://venkateshpotluri.me/" target="_blank">
            <span className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid underline" href="https://venkateshpotluri.me/" target="_blank">
              Dr. Venkatesh Potluri
            </span>
          </a>
          <span className="leading-[22.75px]">{`. I am also a part of the `}</span>
          <a className="[text-decoration-skip-ink:none] [text-underline-position:from-font] cursor-pointer decoration-from-font decoration-solid leading-[22.75px] underline" href="https://idea11y.dev/" target="_blank">
            <span className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid underline" href="https://idea11y.dev/" target="_blank">
              IDEA Lab
            </span>
          </a>
          <span className="leading-[22.75px]">.</span>
        </p>
      </div>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[16px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[22.75px] not-italic relative shrink-0 text-[14px] text-black tracking-[-0.1504px] w-[608px]">{`I hold a Master of Science in Information Science (Human-Computer Interaction) and a Bachelor's in Design (Interaction Design).`}</p>
      </div>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[16px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[22.75px] not-italic relative shrink-0 text-[14px] text-black tracking-[-0.1504px] w-[608px]">{`My master's thesis focused on developing empirical guidelines for evaluating the accessibility of conversational programming tools.`}</p>
      </div>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="relative shrink-0 w-full" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[16px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[22.75px] not-italic relative shrink-0 text-[14px] text-black tracking-[-0.1504px] w-[608px]">A core strand of my research focuses on evaluating conversational AI for accessibility, the representation of people with disabilities, and how AI could perpetuate or mitigate disability bias in everyday interactions.</p>
      </div>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="relative shrink-0 w-full" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[16px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[22.75px] not-italic relative shrink-0 text-[14px] text-black tracking-[-0.1504px] w-[608px]">I am currently working on evaluating disability representation in LLMs and assessing AI systems for accessibility, representation, trust, and disclosure.</p>
      </div>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="relative shrink-0 w-full" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[16px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[14px] text-black tracking-[-0.1504px] w-[608px]">
          <span className="leading-[22.75px]">{`I'm always open to collaborations. If a project comes to mind that aligns with my background, please `}</span>
          <span className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[22.75px] underline">email me</span>
          <span className="leading-[22.75px]">! I would love to chat 🙂</span>
        </p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="col-1 justify-self-stretch relative row-1 self-start shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph />
        <Paragraph1 />
        <Paragraph2 />
        <Paragraph3 />
        <Paragraph4 />
        <Paragraph5 />
      </div>
    </div>
  );
}

function Section() {
  return (
    <div className="relative shrink-0 w-full" data-name="Section">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid gap-x-[40px] gap-y-[40px] grid grid-cols-[__608px_200px] grid-rows-[_383.50px] pb-[48px] pt-[56px] relative size-full">
        <ContainerMargin />
        <Container />
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="relative shrink-0 w-full" data-name="Heading 2">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[16px] text-black tracking-[-0.3125px] whitespace-nowrap">Updates</p>
      </div>
    </div>
  );
}

function Time() {
  return (
    <div className="relative shrink-0 w-[112px]" data-name="Time">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[2px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] not-italic relative shrink-0 text-[#555] text-[12px] whitespace-nowrap">Jul 15, 2026</p>
      </div>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="relative shrink-0" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[22.75px] not-italic relative shrink-0 text-[14px] text-black tracking-[-0.1504px] w-[716px]">{`Our short paper "Reflections and Recommendations on AI Adoption Practice from a Mixed-Ability Research Group" was accepted at ASSETS 2026! See you in Porto this October! 😃`}</p>
      </div>
    </div>
  );
}

function ListItem4() {
  return (
    <div className="relative shrink-0 w-full" data-name="List Item">
      <div aria-hidden className="absolute border-[rgba(0,0,0,0.12)] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[20px] items-start pb-[15px] pt-[14px] relative size-full">
        <Time />
        <Paragraph6 />
      </div>
    </div>
  );
}

function Time1() {
  return (
    <div className="relative shrink-0 w-[112px]" data-name="Time">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[2px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] not-italic relative shrink-0 text-[#555] text-[12px] whitespace-nowrap">Jun 01, 2026</p>
      </div>
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="relative shrink-0" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[22.75px] not-italic relative shrink-0 text-[14px] text-black tracking-[-0.1504px] w-[716px]">{`Our paper "Vibe Check: Accessibility Heuristics for Vibe Coding Interfaces" has been nominated for the best technical paper award at Web4All! 😃`}</p>
      </div>
    </div>
  );
}

function ListItem5() {
  return (
    <div className="relative shrink-0 w-full" data-name="List Item">
      <div aria-hidden className="absolute border-[rgba(0,0,0,0.12)] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[20px] items-start pb-[15px] pt-[14px] relative size-full">
        <Time1 />
        <Paragraph7 />
      </div>
    </div>
  );
}

function Time2() {
  return (
    <div className="relative shrink-0 w-[112px]" data-name="Time">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[2px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] not-italic relative shrink-0 text-[#555] text-[12px] whitespace-nowrap">May 26, 2026</p>
      </div>
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="relative shrink-0" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[22.75px] not-italic relative shrink-0 text-[14px] text-black tracking-[-0.1504px] whitespace-nowrap">Back to work at the IDEA Lab this summer! 😃</p>
      </div>
    </div>
  );
}

function ListItem6() {
  return (
    <div className="relative shrink-0 w-full" data-name="List Item">
      <div aria-hidden className="absolute border-[rgba(0,0,0,0.12)] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[20px] items-start pb-[15px] pt-[14px] relative size-full">
        <Time2 />
        <Paragraph8 />
      </div>
    </div>
  );
}

function Time3() {
  return (
    <div className="relative shrink-0 w-[112px]" data-name="Time">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[2px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] not-italic relative shrink-0 text-[#555] text-[12px] whitespace-nowrap">Apr 30, 2026</p>
      </div>
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="relative shrink-0" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[22.75px] not-italic relative shrink-0 text-[14px] text-black tracking-[-0.1504px] whitespace-nowrap">Graduated with my M.S. in Information (Human-Computer Interaction).</p>
      </div>
    </div>
  );
}

function ListItem7() {
  return (
    <div className="relative shrink-0 w-full" data-name="List Item">
      <div aria-hidden className="absolute border-[rgba(0,0,0,0.12)] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[20px] items-start pb-[15px] pt-[14px] relative size-full">
        <Time3 />
        <Paragraph9 />
      </div>
    </div>
  );
}

function Time4() {
  return (
    <div className="relative shrink-0 w-[112px]" data-name="Time">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[2px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] not-italic relative shrink-0 text-[#555] text-[12px] whitespace-nowrap">Apr 08, 2026</p>
      </div>
    </div>
  );
}

function Paragraph10() {
  return (
    <div className="relative shrink-0" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[22.75px] not-italic relative shrink-0 text-[14px] text-black tracking-[-0.1504px] whitespace-nowrap">{`Successfully defended my master's thesis!`}</p>
      </div>
    </div>
  );
}

function ListItem8() {
  return (
    <div className="relative shrink-0 w-full" data-name="List Item">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[20px] items-start py-[14px] relative size-full">
        <Time4 />
        <Paragraph10 />
      </div>
    </div>
  );
}

function List1() {
  return (
    <div className="relative shrink-0 w-[848px]" data-name="List">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[24px] relative size-full">
        <ListItem4 />
        <ListItem5 />
        <ListItem6 />
        <ListItem7 />
        <ListItem8 />
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="absolute h-[20px] left-0 top-[16px] w-[86.391px]" data-name="Button">
      <p className="-translate-x-1/2 [text-underline-position:from-font] [word-break:break-word] absolute decoration-from-font decoration-solid font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[43.5px] not-italic text-[#555] text-[14px] text-center top-[0.5px] tracking-[-0.1504px] underline whitespace-nowrap">Show 6 more</p>
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[37px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Button4 />
      </div>
    </div>
  );
}

function Section1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Section">
      <div aria-hidden className="absolute border-[rgba(0,0,0,0.12)] border-solid border-t inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[40px] pt-[41px] relative size-full">
        <Heading />
        <List1 />
        <Container1 />
      </div>
    </div>
  );
}

function Paragraph11() {
  return (
    <div className="relative shrink-0" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#555] text-[12px] whitespace-nowrap">© 2026 Shalini Madan</p>
      </div>
    </div>
  );
}

function Link() {
  return (
    <div className="relative self-stretch shrink-0" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#555] text-[12px] whitespace-nowrap">Email</p>
      </div>
    </div>
  );
}

function Link1() {
  return (
    <div className="relative self-stretch shrink-0" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#555] text-[12px] whitespace-nowrap">LinkedIn</p>
      </div>
    </div>
  );
}

function Link2() {
  return (
    <div className="relative self-stretch shrink-0" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#555] text-[12px] whitespace-nowrap">CV</p>
      </div>
    </div>
  );
}

function NavigationFooterLinks() {
  return (
    <div className="h-[16px] relative shrink-0" data-name="Navigation - Footer links">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[20px] items-start relative size-full">
        <Link />
        <Link1 />
        <Link2 />
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="relative shrink-0 w-full" data-name="Footer">
      <div aria-hidden className="absolute border-[rgba(0,0,0,0.12)] border-solid border-t inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pb-[24px] pt-[25px] relative size-full">
        <Paragraph11 />
        <NavigationFooterLinks />
      </div>
    </div>
  );
}

function HomePage() {
  return (
    <div className="max-w-[896px] relative shrink-0 w-[896px]" data-name="HomePage">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start max-w-[inherit] px-[24px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[32px] not-italic relative shrink-0 text-[24px] text-black tracking-[0.0703px] whitespace-nowrap">About</p>
        <Section />
        <Section1 />
        <Footer />
      </div>
    </div>
  );
}

function MainContent() {
  return (
    <div className="relative shrink-0 w-full" data-name="Main Content">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative size-full">
        <HomePage />
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="bg-white min-h-[797px] relative shrink-0 w-full" data-name="App">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start min-h-[inherit] relative size-full">
        <Nav />
        <MainContent />
      </div>
    </div>
  );
}

function Body() {
  return (
    <div className="h-[797px] relative shrink-0 w-[1011px]" data-name="Body">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <App />
      </div>
    </div>
  );
}

export default function PersonalPortfolioWebsite() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative size-full" data-name="Personal Portfolio Website">
      <Body />
    </div>
  );
}