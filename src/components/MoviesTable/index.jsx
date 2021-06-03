import { Table, Button, Input, Row, Modal, Form, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';


const columns = [
  {
    title: 'Title',
    dataIndex: 'title',
    width: '10%',
  },
  {
    title: 'Rating',
    dataIndex: 'rating',
    width: '7%',
  },
  {
    title: 'Vote Count',
    dataIndex: 'voteCount',
    width: '7%',
  },
  {
    title: 'Director',
    dataIndex: 'director',
    width: '7%',
  },
  {
    title: 'Release date',
    dataIndex: 'release',
    width: '9%',
  },
  {
    title: 'Stars',
    dataIndex: 'stars',
    ellipsis: true,
    width: '60%',
  },
];

const columns2 = [
  {
    title: 'Title',
    dataIndex: 'title',
    width: '10%',
  },
  {
    title: 'Rating',
    dataIndex: 'rating',
    width: '7%',
  },
];

const MovieTable = (username) => {
  const [items, setItems] = useState([]);
  const [director, setDirector] = useState([]);
  const [cast, setCast] = useState([]);

  const [data, setData] = useState([]);


  const [showModal, setShowModal] = useState(false)
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onFinish = (values: any) => {
    console.log('Success:', values);

    createMovieList(createMovieListURL( username.username ,values.listname ), createMovieListParams)
  };

  const createMovieListURL = (user, listname) => `https://sep6-314408.ew.r.appspot.com/movieList/AddMovieList?listName=${listname}&userName=${user}`

  const createMovieListParams = {
    method: "POST"
  }

  const createMovieList = (url, params) => {
    fetch(url, params).then(data =>{return data.json()}).then(res=> (setShowModal(true))).catch(error=>(setShowModal(false)));
  }

  useEffect(() => {
    let dataArray = [];

    items.forEach((element, index) => {
      dataArray.push({
        key: index,
        title: element.title,
        rating: element.rating,
        voteCount: element.voteCount,
        release: element.release,
        director: director[index],
        stars: cast[index],
      })
    })

    setData(dataArray)
  }, [cast, director])

  useEffect(() => {
    console.log("has changed", items)

    items.forEach((element) => {
      let id = element.id;
      fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=aab093ed243a0b5b462c3a4e1eab2372&language=en-US`)
        .then(res => res.json())
        .then(
          (result) => {
            setCast(prevState => ([...prevState, result.cast.map((stars) => (stars.name)).join(", ")]))
            setDirector(prevState => ([...prevState, result.crew.map((people) => ({ job: people.job, name: people.name })).find(element => element.job === "Director")?.name || '-']))
          },
          (error) => {
            console.log(error);
          }
        )
    })

  },[items])


  const fetchDataOnSearch = (searchString) => {
    setDirector([]);
    setCast([]);
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=aab093ed243a0b5b462c3a4e1eab2372&language=en-US&query=${searchString}&page=1&include_adult=false`)
      .then(res => res.json())
      .then(
        (result) => {
          setItems(result.results.map((movies) => ({
            id: movies.id,
            title: movies.title,
            release: movies.release_date,
            rating: movies.vote_average,
            voteCount: movies.vote_count
          })));
        },
        (error) => {
          console.log(error)
        }
      )
  }

  const [selectedMovies, setSelectedMovies] = useState([])
  const [showListModal, setShowListModal] = useState(false)

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      setSelectedMovies(selectedRows);
    },
    getCheckboxProps: (record: DataType) => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };

  function handleChange(value) {
    console.log(`selected ${value}`);
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
  }, [username, showListModal])

  const onFinishFailedList = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onFinishListList = (values: any) => {
    console.log('Success:', values);

    selectedMovies.map((movie) => (addToMovieList(addToMovieListURL( 1, movie.title , username.username ,values.listname ), addToMovieListParams)))
  };

  const addToMovieListURL = (row, moviename, username, listname) => `https://sep6-314408.ew.r.appspot.com/toMovieList/AddMovie?row=${row}&movieName=${moviename}&userName=${username}&listName=${listname}`

  const addToMovieListParams = {
    method: "POST"
  }

  const addToMovieList = (url, params) => {
    fetch(url, params).then(data =>{return data.json()}).then(res=> (setShowListModal(true))).catch(error=>(setShowListModal(false)));
  }

    return (
      <>
        <div style={{margin: 10}}>
          <Row>
            <div style={{marginRight: 10}}>
              <Input.Search onSearch={(searchString) => fetchDataOnSearch(searchString)} enterButton />
            </div>
            <div style={{marginRight: 10}}>
              <Button type={"primary"} onClick={() => {setShowModal(true)}}> Create Movie List</Button>
            </div>
            <div style={{marginRight: 10}}>
              <Button type={"primary"} onClick={() => {setShowListModal(selectedMovies)}}> Add To Movie List</Button>
            </div>
          </Row>
        </div>
        <Table
          columns={columns}
          dataSource={data}
          rowSelection={{
            ...rowSelection,
          }}
        />
        <Modal visible={showModal} title={"Create Move List"} width={720} centered onCancel={() => setShowModal(false)} footer={""}>
          <Form
            layout={"vertical"}
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Movie list name"
              name="listname"
              rules={[{ required: true, message: 'Please input a name for your movie list!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        <Modal visible={showListModal} title={"Add To Move List"} width={720} centered onCancel={() => setShowListModal(false)} footer={""}>
          <Form
            layout={"vertical"}
            name="basic"
            onFinish={onFinishListList}
            onFinishFailed={onFinishFailedList}
          >
            <Form.Item
              label="Movie list name"
              name="listname"
              rules={[{ required: true, message: 'Please Select a movie list!' }]}
            >
              <Select placeholder={"Select a movie list"} style={{ width: 240 }} onChange={handleChange} >
                {movieListsFetched.map((item) => (
                  <Select.Option key={item.name} value={item.name}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Movies"
              name="movies"
            >
              <Table
                columns={columns2}
                dataSource={selectedMovies}
              />
            </Form.Item>
            <Form.Item >
              <Button type="primary" htmlType="submit">
                Add to list
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        </>
    );
}

MovieTable.propTypes = {
  username: PropTypes.string,
}

export default MovieTable;