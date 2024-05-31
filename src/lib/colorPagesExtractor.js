export const extractColorPages = (input, totalPages) => {
    input = input.trim();
    let pageRanges = input.split(/[\s,]+/).filter(str => str !== '');

    let colorPages = [];
    let encounteredPages = new Set();

    const pageRegex = /^[1-9]\d*$/; 

    for (let range of pageRanges) {
        let pages = range.split("-");

        if (pages.length === 1) {
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
            let start = parseInt(pages[0]);
            let end = parseInt(pages[1]);

            if (!pageRegex.test(start) || !pageRegex.test(end) || start < 1 || end < start || end > totalPages) {
                return {
                    success: false,
                    msg: "Error: Invalid page range. Please enter valid page numbers within the range of 1 to " + totalPages + ".",
                };
            }

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
