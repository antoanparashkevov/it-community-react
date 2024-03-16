const getUserData = (user, token) => {
    if ( user && token ) {
        return {
            userData: {
                ...user,
                hasData: true
            },
            token
        }
    }
    return {
        userData: {
            roles: [],
            email: '',
            _id: '',
            hasData: false,
        },
        token: ''
    };
}

module.exports = getUserData;