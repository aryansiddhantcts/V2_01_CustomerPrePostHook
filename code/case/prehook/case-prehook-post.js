module.exports = async function (req, res) {
    // Your code here
    const body = req.body;
    const zcurrentImage = body?.currentImage;
    const identifications = zcurrentImage?.identifications || [];
    // case pre-hook logic here
    res.json(body);
}
