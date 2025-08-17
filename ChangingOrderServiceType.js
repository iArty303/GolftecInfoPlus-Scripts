///To change the warehouse service type to RMA Order on insert into IP
///author: Arturo Vega
//Create Date: 6/10/2025
    
if (record && record.warehouseServiceTypeId !== 1) {

 record.warehouseServiceTypeId = 100;

 infoplusApi.update("order", record);

}