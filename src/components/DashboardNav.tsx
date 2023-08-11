import Image from "next/image";

const DashboardNav = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="relative rounded-lg min-h-[500px] p-4">
        <Image
          src="/brochure.jpg"
          alt="brochure"
          fill
          className="object-cover"
        />
      </div>

      <div className="relative rounded-lg h-full w-full p-4">
        <Image
          src="/brochure2.jpg"
          alt="brochure"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default DashboardNav;
