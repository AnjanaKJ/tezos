import { useState } from 'react';
import { CardSpotlight } from "@/components/ui/card-spotlight";

export function CardSpotlightDemo({ title, firstNumber, secondNumber }: { title: string, firstNumber: number, secondNumber: number }) {
  const [showModal, setShowModal] = useState(false);
  const [firstValue, setFirstValue] = useState(firstNumber); // State to hold firstNumber
  const [secondValue, setSecondValue] = useState(secondNumber); // State to hold secondNumber
  const [inputFirstValue, setInputFirstValue] = useState(firstNumber.toString()); // Input for first value
  const [inputSecondValue, setInputSecondValue] = useState(secondNumber.toString()); // Input for second value

  // Toggle modal visibility
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  // Handle swap and close modal
  const handleSwapAndClose = () => {
    // Swap values and convert input strings to numbers
    setFirstValue(Number(inputSecondValue));
    setSecondValue(Number(inputFirstValue));

    // Close modal and alert user
    toggleModal();
    alert('Values swapped successfully!'); // Alert user after swap
  };

  return (
    <>
      <CardSpotlight className="w-96 p-4 relative z-30">
        <p className="text-xl font-bold relative z-40 mt-2 text-white">
          {title} {/* Display the title */}
        </p>
        <div className="text-neutral-200 mt-4 relative z-40">
          Follow these steps to secure your account
        </div>

        <div className="mt-4 flex justify-between items-start relative z-40">
          {/* Display the two integers */}
          <p className="text-neutral-300 text-sm">
            Total Amount Deposited: {firstValue}<br />
            Total Fund Received: {secondValue}
          </p>
          <button
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-lg"
            onClick={toggleModal} // Show modal on click
          >
            Show more..
          </button>
        </div>
      </CardSpotlight>

      {/* Modal popup */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-80 relative p-6">
            <button className="absolute top-2 right-2 text-gray-500 hover:text-black" onClick={toggleModal}>
              &times; {/* Close button */}
            </button>
            <h2 className="text-lg font-bold mb-4 text-center">Swap Values</h2>
            <div className="mb-4">
              <label className="block text-gray-700">Enter first value:</label>
              <input
                type="text"
                value={inputFirstValue}
                onChange={(e) => setInputFirstValue(e.target.value)} // Update input value
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Enter second value:</label>
              <input
                type="text"
                value={inputSecondValue}
                onChange={(e) => setInputSecondValue(e.target.value)} // Update input value
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div className="flex justify-around mt-4">
              <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg" onClick={toggleModal}>
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                onClick={handleSwapAndClose} // Handle swap and close modal
              >
                Swap
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
