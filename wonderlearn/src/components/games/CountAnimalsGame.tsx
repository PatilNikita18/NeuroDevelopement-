import { useEffect, useState } from "react";
import { Game } from "../../types/game";

interface GamePlayerProps {
  game: Game;
  onComplete: (result: GameResult) => void;
  onExit: () => void;
}

export interface GameResult {
  gameId: string;
  score: number;
  accuracy: number;
  totalQuestions: number;
  correctAnswers: number;
  attempts: number;
  timeSpent: number;
  completed: boolean;
}

export default function CountAnimalsGame({
  game,
  onComplete,
  onExit
}: GamePlayerProps) {

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [correctAnswers, setCorrectAnswers] = useState(0);

  const [attempts, setAttempts] = useState(0);

  const [startTime] = useState(Date.now());

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const [showFeedback, setShowFeedback] = useState(false);

  const question = game.questions[currentQuestion];

  const handleAnswer = (answer: string) => {

    if (showFeedback) {
      return;
    }

    setAttempts(prev => prev + 1);

    setSelectedAnswer(answer);
    setShowFeedback(true);

    const isCorrect = answer === question.correctAnswer;

    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1);
    }

    setTimeout(() => {

      if (currentQuestion < game.questions.length - 1) {

        setCurrentQuestion(prev => prev + 1);

        setSelectedAnswer(null);

        setShowFeedback(false);

      } else {

        const totalQuestions = game.questions.length;

        const finalCorrect =
          correctAnswers + (isCorrect ? 1 : 0);

        const accuracy =
          finalCorrect / totalQuestions;

        const score = Math.round(accuracy * 100);

        const timeSpent =
          Math.round((Date.now() - startTime) / 1000);

        onComplete({
          gameId: game.id,
          score,
          accuracy,
          totalQuestions,
          correctAnswers: finalCorrect,
          attempts: attempts + 1,
          timeSpent,
          completed: true
        });

      }

    }, 1200);
  };

  return (
    <div className="min-h-screen bg-purple-50 p-6">

      <div className="max-w-2xl mx-auto">

        {/* Header */}

        <div className="flex justify-between items-center mb-6">

          <button
            onClick={onExit}
            className="text-gray-600 font-medium"
          >
            ← Exit
          </button>

          <div className="font-semibold text-purple-700">
            Question {currentQuestion + 1} / {game.questions.length}
          </div>

        </div>

        {/* Progress */}

        <div className="w-full bg-gray-200 rounded-full h-3 mb-8">

          <div
            className="bg-purple-600 h-3 rounded-full transition-all"
            style={{
              width: `${((currentQuestion + 1) /
                game.questions.length) * 100}%`
            }}
          />

        </div>

        {/* Question */}

        <div className="bg-white rounded-3xl p-8 shadow-md text-center">

          <div className="text-6xl mb-5">
            {game.emoji}
          </div>

          <h1 className="text-2xl font-bold text-gray-800 mb-8">
            {question.question}
          </h1>

          {/* Objects */}

          <div className="flex justify-center gap-4 flex-wrap mb-10">

            {question.items.map((item, index) => (

              <div
                key={index}
                className="text-6xl bg-purple-50 rounded-2xl p-4"
              >
                {item}
              </div>

            ))}

          </div>

          {/* Options */}

          <div className="grid grid-cols-3 gap-4">

            {question.options.map(option => {

              const isSelected =
                selectedAnswer === option;

              const isCorrect =
                showFeedback &&
                option === question.correctAnswer;

              const isWrong =
                showFeedback &&
                isSelected &&
                option !== question.correctAnswer;

              return (
                <button
                  key={option}
                  onClick={() => handleAnswer(option)}
                  className={`
                    py-4
                    rounded-2xl
                    text-2xl
                    font-bold
                    border-2
                    transition

                    ${
                      isCorrect
                        ? "bg-green-100 border-green-500"
                        : ""
                    }

                    ${
                      isWrong
                        ? "bg-red-100 border-red-500"
                        : ""
                    }

                    ${
                      !showFeedback
                        ? "bg-white border-purple-200 hover:bg-purple-50"
                        : ""
                    }
                  `}
                >
                  {option}
                </button>
              );
            })}

          </div>

          {/* Feedback */}

          {showFeedback && (

            <div className="mt-8 text-xl font-bold">

              {selectedAnswer === question.correctAnswer ? (
                <div className="text-green-600">
                  🎉 Great job!
                </div>
              ) : (
                <div className="text-orange-500">
                  💡 Let's try the next one!
                </div>
              )}

            </div>

          )}

        </div>

      </div>

    </div>
  );
}