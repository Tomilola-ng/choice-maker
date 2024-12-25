import { useState } from "react";
import { Plus, Trash2, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Option {
  text: string;
  percentage: number;
}

const DecisionMaker = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState<Option[]>([
    { text: "", percentage: 0 },
    { text: "", percentage: 0 },
    { text: "", percentage: 0 },
  ]);
  const [result, setResult] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isThinking, setIsThinking] = useState(false);

  const addOption = () => {
    setOptions([...options, { text: "", percentage: 0 }]);
  };

  const removeOption = (index: number) => {
    if (options.length > 3) {
      const newOptions = options.filter((_, i) => i !== index);
      setOptions(newOptions);
    }
  };

  const updateOption = (
    index: number,
    field: keyof Option,
    value: string | number
  ) => {
    const newOptions = [...options];
    newOptions[index] = {
      ...newOptions[index],
      [field]:
        field === "percentage"
          ? Math.min(100, Math.max(0, Number(value)))
          : value,
    };
    setOptions(newOptions);
  };

  const calculateChoice = async () => {
    // Validation
    if (!question.trim()) {
      setError("Please enter a question");
      return;
    }

    if (options.some((opt) => !opt.text.trim())) {
      setError("Please fill in all option texts");
      return;
    }

    const totalPercentage = options.reduce(
      (sum, opt) => sum + opt.percentage,
      0
    );
    if (totalPercentage !== 100) {
      setError("Percentages must add up to 100%");
      return;
    }

    setError("");
    setIsThinking(true);
    setResult("");

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const random = Math.random() * 100;
    let accumulatedPercentage = 0;

    for (const option of options) {
      accumulatedPercentage += option.percentage;
      if (random <= accumulatedPercentage) {
        setResult(option.text);
        break;
      }
    }

    setIsThinking(false);
  };

  return (
    <div className="min-h-screen hide-scrollbar w-full bg-gradient-to-r from-green-400 to-teal-600 p-2 sm:p-4 md:p-8 flex items-center justify-center">
      <Card className="w-full max-w-2xl backdrop-blur-lg bg-white/80 shadow-xl">
        <CardHeader className="space-y-2 p-4 md:p-6">
          <CardTitle className="text-xl md:text-2xl font-bold">
            Decision Maker
          </CardTitle>
          <CardDescription className="text-sm md:text-base text-gray-600">
            Let me help you make a decision based on your preferences. Enter
            your options and assign percentage weights to reflect how much you
            favor each choice.
          </CardDescription>
        </CardHeader>

        {error && (
          <Alert variant="destructive" className="mb-4 bg-red-50/50">
            <AlertDescription className="text-sm">{error}</AlertDescription>
          </Alert>
        )}

        {result && (
          <Alert className="mb-4 bg-green-50/50">
            <AlertDescription className="text-center">
              <div className="text-sm font-medium mb-1">
                Based on your preferences, I suggest:
              </div>
              <div className="text-base md:text-lg font-bold text-green-700">
                {result}
              </div>
            </AlertDescription>
          </Alert>
        )}

        <CardContent className="space-y-4 md:space-y-6 p-4 md:p-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Your Question</label>
            <Input
              placeholder="What should I decide on today?"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="bg-white/50"
            />
          </div>

          <div className="space-y-3 md:space-y-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <label className="text-sm font-medium">Your Options</label>
              <div className="flex items-center space-x-1">
                <HelpCircle className="h-4 w-4 text-gray-400" />
                <span className="text-xs text-gray-500">
                  Percentages must add up to 100%
                </span>
              </div>
            </div>

            {options.map((option, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row gap-2 sm:space-x-2"
              >
                <Input
                  placeholder={`Option ${index + 1}`}
                  value={option.text}
                  onChange={(e) => updateOption(index, "text", e.target.value)}
                  className="flex-grow bg-white/50"
                />
                <div className="flex gap-2">
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={option.percentage}
                    onChange={(e) =>
                      updateOption(index, "percentage", e.target.value)
                    }
                    className="w-24 bg-white/50"
                    placeholder="%"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeOption(index)}
                    disabled={options.length <= 3}
                    className={`${
                      options.length <= 3 ? "opacity-50" : "opacity-100"
                    }`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:justify-between">
            <Button
              onClick={addOption}
              variant="outline"
              className="bg-white/50 w-full sm:w-auto"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Another Option
            </Button>
            <Button
              onClick={calculateChoice}
              disabled={isThinking}
              className="bg-gradient-to-r from-green-400 to-teal-600 text-white w-full sm:w-auto"
            >
              {isThinking ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Thinking...</span>
                </div>
              ) : (
                "Make Decision"
              )}
            </Button>
          </div>

          <div className="text-xs text-gray-500 text-center text-pretty mt-4">
            Made with ❤ by{" "}
            <a href="https://tomilola-portfolio.netlify.app/">
              Tomilola Oluwafemi
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DecisionMaker;
