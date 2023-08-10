import { GoSmiley, GoPeople } from "react-icons/go";
import { IconType } from "react-icons/lib";
import { MdOutlineFileCopy } from "react-icons/md";
import { FaUserDoctor } from "react-icons/fa6";

interface ReviewCardProps {
  number: string;
  title: string;
  Icon: IconType;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ number, title, Icon }) => {
  return (
    <div className="flex flex-1 flex-col gap-2 items-center justify-center p-12 border border-neutral-500 w-[200px] h-[200px]">
      <Icon size={25} color="black" />
      <h1 className="text-xl font-black">{number}+</h1>
      <p className="text-center text-neutral-600 truncate">{title}</p>
    </div>
  );
};

const Reviews = () => {
  return (
    <section
      className="flex flex-col gap-10 items-center justify-center mt-20"
      id="reviews"
    >
      <div className="relative mx-auto">
        <h1 className="text-3xl font-bold text-center">
          OUR WORK SPEAKS FOR ITSELF
        </h1>
        <p className="text-center mt-5">
          Our commitment to excellence shines through the numbers. With a 
          rapidly growing user base, EasyBook has become a trusted companion 
          for managing your healthcare journey.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative mx-auto gap-10">
        <ReviewCard 
          number={"450"} 
          title="Happy Users" 
          Icon={GoSmiley} 
        />
        <ReviewCard
          number={"600"}
          title="Appointments Booked"
          Icon={MdOutlineFileCopy}
        />
        <ReviewCard
          number={"1.2K"}
          title="Registered Doctors"
          Icon={FaUserDoctor}
        />
        <ReviewCard 
          number={"11K"} 
          title="Registered Users" 
          Icon={GoPeople} 
        />
      </div>
    </section>
  );
};

export default Reviews;
