//Update on Info Plus for Orders with Future Ship Dates Solution:
 
//Here is how the script works: 
//It is set to run every day during business hours and runs through every order we have in the On Order queue with the 1-Hour Processing Delay.
//If there is a First Ship Date in the Order for a future ship date, the script will automatically assign it a Hold Code of H to hold the order till a future date that matches the current day.
//If the First Ship Date is empty, the script will not get run.
//If the First Ship Date is equal to the current day, the script will automatically change the hold to Y and release the order from on hold.
//The fulfillment plan will still run as usual, processing orders that are 1 hour old and do not have any hold codes or hold tags in them.
//With all this, this will help ease the management of overseeing these orders.
 

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









