type ShuffleButtonProps = {
  event: () => void;
};

const ShuffleButton = ({ event }: ShuffleButtonProps) => {
  return (
    <div className="flex justify-center h-8">
      <div className="bg-[#191922] w-[120px] h-14 flex justify-center items-center rounded-2xl border-2 border-[#d2d2d4]">
        <button
          className="text-[#d2d2d4] text-2xl w-full font-bold"
          onClick={event}
        >
          {"Shuffle"}
        </button>
      </div>
    </div>
  );
};

export default ShuffleButton;
