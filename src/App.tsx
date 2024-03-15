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
    answer: "Answer: Mars",
    difficulty: "easy",
  },
  {
    prompt: "Guess the number!",
    question: "How many planets are in the solar system?",
    answer: "Answer: 8",
    difficulty: "easy",
  },
  {
    prompt: "Guess the planet!",
    question: "Which planet is known for its great red spot?",
    answer: "Answer: Jupiter",
    difficulty: "easy",
  },
  {
    prompt: "Guess the number!",
    question:
      "How many moons does Jupiter have? (as of 2021, according to NASA)",
    answer: "Answer: 79",
    difficulty: "hard",
  },
  {
    prompt: "Guess the planets!",
    question: "Which planets are known as the ice giants?",
    answer: "Answer: Uranus and Neptune",
    difficulty: "hard",
  },
  {
    prompt: "Guess the planets!",
    question: "Which two planets are known as the gas giants?",
    answer: "Answer: Jupiter and Saturn",
    difficulty: "medium",
  },
  {
    prompt: "Guess the planets!",
    question:
      "Which planets are known as the terrestrial planets? (rocky planets)",
    answer: "Answer: Mercury, Venus, Earth, and Mars",
    difficulty: "hard",
  },
  {
    prompt: "Guess the planets!",
    question: "Which planets have rings around them?",
    answer: "Answer: Jupiter, Saturn, Uranus, and Neptune",
    difficulty: "medium",
  },
  {
    prompt: "Guess the planet!",
    question: "",
    image: Mercury,
    answer: "Answer: Mercury",
    difficulty: "hard",
  },
  {
    prompt: "Guess the planet!",
    question: "",
    image: Earth,
    answer: "Answer: Earth",
    difficulty: "easy",
  },
  {
    prompt: "Guess the planet!",
    question: "",
    image: Mars,
    answer: "Answer: Mars",
    difficulty: "medium",
  },
  {
    prompt: "Guess the planet!",
    question: "",
    image: Jupiter,
    answer: "Answer: Jupiter",
    difficulty: "easy",
  },
  {
    prompt: "Guess the planet!",
    question: "",
    image: Saturn,
    answer: "Answer: Saturn",
    difficulty: "easy",
  },
  {
    prompt: "Guess the planet!",
    question: "",
    image: Uranus,
    answer: "Answer: Uranus",
    difficulty: "hard",
  },
  {
    prompt: "Guess the planet!",
    question: "",
    image: Neptune,
    answer: "Answer: Neptune",
    difficulty: "hard",
  },
];

function App() {
  const [cardDeck, setCardDeck] = useState<Problem[]>(problems);
  const [currentProblem, setCurrentProblem] = useState<Problem>(cardDeck[0]);
  const [flipCard, setFlipCard] = useState<Boolean>(false);

  const prevClickHandler = () => {
    if (currentProblem === cardDeck[0]) {
      return;
    }
    setCurrentProblem(cardDeck[cardDeck.indexOf(currentProblem) - 1]);
    setFlipCard(false);
  };

  const nextClickHandler = () => {
    if (currentProblem === cardDeck[cardDeck.length - 1]) {
      return;
    }
    setCurrentProblem(cardDeck[cardDeck.indexOf(currentProblem) + 1]);
    setFlipCard(false);
  };

  const shuffleCardsHandler = () => {
    const shuffledCardDeck = [...cardDeck];
    const savedIndex = cardDeck.indexOf(currentProblem);

    shuffle(shuffledCardDeck);
    const currentIndex = shuffledCardDeck.indexOf(currentProblem);

    [shuffledCardDeck[currentIndex], shuffledCardDeck[savedIndex]] = [
      shuffledCardDeck[savedIndex],
      shuffledCardDeck[currentIndex],
    ];

    setCardDeck(shuffledCardDeck);
  };

  const shuffle = (array: Problem[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleFlipHandler = () => {
    setFlipCard(!flipCard);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-7xl font-bold m-4">
        Solar System{" "}
        <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-pink-500 to-green-400">
          Trivia
        </span>
      </h1>
      <div className="text-3xl">
        <p>Test your knowledge on the solar system!</p>
        <p>Total number of cards: {cardDeck.length}</p>
      </div>
      <div>
        {flipCard === false ? (
          currentProblem.prompt !== undefined ? (
            currentProblem.image !== undefined ? (
              <Flashcard
                prompt={currentProblem.prompt}
                text={currentProblem.question}
                img={currentProblem.image}
                difficulty={currentProblem.difficulty}
                flipped={flipCard}
                event={handleFlipHandler}
              />
            ) : (
              <Flashcard
                prompt={currentProblem.prompt}
                text={currentProblem.question}
                difficulty={currentProblem.difficulty}
                flipped={flipCard}
                event={handleFlipHandler}
              />
            )
          ) : (
            <Flashcard
              text={currentProblem.question}
              event={handleFlipHandler}
              flipped={flipCard}
            />
          )
        ) : (
          <Flashcard
            text={currentProblem.answer}
            event={handleFlipHandler}
            flipped={flipCard}
          />
        )}
      </div>
      <div className="flex justify-center gap-3">
        <PrevButton event={prevClickHandler} />
        <ShuffleButton event={shuffleCardsHandler} />
        <NextButton event={nextClickHandler} />
      </div>
    </div>
  );
}

export default App;
