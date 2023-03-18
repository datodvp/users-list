const url = 'http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com';

const getUserFriends = async (userId, page, size) => {
  const friendsList = await fetch(
    `${url}/user/${userId}/friends/${page}/${size}`
  ).then((res) => res.json());

  return await friendsList;
};

export default getUserFriends;
