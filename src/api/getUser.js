const url = 'http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com';

const getUser = async (userId) => {
  const user = await fetch(`${url}/user/${userId}`).then((res) => res.json());

  return await user;
};

export default getUser;
