import { useNavigate } from "react-router-dom"
import { useField } from '../hooks';

const CreateNew = (props) => {
  const content = useField('content');
  const author = useField('author');
  const info = useField('info');
  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    });

    props.setNotification(`New blog "${content.value}" created`);
    setTimeout(() => {
      props.setNotification(null);
    }, 5000);
    navigate('/');
  }

  const reset = (event) => {
    event.preventDefault();
    event.target.value = '';
    content.onChange(event);
    author.onChange(event);
    info.onChange(event);
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button>create</button>
        <button onClick={reset}>reset</button>
      </form>
    </div>
  )
}

export default CreateNew;