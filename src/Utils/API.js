import axios from "axios";

const BASEURL = "http://rximage.nlm.nih.gov/api/rximage/1/rxnav?&resolution=300&name=";


// Export an object with a "search" method that searches the Giphy API for the passed query
export default {
  search: function(query) {
    return axios.get(BASEURL + query);
  }
};