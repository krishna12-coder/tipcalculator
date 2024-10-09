import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "./ui/button";

const TipCalculator = () => {
  const [bill, setBill] = useState(0);
  const [tipPercentage, setTipPercentage] = useState(15);
  const [isSplitting, setIsSplitting] = useState(false);
  const [splitCount, setSplitCount] = useState(2);
  const [customTipPercentage, setCustomTipPercentage] = useState("");
  const [currencySymbol, setCurrencySymbol] = useState("$");
  const [currencyCode, setCurrencyCode] = useState("USD");

  // New state for ReverseTipCalculator
  const [totalWithTip, setTotalWithTip] = useState(0);
  const [reverseTipPercentage, setReverseTipPercentage] = useState(15);

  // Fetch currency symbol and code based on IP address
  const fetchCurrencyInfo = async () => {
    try {
      const ipResponse = await axios.get("https://ipinfo.io/json");
      const countryCode = ipResponse.data.country;

      const currencyResponse = await axios.get(
        `https://restcountries.com/v3.1/alpha/${countryCode}`
      );
      const currency =
        currencyResponse.data.currencies[
          Object.keys(currencyResponse.data.currencies)[0]
        ];

      setCurrencySymbol(currency.symbol || "$");
      setCurrencyCode(currency.code || "USD");
    } catch (error) {
      console.error("Error fetching currency:", error);
      setCurrencySymbol("$");
      setCurrencyCode("USD");
    }
  };

  useEffect(() => {
    fetchCurrencyInfo();
  }, []);

  // Calculate tip amount based on custom percentage or predefined percentage
  const billAmount = Number(bill) || 0;
  const effectiveTipPercentage = customTipPercentage
    ? Number(customTipPercentage)
    : tipPercentage;
  const tipAmount = billAmount * (effectiveTipPercentage / 100);
  const total = billAmount + tipAmount;
  const splitAmount =
    isSplitting && splitCount > 0 ? total / splitCount : total;

  const quickTipButtons = [5, 10, 15, 20];

  const handleCustomTipChange = (e) => {
    const value = e.target.value;
    setCustomTipPercentage(value);
    if (value > 0) {
      setTipPercentage(0);
    }
  };

  const handleBillChange = (e) => {
    const value = e.target.value.replace(/^0+(?!\.|$)/, "");
    setBill(value ? Number(value) : "");
  };

  const handleReset = () => {
    setBill(0);
    setTipPercentage(15);
    setIsSplitting(false);
    setSplitCount(2);
    setCustomTipPercentage("");
    fetchCurrencyInfo();
  };

  // New functions for ReverseTipCalculator
  const handleTotalWithTipChange = (e) => {
    const value = e.target.value.replace(/^0+(?!\.|$)/, "");
    setTotalWithTip(value ? Number(value) : "");
  };

  const calculateOriginalBill = () => {
    const total = Number(totalWithTip) || 0;
    const tipPercent = Number(reverseTipPercentage) || 0;
    return total / (1 + tipPercent / 100);
  };

  const originalBill = calculateOriginalBill();
  const reverseTipAmount = totalWithTip - originalBill;

  const handleResetReverse = () => {
    setTotalWithTip(0);
    setReverseTipPercentage(15);
    fetchCurrencyInfo();
  };

  const tippingSuggestions = [
    {
      question: "How much to tip movers",
      answer: [
        "Standard tip for movers is 15-20% of total moving cost, adjustable ",
        "based on service quality and move complexity.Factors influencing",
        " tip amount include punctuality, efficiency, extra services, handling",
        "of special items, packing assistance, driving,extended hours,",
        "and additional personnel.For long-distance moves,  10-15% of total",
        " cost is typical. Short or simple moves warrant $10-$20 per mover, ",
        " while complex or large moves may require $50+ per mover. Consider ",
        "split tipping, with half given before the move and half after. This ",
        "practice is especially useful for longer or more complex moves. ",
        "Tipping is customary in the moving industry and generally allowed by",
        "most companies. Adjust your tip based on overall satisfaction and",
        "any exceptional service provided during your move.",
      ],
    },
    {
      question: "How much to tip hairdresser",
      answer: [
        "Generally, a 20% gratuity is considered appropriate for hair services, though",
        " this can be adjusted based on your experience. Several factors can influence",
        "  your decision on tip amount.Evaluate the intricacy of the haircut or style,",
        " whether the stylist surpassed your expectations, their demeanor and, ",
        "professionalism, and the efficiency of the service. These elements can help  ",
        " you determine if you should tip more or less than the standard rate.",
        "Remember that other salon employees, such as those who wash your hair or ",
        " assist the main stylist, also appreciate gratuities.A smaller tip of £2-£5 ",
        " for these staff members is often welcome. It's important to note that tipping",
        "  policies can vary between salons. Some establishments may prohibit tipping",
        "  or incorporate service charges that cover gratuities. To avoid awkward situations,", 
        "it's advisable to inquire about the salon's tipping policy before your appointment.",
        "When purchasing hair products at the salon, request a separate transaction.This ",
        " practice prevents the product cost from inflating your service bill, which could ",
        "inadvertently increase your tip if you're calculating it as a percentage  of the",
        "  total.",
      ],
    },
    {
      question: "How much to tip tattoo artist",
      answer: [
        "Tipping tattoo artists is optional, unlike in some",
        "service industries. The common saying is ",
        "Tipping is never expected, but always appreciated.",
        "Artists typically set their own pricing to cover ",
        "their time adequately.",
        "If you choose to tip, consider the following guidelines",
        "based on tattoo size:",
        "Small tattoos (completed in a few hours or less):",
        "20% of the total cost is appropriate.",
        "Medium tattoos (taking a few hours to a full day):",
        "Tip an extra hour at the artist's rate.",
        "Large tattoos (multiple sessions):",
        "Option 1:",
        "Tip 20% or an extra hour per session.",
        "Option 2:",
        "Give a larger tip at the final session (multiple hours, a gift, or both).",
        "For extended projects like sleeves or backpieces,",
        "consistent patronage is often greatly appreciated",
        "by the artist, regardless of tipping.",
        "Tipping is a way to show appreciation for",
        "exceptional service, good customer experience, ",
        "and outstanding results. However, artists should ",
        "not feel upset if a client doesn't provide extra compensation.",
      ],
    },
    {
      question: "How much to tip uber driver",
      answer: [
        "Recommended 10-20% of fare. Tip via app or cash within 90 days.",
        "Uber suggests $1-$5, but custom amounts welcome. Consider service",
        "quality, ride length, and punctuality. 100% goes to driver. ",
        "Optional, but appreciated for good service. Tip on pre-discount",
        "amount for promo rides. Adjust or skip for poor experiences.",
        "While not required, tips support drivers relying on extra income.",
        "Exceptional service may warrant higher tips.",
      ],
    },
    {
      question: "How much to tip valet",
      answer: [
        "When tipping valets, consider the level of service and the venue's",
        "prestige. For standard service, a tip of $5 to $10 is appropriate ",
        "when your car is returned. At high-end establishments or for exceptional",
        "service, consider tipping $15 to $25 or more. The industry standard ",
        "suggests tipping 15% to 20% of the valet fee. Adjust your tip based on",
        "the venue, tipping more at luxury hotels and less at casual locations.",
        "Be aware that hospitals and private events may not expect tips. Many valet",
        "services now offer cashless tipping options via QR codes for convenience.",
        "Always consider the quality of service, location, and any additional ",
        "assistance provided when deciding on your tip amount.",
      ],
    },
    {
      question: "How much to tip pizza delivery",
      answer: [
        "The standard gratuity for pizza delivery typically ranges from",
        "15% to 20% of your total bill. For instance, a $20 pizza order",
        "would warrant a tip between $3 and $4. However, various factors",
        "can influence this amount. Consider tipping more generously in ",
        "challenging weather conditions, for large orders, or when the driver",
        "provides exceptional service. If you reside in a walk-up apartment, ",
        "especially in urban areas, a higher tip may be appropriate. For smaller",
        "orders under $20, a minimum tip of $3 is considerate. Adjust your tip ",
        "based on service quality: 10% or less for subpar service, and 20% or more",
        "for outstanding service. If financial constraints limit your ability to",
        "tip the standard amount, a smaller percentage or even a sincere expression",
        "of gratitude can be meaningful. Remember, tipping is a voluntary practice",
        "that can significantly support service workers, particularly",
        "those earning below minimum wage.",
      ],
    },
    {
      question: "How much to tip barber",
      answer: [
        "The customary gratuity for barber services typically falls",
        "between 15% and 20% of your total haircut cost. For instance,",
        "if your haircut is priced at $40, an appropriate tip would range",
        "from $6 to $8. However, this amount can be adjusted based on",
        "various factors. Consider tipping more generously for exceptional",
        "service or if you're a long-standing client. Special occasions,",
        "such as getting a haircut for a birthday or anniversary, may also",
        "warrant a higher tip. If you're visiting a high-end salon, a larger",
        "gratuity might be expected. Conversely, if you feel the service was subpar,",
        "it's acceptable to tip less. Don't forget to consider other salon staff",
        "who assist you, such as the shampoo person or shoe-shine attendant; a few",
        "dollars for their services is a kind gesture. During the holiday season,",
        "it's common practice to offer a more substantial tip, often",
        "equivalent to the cost of a regular visit.",
      ],
    },
    {
      question: "How much to tip doordash",
      answer: [
        "The recommended tip for DoorDash drivers is 15-20% of your",
        "total order cost. For example, a $40 order would warrant a",
        "$6-$8 tip. Consider tipping more for larger orders, challenging",
        "weather conditions, or exceptional service. A minimum tip of $2-$3",
        "is appreciated for smaller orders. Factors influencing tip amount ",
        "include delivery distance, order complexity, and driver effort.",
        "DoorDash allows in-app tipping before or after delivery, with 100%",
        "going to the driver. While tipping isn't mandatory, it significantly",
        "supports drivers' income as they rely heavily on tips. Adjust your",
        "tip based on service quality, but remember that some delivery issues",
        "may be beyond the driver's control.",
      ],
    },
    {
      question: "How much to tip massage therapist",
      answer: [
        "You should tip a massage therapist 15-20% of the service cost.",
      ],
    },
    {
      question: "How much to tip housekeeping",
      answer: [
        "Housekeepers are often tipped $1-$5 per day, depending on the hotel and quality of service.",
      ],
    },
    {
      question: "How much to tip dog groomer",
      answer: ["A 15-20% tip is typical for dog groomers."],
    },
    {
      question: "How much to tip instacart",
      answer: [
        "You should tip Instacart shoppers 5-10%, with a minimum of $2 per order.",
      ],
    },
    {
      question: "How much to tip uber eats",
      answer: ["A 10-20% tip is suggested for Uber Eats delivery."],
    },
    {
      question: "How much to tip house cleaner",
      answer: [
        "House cleaners often receive $10-$20 per cleaning, or 10-15% of the cleaning fee.",
      ],
    },
    {
      question: "How much to tip lyft driver",
      answer: ["Tipping Lyft drivers 10-20% of the fare is common practice."],
    },
    {
      question: "How much to tip furniture delivery",
      answer: [
        "You should tip furniture delivery workers $5-$20 per person, depending on the size and difficulty of the delivery.",
      ],
    },
  ];

  return (
    <div className="flex flex-col md:flex-row w-full max-w-max mx-auto">
      {/* Right column with calculators */}
      <div className="md:w-9/3">
        {/* Original Tip Calculator */}
        <div className="bg-white shadow-lg rounded-3xl p-6 sm:p-8 lg:p-12 border border-gray-300 mb-8">
          <h2 className=" text-2xl sm:text-3xl font-bold mb-6 text-green-600 text-center">
            Tip Calculator
          </h2>
          <div className="space-y-6">
            {/* Bill input */}
            <div className="relative">
              <label
                htmlFor="bill"
                className="block text-sm font-medium text-gray-700"
              >
                Bill
              </label>
              <input
                id="bill"
                type="number"
                value={bill || ""}
                onChange={handleBillChange}
                className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm pr-12 py-3 text-right focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 transition duration-300 ease-in-out hover:border-green-400 hover:bg-green-50"
              />
              <span
                className={`absolute right-4 top-2/3 transform -translate-y-1/2 text-gray-500 transition duration-0 ease-in-out ${
                  bill ? "opacity-100" : "opacity-100"
                }`}
              >
                {currencyCode}
              </span>
            </div>

            {/* Quick Tip buttons */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Quick Tip
              </label>
              <div className="flex flex-wrap gap-3 mt-3">
                {quickTipButtons.map((percentage) => (
                  <Button
                    key={percentage}
                    variant={
                      tipPercentage === percentage ? "default" : "outline"
                    }
                    size="default"
                    onClick={() => {
                      setCustomTipPercentage("");
                      setTipPercentage(percentage);
                    }}
                    className={`transition duration-300 ease-in-out transform hover:scale-105 ${
                      tipPercentage === percentage
                        ? "bg-green-500 text-white"
                        : "bg-green-200 text-green-600 hover:bg-green-300"
                    } rounded-full px-6 py-3`}
                  >
                    {percentage}%
                  </Button>
                ))}
                <Button
                  variant={tipPercentage === 0 ? "default" : "outline"}
                  size="default"
                  onClick={() => setTipPercentage(0)}
                  className={`transition duration-300 ease-in-out transform hover:scale-105 ${
                    tipPercentage === 0
                      ? "bg-green-500 text-white"
                      : "bg-green-200 text-green-600 hover:bg-green-300"
                  } rounded-full px-6 py-3`}
                >
                  Custom
                </Button>
              </div>
              {tipPercentage === 0 && (
                <div className="mt-3">
                  <label
                    htmlFor="customTip"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Custom Tip Percentage
                  </label>
                  <input
                    id="customTip"
                    type="number"
                    value={customTipPercentage}
                    onChange={handleCustomTipChange}
                    className="mt-1 block w-full py-3 text-center rounded-lg border border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 transition duration-300 ease-in-out hover:border-green-400 hover:bg-green-50"
                  />
                </div>
              )}
            </div>

            {/* Tip Percentage Slider */}
            <div>
              <label
                htmlFor="tip"
                className="block text-sm font-medium text-gray-700"
              >
                Tip:{" "}
                {tipPercentage !== 0
                  ? `${tipPercentage}%`
                  : "Custom Percentage"}
              </label>
              <input
                id="tip"
                type="range"
                min="0"
                max="30"
                value={tipPercentage}
                onChange={(e) => setTipPercentage(Number(e.target.value))}
                className={`mt-1 block w-full border border-gray-300 rounded-lg transition duration-300 ease-in-out ${
                  tipPercentage === 0
                    ? "cursor-not-allowed"
                    : "hover:bg-green-50"
                }`}
                disabled={tipPercentage === 0}
              />
            </div>

            {/* Tip Amount */}
            <div>
              <label className="mt-2 block text-sm font-medium text-gray-700">
                Tip amount
              </label>
              <input
                value={`${currencySymbol} ${tipAmount.toFixed(2)}`}
                readOnly
                className="mt-1 block w-full py-3 rounded-lg border border-gray-300 shadow-sm bg-gray-50 transition duration-300 ease-in-out hover:bg-green-50 text-center"
              />
            </div>

            {/* Total */}
            <div>
              <label className="mt-2 block text-sm font-medium text-gray-700">
                Total (Bill + Tip)
              </label>
              <input
                value={`${currencySymbol} ${total.toFixed(2)}`}
                readOnly
                className="mt-1 block w-full py-3 rounded-lg border border-gray-300 shadow-sm bg-gray-50 transition duration-300 ease-in-out hover:bg-green-50 text-center"
              />
            </div>

            {/* Split bill */}
            <div className="space-y-3 mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Are you splitting the bill?
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="checkbox"
                  checked={isSplitting}
                  onChange={() => setIsSplitting(!isSplitting)}
                  className="h-5 w-5 text-green-600 border border-gray-300 rounded-lg focus:ring focus:ring-green-200 focus:ring-opacity-50"
                />
                <span className="text-sm">Yes</span>
              </div>
              {isSplitting && (
                <div>
                  <label
                    htmlFor="splitCount"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Number of people
                  </label>
                  <input
                    id="splitCount"
                    type="number"
                    value={splitCount || ""}
                    onChange={(e) => {
                      const value = e.target.value.replace(/^0+/, "");
                      setSplitCount(value === "" ? "" : Number(value));
                    }}
                    className="mt-1 block w-full py-3 text-center rounded-lg border border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 transition duration-300 ease-in-out hover:border-green-400 hover:bg-green-50"
                    min="1"
                  />
                  <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Each person pays
                    </label>
                    <input
                      value={`${currencySymbol} ${splitAmount.toFixed(2)}`}
                      readOnly
                      className="mt-1 block w-full py-3 rounded-lg border border-gray-300 shadow-sm bg-gray-50 transition duration-300 ease-in-out hover:bg-green-50 text-center"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Reset Button */}
            <div className="mt-6 text-center">
              <Button
                variant="default"
                size="default"
                onClick={handleReset}
                className="rounded-full px-6 py-3 bg-red-500 text-white hover:bg-red-600 transition duration-300 ease-in-out transform hover:scale-105"
              >
                Reset
              </Button>
            </div>
          </div>
        </div>

        {/* Reverse Tip Calculator */}
        <div className="bg-white shadow-lg rounded-3xl p-6 sm:p-8 lg:p-12 border border-gray-300 mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-green-600 text-center">
            Reverse Tip Calculator
          </h2>
          <div className="space-y-6">
            {/* Total With Tip input */}
            <div className="relative">
              <label
                htmlFor="totalWithTip"
                className="block text-sm font-medium text-gray-700"
              >
                Total with Tip
              </label>
              <input
                id="totalWithTip"
                type="number"
                value={totalWithTip || ""}
                onChange={handleTotalWithTipChange}
                className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm pr-12 py-3 text-right focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 transition duration-300 ease-in-out hover:border-green-400 hover:bg-green-50"
              />
              <span
                className={`absolute right-4 top-2/3 transform -translate-y-1/2 text-gray-500 transition duration-0 ease-in-out ${
                  totalWithTip ? "opacity-100" : "opacity-100"
                }`}
              >
                {currencyCode}
              </span>
            </div>

            {/* Reverse Tip Percentage */}
            <div>
              <label
                htmlFor="reverseTip"
                className="block text-sm font-medium text-gray-700"
              >
                Tip Percentage
              </label>
              <input
                id="reverseTip"
                type="range"
                min="0"
                max="30"
                value={reverseTipPercentage}
                onChange={(e) =>
                  setReverseTipPercentage(Number(e.target.value))
                }
                className="mt-1 block w-full border border-gray-300 rounded-lg transition duration-300 ease-in-out hover:bg-green-50"
              />
              <div className="mt-2 text-sm">
                <span>Tip: {reverseTipPercentage}%</span>
              </div>
            </div>

            {/* Original Bill */}
            <div>
              <label className="mt-2 block text-sm font-medium text-gray-700">
                Original Bill Amount (without Tip)
              </label>
              <input
                value={`${currencySymbol} ${originalBill.toFixed(2)}`}
                readOnly
                className="mt-1 block w-full py-3 rounded-lg border border-gray-300 shadow-sm bg-gray-50 transition duration-300 ease-in-out hover:bg-green-50 text-center"
              />
            </div>

            {/* Reverse Tip Amount */}
            <div>
              <label className="mt-2 block text-sm font-medium text-gray-700">
                Tip amount
              </label>
              <input
                value={`${currencySymbol} ${reverseTipAmount.toFixed(2)}`}
                readOnly
                className="mt-1 block w-full py-3 rounded-lg border border-gray-300 shadow-sm bg-gray-50 transition duration-300 ease-in-out hover:bg-green-50 text-center"
              />
            </div>

            {/* Reset Button */}
            <div className="mt-6 text-center">
              <Button
                variant="default"
                size="default"
                onClick={handleResetReverse}
                className="rounded-full px-6 py-3 bg-red-500 text-white hover:bg-red-600 transition duration-300 ease-in-out transform hover:scale-105"
              >
                Reset
              </Button>
            </div>
          </div>
        </div>

        <div className=" bg-white shadow-lg rounded-3xl p-6 sm:p-8 lg:p-12 border border-gray-300">
  <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-green-600 text-center">
    FAQs
  </h2>
  <ul className="space-y-4">
    {tippingSuggestions.map((suggestion, index) => (
      <li key={index} className="text-gray-700">
        <details className="cursor-pointer">
          <summary className="font-semibold text-lg">
            {suggestion.question}
          </summary>
          <p className="mt-2 text-sm font-semibold">
            {suggestion.answer.join(" ")} {/* Join array elements into a paragraph */}
          </p>
        </details>
      </li>
    ))}
  </ul>
</div>

      </div>
      //{" "}
    </div>
  );
};

export default TipCalculator;
