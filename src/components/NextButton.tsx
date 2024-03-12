type NextButtonProps = {
  event: () => void;
};

const NextButton = ({ event }: NextButtonProps) => {
  return (
    <div className="flex justify-center h-8">
      <div className="bg-white w-[90px] h-12 flex justify-center items-center rounded-3xl shadow-2xl shadow-white">
        <button
          className="text-black text-3xl font-bold w-full"
          onClick={event}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default NextButton;
