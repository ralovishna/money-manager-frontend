/**
 * Formats a number with thousands separators.
 *
 * @param {number|string} amount - The number or numeric string to format.
 * @returns {string} The formatted string with thousands separators, or the original input if invalid.
 */
export const addThousandsSeparator = (amount) => {
    // Early return for null or undefined
    if (amount === null || amount === undefined) {
        console.warn('addThousandsSeparator: Received null or undefined.');
        return '';
    }

    // Convert to string
    const strAmount = amount.toString().trim();

    // Handle empty string
    if (strAmount === '') {
        console.warn('addThousandsSeparator: Received empty string.');
        return '';
    }

    // Check if the string is a valid number
    const numericValue = Number(strAmount);
    if (isNaN(numericValue)) {
        console.warn(`addThousandsSeparator: "${strAmount}" is not a valid number.`);
        return strAmount; // or return ''; if you prefer to return empty on invalid input
    }

    // Separate integer and decimal parts
    const [integerPart, decimalPart] = strAmount.split('.');

    // Add commas to the integer part
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // Return the formatted number with preserved decimal part
    return decimalPart !== undefined
        ? `${formattedInteger}.${decimalPart}`
        : formattedInteger;
}

/**
 * Prepares line chart data from income transactions.
 *
 * @param {Array} transactions - List of transactions with { id, name, date, amount, categoryId }.
 * @returns {Array} Array of objects containing:
 *   - date {string} : Date string in YYYY-MM-DD format
 *   - totalAmt {number} : Total amount for that date
 *   - items {Array} : List of transactions for that date
 *   - month {string} : Month in YYYY-MM format
 */
export const prepareLineChartData = (transactions = []) => {
    if (!Array.isArray(transactions)) {
        console.warn('prepareIncomeLineChartData: Expected an array of transactions.');
        return [];
    }

    const grouped = transactions.reduce((acc, tx) => {
        if (!tx || !tx.date || isNaN(Number(tx.amount))) {
            console.warn('prepareIncomeLineChartData: Skipping invalid transaction:', tx);
            return acc;
        }

        const dateObj = new Date(tx.date);
        if (isNaN(dateObj)) {
            console.warn('prepareIncomeLineChartData: Invalid date in transaction:', tx);
            return acc;
        }

        const dateKey = dateObj.toISOString().split('T')[0]; // YYYY-MM-DD
        const monthKey = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}`; // YYYY-MM

        if (!acc[dateKey]) {
            acc[dateKey] = { date: dateKey, totalAmt: 0, items: [], month: monthKey };
        }

        acc[dateKey].totalAmt += Number(tx.amount);
        acc[dateKey].items.push(tx);

        return acc;
    }, {});

    // Convert grouped object to sorted array by date
    return Object.values(grouped).sort((a, b) => new Date(a.date) - new Date(b.date));
};
