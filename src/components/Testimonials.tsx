import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { IoPersonOutline } from "react-icons/io5";
import { RiArrowLeftSLine as LeftIcon } from "react-icons/ri";
import { RiArrowRightSLine as RightIcon } from "react-icons/ri";
import { IconType } from "react-icons";

interface Testimonials {
  name: string;
  title: string;
  image: IconType;
  quote: string;
}

const Testimonials = () => {
  const testimonials: Testimonials[] = [
    {
      name: "John Doe",
      title: "CEO",
      image: IoPersonOutline,
      quote:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    },
    {
      name: "Jane Doe",
      title: "CEO",
      image: IoPersonOutline,
      quote:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    },
    {
      name: "John Doe",
      title: "CEO",
      image: IoPersonOutline,
      quote:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    },
    {
      name: "Jane Doe",
      title: "CEO",
      image: IoPersonOutline,
      quote:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    },
  ];

  return (
    <section className="max-w-7xl relative mx-auto mt-20">
      <h2 className="text-center text-black font-bold text-2xl">
        Client Testimonials
      </h2>

      <Carousel
        autoPlay
        infiniteLoop
        dynamicHeight={true}
        className="mt-10 h-full w-full rounded-sm"
        showStatus={false}
        showThumbs={true}
        renderArrowPrev={(clickHandler, hasPrev) => {
          return (
            <div
              className={`${
                hasPrev ? "absolute" : "hidden"
              } top-0 bottom-0 left-0 flex justify-center items-center p-3 opacity-30 hover:opacity-100 cursor-pointer z-20`}
              onClick={clickHandler}
            >
              <LeftIcon className="w-9 h-9 text-black" />
            </div>
          );
        }}
        renderArrowNext={(clickHandler, hasNext) => {
          return (
            <div
              className={`${
                hasNext ? "absolute" : "hidden"
              } top-0 bottom-0 right-0 flex justify-center items-center p-3 opacity-30 hover:opacity-100 cursor-pointer z-20`}
              onClick={clickHandler}
            >
              <RightIcon className="w-9 h-9 text-black" />
            </div>
          );
        }}
      >
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="flex flex-col gap-4 items-center justify-center p-10"
          >
            <testimonial.image />
            <h3 className="text-black text-lg font-bold">{testimonial.name}</h3>
            <h4 className="text-black text-lg">{testimonial.title}</h4>
            <p className="text-black text-md ">{testimonial.quote}</p>
          </div>
        ))}
      </Carousel>
    </section>
  );
};

export default Testimonials;
