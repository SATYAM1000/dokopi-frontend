 export function extractColorPages(input) {
    const parts = input.split(',').map(part => part.trim());
    
    const colorPages = [];
    parts.forEach(part => {
        // If part contains a hyphen, it's a range
        if (part.includes('-')) {
            const [start, end] = part.split('-').map(num => parseInt(num));
            // Add pages in range to colorPages array
            for (let i = start; i <= end; i++) {
                colorPages.push(i);
            }
        } else {
            // If not a range, add the single page number to colorPages array
            const pageNumber = parseInt(part);
            if (!isNaN(pageNumber)) {
                colorPages.push(pageNumber);
            }
        }
    });
    
    return colorPages;
}
