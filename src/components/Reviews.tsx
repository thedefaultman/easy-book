import { GoSmiley, GoPeople } from "react-icons/go";
import { IconType } from "react-icons/lib";
import { MdOutlineFileCopy } from "react-icons/md";
import { IoPizzaOutline } from "react-icons/io5";

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
    <div className="flex flex-col gap-10 items-center justify-center mt-20">
      <h1 className="text-3xl font-bold">OUR WORK SPEAKS FOR ITSELF</h1>
      <p className="text-center">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae,
        placeat! Lorem ipsum dolor sit amet. Lorem ipsum, dolor sit amet
        consectetur adipisicing elit. Recusandae, suscipit! Ad id nisi deleniti
        dolore?
      </p>

      <div className="flex justify-center items-center w-full gap-10">
        <ReviewCard number={"250"} title="Happy Customers" Icon={GoSmiley} />
        <ReviewCard
          number={"600"}
          title="Completed Projects"
          Icon={MdOutlineFileCopy}
        />
        <ReviewCard
          number={"1.8K"}
          title="Available Resources"
          Icon={IoPizzaOutline}
        />
        <ReviewCard number={"11K"} title="Subscribers" Icon={GoPeople} />
      </div>
    </div>
  );
};

export default Reviews;
