export default async function addTransactionFunction(
  newTransaction,
  selectedMonth
) {
  let fetchSuccess = true;

  try {
    const response = await fetch(
      `https://react-expense-ea526-default-rtdb.firebaseio.com/transactions/${selectedMonth}.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTransaction),
      }
    );

    if (!response.ok) {
      throw new Error(
        "Failed to delete the transaction.",
        `Error: ${response.message}`
      );
    }
  } catch (error) {
    fetchSuccess = false;
    throw error;
  }
  return fetchSuccess;
}
