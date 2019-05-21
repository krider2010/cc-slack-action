FROM node:slim

# Labels for GitHub
LABEL "com.github.actions.name"="CC Slack Action"
LABEL "com.github.actions.description"="A GitHub Action that posts messages to slack on issue creation/comments if it contains "/cc-slack-action"."
LABEL "com.github.actions.icon"="send"
LABEL "com.github.actions.color"="blue"

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of action's code
COPY . .

# Run `node /index.js`
ENTRYPOINT ["node", "/index.js"]
