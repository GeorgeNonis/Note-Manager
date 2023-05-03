import axios from "axios";

export const TestingGenerics = <T>(arr: T[], value: T) => {
  return [value, ...arr];
};

const x = TestingGenerics([1, 2, 3, ""], "giorgos");

x[0];

const initiateUser = async () => {
  fetch("http://localhost:4569/v1/testing")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
};

const getUser = async () => {
  // const response = await axios.post(`http://localhost:4569/v1/signup`, { email: 'nonis@gmail.com', pwd: '123' })
  const email = "nonis@gmail.com";
  const pwd = "123";
  const response = await fetch(`http://localhost:4569/v1/signup`, {
    method: "POST",
    body: JSON.stringify({ email, pwd }),
  });
  console.log(response);
};

const editUser = async () => {
  fetch("http://localhost:4569/v1/testing2")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
};
