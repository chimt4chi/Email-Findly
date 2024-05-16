import React from "react";

// Icons
import { MdOutlineCancel, MdOutlineCheckCircleOutline } from "react-icons/md";
import { BsCheck } from "react-icons/bs";

interface PricingCardProps {
  title: string;
  price: string;
  features: string[];
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  features,
}) => {
  return (
    <div className="w-full md:w-72 rounded bg-gradient-to-t from-purple-500/30 to-pink-500/30 shadow-lg mx-auto my-8 flex flex-col">
      <div className="flex-grow px-6 py-4">
        <div className="font-bold text-black text-2xl mb-2 ml-2 p-6">
          {" "}
          {/* Changes -> ml-2*/}
          {title}
        </div>
        <p className="text-black font-semibold text-lg mt-4 ml-8  mb-4 flex items-start">
          {" "}
          {/* Changes -> ml-8*/}
          {/* <BsCheck
            color="green"
            size={25}
            className="mr-2 flex-shrink-0 mt-1 "
          />{" "} */}
          <span className="text-xl">{price}</span>
        </p>
        <ul className="list-none  ">
          {features.map((feature, index) => (
            <li key={index} className="text-black text-lg mb-2">
              <div className="flex items-start">
                <BsCheck
                  color="green"
                  size={25}
                  className="mr-2 flex-shrink-0 mt-1"
                />{" "}
                {/* Adjusting margins for alignment */}
                <span className="flex-grow">
                  {feature.split("\n").map(
                    (
                      line,
                      i // Splitting feature into lines
                    ) => (
                      <React.Fragment key={i}>
                        {i > 0 && <br />}{" "}
                        {/* Add a line break if not the first line */}
                        {line}
                      </React.Fragment>
                    )
                  )}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="px-6 py-4">
        <button className="bg-gradient-to-br from-purple-700 to-indigo-800 hover:to-pink-600 text-white font-bold py-2 px-4 rounded w-full">
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default PricingCard;
