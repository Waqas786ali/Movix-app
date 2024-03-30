import axios from "axios";

const BASE_URL ='https://api.themoviedb.org/3';
const TMBD_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNDljY2IwNWNiYzUwOWYyNjliMjBmMTIwZmY2YWVmNSIsInN1YiI6IjY1NjQ5NGM0ZDk1NTRiMDEzYWYyZGE4NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HTNhgJ9Kzx0UQG9nsxzdxGnXYBuvQ5HVo73f05efc0A';

const headers = {
    Authorization:'bearer ' + TMBD_TOKEN,
};

export const fetchDataFormApi = async (url,params) => {
    try{
        const {data} = await axios.get(BASE_URL + url,{
             headers,
             params
        })
        return data;
    }catch(err){
        console.log(err);
        return err;
    }
}