Video Processing API

Requirements
Node.js (v16 or higher)
NestJS
SQLite
Swagger or Postman for API documentation
Assumptions and Choices
Assumptions
Authentication:

It is assumed that API calls require authentication. An AuthGuard is set up in the code but is currently commented out. If authentication is needed, this guard can be activated by uncommenting the relevant lines.
File Handling:

The API assumes that file handling (uploading, trimming, merging) is done by another service or library. The current implementation primarily focuses on database operations and API design.
Video files are stored on the server's file system, and paths to these files are stored in the SQLite database.
Video Processing:

For trimming and merging videos, it is assumed that the actual video processing (e.g., using FFmpeg) is handled outside the provided code. The code provided only handles metadata operations such as duration and file paths.
Expiry Time:

For sharing video links, the expiry time is assumed to be provided in the request body as an ISO string. The system assumes the client will provide a valid future date.
Choices
Database:

SQLite was chosen as the database for simplicity and ease of use in a project that doesn’t require complex database operations. It also allows the project to be easily committed and shared as a single file.
Error Handling:

The service and controller classes include error handling to manage common issues like missing or invalid data, ensuring a better user experience.
DTOs (Data Transfer Objects):

DTOs were used for input validation and to ensure that only the required fields are processed. This helps maintain a clear contract for API consumers.
Swagger for API Documentation:

Swagger was chosen for API documentation because it integrates well with NestJS and provides an interactive UI for testing endpoints.
Getting Started
Prerequisites
Ensure you have Node.js installed (v16 or higher).
Clone the repository.
bash
Copy code
git clone https://github.com/yourusername/video-processing-api.git
cd video-processing-api
Installation
Install the necessary dependencies:
bash
Copy code
npm install
Running the API Server
To start the API server:
bash
Copy code
npm run start:dev
The server will run at http://localhost:3000.
API Documentation
The Swagger UI for the API documentation can be accessed at http://localhost:3000/api.
Testing
To run unit tests:
bash
Copy code
npm run test
To run end-to-end tests:
bash
Copy code
npm run test:e2e
References
NestJS Documentation:

NestJS Official Documentation
Used for setting up the project structure and learning about controllers, services, and DTOs.
SQLite Documentation:

SQLite Official Documentation
Referenced for understanding database constraints and handling SQLite-specific issues.
Swagger Documentation:

Swagger Documentation for NestJS
Used to integrate Swagger with NestJS for API documentation.
Error Handling in NestJS:

Error Handling in NestJS
Referenced for implementing robust error handling in the service and controller classes.
Video Processing with FFmpeg:

FFmpeg Documentation
FFmpeg is commonly used for video processing tasks like trimming and merging. Although the code does not directly implement FFmpeg, it’s recommended to use FFmpeg for these operations in a production environment.

### Requirements

1. All API calls must be authenticated (assume static API tokens)
2. Allow users to upload videos with configurable limits of size and duration
    - maximum size: e.g. `5 mb`, `25 mb`
    - minimum and maximum duration: e.g. `25 secs`, `5 secs`
3. Allow trimming a video
    - for a given video clip (previously uploaded) shorten it from start or end
4. Allow merging video clips
    - for a given list of video clips (previously uploaded) stitch them into a single video file
5. Allow link sharing with time-based expiry (assume the expiry time)
6. Write unit and e2e tests. Add the command for test coverage.
7. Use SQLite as the database (commit it to the repo)
8. API Docs as `Swagger Endpoint` or `Postman Collection json`

### Expectations

- API Design Best Practices
- Documentation of any assumptions or choices made and why in `README.md`
- Links as citation to any article / code referred to or used
- Appropriate exception handling and error messages
- Code Quality - remove any unnecessary code, avoid large functions
- Good commit history - we won’t accept a repo with a single giant commit 🙅‍♀️



## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
