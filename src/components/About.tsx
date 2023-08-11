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
    <section
      className="flex justify-between items-center w-full h-full mt-40 max-w-7xl px-6 sm:px-16 relative mx-auto"
      id="about"
    >
      <div className="w-full h-full justify-center items-center rounded hidden lg:flex">
        <Image src={"/About.png"} alt="About" width={500} height={500} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
        <AboutCard
          description="Effortlessly manage your appointments and stay organized with EasyBook's intuitive booking system."
          Icon={BsCalendar4}
        />
        <AboutCard
          description="Streamline your healthcare journey by securely accessing your medical records and history on-the-go."
          Icon={IoBriefcaseOutline}
        />
        <AboutCard
          description="Get on-the-go notifications about your upcoming appointments so you never miss your visit."
          Icon={TbActivityHeartbeat}
        />
        <AboutCard
          description="Navigate to appointments with ease using our integrated location services, ensuring a smooth journey to better health."
          Icon={AiOutlineCar}
        />
      </div>
    </section>
  );
};

export default About;
