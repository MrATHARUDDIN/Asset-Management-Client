import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://asset-server-side.vercel.app/'
})

const useAxiosPublic = () => {
    return axiosPublic;
}; 

export default useAxiosPublic;