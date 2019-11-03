# BrainTag
Front End Application of BrainTag.

## Development Process
To start working on BrainTag, developers should...
1. Clone the repo locally 
    > git clone https://github.com/neurotechuoft/BrainTag.git
    
    > cd BrainTag/
2. Create a new branch for the feature they are working on (based off of development branch).
    > git checkout development
    
    > git checkout -b new-feature
3. Develop the new feature in the working directory
4. Add/Commit code with descriptive message
5. Push to the remote feature branch on GitHub
    > git push origin -u new-feature
6. When the feature is done, make a pull request into the development branch on **GitHub**. Assign a team lead for review
7. Update the task status on ClickUp to keep rest of team in the loop

## Setting Up
1. Clone the repo locally 
2. Install dependencies 
    > npm install 
3. Run server and electron simultaneously (if this fails, continue to step 4)
    > npm run electron-dev
