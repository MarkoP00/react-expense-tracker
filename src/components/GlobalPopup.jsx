import React, { useState } from "react";

export default function GlobalPopup({
  title,
  message,
  onEvent,
  onClose,
  defaultPopup,
}) {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <section
      onClose={handleClose}
      className="fixed top-0 min-h-full w-full bg-gradient-to-r  bg-black/40 flex justify-center items-center z-[100]">
      <div
        onClick={(e) => e.stopPropagation()}
        className={`flex flex-col justify-center items-center space-y-6 relative bg-white p-8 rounded-xl shadow-2xl max-w-96 shadow-main-shadow ${
          isClosing ? "popup-close" : "popup-open"
        }`}>
        <div className="title border-b-2 border-indigo-500">
          <h1 className="font-[600] text-lg text-center">{title}</h1>
        </div>
        <div className="message text-center">{message}</div>
        <div className="flex gap-8">
          {!defaultPopup && (
            <>
              <div>
                <button
                  onClick={onEvent}
                  className="px-10 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-300 shadow-lg w-full">
                  Yes
                </button>
              </div>
              <div>
                <button
                  onClick={handleClose}
                  className="px-10 py-3 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-700 transition duration-300 shadow-lg w-full">
                  No
                </button>
              </div>
            </>
          )}

          {defaultPopup && (
            <div>
              <button
                onClick={handleClose}
                className="px-10 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-300 shadow-lg w-full">
                Okay
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
