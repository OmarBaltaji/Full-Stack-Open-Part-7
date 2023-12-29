import PropTypes from 'prop-types';

const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <h2>{anecdote.content} by {anecdote.author}</h2>
      <div>has {anecdote.votes} votes</div>
      <br />
      <div>for more info see <a href={anecdote.info}>{anecdote.info}</a></div>
      <br />
    </div>
  )
}

Anecdote.propTypes = {
  anecdote: PropTypes.shape({
    content: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    info: PropTypes.string.isRequired,
    votes: PropTypes.number.isRequired,
  })
}

export default Anecdote;