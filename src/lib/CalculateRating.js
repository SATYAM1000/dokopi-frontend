export const CalculateRating = (RatingArray) => {
    let TotalStar = 0
    if (RatingArray.length <= 0) {
        return TotalStar;
    }
    RatingArray.map((reviewData) => {
        TotalStar = TotalStar + reviewData.rating ? reviewData.rating : 0
    })
    return TotalStar / RatingArray.length
}