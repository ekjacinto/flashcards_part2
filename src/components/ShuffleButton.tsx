type ShuffleButtonProps = {
  event: () => void;
};

const ShuffleButton = ({ event }: ShuffleButtonProps) => {
  return (
    <div className="flex justify-center h-8">
      <div className="bg-white w-[100px] h-12 flex justify-center items-center rounded-3xl shadow-2xl shadow-white">
        <button className="text-black text-2xl w-full" onClick={event}>
          {"Shuffle"}
        </button>
      </div>
    </div>
  );
};

export default ShuffleButton;
