module.exports = async function (req, res) {
    let body = req.body;
    let zcurrentImage = body?.currentImage;
    let zbeforeImage = body?.beforeImage;
    let zoperation = body?.context?.operation; // UPDATE CREATE_DRAFT..
    let zentity = body?.entity;
    var zpin = '';
    if (zentity?.toLowerCase().includes('account')) {
        zpin = 'account';
    }
    if (zentity?.toLowerCase().includes('individualcustomer')) {
        zpin = 'person';
    }
    // Pre hook trigger on save use to default/determine the custom/standard field
    // //--1. Udpate classification
    //zcurrentImage.customerABCClassification = 'B';
    //--2. IMPORTANT for any sub nodes existence check if ID type tag exists in current image
    let zupdpin = false;
    if (!zbeforeImage.identifications || zbeforeImage.identifications === undefined) {
        //zupdpin = true;
    }
    if (!zcurrentImage.identifications || zcurrentImage.identifications === undefined) {
        zcurrentImage.identifications = [];
        zupdpin = true;
    }
    else {
        let pinexist = zcurrentImage?.identifications?.filter(i => i.type === 'Z004');
        //filter always returns an array, never null or never undefined so check on length
        if (pinexist.length === 0) {
            zupdpin = true;
        }
    }
    if (zupdpin === true) {
        zcurrentImage?.identifications.push({
            "type": 'Z004',
            "identificationId": 'Welcome@12345' + zpin,
            "validFrom": '0001-01-01',
            "validTo": '9999-12-31'
        });
    }
    //--2.1 update multiple id type PIN using filter
    // let zpinAll = zcurrentImage?.identifications.filter(i => i.type === 'Z004');
    // if (zpinAll.length > 0)
    // {
    // zpinAll.forEach((x,index) => {
    //     x.identificationId = "12345678" + index;
    // });
    // }
    //--2.2 if no pin exists, create new one

    //--2.3 update single id type using find
    // let zpin = zcurrentImage?.identifications.find(i => i.type === 'Z004');
    // if(zpin)
    // {
    //     zpin.identificationId = 'Testing update123';
    // }
    //--3 Address update
    // if (!zcurrentImage.addresses || zcurrentImage.addresses === undefined) {
    //     zcurrentImage.addresses = [];
    // }
    // else {
    //     var zadd = zcurrentImage?.addresses?.filter(i => i.isDefaultAddress === true);
    //     zadd.forEach(x => {
    //         x.streetName = "BTP Circle"
    //     });
    // }
    const zresponse = {
        "data": zcurrentImage
    };
    res.status(200).json(zresponse);
}
