import * as userService from '../helpers/userHelper';

//All for User Related Operations

/*All methods are for return the req to the specified helper
methods and recieve the promises for send the response.*/

const userRegister = (req, res) => {
  userService.userRegister(req, res)
    .then((response) => {
      res.status(response.status).json({
        data: response.data
      });
    })
    .catch((err) => {
      res.status(err.status).json(err.message);
    });
}
const userLogin = (req, res) => {
  userService.userLogin(req, res)
    .then((response) => {
      res.status(response.status).json({
        data: response.data
      });
    })
    .catch((err) => {
      res.status(err.status).json(err.message);
    });
}

const userLogout = (req, res) => {
  userService.userLogout(req, res)
    .then((response) => {
      res.status(response.status).json({
        data: response.data
      });
    })
    .catch((err) => {
      res.status(err.status).json(err.message);
    });
}


export {
  userLogin,
  userRegister,
  userLogout
}
