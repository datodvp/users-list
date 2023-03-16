import { useEffect, useState } from 'react';
import getUsers from '../../api/getUsers';
import './styles.scss';

const Home = () => {
  const [usersList, setUsersList] = useState([]);
  console.log(usersList);

  useEffect(() => {
    getUsers().then((data) => {
      setUsersList(data.list);
    });
  }, []);

  return (
    <>
      <div className="list">
        {usersList
          ? usersList.map((user) => {
              return (
                <div key={user.id} className="list-item">
                  <div className="content">
                    <img src={`${user.imageUrl}?v=${user.id}`} alt="user"></img>
                    <div className="description">
                      <strong>{`${user.prefix} ${user.name} ${user.lastName}`}</strong>
                    </div>
                    <div className="description">{user.title}</div>
                  </div>
                </div>
              );
            })
          : 'Loading...'}
      </div>
    </>
  );
};

export default Home;
