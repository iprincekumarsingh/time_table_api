exports.home = (req, res) => {
   return res.status(200).json({
        message: 'Home Route'
    })
}