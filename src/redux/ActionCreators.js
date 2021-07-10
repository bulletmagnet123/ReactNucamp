import * as ActionTypes from "./ActionTypes";
import { baseUrl } from '../shared/baseUrl';

export const addComment = (campsiteId, rating, author, text) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: {
    campsiteId: campsiteId,
    rating: rating,
    author: author,
    text: text,
  },
});

export const fetchCampsites = () => (dispatch) => {
  dispatch(campsitesLoading());

  return fetch(baseUrl + "campsites")
    .then((response) => response.json())
    .then((campsites) => dispatch(addCampsites(campsites)));
};

export const campsitesLoading = () => ({
  type: ActionTypes.CAMPSITES_LOADING
});

export const campsitesFailed = errMess => ({
  type: ActionTypes.CAMPSITES_FAILED,
  payload: errMess
});

export const addCampsites = campsites => ({
  type: ActionTypes.ADD_CAMPSITES,
  payload: campsites 
});

export const fetchComments = () => (dispatch) => {
  return fetch(baseUrl + "comments")
    .then((response) => response.json())
    .then((comments) => dispatch(addComments(comments)));
};

export const commentsFailed = (errMess) => ({
  type: ActionTypes.COMMENTS_FAILED,
  payload: errMess,
});

export const addComments = (comments) => ({
  type: ActionTypes.ADD_COMMENTS,
  payload: comments,
});

export const fetchPromotions = () => (dispatch) => {
  dispatch(promotionsLoading());

  return fetch(baseUrl + "promotions")
    .then((response) => response.json())
    .then((promotions) => dispatch(addPromotions(promotions)));
};

export const promotionsLoading = () => ({
  type: ActionTypes.PROMOTIONS_LOADING,
});

export const promotionsFailed = (errMess) => ({
  type: ActionTypes.PROMOTIONS_FAILED,
  payload: errMess,
});

export const addPromotions = (promotions) => ({
  type: ActionTypes.ADD_PROMOTIONS,
  payload: promotions,
});

export const fetchPartners = () => (dispatch) => {

  dispatch(partnersLoading());

  return fetch(baseUrl + "partners")
    .then((response) => response.json())
    .then((partners) => dispatch(addPartners(partners)))
    .catch(error => dispatch(partnersFailed(error.message)))
};

export const partnersLoading = () => ({
  type: ActionTypes.PARTNERS_LOADING,
});

export const partnersFailed = (errMess) => ({
  type: ActionTypes.PARTNERS_FAILED,
  payload: errMess,
});

export const addPartners = (promotions) => ({
  type: ActionTypes.ADD_PARTNERS,
  payload: promotions,
});
export const postFeedback = (feedback) => (dispatch) => {

  return fetch(baseUrl + "feedback", {
    method: "POST",
    body: JSON.stringify(feedback),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(response => { 
      if (response.ok){
        return alert("Thank you for your feedback")
      } else {
        const err = new Error(`${response.status}: ${response.statusText}`)
      }
    })
    .then((response) => response.json())
    .catch((error) => {
      console.log("post comment", error.message);
      alert("Your comment could not be posted\nError: " + error.message);
    });
};

