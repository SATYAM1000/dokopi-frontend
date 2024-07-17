
import { CloudUpload } from "lucide-react";
import { Store } from "lucide-react";
import { SquareMenu } from "lucide-react";
import { FaTelegramPlane } from "react-icons/fa";
import { Clock } from "lucide-react";
import { CircleDollarSign } from "lucide-react";

const DoKopiFeatures = () => {
  return (
    <section className="py-12  sm:py-16 lg:py-20  mt-12 bg-black/[0.03]">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 ">
        <div className=" mx-auto text-center">
          <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
            Revolutionize Your Printing Workflow
          </h2>
          <p className="max-w-lg mx-auto mt-4 text-gray-600  text-lg leading-8 ">
            Explore the seamless process of uploading, printing, and managing
            your documents effortlessly with our intuitive platform.
          </p>
        </div>

        <div className="grid grid-cols-1 mt-10 text-center sm:mt-16 sm:grid-cols-2 sm:gap-x-12 gap-y-12 md:grid-cols-3 md:gap-0 xl:mt-24">
          <div className="p-4 md:p-8 lg:p-14 hover:bg-indigo-50 transition-all ">
            <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
              <span className="text-xl font-semibold text-gray-700">
                {" "}
                <Store className="h-7 w-7 text-indigo-500" />{" "}
              </span>
            </div>
            <h3 className="mt-12 text-xl font-bold text-gray-900 font-pj">
              Find Nearest Stores
            </h3>
            <p className="mt-5 text-base text-gray-600 font-pj">
              Discover nearby xerox stores based on your location and current
              operating hours. Never worry about searching for a printing
              service again.
            </p>
          </div>

          <div className="p-4 md:p-8 lg:p-14 md:border-l md:border-gray-200 hover:bg-indigo-50 transition-all">
            <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow  ">
              <span className="text-xl font-semibold text-gray-700">
                {" "}
                <CloudUpload className="h-7 w-7 text-indigo-500" />{" "}
              </span>
            </div>
            <h3 className="mt-12 text-xl font-bold text-gray-900 font-pj">
              Secure Document Upload
            </h3>
            <p className="mt-5 text-base text-gray-600 font-pj">
              Safely upload your documents to our cloud storage with end-to-end
              encryption. Your files are protected and accessible only by you.
            </p>
          </div>

          <div className=" p-4 md:p-8 lg:p-14 md:border-l md:border-gray-200 hover:bg-indigo-50 transition-all">
            <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
              <span className="text-xl font-semibold text-gray-700">
                {" "}
                <SquareMenu className="h-7 w-7 text-indigo-500" />{" "}
              </span>
            </div>
            <h3 className="mt-12 text-xl font-bold text-gray-900 font-pj">
              Custom Printing Options
            </h3>
            <p className="mt-5 text-base text-gray-600 font-pj">
              Tailor your printing preferences with options for color, paper
              size, binding, and more. Get your documents printed just the way
              you want.
            </p>
          </div>

          <div className="p-4 md:p-8 lg:p-14 md:border-t md:border-gray-200 hover:bg-indigo-50 transition-all ">
            <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
              <span className="text-xl font-semibold text-gray-700">
                {" "}
                <FaTelegramPlane className="h-7 w-7 text-indigo-500" />{" "}
              </span>
            </div>
            <h3 className="mt-12 text-xl font-bold text-gray-900 font-pj">
              Telegram Bot Integration
            </h3>
            <p className="mt-5 text-base text-gray-600 font-pj">
              Send documents to xerox stores directly through our Telegram bot.
              Enjoy the convenience of printing without leaving your messaging
              app.
            </p>
          </div>

          <div className="p-4 md:p-8 lg:p-14 md:border-l md:border-gray-200 md:border-t hover:bg-indigo-50 transition-all">
            <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
              <span className="text-xl font-semibold text-gray-700">
                {" "}
                <CircleDollarSign className="h-7 w-7 text-indigo-500" />{" "}
              </span>
            </div>
            <h3 className="mt-12 text-xl font-bold text-gray-900 font-pj">
              Flexible Payment Solutions
            </h3>
            <p className="mt-5 text-base text-gray-600 font-pj">
              Choose from a variety of payment methods for a hassle-free
              transaction experience. Pay securely for your printing services.
            </p>
          </div>

          <div className="p-4 md:p-8 lg:p-14 md:border-l md:border-gray-200 md:border-t hover:bg-indigo-50 transition-all">
            <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
              <span className="text-xl font-semibold text-gray-700">
                {" "}
                <Clock className="h-7 w-7 text-indigo-500" />{" "}
              </span>
            </div>
            <h3 className="mt-12 text-xl font-bold text-gray-900 font-pj">
              Real-time Order Tracking
            </h3>
            <p className="mt-5 text-base text-gray-600 font-pj">
              Stay informed about your print orders with real-time updates.
              Track the status of your documents from upload to printing and
              delivery.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default DoKopiFeatures;
