import axios from "axios";

const API_KEY = "10923b261ba94d897ac6b81148314a3f";
const BASE_PATH = "https://api.themoviedb.org/3";

export interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
}

export interface IGetMoviesResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export function getMovies() {
  return axios
    .get(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`)
    .then((response) => response.data);
}

export function getTvLatest() {
  return axios
    .get(`${BASE_PATH}/tv/latest?api_key=${API_KEY}`)
    .then((response) => response.data);
}

export function getTvAiringToday() {
  return axios
    .get(`${BASE_PATH}/tv/airing_today?api_key=${API_KEY}`)
    .then((response) => response.data);
}

export function getTvPopular() {
  return axios
    .get(`${BASE_PATH}/tv/popular?api_key=${API_KEY}`)
    .then((response) => response.data);
}

export function getTvTopRated() {
  return axios
    .get(`${BASE_PATH}/tv/top_rated?api_key=${API_KEY}`)
    .then((response) => response.data);
}

export function getMovieSearch(tv_id: any) {
  return axios
    .get(`${BASE_PATH}/search/movie?api_key=${API_KEY}&query=${tv_id}&page=1`)
    .then((response) => response.data);
}

export function getTvSearch(tv_id: any) {
  return axios
    .get(`${BASE_PATH}/search/tv?api_key=${API_KEY}&query=${tv_id}&page=1`)
    .then((response) => response.data);
}
