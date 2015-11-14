	
function Quirk(title, geoLoc, sentiment, description, numReviews, specialAccess) {
		this.title = title;
		this.geoLoc = geoLoc;
		this.sentiment = sentiment;
		this.description = description;
		this.numReviews = numReviews;
		this.specialAccess = specialAccess;
};
module.exports = Quirk;