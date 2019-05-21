const { Toolkit } = require('actions-toolkit')
const fse = require('fs-extra')
const path = require('path')

// Run your GitHub Action!
Toolkit.run(async tools => {
  const isCC = /\/cc slack/i.test(tools.context.event === 'issue_comment' ? tools.context.payload.comment.body : tools.context.payload.issue.body)
  const slackURL = (tools.context.event === 'issue_comment' ? tools.context.payload.comment.html_url : tools.context.payload.issue.html_url)

  let filename = process.env.MESSAGE_FILE
  if (!filename) {
    filename = 'slack-message.json'
  }
  const pathToFile = path.join(tools.workspace, filename)
  const channelID = '' + process.env.CHANNEL_ID

  if (isCC) {
    const message = {
      text: 'Please check out ' + slackURL + ' \n\n:slack: has been CC\'ed so it\'s likely that `' + tools.context.payload.sender.login + '` wants some :eyes: on something. Thanks!',
      unfurl_links: true
    }
    if (channelID) {
      message.channel = channelID
    }

    fse.writeJsonSync(pathToFile, message)
    tools.exit.success('Generated a file for the slack action to utilise')
  } else {
    tools.exit.neutral('No CC found')
  }
}, {
  event: ['issues.opened', 'issue_comment']
})
