///author: Arturo Barajas Vega
///Create Date: 2-05-25



var lobId = 20305;
var ediConnectionId = 3;
var today = String(ediUtils.getDateFormatted(null, "YYYYMMdd"));

/////////////////////////////////////////////////////////////////////////////////////
// Initialize our Outbound EDI Document Model using Infoplus EDI Utils passing in: //
//    ediDocument - the document we are creating                                   //
//    2 - the ID of the EDI Connection we want to use                              //
//    "846" - The name of the EDI Document Type                                    //
//    "PO" - The functional identifier for our document                            //
//    false - Indicating we would like to not request acknowledgment               //
/////////////////////////////////////////////////////////////////////////////////////
utils.log("Creating and sending a custom outbound EDI 846 document.");
var ediDocument = infoplusApi.constructModel("ediDocument");
ediDocument = ediUtils.initializeOutboundDocumentModel(ediDocument, ediConnectionId, "846", "PO", true);

/////////////////////////////////////////////////////////////////////////////////
// populate the body of the document with the data we want in the EDI Document //
/////////////////////////////////////////////////////////////////////////////////
var body = JSON.parse(ediDocument.jsonBody);

var itemList = infoplusApi.search("item", "sku in ('ST-LMO-SKYTRA+','2472010','2472011','2473003','2474003','2474006','2474007','2472014','2472003','STP-ACC-CAS-SHIELD','2474004','2472012','ST-METALCASE','2472005')", null, 250, null);

for(var i=0; i<itemList.size(); i++)
{
    var item = itemList.get(i);

    body.push(["BIA", "00", "DD", "000", today]);
    body.push(["DTM", "040", today]);
    body.push(["LIN", "1", "SK", String(item.sku)]);
    body.push(["PID", "F", "", "", "", String(item.itemDescription)]);
    body.push(["SDQ", "EA", "54", "", String(item.w2AvailableQuantity)]);
}

body.push(["CTT", itemList.size()]);

//////////////////////////////////////////////////////////////////////////////////////////
// note: EDI document footers will be automatically generated and do not need populated //
//////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////
// set the populated body of the EDI Document we have created //
////////////////////////////////////////////////////////////////
utils.log("body: " + body);
ediDocument.jsonBody = JSON.stringify(body);
utils.log("json body: " + ediDocument.jsonBody);

/////////////////////////////////////////////
// store the EDI Document via Infoplus API //
/////////////////////////////////////////////
var ediDocument = infoplusApi.add("EDIDocument", ediDocument);

/////////////////////////////////////////////////////////////
// send the document to the partner via Infoplus EDI Utils //
/////////////////////////////////////////////////////////////
ediUtils.sendOutboundDocument(ediDocument);
utils.log("Done");