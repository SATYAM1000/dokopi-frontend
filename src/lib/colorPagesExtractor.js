export const extractColorPages = (input, totalPages) => {
    // Remove leading and trailing spaces
    input = input.trim();


    // Split the input string by commas or hyphens, and filter out empty strings
    let pageRanges = input.split(/[\s,]+/).filter(str => str !== '');

    let colorPages = [];
    let encounteredPages = new Set();

    // Regular expression to match valid page numbers
    const pageRegex = /^[1-9]\d*$/; // Only accept positive integers

    // Iterate through each page range
    for (let range of pageRanges) {
        // Split the range by hyphen to get start and end page numbers
        let pages = range.split("-");

        // Ensure the range has valid format (either single page number or start-end)
        if (pages.length === 1) {
            // Single page number
            let pageNumber = parseInt(pages[0]);
            if (!pageRegex.test(pageNumber) || pageNumber < 1 || pageNumber > totalPages) {
                return {
                    success: false,
                    msg: "Error: Invalid page number. Page number should be a positive integer within the range of 1 to " + totalPages + ".",
                };
            }
            if (!encounteredPages.has(pageNumber)) {
                colorPages.push(pageNumber);
                encounteredPages.add(pageNumber);
            }
        } else if (pages.length === 2) {
            // Page range
            let start = parseInt(pages[0]);
            let end = parseInt(pages[1]);

            // Validate start and end page numbers
            if (!pageRegex.test(start) || !pageRegex.test(end) || start < 1 || end < start || end > totalPages) {
                return {
                    success: false,
                    msg: "Error: Invalid page range. Please enter valid page numbers within the range of 1 to " + totalPages + ".",
                };
            }

            // Add pages within the range to colorPages array, avoiding duplicates
            for (let i = start; i <= end; i++) {
                if (!encounteredPages.has(i)) {
                    colorPages.push(i);
                    encounteredPages.add(i);
                }
            }
        } else {
            return {
                success: false,
                msg: "Error: Invalid input format. Please enter page numbers separated by hyphen or comma.",
            };
        }
    }

    return {
        success: true,
        data: colorPages,
    };
};
