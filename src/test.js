import axios from 'axios'

const exchangeTokenForAuth = (history) => {
    return (dispatch) => {
        const token = window.localStorage.getItem('token');
        if (!token) {
            return
        }
        return axios.get('/api/auth', {
                headers: {
                    authorization: token
                }
            })
            .then(response => response.data)
            .then(auth => {
                dispatch(_setAuth(auth))
                if (history) {
                    history.push('/users');
                }
            })
            .catch(ex => window.localStorage.removeItem('token'))
    }
}

const logout = () => {
    window.localStorage.removeItem('token');
    return _setAuth({});
}

const login = (credentials, history) => {
    return (dispatch) => {
        return axios.post('/api/auth', credentials)
            .then(response => response.data)
            .then(data => {
                window.localStorage.setItem('token', data.token);
                dispatch(exchangeTokenForAuth(history));
            })
    }
};

///////////////////////////////////////////////////

app.use(require('body-parser').json());

app.use((req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return next();
    }
    let id;
    try {
        id = jwt.decode(token, process.env.JWT_SECRET).id;
    }
    catch (ex) {
        return next({ status: 401 });
    }
    User.findById(id)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(next);
});

app.post('/api/auth', (req, res, next) => {
    const { name, password } = req.body;
    User.findOne({
            where: { name, password }
        })
        .then(user => {
            if (!user) {
                return next({ status: 401 });
            }
            const token = jwt.encode({ id: user.id }, process.env.JWT_SECRET);
            res.send({ token });
        })
        .catch(next);
});

app.get('/api/auth', (req, res, next) => {
    if (!req.user) {
        return next({ status: 401 });
    }
    res.send(req.user);
});
