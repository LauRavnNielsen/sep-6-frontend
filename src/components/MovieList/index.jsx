import { Select, Table, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';


const columns = [
  {
    title: 'Title',
    dataIndex: 'title',
  },
  {
    title: 'Director',
    dataIndex: 'director',
  },
  {
    title: 'Release Year',
    dataIndex: 'year',
  },
];

const MovieListTable = (username) => {
  const [data, setData] = useState([]);

  const [selectedList, setSelectedList] = useState("")

  function handleChange(value) {
    console.log(`selected ${value}`);
    setSelectedList(value);
  }

  const movielistsGetURL = (user) => `https://sep6-314408.ew.r.appspot.com/movieList/getMovieListForUser?userName=${user}`

  const movieListsParams = {
    method: "GET"
  }

  const [movieListsFetched, setMovieListsFetched] = useState([]);

  const movieListsGET = (url, params) => {
    fetch(url, params).then(data =>{return data.json()}).then(res=> (setMovieListsFetched(res.map((lists) => ({name: lists.listName})))));
  }

  useEffect(() => {
    movieListsGET(movielistsGetURL(username.username), movieListsParams)
  }, [username])


  const movielistsMoviesGetURL = (user, listname) => `https://sep6-314408.ew.r.appspot.com/toMovieList/getListsOfMovies?userName=${user}&listName=${listname}`

  const movieListsMoviesParams = {
    method: "GET"
  }

  const [movieListsMoviesFetched, setMovieListsMoviesFetched] = useState([]);

  const movieListsMoviesGET = (url, params) => {
    fetch(url, params).then(data =>{return data.json()}).then(res=> (setMovieListsMoviesFetched(res.map((movie) => ({title: movie.movieName, director: movie.director, year: movie.year})))));
  }

  useEffect(() => {
    movieListsMoviesGET(movielistsMoviesGetURL(username.username, selectedList), movieListsMoviesParams)
  }, [selectedList])

  useEffect(() => {
    let dataArray = []

    movieListsMoviesFetched.map((movie) => (dataArray.push({title: movie.title, director: movie.director, year: movie.year})))

    setData(dataArray)
  }, [movieListsMoviesFetched])

  return (
    <>
      <div style={{margin: 10}}>
        <Row>
          <div style={{marginRight: 10}}>
            <Select placeholder={"Select a movie list"} style={{ width: 240 }} onChange={handleChange} >
              {movieListsFetched.map((item) => (
                <Select.Option key={item.name} value={item.name}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </div>
        </Row>
      </div>
      <Table
        columns={columns}
        dataSource={data}
      />
    </>
  );
}

MovieListTable.propTypes = {
  username: PropTypes.string,
}

export default MovieListTable;