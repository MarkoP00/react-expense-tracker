import callToast from "./CallToast";

export default async function getTransactions() {
  try {
    const response = await fetch(
      "https://react-expense-ea526-default-rtdb.firebaseio.com/transactions.json"
    );

    if (!response.ok) {
      throw new Error("Failed to fetch transactions");
    }

    const responseData = await response.json();

    if (!responseData) {
      return {};
    }

    const convertedTransactions = Object.entries(responseData).reduce(
      (acc, [month, transactions]) => {
        acc[month] = Object.entries(transactions).map(([id, transaction]) => ({
          ...transaction,
          id,
        }));
        return acc;
      },
      {}
    );

    return convertedTransactions;
  } catch (error) {
    callToast(
      "error",
      "Something went wrong while fetching all transactions..."
    );
    return {};
  }
}
