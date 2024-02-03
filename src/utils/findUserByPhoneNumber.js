function findUserByPhoneNumber(users, phoneNumber) {
  const user = users.find((user) => user.phoneNumber === phoneNumber);
  if (user) {
    return user.id;
  } else {
    return null;
  }
}

module.exports = findUserByPhoneNumber;
