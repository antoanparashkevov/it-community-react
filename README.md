# IT-COMMUNITY

You can visit the project from here: http://localhost:3000

# Table of Contents
- <a href="#about">About this Project</a>
- <a href="#design">Design</a>
- <a href="#how-to-run">How to run the app on your computer</a>
- <a href="#features">Features</a>
- <a href="#future-features">Future Features</a>
- <a href="#project-structure">Project Structure</a>
- <a href="#tools">Tools</a>
- <a href="#application-pictures">Application Pictures</a>

# <p id="about">About this project</p>

It-Community is a Job Board web application that makes it easier for the user to find their desired job. It also helps companies find quality staff.

# <p id="design">Design</p>

The amazing design was provided by <a href="https://www.figma.com/">Figma</a>

- Here you can find more about the design: <a href="https://www.figma.com/file/tqyxHF9RfEQyLEMCzFDvhz/it-community">It-Community Design</a>

# <p id="how-to-run">How to run the app on your computer</p>

1. You can download the project ZIP file or you can clone the repository directly.
2. Open the project with IDE/Code Editor like VS Code or any of the Jetbrains product which supports the JavaScript syntax.
4. Open the terminal then navigate to `client` folder with the `cd client` command.
5. Install all modules that are listed on `package.json` file and their dependencies with `npm install` or `yarn install`.
6. Type `npm start:development` to run the project in the browser. It will start on `http://localhost:3000`, but you can change it to another URL if necessary. Type `y` to do it.


# <p id="features">Features</p>

- <strong>Authentication</strong>
    - Login
      - log in with existing account

    - Register as user
      - create new account
    
    - Register as company
      - create new account

    - Admin role
       - #NOTE: this is supported only for the staff 

- <strong>Jobs</strong>
    - Job
        - browse all categories and subcategories 
        - browse all jobs
        - filter jobs by different criteria
        - view detailed page for each job
        - create new job (for Company role only)
        - apply for a job (Authentication feature)

- <strong>Messages</strong>
    - Company role only
        - browse all received messages
        - show the job ad the user has applied to (FUTURE Feature)

- <strong>Profile</strong>
    - Company role only
        - view details for you company (company logo, foundation year, employees, email, company name)
        - view all your job postings.
        - edit job
        - delete job

- <strong>Admin Panel</strong>
    - Admin role only
      - create category
      - create subcategory

# <p id="future-features">Future Features</p>

- <strong>Show the Job ad the user has applied to</strong>

- <strong>Chat</strong>
    - send message to user who has applied for a job
  
- <strong>Email Verification</strong>
    - email verification after each sign up/sign in 

# <p id="project-structure">Project Structure</p>
- Client
    - components
        - auth
           - AuthForm - Auth form component for user authentication (sign in/signup)
           - CompanyForm - Company form component for company authentication (sign in/signup)
        - applying
           - skeletons
             -  BoardSkeleton - Board skeleton animation during fetching categories/subcategories
             -  JobListSkeleton - JobList skeleton animation during fetching jobs
           - ApplyForm - Apply form for sending a message to the company who created the job
           - JobForm - Job form for creating a new job
        - messages
            - MessageItem - Each message box 
        - profile
            - Profile - responsible for the Profile feature
        - admin
            - AdminNavigationHeader - a special navigation only for the admin role only
            - CategoryForm - Category form for creating a new category
            - SubCategoryForm - SubCategory form for creating a new subcategory
            - TheHeader - Web app name and the navigation
        - layout
            - Filter components
            - Footer
            - UserNavigationHeader - the navigation header for the user role only
    - hooks - outsourcing stateful logic into reusable functions
        - use-auth
            - manage the local storage and handling the authentication. Get the auth token, validate the auth token and check if it is expires or not
        - use-http
            - skeleton/template for making requests
        - use-input
            - skeleton/template for any input around the Web App
        - use-window-dimensions
            - calculates the window dimensions (viewport)
    - store - Context API 
        - auth-context
            - manage the auth context
        - filter-context
            - manage the filter context 
    - util - manages the action, the loader, and the auth guards
    - styles - stores scss file that are used globally

- Server
    - middlewares - all middlewares needed for all endpoints
    - .env - all of the project constant variables
    - controllers - used to handle request data from the client and make calls to the database models with the help of services
    - models - stores MongoDB schema models
    - services - responsible for accessing MongoDB schemas and manipulating data

# <p id="tools">Tools</p>

- <a href="https://react.dev/">React</a>
- <a href="https://www.figma.com/">Figma</a>
- <a href="https://sass-lang.com/">Scss</a>
- <a href="https://app.cyclic.sh/">Cyclic</a>
- <a href="https://nodejs.org/en/">Node</a>
- <a href="https://expressjs.com/">Express</a>
- <a href="https://www.npmjs.com/package/nodemon">nodemon</a>
- <a href="https://www.mongodb.com/">MongoDB</a>
- <a href="https://mongoosejs.com/">Mongoose</a>
- <a href="https://jwt.io/">jwt</a>
- <a href="https://www.npmjs.com/package/bcrypt">bcrypt</a>
- <a href="https://www.npmjs.com/package/dotenv">dotenv</a>

# <p id="application-pictures">Application Pictures</p>

## Desktop

## Mobile

