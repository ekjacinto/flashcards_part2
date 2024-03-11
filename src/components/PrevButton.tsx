type PrevButtonProps = {
  event: () => void;
};

const PrevButton = ({ event }: PrevButtonProps) => {
  return (
    <div className="flex justify-center h-8">
      <div className="bg-white w-[90px] h-12 flex justify-center items-center rounded-3xl">
        <button
          className="text-black text-3xl font-bold w-full"
          onClick={event}
        >
          {"<"}
        </button>
      </div>
    </div>
  );
};

export default PrevButton;
