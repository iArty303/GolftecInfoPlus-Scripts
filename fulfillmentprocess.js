

// Getting Current Date and formatting to only year, month, and day.
var today = new Date();
var year = today.getFullYear();
var month = today.getMonth() + 1; 
var day = today.getDate();
var formattedDate = year + '-' + month + '-' + day;

// Check if order.firstShipDate exists and is a valid date
if (!order.firstShipDate || isNaN(new Date(order.firstShipDate).getTime())) {
    utils.log("No valid firstShipDate found. Exiting function.");
    return; // Exit the function early
}

// Getting Order First Ship Date and formatting to only year, month, and day
var firstShippedDate = new Date(order.firstShipDate);
var year2 = firstShippedDate.getFullYear();
var month2 = firstShippedDate.getMonth() + 1;
var day2 = firstShippedDate.getDate();
var formatFirstShipDate = year2 + '-' + month2 + '-' + day2;

// Compare dates
if (formattedDate != formatFirstShipDate) {
    record.holdCode = "H"; 
    infoplusApi.update("order", record);
    utils.log("Order is on hold till later date due, changing hold code to H");
} else if (formattedDate === formatFirstShipDate) {
    record.holdCode = "Y";
    infoplusApi.update("order", record);
    utils.log("Order is ready to ship, changing Hold code to Y");
}









