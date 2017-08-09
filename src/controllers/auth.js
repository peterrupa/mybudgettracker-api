export const authenticate = (req, res) => {
    // @TODO: set client url
    res.redirect('http://localhost:3000/');
};

export const whoami = (req, res) => {
    res.send(req.user);
};

export const logout = (req, res) => {
    req.logout();

    res.send({
        message: 'Successfully logged out.'
    });
};
