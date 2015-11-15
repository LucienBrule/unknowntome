    
function Bathroom(title, geoloc, sentiment, description, numreviews, specialaccess) {

        if (typeof(title)==='undefined') title = "fillme";
        if (typeof(geoloc)==='undefined') geoLoc = "fillme";
        if (typeof(sentiment)==='undefined') sentiment = "fillme";
        if (typeof(description)==='undefined') description = "fillme";
        if (typeof(numreviews)==='undefined') numreviews = "fillme";
        if (typeof(specialaccess)==='undefined') specialaccess = "fillme";
        if (typeof(specialaccess)==='undefined') specialaccess = "fillme";

        this.title = title;
        this.geoloc = geoloc;
        this.sentiment = sentiment;
        this.description = description;
        this.numreviews = numreviews;
        this.specialaccess = specialaccess;
};
module.exports = Bathroom;