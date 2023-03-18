import { useEffect, useState } from 'react';
import getUser from '../../api/getUser';
import { useParams } from 'react-router-dom';
import './styles.scss';

const User = () => {
  const [userData, setUserData] = useState(null);
  let { id } = useParams();

  useEffect(() => {
    getUser(id).then((data) => setUserData(data));
  }, [id]);
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
      </div>
    </div>
  );
};

export default User;
