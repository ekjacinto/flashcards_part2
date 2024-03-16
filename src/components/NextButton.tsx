type NextButtonProps = {
  event: () => void;
};

const NextButton = ({ event }: NextButtonProps) => {
  return (
    <div className="bg-[#191922] w-[50px] h-[50px] rounded-full shadow-2xl shadow-white border-2 border-[#d2d2d4]">
      <button
        className="text-[#d2d2d4] text-3xl font-bold w-full"
        onClick={event}
      >
        {">"}
      </button>
    </div>
  );
};

export default NextButton;
