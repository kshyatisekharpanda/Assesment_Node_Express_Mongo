import * as commentService from '../helpers/commentHelper';


//All for Comments Related Operations

/*All methods are for return the req to the specified helper
methods and recieve the promises for send the response.*/

const addComment = (req, res) => {
  commentService.addComment(req, res)
    .then((response) => {
      res.status(response.status).json({
        data: response.data
      });
    })
    .catch((err) => {
      res.status(err.status).json(err.message);
    });
}

const editComment = (req, res) => {
  commentService.editComment(req, res)
    .then((response) => {
      res.status(response.status).json({
        data: response.data
      });
    })
    .catch((err) => {
      res.status(err.status).json(err.message);
    });
}

const deleteComment = (req, res) => {
  commentService.deleteComment(req, res)
    .then((response) => {
      res.status(response.status).json({
        data: response.data
      });
    })
    .catch((err) => {
      res.status(err.status).json(err.message);
    });
}

const addLikeDislike = (req, res) => {
  commentService.addLikeDislike(req, res)
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
  addComment,
  editComment,
  deleteComment,
  addLikeDislike
}
