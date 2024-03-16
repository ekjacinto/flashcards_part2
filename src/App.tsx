import { useState } from "react";
import "./App.css";
import Flashcard from "./components/Flashcard";
import NextButton from "./components/NextButton";
import PrevButton from "./components/PrevButton";
import Mercury from "./assets/mercury.png";
import Earth from "./assets/earth.png";
import Mars from "./assets/mars.png";
import Jupiter from "./assets/jupiter.png";
import Saturn from "./assets/saturn.png";
import Uranus from "./assets/uranus.png";
import Neptune from "./assets/neptune.png";
import ShuffleButton from "./components/ShuffleButton";
import NextFlashcard from "./components/NextFlashcard";
import GuessForm from "./components/GuessForm";
import Right from "./assets/right.png";
import Wrong from "./assets/wrong.png";
import Star from "./assets/star.png";

type Problem = {
  prompt?: string;
  question: string;
  answer: string;
  image?: string;
  difficulty: string;
};

const problems: Problem[] = [
  {
    prompt: "Guess the planet!",
    question: "Which planet is known as the Red Planet?",
    answer: "Mars",
    difficulty: "easy",
  },
  {
    prompt: "Guess the number!",
    question: "How many planets are in the solar system?",
    answer: "8",
    difficulty: "easy",
  },
  {
    prompt: "Guess the planet!",
    question: "Which planet is known for its great red spot?",
    answer: "Jupiter",
    difficulty: "easy",
  },
  {
    prompt: "Guess the number!",
    question:
      "How many moons does Jupiter have? (as of 2021, according to NASA)",
    answer: "79",
    difficulty: "hard",
  },
  {
    prompt: "Guess the planets!",
    question: "Which planets are known as the ice giants?",
    answer: "Uranus and Neptune",
    difficulty: "hard",
  },
  {
    prompt: "Guess the planets!",
    question: "Which two planets are known as the gas giants?",
    answer: "Jupiter and Saturn",
    difficulty: "medium",
  },
  {
    prompt: "Guess the planets!",
    question:
      "Which planets are known as the terrestrial planets? (rocky planets)",
    answer: "Mercury, Venus, Earth, and Mars",
    difficulty: "hard",
  },
  {
    prompt: "Guess the planets!",
    question: "Which planets have rings around them?",
    answer: "Jupiter, Saturn, Uranus, and Neptune",
    difficulty: "medium",
  },
  {
    prompt: "Guess the planet!",
    question: "",
    image: Mercury,
    answer: "Mercury",
    difficulty: "hard",
  },
  {
    prompt: "Guess the planet!",
    question: "",
    image: Earth,
    answer: "Earth",
    difficulty: "easy",
  },
  {
    prompt: "Guess the planet!",
    question: "",
    image: Mars,
    answer: "Mars",
    difficulty: "medium",
  },
  {
    prompt: "Guess the planet!",
    question: "",
    image: Jupiter,
    answer: "Jupiter",
    difficulty: "easy",
  },
  {
    prompt: "Guess the planet!",
    question: "",
    image: Saturn,
    answer: "Saturn",
    difficulty: "easy",
  },
  {
    prompt: "Guess the planet!",
    question: "",
    image: Uranus,
    answer: "Uranus",
    difficulty: "hard",
  },
  {
    prompt: "Guess the planet!",
    question: "",
    image: Neptune,
    answer: "Neptune",
    difficulty: "hard",
  },
];

