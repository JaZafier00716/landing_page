import Image from "next/image";
import Web from "@/components/ui/web";
import Programming from "@/components/ui/Programming";
import Lang from "@/components/ui/lang";

const page = () => {
  return (
    <div className="flex xs:flex-col xs:gap-8 lg:flex-row justify-evenly items-start xs:py-8 xl:py-32">
      <Web />
      <div className="flex flex-col items-center justify-center gap-8 xs:w-full lg:w-auto">
        <Programming />
        <Lang />
      </div>
    </div>
  );
};

export default page;
