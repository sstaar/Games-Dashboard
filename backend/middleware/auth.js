const jwt = require('jsonwebtoken');
const Users = require("../controllers/users/users.json");

module.exports = async (request, response, next) => {

    // Taking the token from the header and making sure it exists
    const token = request.headers.authorization ? request.headers.authorization.split(' ')[1] : null; // Bearer <token>

    if (!token)
        return response.status(401).json({
            error: `Authentication error. Token required.`,
        })

    try {
        // Verify makes sure that the token hasn't expired and has been issued by us.
        const result = jwt.verify(token, "DASHBOARD");

        // Use the decoded token to make sure the user does exist
        const user = Users.find(item => item.id === result.id);
        if (!user)
            return response.status(401).json({
                error: `Authentication error.`
            });

        // Return the user id for other services to use
        // PS: This could change depending on what is needed by other services
        request.user = user;
        next();
    } catch (err) {
        // Throw an error just in case anything goes wrong with verification.
        return response.status(401).json({
            error: `Authentication error.`
        })
    }

};
