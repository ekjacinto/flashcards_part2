type NextFlashcardProps = {
  difficulty?: string;
};

const NextFlashcard = ({ difficulty }: NextFlashcardProps) => {
  return (
    <div
      className={`h-[380px] w-[720px] m-[2rem] bg-white absolute rotate-[-4deg] z-[-1] text-pretty shadow-black shadow-lg ${difficulty}`}
    />
  );
};

export default NextFlashcard;
