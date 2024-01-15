import axios from "axios"

// Get Venues
export const getVenues = async (): Promise<any> => {
    return await axios.get(`/api/view/venues-get`)
        .then(response => {
            return response.data
        })
        .catch(error => {
            console.log(error)
            return []
        })
}