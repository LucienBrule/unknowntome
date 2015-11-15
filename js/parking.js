    
function Parking(title, start, stop) {

        if (typeof(title)==='undefined') title = "fillme";
        if (typeof(start)==='undefined') start = "fillme";
        if (typeof(stop)==='undefined') stop = "fillme";

        this.title = title;
        this.start = start;
        this.stop = stop;
};
module.exports = Parking;