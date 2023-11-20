export const extractPriceForOne = (text: string): number => {
    const indexOfDollarSign = text.indexOf('$');

    if (indexOfDollarSign !== -1) {
        const priceAndRest = text.substring(indexOfDollarSign + 1);
        const indexOfSpace = priceAndRest.indexOf(' ');

        if (indexOfSpace !== -1) {
            return +priceAndRest.substring(0, indexOfSpace);
        }
    }
};
