module.exports = async function (req, res) {
    let body = req.body;
    let zcurrentImage = body?.currentImage;
    let zbeforeImage = body?.beforeImage;
    let zoperation = body?.context?.operation; // UPDATE, CREATE_DRAFT ..
    let zentity = body?.entity;
    if (zentity?.toLowerCase().includes('account')) {
    }
    if (zentity?.toLowerCase().includes('individualcustomer')) {
    }
    var zoutput = {
        "data": zcurrentImage
    }
    if (!zcurrentImage.identifications || zcurrentImage.identifications === undefined) {
        //zcurrentImage.identifications = [];
        zoutput = {
            "data": zcurrentImage,
            "info": [{
                "code": "",
                "message": "Please add Pin ID type",
                "target": "",
                "severity": "INFO"
            }]
        }
    }
    else {
        let zpin = zcurrentImage?.identifications?.filter(i => i.type === 'Z004');
        if (zpin.length > 0) {
            zpin.forEach(y => {
                if (y.identificationId.length < 4) {
                    zoutput = {
                        "data": zcurrentImage,
                        "info": [{
                            "code": "",
                            "message": "Pin Length should be more than 4 characters",
                            "target": "",
                            "severity": "INFO"
                        }]
                    }
                }
            });
        }
        else {
            zoutput = {
                "data": zcurrentImage,
                "info": [{
                    "code": "",
                    "message": "Please add Pin ID type",
                    "target": "",
                    "severity": "INFO"
                }]
            }
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
