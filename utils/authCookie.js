const authCookie = (jwtToken, res) => {
    res.cookie('token', jwtToken, {
        maxAge: process.env.COOKIE_EXPIRE_DAY * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development'
    })
}

export default authCookie;