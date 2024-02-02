export function findUserByPhoneNumber(phoneNumber) {
  const userFound = users.find((user) => user.phoneNumber === phoneNumber);

  if (userFound) {
    return userFound.id;
  } else {
    return null;
  }
}
