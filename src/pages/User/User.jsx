import { useEffect, useState } from 'react';
import getUser from '../../api/getUser';
import { Link, useParams } from 'react-router-dom';
import { infiniteScroll } from '../../utils';
import './styles.scss';
import LoadingImg from '../../images/loading.svg';
import getUserFriends from '../../api/getUserFriends';

const User = () => {
  const [userData, setUserData] = useState(null);
  const [friendsPage, setFriendsPage] = useState(1);
  const [friendsList, setFriendsList] = useState([]);
  const [loading, setLoading] = useState(true);
  let { id } = useParams();

  useEffect(() => {
    getUser(id).then((data) => setUserData(data));
    setFriendsList([]);
  }, [id]);

  useEffect(() => {
    getUserFriends(id, friendsPage, 20).then((data) =>
      setFriendsList((prev) => {
        setLoading(false);
        return [...prev, ...data.list];
      })
    );
    // eslint-disable-next-line
  }, [friendsPage, id]);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      infiniteScroll(setFriendsPage, setLoading);
    });

    return () =>
      window.removeEventListener('scroll', () => {
        infiniteScroll(setFriendsPage, setLoading);
      });
  }, []);

  if (!userData) {
    return 'Loading...';
  }
  return (
    <div className="user">
      <div className="header">
        <img src={`http://placeimg.com/640/480/animals?v=${id}`} alt="animal" />
        <fieldset className="left-info">
          <legend>Info</legend>
          <div>
            <strong>
              {userData.prefix} {userData.name} {userData.lastName}
            </strong>
          </div>
          <div>
            <i>{userData.title}</i>
          </div>{' '}
          <br />
          <div>
            <span>Email</span>: {userData.email}
          </div>
          <div>
            <span>Ip Address</span>: {userData.ip}
          </div>
          <div>
            <span>Job Area</span>: {userData.jobArea}
          </div>
          <div>
            <span>Job Type</span>: {userData.jobType}
          </div>
        </fieldset>
        <fieldset className="right-info">
          <legend>Address</legend>
          <div>
            <strong>
              {userData.company.name} {userData.company.suffix}
            </strong>
          </div>
          <div>
            <span>City</span>: {userData.address.city}
          </div>
          <div>
            <span>Country</span>: {userData.address.country}
          </div>
          <div>
            <span>State</span>: {userData.address.state}
          </div>
          <div>
            <span>Street Address</span>: {userData.address.streetAddress}
          </div>
          <div>
            <span>ZIP</span>: {userData.address.zipCode}
          </div>
        </fieldset>
      </div>

      <div className="friends">
        <h2>Friends:</h2>
        <div className="list">
          {friendsList.map((user) => {
            return (
              <Link key={user.id} className="list-item" to={`/user/${user.id}`}>
                <div className="content">
                  <img src={`${user.imageUrl}?v=${user.id}`} alt="user"></img>
                  <div className="description">
                    <strong>{`${user.prefix} ${user.name} ${user.lastName}`}</strong>
                  </div>
                  <div className="description">{user.title}</div>
                </div>
              </Link>
            );
          })}
          {loading && (
            <img
              src={LoadingImg}
              alt="loading"
              style={{ width: '80px', margin: '50px auto' }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default User;
