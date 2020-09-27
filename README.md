# BrainTag

BrainTag: A tool for neuroscience researchers

Features:

- Display EEG data in realtime
- Visualize whether we are getting 'good' data
- Store data for later, with different 'tags' related

### Initial Setup

1. Clone the repo locally 
    > git clone https://github.com/neurotechuoft/BrainTag.git

## Running The Application

### 1) Run 'BrainTag'

Note: This folder (BrainTag/brain-tag) is for the core application.

In a new terminal, get 'BrainTag' running:

> cd brain-tag
> npm install
> npm run electron-dev

### 2) Run its file server

Note: This folder (BrainTag/FileServer) is for storing our 'recorded' data.

In a new terminal, get the 'FileServer' running:

> cd FileServer
> npm install
> npm run start

### 3) Setup the data stream

#### No headset: use fake data

Note: This folder (BrainTag/DummyServer) is for streaming fake data to the application.

In a new terminal, get the 'DummyServer' running:

> cd DummyServer
> npm install
> npm run start

#### Using A Headset: connect to your data stream

TODO: add details

## Development Process

1. Refer to ClickUp for your next task
    - Assign the task to yourself
    - Update its status to say 'I'm on it'
2. Create a new branch for the task you are working on (based off of development branch).  
    > git checkout -b new-feature
3. Implement the task
4. Add/Commit the code with a descriptive message
5. Push to the remote feature branch on GitHub
    > git push origin -u new-feature
6. Get your work reviewed:
    - If the task is completed, make a pull request into the development branch on **GitHub**
    - Next, update ClickUp with the task's new status: 'Review'
    - Finally, let the team know it needs to be reviewed
7. Get your work merged:
    - Once it has been approved, click 'Merge' on the pull request
    - Next, delete your branch on **GitHub** (the remote repository)
    - Finally, update ClickUp with the task's new status: 'Closed'
