	
function Quirk(title, geoLoc, sentiment, description, numReviews, specialAccess) {

		if (typeof(title)==='undefined') title = "fillme";
		if (typeof(geoLoc)==='undefined') geoLoc = "fillme";
		if (typeof(sentiment)==='undefined') sentiment = "fillme";
		if (typeof(description)==='undefined') description = "fillme";
		if (typeof(numReviews)==='undefined') numReviews = "fillme";
		if (typeof(specialAccess)==='undefined') specialAccess = "fillme";

		this.title = title;
		this.geoLoc = geoLoc;
		this.sentiment = sentiment;
		this.description = description;
		this.numReviews = numReviews;
		this.specialAccess = specialAccess;
};
module.exports = Quirk;