import Image from "next/image";
import Link from "next/link";
// import baseLogo from "../public/baseLogo"

export default function Home() {
  return (
    <div className="w-full h-screen ">
      <div
        className=" w-full h-full mt-0"
        style={{
          backgroundImage: `url("/background.png")`, // Adjust the path accordingly
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className=" flex  h-[130px] w-[30%] ">
          <div className="flex flex-row  ml-[20px] mt-[20px] ">
            <Image src="/baseLogo.png" width={131} height={131} alt="Logo1" />
            <div className="my-auto">
              <Image
                src="/nextLogo.png"
                width={189}
                height={60}
                alt="Logo2 "
                className=""
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <button className="text-[20px] font-[600] px-8 py-3 text-center bg-white w-[350px]  mx-auto mt-[20vh] hover:bg-[#CEB99E] hover:text-white transition-all duration-300">
            <Link href={"/signin"}> تسجيل الدخول</Link>
          </button>
          <button className="text-[20px] font-[600] px-8 py-3 text-center bg-[#F5F5F5] w-[350px]  mx-auto my-3 hover:bg-[#CEB99E] hover:text-white transition-all duration-300">
            <Link href={"/signup"}> تسجيل حساب جديد</Link>
          </button>
        </div>
      </div>
      <div className="w-full h-[20vh] bg-[#CEB99E]">
        <h1 className="text-white text-[24px] font-[800] mr-5 pt-5 text-right ">
          روابط قد تهمك
        </h1>
      </div>
    </div>
  );
}
