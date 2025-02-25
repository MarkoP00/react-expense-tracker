import callToast from "./CallToast";

export default async function np(id, selectedMonth) {
  let fetchSuccess = true;
  try {
    const response = await fetch(
      `https://react-expense-ea526-default-rtdb.firebaseio.com/transactions/${selectedMonth}/${id}.json`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error(
        "Failed to delete the transaction.",
        `Error: ${response.message}`
      );
    }
    callToast("success", "Transaction deleted successfully.");
  } catch (error) {
    fetchSuccess = false;
    callToast("error", `Something went wrong... Error: ${response.error}`);
  }
  return fetchSuccess;
}
