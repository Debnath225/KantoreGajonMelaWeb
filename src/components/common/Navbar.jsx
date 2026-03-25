import Tirsul from "../../assets/images/Tirsul3-removebg-preview.png";
export default function Navbar() {
  return (
    <nav className="realtive w-full p-4 flex justify-center ">
      <div className="fixed bg-black z-1000 h-10 w-100 flex justify-center items-center rounded-full px-6 border-2 ">
        <div className=" m-0 p-0  inline-flex items-center gap-2  ">
          <span>
            <img src={Tirsul} alt="." className="h-9 w-12" />
          </span>

          <h4 className="text-2xl font-bold truncate tracking-wide animate-caret-blink">
            Har Har
            <b>
              <i className="text-red-600/98"> Mahadev</i>
            </b>
          </h4>
          <span>
            <img src={Tirsul} alt="." className="h-9 w-12" />
          </span>
        </div>
      </div>
    </nav>
  );
}
