///To change the priority of what orders get priotize for inventory allocation for important customers
///author: Arturo Vega
//Create Date: 3/14/2025


 
 if (record.priorityCode != "20") {
   record.priorityCode = "20";
   infoplusApi.update("order", record);
}