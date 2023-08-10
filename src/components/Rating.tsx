"use client";
import { useEffect, useState } from "react";
import type { CustomFlowbiteTheme } from "flowbite-react";
import { Flowbite, Rating } from "flowbite-react";
import { useReviewModal } from "@/hooks/useReviewModal";
import { toast } from "react-hot-toast";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { Reviews } from "@/lib/types/types";
import { PulseLoader } from "react-spinners";

const customTheme: CustomFlowbiteTheme = {
  rating: {
    root: {
      base: "flex items-center",
    },
    advanced: {
      base: "flex items-center",
      label: "text-sm font-medium text-black",
      progress: {
        base: "mx-4 h-5 w-2/4 rounded bg-gray-200",
        fill: "h-5 rounded bg-blue",
        label: "text-sm font-medium text-black",
      },
    },
    star: {
      empty: "text-gray-300",
      filled: "text-[#0F62FE]",
      sizes: {
        sm: "w-5 h-5",
        md: "w-7 h-7",
        lg: "w-10 h-10",
      },
    },
  },
};

export default function AdvancedRating() {
  const { supabaseClient: supabase, session } = useSessionContext();
  const { onClose, doctor } = useReviewModal();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRating, setSelectedRating] = useState(0);
  const [review, setReview] = useState("");
  const [allReviews, setAllReviews] = useState<Reviews[]>([]);
  const [averageRating, setAverageRating] = useState(0);
  const [stars, setStars] = useState({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  });

  const handleStarClick = (rating: number) => {
    setSelectedRating(rating);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const { data, error } = await supabase.from("reviews").insert([
      {
        doctor_id: doctor?.doctor_id,
        PHN: session?.user.user_metadata.user_id,
        rating: selectedRating,
        comments: review,
        patient_first: session?.user.user_metadata.first_name,
        patient_last: session?.user.user_metadata.last_name,
      },
    ]);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Review submitted successfully");
      onClose();
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .eq("doctor_id", doctor?.doctor_id);
      if (error) {
        toast.error(error.message);
      } else {
        setAllReviews(data);

        const averageRating =
          data.reduce((acc: number, curr: Reviews) => acc + curr.rating, 0) /
          data.length;
        setAverageRating(averageRating);

        const stars = data.reduce(
          (acc: any, curr: Reviews) => {
            acc[curr.rating] += 1;
            return acc;
          },
          { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
        );
        setStars(stars);
      }
    };
    fetchReviews();
    setIsLoading(false);
  }, [doctor, supabase]);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-96">
          <div className="flex justify-center items-center relative mx-auto w-full h-full">
            <PulseLoader color="#0F62FE" />
          </div>
        </div>
      ) : (
        <Flowbite theme={{ theme: customTheme }}>
          <Rating className="mb-2">
            {Array.from({ length: 5 }, (_, i) => (
              <Rating.Star key={i} filled={averageRating > i} />
            ))}

            <p className="ml-2 text-sm font-medium text-gray-500">
              {averageRating ? averageRating + " out of 5" : "No reviews yet"}
            </p>
          </Rating>
          <p className="mb-4 text-sm font-medium text-gray-500">
            {allReviews.length} ratings
          </p>

          {allReviews.length > 0 ? (
            <>
              <Rating.Advanced
                className="mb-2"
                percentFilled={(stars[5] / allReviews.length) * 100}
              >
                <p>5 star</p>
              </Rating.Advanced>
              <Rating.Advanced
                className="mb-2"
                percentFilled={(stars[4] / allReviews.length) * 100}
              >
                <p>4 star</p>
              </Rating.Advanced>
              <Rating.Advanced
                className="mb-2"
                percentFilled={(stars[3] / allReviews.length) * 100}
              >
                <p>3 star</p>
              </Rating.Advanced>
              <Rating.Advanced
                className="mb-2"
                percentFilled={(stars[2] / allReviews.length) * 100}
              >
                <p>2 star</p>
              </Rating.Advanced>
              <Rating.Advanced
                percentFilled={(stars[1] / allReviews.length) * 100}
              >
                <p>1 star</p>
              </Rating.Advanced>
            </>
          ) : null}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-2">User Reviews</h2>
            {allReviews.length === 0 ? (
              <p className="text-sm font-medium text-gray-500">
                No reviews yet
              </p>
            ) : (
              allReviews.map((review) => (
                <div
                  className="flex flex-col space-y-2 mb-4"
                  key={review.review_id}
                >
                  <div className="flex justify-start items-center mb-4 gap-x-2">
                    <div className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0 flex items-center justify-center">
                      <span className="text-gray-600 text-xl">
                        {review.patient_first.charAt(0)}
                      </span>
                    </div>
                    <div className="flex flex-col justify-start items-start">
                      <h2 className="text-xl font-semibold mb-2">
                        {review.patient_first + " " + review.patient_last}
                      </h2>
                      <Rating className="flex items-center">
                        <Rating.Star
                          className={`text-blue ${
                            review.rating >= 1 ? "text-blue" : "text-gray-300"
                          }`}
                        />
                        <Rating.Star
                          className={`text-blue ${
                            review.rating >= 2 ? "text-blue" : "text-gray-300"
                          }`}
                        />
                        <Rating.Star
                          className={`text-blue ${
                            review.rating >= 3 ? "text-blue" : "text-gray-300"
                          }`}
                        />
                        <Rating.Star
                          className={`text-blue ${
                            review.rating >= 4 ? "text-blue" : "text-gray-300"
                          }`}
                        />
                        <Rating.Star
                          className={`text-blue ${
                            review.rating >= 5 ? "text-blue" : "text-gray-300"
                          }`}
                        />
                      </Rating>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-gray-500 border-b border-b-blue pb-4">
                    {review.comments}
                  </p>
                </div>
              ))
            )}
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="review" className="text-sm font-medium">
              Rating
            </label>
            <div className="flex items-center group">
              <Rating className="flex items-center">
                <Rating.Star
                  className={`text-blue ${
                    selectedRating >= 1 ? "text-blue" : "text-gray-300"
                  }`}
                  onClick={() => handleStarClick(1)}
                />
                <Rating.Star
                  className={`text-blue ${
                    selectedRating >= 2 ? "text-blue" : "text-gray-300"
                  }`}
                  onClick={() => handleStarClick(2)}
                />
                <Rating.Star
                  className={`text-blue ${
                    selectedRating >= 3 ? "text-blue" : "text-gray-300"
                  }`}
                  onClick={() => handleStarClick(3)}
                />
                <Rating.Star
                  className={`text-blue ${
                    selectedRating >= 4 ? "text-blue" : "text-gray-300"
                  }`}
                  onClick={() => handleStarClick(4)}
                />
                <Rating.Star
                  className={`text-blue ${
                    selectedRating >= 5 ? "text-blue" : "text-gray-300"
                  }`}
                  onClick={() => handleStarClick(5)}
                />
              </Rating>
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="review" className="text-sm font-medium">
              Review
            </label>
            <textarea
              id="review"
              className="border border-gray-300 rounded-md h-24 p-2"
              placeholder="Write your review here..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
          </div>

          <div className="flex justify-end space-x-4 mt-4">
            <button
              className="bg-blue text-white rounded-md px-4 py-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="bg-blue text-white rounded-md px-4 py-2"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </Flowbite>
      )}
    </>
  );
}
