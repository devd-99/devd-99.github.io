---
title: Pomodoro
publishDate: 2019-12-01 00:00:00
img: /image/pomodoro.jpg
img_alt: A bright pink sheet of paper used to wrap flowers curves in front of rich blue background
description: |
  Minimal Pomodoro for your browser
niches:
  - React
  - AppDev
tags:
  - React
  - Chrome Extension
  - WebPack
links:
  - github.com/devd-99/pomodoro
---
# Building a Pomodoro Chrome Extension with React and Webpack

This project showcases how modern web technologies can be leveraged to create effective browser extensions. In this article, I'll dive deep into the technical architecture, implementation details, and key features of our Pomodoro extension.

## Architecture Overview

Our Pomodoro extension is built on two main pillars:

1. React for the user interface and state management
2. Webpack for bundling and asset management

Let's examine each component in detail.

### React Application Structure

The core of our extension is a React application that manages the Pomodoro timer logic and user interface. Here's a breakdown of the main `App` component:

```jsx
import React, { useState, useEffect, useCallback, useRef } from 'react';
import OptionsPage from './optionPage';
import './App.css';
import { FaPlay, FaPause, FaForward, FaCog } from 'react-icons/fa';

// ... (component code)

export default App;
```

Key features of our React application include:

1. **State Management**: We use React's `useState` hook to manage the application state, including the current Pomodoro type, time left, running status, and user settings.

2. **Persistence**: The application state and user settings are persisted in `localStorage`, allowing the timer to resume its state even after the browser is closed.

3. **Customizable Settings**: Users can customize work duration, short break length, long break length, and the number of short breaks before a long break.

4. **Dynamic Styling**: The background color changes based on the current Pomodoro type (work, short break, or long break).

5. **Sound Notifications**: Audio cues are played when a Pomodoro session ends.

### Webpack Configuration

We use Webpack to bundle our React application and manage assets. Here's our Webpack configuration:

```javascript
const webpack = require('webpack');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

const config = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: [
    './src/index.js'
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  // ... (rest of the configuration)
};

module.exports = config;
```

Key aspects of our Webpack setup:

1. **Babel Integration**: We use Babel to transpile modern JavaScript and JSX.

2. **CSS Processing**: CSS files are processed using `style-loader`, `css-loader`, and `postcss-loader`.

3. **Asset Copying**: The `CopyPlugin` is used to copy static assets (HTML, manifest, background script) to the distribution folder.

4. **Development Server**: A development server is configured for easier testing during development.

## Implementation Deep Dive

### Pomodoro Timer Logic

The core timer logic is implemented using `useEffect` hooks:

```jsx
useEffect(() => {
  let intervalId;
  if (isRunning && timeLeft > 0) {
    intervalId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);
  } else if (timeLeft === 0) {
    playSound(settings.backgroundTunes[pomodoroType]);
    switchPomodoroType();
  }
  return () => clearInterval(intervalId);
}, [isRunning, timeLeft, pomodoroType, settings.backgroundTunes]);
```

This effect sets up an interval that decrements the timer every second when it's running. When the timer reaches zero, it plays a sound and switches to the next Pomodoro type.

### State Persistence

We use `localStorage` to persist the application state and user settings:

```jsx
useEffect(() => {
  localStorage.setItem('pomodoroSettings', JSON.stringify(settings));
  localStorage.setItem('pomodoroState', JSON.stringify({pomodoroType, timeLeft, isRunning}));
}, [settings, pomodoroType, timeLeft, isRunning]);
```

This effect runs whenever the relevant state changes, ensuring that the latest state is always saved.

### Dynamic Styling

The background color of the application changes based on the current Pomodoro type:

```jsx
<div className="app" style={{ backgroundColor: settings.backgroundColors[pomodoroType] }}>
  {/* ... */}
</div>
```

This provides a visual cue to the user about the current phase of their Pomodoro session.

### User Interface Components

We use React icons for a sleek, modern interface:

```jsx
import { FaPlay, FaPause, FaForward, FaCog } from 'react-icons/fa';
```

These icons are used in the timer controls and settings button, providing an intuitive user experience.

## Challenges and Solutions

### State Management Complexity

Managing the various states of the Pomodoro timer (work, short break, long break) along with user settings presented a challenge. We solved this by:

1. Using multiple `useState` hooks to separate concerns
2. Implementing a `switchPomodoroType` function to handle state transitions
3. Storing settings in a separate state object for easier management

### Chrome Extension Integration

Integrating our React application into a Chrome extension required careful consideration of the extension's lifecycle. We addressed this by:

1. Using a background script (copied by Webpack) to handle extension-specific functionality
2. Ensuring our React application could run in the context of a Chrome extension popup

### Performance Optimization

To ensure smooth performance, especially for long-running Pomodoro sessions, we implemented several optimizations:

1. Using `useCallback` for functions that don't need to be recreated on every render
2. Implementing `useRef` for DOM interactions to avoid unnecessary re-renders
3. Carefully managing our `useEffect` dependencies to prevent unnecessary effect runs

## Conclusion

Our Pomodoro Chrome extension demonstrates the power of combining React's component-based architecture with Webpack's robust build pipeline. By leveraging these technologies, we've created a highly customizable, performant, and user-friendly Pomodoro timer that integrates seamlessly into the Chrome browser.

Key takeaways from this project include:

1. The importance of thoughtful state management in React applications
2. The power of Webpack in managing complex build processes for browser extensions
3. The benefits of persisting state for improved user experience
4. The potential of React for creating rich, interactive user interfaces in browser extensions

As we continue to refine our extension, we're exploring additional features such as integration with productivity tools, more advanced customization options, and potentially a mobile version using React Native.

The world of browser extensions is evolving rapidly, and we believe that leveraging modern web technologies like React and Webpack will be crucial in creating the next generation of powerful, user-friendly browser tools.