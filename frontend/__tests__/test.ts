import axios from "axios";

export const TestingGenerics = <T>(arr: T[], value: T) => {
  return [value, ...arr];
};

const x = TestingGenerics([1, 2, 3, ""], "giorgos");

x[0];

const initiateUser = async () => {
  fetch("http://localhost:4569/v1/testing", {
    credentials: "include",
  })
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

const parseJwt1 = (test: string) => {
  try {
    return Buffer.from(test, "base64");
  } catch (e) {
    return null;
  }
};
const parseJwt2 = (test: string) => {
  try {
    return JSON.parse(atob(test.split(".")[1]));
  } catch (e) {
    return null;
  }
};
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiZW9yZ2Vub25pc0BnbWFpbC5jb20iLCJpYXQiOjE2ODM0ODYwMjgsImV4cCI6MTY4MzQ4NjA4OH0.K6WQz5l2bXzqQYZhe_jlPeW-k1XbyeuBcypN7f0yNYk";