function App() {
  const [cardDeck, setCardDeck] = useState<Problem[]>(problems);
  const [currentProblem, setCurrentProblem] = useState<Problem>(cardDeck[0]);
  const [flipCard, setFlipCard] = useState<boolean>(false);
  const [guess, setGuess] = useState<string>("");
  const [answered, setAnswered] = useState<boolean>(false);
  const [correct, setCorrect] = useState<boolean>(false);
  const [correctStreak, setCorrectStreak] = useState<number>(0);
  const [longestStreak, setLongestStreak] = useState<number>(0);
  const [masteredCards, setMasteredCards] = useState<Problem[]>([]);

  const prevClickHandler = () => {
    if (currentProblem === cardDeck[0] || cardDeck.length === 0) {
      return;
    }
    setCurrentProblem(cardDeck[cardDeck.indexOf(currentProblem) - 1]);
    setFlipCard(false);
    setAnswered(false);
    setCorrect(false);
  };

  const nextClickHandler = () => {
    if (
      currentProblem === cardDeck[cardDeck.length - 1] ||
      cardDeck.length === 0
    ) {
      return;
    }
    setCurrentProblem(cardDeck[cardDeck.indexOf(currentProblem) + 1]);
    setFlipCard(false);
    setAnswered(false);
    setCorrect(false);
  };

  const shuffleCardsHandler = () => {
    const savedIndex = cardDeck.indexOf(currentProblem);
    const visitedCards = cardDeck.slice(0, savedIndex + 1);
    const nextCards = cardDeck.slice(savedIndex + 1);

    let shuffledCardDeck = shuffle(nextCards);
    shuffledCardDeck = [...visitedCards, ...nextCards];

    setCardDeck(shuffledCardDeck);
    setCurrentProblem(cardDeck[savedIndex]);
  };

  const shuffle = (array: Problem[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleFlip = () => {
    setFlipCard(!flipCard);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGuess(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateAnswers();
  };

  const validateAnswers = () => {
    if (guess === "") {
      setCorrect(false);
      setAnswered(true);
      setCorrectStreak(0);
      return;
    }

    const delimiters = /(and)|,/gi;
    const validatedCorrectAnswer = currentProblem.answer
      .replace(delimiters, " ")
      .split(" ")
      .map((word) => word.toLowerCase())
      .filter((word) => word !== "")
      .sort();

    const validatedGuess = guess
      .replace(delimiters, " ")
      .split(" ")
      .map((word) => word.toLowerCase())
      .filter((word) => word !== "")
      .sort();

    if (validatedCorrectAnswer.length !== validatedGuess.length) {
      setCorrect(false);
      setAnswered(true);
      setCorrectStreak(0);
      return;
    }
    if (
      validatedCorrectAnswer.every(
        (word, index) => word === validatedGuess[index]
      )
    ) {
      setCorrect(true);
      setAnswered(true);
      setCorrectStreak((correctStreak) => correctStreak + 1);
    } else {
      setCorrect(false);
      setAnswered(true);
      setCorrectStreak(0);
    }
    if (correctStreak >= longestStreak) {
      setLongestStreak((correctStreak) => correctStreak + 1);
    }
  };

  const handleMasterCard = () => {
    if (cardDeck.length === 0) {
      return;
    }
    setMasteredCards([...masteredCards, currentProblem]);
    const savedIndex = cardDeck.indexOf(currentProblem);
    const previousCards = cardDeck.slice(0, savedIndex);
    const nextCards = cardDeck.slice(savedIndex + 1);
    setCardDeck([...previousCards, ...nextCards]);
    if (cardDeck.indexOf(currentProblem) === cardDeck.length - 1) {
      prevClickHandler();
    } else {
      nextClickHandler();
    }
    console.log(masteredCards);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-7xl font-bold m-8">
        Solar System{" "}
        <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-pink-500 to-green-400">
          Trivia
        </span>
      </h1>
      <div className="text-3xl leading-10">
        <p>Test your knowledge on the solar system!</p>
        <p>
          Total number of cards:{" "}
          <span className="font-bold text-red-500">{cardDeck.length}</span>
        </p>
        <p>
          Correct Streak:{" "}
          <span className="font-bold text-orange-500">{correctStreak}</span>,
          Longest Streak:{" "}
          <span className="font-bold text-yellow-500">{longestStreak}</span>
        </p>
      </div>

      <div className="flex justify-center items-center gap-2 mt-4">
        <PrevButton event={prevClickHandler} />
        <NextFlashcard />
        <img
          src={Star}
          width={35}
          className="mb-[320px] ml-[670px] absolute z-10 cursor-pointer"
          onClick={handleMasterCard}
        />
        {answered === true && correct === false ? (
          <img src={Wrong} className="guess-symbol absolute z-10 w-[280px]" />
        ) : answered === true && correct === true ? (
          <img src={Right} className="guess-symbol absolute z-10 w-[280px]" />
        ) : null}

        {cardDeck.length === 0 ? (
          <Flashcard
            text={"No more cards left!"}
            difficulty={"null"}
            flipped={flipCard}
            event={handleFlip}
          />
        ) : flipCard === false ? (
          currentProblem.prompt !== undefined ? (
            currentProblem.image !== undefined ? (
              <Flashcard
                prompt={currentProblem.prompt}
                text={currentProblem.question}
                img={currentProblem.image}
                difficulty={currentProblem.difficulty}
                flipped={flipCard}
                event={handleFlip}
              />
            ) : (
              <Flashcard
                prompt={currentProblem.prompt}
                text={currentProblem.question}
                difficulty={currentProblem.difficulty}
                flipped={flipCard}
                event={handleFlip}
              />
            )
          ) : (
            <Flashcard
              text={currentProblem.question}
              event={handleFlip}
              flipped={flipCard}
            />
          )
        ) : (
          <Flashcard
            text={currentProblem.answer}
            event={handleFlip}
            flipped={flipCard}
          />
        )}
        <NextButton event={nextClickHandler} />
      </div>
      <GuessForm
        answered={answered}
        correct={correct}
        inputValue={guess}
        inputEvent={handleTextChange}
        submitEvent={handleSubmit}
      />
      <ShuffleButton event={shuffleCardsHandler} />
    </div>
  );
}

export default App;
