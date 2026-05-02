import React from 'react'

function PostDate({ dateString, className }) {
  const postTime = new Date(dateString)
  const now = new Date()

  const diffMs = now - postTime
  const diffMinutes = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const postDay = new Date(postTime)
  postDay.setHours(0, 0, 0, 0)

  const diffDays = Math.floor((today - postDay) / 86400000)

  let text = ""

  if (diffDays === 0) {
    if (diffMinutes < 1) {
      text = "Just now"
    } else if (diffMinutes < 60) {
      text = `Today, ${diffMinutes} ${diffMinutes === 1 ? 'min' : 'mins'} ago`
    } else {
      text = `Today, ${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`
    }
  } 
  else if (diffDays === 1) {
    text = `Yesterday, ${postTime.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
    })}`
  } 
  else {
    text = postTime.toLocaleString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return <p className={className}>{text}</p>
}

export default PostDate