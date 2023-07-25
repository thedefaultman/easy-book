import Image from "next/image";
import { IconType } from "react-icons";
import { BsCalendar4 } from "react-icons/bs";
import { IoBriefcaseOutline } from "react-icons/io5";
import { TbActivityHeartbeat } from "react-icons/tb";
import { AiOutlineCar } from "react-icons/ai";

interface AboutCardProps {
  description: string;
  Icon: IconType;
}

const AboutCard: React.FC<AboutCardProps> = ({ description, Icon }) => {
  return (
    <div className="flex flex-col gap-3 items-start justify-start p-2 border-b-2 border-black">
      <Icon size={30} />
      <p className="text-neutral-600">{description}</p>
    </div>
  );
};

const About = () => {
  return (
    <div className="flex justify-between items-center w-full h-full mt-40 max-w-7xl">
      <div className="w-full h-full justify-center items-center rounded hidden lg:flex">
        <Image src={"/About.png"} alt="About" width={500} height={500} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <AboutCard
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
          Icon={BsCalendar4}
        />
        <AboutCard
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
          Icon={IoBriefcaseOutline}
        />
        <AboutCard
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
          Icon={TbActivityHeartbeat}
        />
        <AboutCard
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
          Icon={AiOutlineCar}
        />
      </div>
    </div>
  );
};

export default About;
