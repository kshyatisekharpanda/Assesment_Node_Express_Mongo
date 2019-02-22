import * as blogService from '../helpers/blogHelper';


//All for Blog Related Operations

/*All methods are for return the req to the specified helper
methods and recieve the promises for send the response.*/

const addBlog = (req, res) => {
  blogService.addBlog(req, res)
    .then((response) => {
      res.status(response.status).json({
        data: response.data
      });
    })
    .catch((err) => {
      res.status(err.status).json(err.message);
    });
}

const editBlog = (req, res) => {
  blogService.editBlog(req, res)
    .then((response) => {
      res.status(response.status).json({
        data: response.data
      });
    })
    .catch((err) => {
      res.status(err.status).json(err.message);
    });
}

const deleteBlog = (req, res) => {
  blogService.deleteBlog(req, res)
    .then((response) => {
      res.status(response.status).json({
        data: response.data
      });
    })
    .catch((err) => {
      res.status(err.status).json(err.message);
    });
}

const getAllBlog = (req, res) => {
  blogService.getAllBlog(req, res)
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
  getAllBlog,
  deleteBlog,
  editBlog,
  addBlog
}
