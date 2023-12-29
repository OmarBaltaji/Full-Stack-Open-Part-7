import PropTypes from 'prop-types';

const Notification = ({ notification }) => {
  const style = {
    marginTop: '20px',
    padding: '10px',
    border: '1px solid black',
  };

  return (
    <>
      {notification && <div style={style}>
        {notification}
      </div>}
    </>
  );
}

Notification.propTypes = {
  notification: PropTypes.string
}

export default Notification;