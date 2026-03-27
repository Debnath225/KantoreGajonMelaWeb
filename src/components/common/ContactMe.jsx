import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
} from "../ui/card";
import ProjectImage from "@/assets/images/mahadev1.jpg";
import ProjectCard from "./ProjectCard";

const ContactForm = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-1 gap-1 mx-2">
      {/* first form  */}
      <div className="max-w-md w-full mx-auto mt-10 p-6 bg-black border-2 border-cyan-500 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-8 text-white">Contact Me</h2>

        <form
          action="https://formspree.io/f/movnjboz"
          method="post"
          className="space-y-6"
        >
          {/* Name Input */}
          <div className="relative">
            <input
              type="text"
              id="name"
              placeholder=" "
              className="peer w-full px-4 py-3 border-2 border-gray-300 rounded-lg outline-none transition-colors focus:border-blue-500 bg-transparent"
            />
            <label
              htmlFor="name"
              className="absolute left-3 top-3 px-1 text-gray-500 transition-all duration-200 cursor-text
                       bg-black peer-focus:text-xs peer-focus:-translate-y-[22px] peer-focus:text-blue-500
                       peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-[22px]"
            >
              Full Name
            </label>
          </div>

          {/* Email Input */}
          <div className="relative">
            <input
              type="email"
              id="email"
              placeholder=" "
              className="peer w-full px-4 py-3 border-2 border-gray-300 rounded-lg outline-none transition-colors focus:border-blue-500 bg-transparent"
            />
            <label
              htmlFor="email"
              className="absolute left-3 top-3 px-1 text-gray-500 transition-all duration-200 cursor-text
                       bg-black peer-focus:text-xs peer-focus:-translate-y-[22px] peer-focus:text-blue-500
                       peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-[22px]"
            >
              Email Address
            </label>
          </div>

          {/* Message Textarea */}
          <div className="relative">
            <textarea
              id="message"
              rows="4"
              placeholder=" "
              className="peer w-full px-4 py-3 border-2 border-gray-300 rounded-lg outline-none transition-colors focus:border-blue-500 bg-transparent max-h-45"
            ></textarea>
            <label
              htmlFor="message"
              className="absolute left-3 top-3 px-1 text-gray-500 transition-all duration-200 cursor-text
                       bg-black peer-focus:text-xs peer-focus:-translate-y-[22px] peer-focus:text-blue-500
                       peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-[22px]"
            >
              Your Message
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3 cursor-pointer bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all active:scale-95"
          >
            Send Message
          </button>
        </form>
      </div>
      {/* second container */}
      <div className="max-w-md w-full mx-auto mt-10 p-1 bg-black border-2 border-cyan-500 rounded-xl shadow-md">
        {/* <Card className="border-none">
          <CardTitle className="border-none"> */}{" "}
        {/* <h5>Are you a Devoloper ? Want to contribute in this project</h5>
          </CardTitle>
          <CardContent className="relative before:absolute before:top-80 before:left-90 before:w-full before:h-full  before:bg-red">
            <img
              src={ProjectImage}
              alt="Project Image"
              className="hover:scale-120 transition-all"
            /> */}
        {/* <!-- Overlay on Hover --> */}
        {/* <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
              <a
                href=""
                className="p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-blue-500 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  ></path>
                </svg>
              </a>
              <a
                href="#"
                className="p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-blue-500 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.113.793-.261.793-.577v-2.234c-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 12.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
          </CardContent>
        </Card> */}
        <ProjectCard />
      </div>
    </div>
  );
};

export default ContactForm;
