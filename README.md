# Backend 
=>User Authentication System with CRUD operations REST API with Token-Based Authentication involves the generation of tokens during user login, typically using JSON Web Tokens (JWT) mechanisms. These tokens, containing user information. The API validates incoming tokens, checking for authenticity and expiration, before processing requests. Role-Based Access Control enhances security by assigning roles and permissions to users. This API also sent verification link to user email address to verify user registration and reset password.

## Prerequisites

1. Install nodejs: [Node.js](https://nodejs.org/en)

2. Nodemon setup  `npm install -g nodemon`

## Dependencies

`cors : "^2.8.5"`

`dotenv : "^16.3.1"`

`express : "^4.18.2"`

`fs : "^0.0.1-security"`

`mongoose : "^8.0.3"`

`multer : "^1.4.5-lts.1`

`nodemailer : "^6.9.7"`

`path : "^0.12.7"`

## How to clone and Run the Project

1. Clone the repository:
`git clone https://github.com/kcanjan2020/User_Authentication_with_CRUD_Operations.git`

1. Navigate to the project directory:
`cd Backend`

1. Install dependencies: `npm install
`
4. Set up your environment variables:

    ==>Create a .env file in the root directory with the following content:

```js
PORT=8000
USER= your-email@gmail.com
PASS= your-email-password
```

  ==> Replace <your-email@gmail.com>, and your-email-password with your actual email address, and password (or app password).

5. Run the application: `npm run start`

    ==>The server will be running at `http://localhost:8000` by default.

# Fronted

un the application: npm run start

=> Run the application: `npm run start`

    ==>The server will be running at `http://localhost:3000` by default.

## Prerequisites

## Dependencies

    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "axios": "^1.6.8",
    "bootstrap": "^5.3.3",
    "formik": "^2.4.5",
    "json-server": "^1.0.0-beta.0",
    "react": "^18.2.0",
    "react-bootstrap": "^2.10.2",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.21.1",
    "react-scripts": "5.0.1",
    "react-toastify": "^9.1.3",
    "sweetalert2": "^11.10.2",
    "sweetalert2-react-content": "^5.0.7",
    "web-vitals": "^2.1.4",
    "yup": "^1.3.3"
  },
## How to clone and Run the Project

1. Clone the repository:
`git clone https://github.com/kcanjan2020/User_Authentication_with_CRUD_Operations.git`

1. Navigate to the project directory:
`cd Frontend/my-app`

1. Install dependencies: `npm install`
1. Run the application: `npm run start`

    [Note : Profile only viewed when you and login to the system and you are verified user so please verified email before view and update,delete the profile  also forgot ,reset password and change password from verified user]

 