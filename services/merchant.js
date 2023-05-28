import axios from 'axios';
const post = async (payload) => {
    let authKey = JSON.parse(localStorage.getItem("login"));
    let token = "Bearer " + authKey.access_token;
    
    try {
      return axios({
        url: "https://portal.payprocc.com/api/merchant",
        headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: token,
        },
        data: payload,
        method: "POST",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const postContacts = async (contacts) => {
    let authKey = JSON.parse(localStorage.getItem("login"));
    let token = "Bearer " + authKey.access_token;
    
    const promises = contacts.map(_contact => {
      return axios({
        url: "https://portal.payprocc.com/api/contact",
        headers: {
        'Content-Type': 'application/json',
        Authorization: token,
        },
        data: _contact,
        method: "POST",
      });
    })
    return Promise.all(promises).then(response => {
      return response.map(res => res.data.Data)
    });
  };





export default {
    post,
    postContacts
}