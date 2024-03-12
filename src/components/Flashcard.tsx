type FlashcardProps = {
  prompt?: string;
  text: string;
  img?: string;
  difficulty?: string;
  event: () => void;
};

const Flashcard = ({
  prompt,
  text,
  img,
  difficulty,
  event,
}: FlashcardProps) => {
  return (
    <div
      className={`h-[420px] w-[720px] flex justify-center items-center cursor-pointer text-pretty shadow-black shadow-lg ${difficulty}`}
      onClick={event}
    >
      <div className="w-[620px]">
        {prompt !== undefined ? (
          <section className="flex flex-col items-center shrink-0">
            <div
              className={`w-[75%] p-4 flex justify-center rounded-md absolute top-16 ${difficulty}-prompt`}
            >
              <h1 className="text-[2.75rem]">
                <b>
                  <u>{prompt}</u>
                </b>
              </h1>
            </div>
            <br />
            {img !== undefined ? (
              <div className="flex justify-center mt-32">
                <img src={img} alt={"Planet"} width={250} />
              </div>
            ) : (
              <h1 className="text-4xl mt-24">{text}</h1>
            )}
          </section>
        ) : (
          <h1 className="text-6xl text-pretty">{text}</h1>
        )}
      </div>
    </div>
  );
};

export default Flashcard;
