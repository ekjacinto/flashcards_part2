type GuessFormProps = {
  inputValue: string;
  inputEvent: (e: React.ChangeEvent<HTMLInputElement>) => void;
  submitEvent: (e: React.FormEvent<HTMLFormElement>) => void;
  answered: boolean;
  correct: boolean;
};

const GuessForm = ({
  inputValue,
  inputEvent,
  submitEvent,
  answered,
  correct,
}: GuessFormProps) => {
  return (
    <div>
      <form className="flex gap-2 mb-4" onSubmit={submitEvent}>
        <label className="text-3xl" htmlFor="search">
          Guess the Answer:
        </label>
        <input
          className="w-48 bg-[#191922] rounded-2xl border-2 border-[#d2d2d4] text-center text-xl"
          type="text"
          value={inputValue}
          onChange={inputEvent}
        />
        {answered === true ? (
          correct === false ? (
            <button className="bg-red-700 w-[120px] h-10 flex justify-center items-center rounded-2xl border-2 border-[#d2d2d4] font-bold text-xl pointer-events-none">
              Submit
            </button>
          ) : (
            <button className="bg-green-800 w-[120px] h-10 flex justify-center items-center rounded-2xl border-2 border-[#d2d2d4] font-bold text-xl pointer-events-none">
              Submit
            </button>
          )
        ) : (
          <button className="bg-[#191922] w-[120px] h-10 flex justify-center items-center rounded-2xl border-2 border-[#d2d2d4] font-bold text-xl">
            Submit
          </button>
        )}
      </form>
    </div>
  );
};

export default GuessForm;
