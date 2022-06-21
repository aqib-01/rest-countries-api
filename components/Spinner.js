import Image from "next/image";

const Spinner = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center">
      <div className="w-fit">
        <Image
          src={"/images/spinner.gif"}
          width={80}
          height={80}
          alt="Loading Spinner"
        />
      </div>
    </div>
  );
};

export default Spinner;
