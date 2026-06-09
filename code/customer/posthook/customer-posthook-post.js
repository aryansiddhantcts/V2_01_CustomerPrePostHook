const { executeHttpRequest } = require('@sap-cloud-sdk/http-client');

module.exports = async function (req, res) {
    let body = req.body;
    // Read incoming post payload
    let zcurrentImage = body?.currentImage;
    let zbeforeImage = body?.beforeImage;
    let zoperation = body?.context?.operation; // UPDATE, CREATE_DRAFT ..
    let zentity = body?.entity;

    // ─────────────────────────────────────────
    // STEP 1: Get BP ID from currentImage
    // ─────────────────────────────────────────
    const zbpId = zcurrentImage?.displayId;
    // "3101000737" ← from your payload

    console.log('BP ID from currentImage:', zbpId);

    // ─────────────────────────────────────────
    // STEP 2: Call S/4 API_BUSINESS_PARTNER
    // ─────────────────────────────────────────
    let zbpData = null;
    try {
        if (zbpId) {
            const zs4Response = await executeHttpRequest(
                {
                    destinationName: 'CXB400'
                },
                {
                    method: 'GET',
                    url: `/sap/opu/odata/sap/API_BUSINESS_PARTNER/A_BusinessPartner('${zbpId}')`,
                    params: {
                        '$format': 'json'//,
                        // '$select': [
                        //     'BusinessPartner',
                        //     'FirstName',
                        //     'LastName',
                        //     'BusinessPartnerName',
                        //     'BusinessPartnerType',
                        //     'BusinessPartnerIsBlocked',
                        //     'BirthDate'
                        // ].join(',')
                    }
                }
            );

            zbpData = zs4Response.data?.d;
            console.log('S/4 BP fetched successfully:', zbpData?.BusinessPartnerName);
        }

    } catch (zs4Error) {
        console.error('S/4 call failed:', zs4Error.message);
    }

    // ─────────────────────────────────────────
    // STEP 3: Your existing PIN validation
    // ─────────────────────────────────────────
    var zoutput = {
        "data": zcurrentImage,
        "info": [],
        "error": []
    };

    if (zentity?.toLowerCase().includes('account')) {
    }
    if (zentity?.toLowerCase().includes('individualcustomer')) {
    }

    //custom field determinationand validation - credit check 
    // let zTriggerCreditCheck = zcurrentImage?.extensions?.TriggerCreditCheck;
    // if (zTriggerCreditCheck === true) {
    //     let CreditScore = zcurrentImage?.extensions?.CreditScore;
    //     //const zNewScore = zExistingScore + 2;
    //     // Update currentImage
    //     zcurrentImage.extensions.CreditScore = zbpData?.IndependentAddressID;
    //     zcurrentImage.extensions.TriggerCreditCheck = false;  // ← set to false
    //     zoutput.info.push({
    //         "code": "",
    //         "message": "Credit score check done",
    //         "target": "",
    //         "severity": "INFO"
    //     });
    // }

    // Message validations
    if (!zcurrentImage.identifications || zcurrentImage.identifications === undefined) {
        //zcurrentImage.identifications = [];
        zoutput.info.push({
            "code": "",
            "message": `Please add Pin ID type for ${zbpData?.BusinessPartnerName || zbpId}`,
            "target": "",
            "severity": "INFO"
        });
    }
    else {
        let zpin = zcurrentImage?.identifications?.filter(i => i.type === 'Z004');
        if (zpin.length > 0) {
            zpin.forEach(y => {
                if (y.identificationId.length < 4) {
                    zoutput.info.push({
                        "code": "",
                        "message": `Pin length should be at least 4 for ${zbpData?.BusinessPartnerName || zbpId}`,
                        "target": "",
                        "severity": "INFO"
                    });
                }
            });
        }
        else {
            zoutput.info.push({
                "code": "",
                "message": `Please add Pin ID type for ${zbpData?.BusinessPartnerName || zbpId}`,
                "target": "",
                "severity": "INFO"
            });
        }
    }
    res.status(200).json(zoutput);
    // let zoutput = {
    //     "data": zcurrentImage,
    //     "info": [
    // {
    //     "code": "",
    //     "message": "message 1",
    //     "target": "",
    //     "severity": "WARNING"
    // },
    // {
    //     "code": "",
    //     "message": "BTP POst hook",
    //     "target": "",
    //     "severity": "INFO"
    // }
    // ],
    // "error": [
    // {
    //     "code": "",
    //     "message": "message Error",
    //     "target": "",
    //     "severity": "ERROR"
    // }
    //     ]
    // };
}
