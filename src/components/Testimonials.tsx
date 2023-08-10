"use client";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { IoPersonOutline } from "react-icons/io5";
import { RiArrowLeftSLine as LeftIcon } from "react-icons/ri";
import { RiArrowRightSLine as RightIcon } from "react-icons/ri";
import { IconType } from "react-icons";
import { FaUserDoctor } from "react-icons/fa6";

interface Testimonials {
  name: string;
  title: string;
  image: IconType;
  quote: string;
}

const Testimonials = () => {
  const testimonials: Testimonials[] = [
    {
      name: "Dr. Richardo Miros",
      title: "Doctor",
      image: FaUserDoctor,
      quote:
        "As a physician, EasyBook has revolutionized the way I manage my patient appointments. The convenience it brings not only benefits me, but my patients too. Kudos to the EasyBook team for making healthcare coordination a breeze!",
    },
    {
      name: "Carl Mark",
      title: "Patient",
      image: IoPersonOutline,
      quote:
        "I thought keeping up with my health appointments was a chore until I found EasyBook. Now, I'm a pro at booking, managing, and showing up to my appointments on time. It's like having a personal health manager in my pocket!",
    },
    {
      name: "Dr. Simon Freud",
      title: "Doctor",
      image: FaUserDoctor,
      quote:
        "EasyBook is my secret weapon for optimizing patient care. Its intuitive interface and appointment tracking features make sure my patients get the attention they need when they need it. A must-have tool for every healthcare provider.",
    },
    {
      name: "Dr. De Kuiper",
      title: "Doctor",
      image: FaUserDoctor,
      quote:
        "EasyBook has transformed how I interact with my patients. I can securely access their medical histories and tailor treatments better than ever. It's an innovation that enhances both doctor-patient relationships and outcomes.",
    },
    {
      name: "Gaëtan Douglas",
      title: "Patient",
      image: IoPersonOutline,
      quote:
        "EasyBook takes the stress out of healthcare. I can book appointments from anywhere, and the timely reminders keep me on track. Now I can focus on getting well instead of getting lost in appointment scheduling.",
    },
  ];

  return (
    <section className="max-w-7xl relative mx-auto mt-20" id="testimonials">
      <h2 className="text-center text-black font-bold text-2xl">
        Client Testimonials
      </h2>

      <Carousel
        autoPlay
        infiniteLoop
        dynamicHeight={true}
        className="mt-10 h-full w-full rounded-sm"
        showStatus={false}
        showThumbs={false}
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
