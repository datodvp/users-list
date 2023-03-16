import { useEffect, useState } from 'react';
import getUsers from '../../api/getUsers';
import { infiniteScroll } from '../../utils';
import LoadingImg from '../../images/loading.svg';
import './styles.scss';

const Home = () => {
  const [usersList, setUsersList] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUsers(page, 20).then((data) => {
      setUsersList((prev) => {
        setLoading(false);
        return [...prev, ...data.list];
      });
    });
  }, [page]);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      infiniteScroll(setPage, setLoading);
    });

    return () =>
      window.removeEventListener('scroll', () => {
        infiniteScroll(setPage, setLoading);
      });
  }, []);

  return (
    <>
      <div className="list">
        {usersList.length
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
          : 'No Users'}
        {loading && (
          <img
            src={LoadingImg}
            alt="loading"
            style={{ width: '80px', margin: '50px auto' }}
          />
        )}
      </div>
    </>
  );
};

export default Home;
