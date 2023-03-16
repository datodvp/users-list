const url = 'http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com';

const getUsers = async (page, size) => {
  const usersList = await fetch(`${url}/user/1/20`).then((res) => res.json());

  return await usersList;
};

export default getUsers;
