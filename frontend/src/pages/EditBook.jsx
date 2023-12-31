import { useState, useEffect } from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'

const EditBook = () => {
  const { enqueueSnackbar } = useSnackbar()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [publishYear, setPublishYear] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { id } = useParams()
  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear,
    }
    setLoading(true)
    axios
      .put(`https://mern-bookstore-backend.vercel.app/books/${id}`, data)
      .then(() => {
        setLoading(false)
        enqueueSnackbar('Book Edited Successfully', { variant: 'success' })
        navigate('/')
      })
      .catch(err => {
        setLoading(false)
        enqueueSnackbar('Error', { variant: 'error' })
        // alert('An error happend. Please check the console')
        console.log(err)
      })
  }
  useEffect(() => {
    setLoading(true)
    axios
      .get(`https://mern-bookstore-backend.vercel.app/books/${id}`)
      .then(res => {
        setTitle(res.data.book.title)
        setAuthor(res.data.book.author)
        setPublishYear(res.data.book.publishYear)
        setLoading(false)
        console.log(res.data.book)
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })
  }, [])
  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Edit Book</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Title</label>
          <input
            type='text'
            value={title}
            onChange={e => setTitle(e.target.value)}
            className='border-2 border-gray-500 w-full px-4 py-2'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Author</label>
          <input
            type='text'
            value={author}
            onChange={e => setAuthor(e.target.value)}
            className='border-2 border-gray-500 w-full px-4 py-2'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
          <input
            type='text'
            value={publishYear}
            onChange={e => setPublishYear(e.target.value)}
            className='border-2 border-gray-500 w-full px-4 py-2'
          />
        </div>
        <button className=' m-8 p-2 bg-sky-300' onClick={handleEditBook}>
          Save
        </button>
      </div>
    </div>
  )
}

export default EditBook
