<h1 align="center"> State Management with React Hooks and Context API in 10 lines of code! </h1>

<h3 align="center">Ultimate and super simple Redux alternative for your App.</h3>

Go to the profile of Luke Hall
Luke Hall
Jan 16

Photo by Kolleen Gladden on Unsplash
There are many ways how to handle global application state like Redux, MobX, etc. Do you remember all the stuff like store, actions and reducers in Redux? And then all those connect, mapStateToProps and other functions to be able to access the state?

Now in 2019 I have a great news for you: You can forget about it!

Don’t take me wrong. Redux is a great library, it served it’s role for a long time, but it’s time to move forward. It’s just a technical evolution.

You don’t need to install any external library for state management anymore. Everything you need is available in React. And it’s damn easy to use.

<p align="center">
**State management in 10 lines of code?**
</p>
Yes, you are reading it right. Just ten lines! But let’s take a look at two new React concepts first. Then I will introduce you the most simple state management ever.

React Context API
It’s actually not a new idea. Context API was part of React for long time, but only in experimental state.

Since React 16.3.0 it’s officially stable and ready to use in production.

The usage is pretty straightforward. Provider provides the value:

```javascript
import React from "react";
const ThemeContext = React.createContext(/_ optional default value _/);
const App = props => (
  <ThemeContext.Provider value={{ primaryColor: green }}>
    {props.children}
  </ThemeContext.Provider>
);
```

And Consumer allows to access the value (theme in this case) in any component of your App:

```javascript
const ThemedButton = () => (
<ThemeContext.Consumer>
{value => (
<Button primaryColor={{ value.primaryColor }}>
I'm button using context!
</Button>
)}
</ThemeContext.Consumer>
);
```

There are other ways how to access context value like contextType in class based components as you will see below. For all the implementation details please check the official docs if you are interested.

Later I will show you more simple way how to access state, but first let’s take a look at another new React concept.

React Hooks
Update: Hooks are now stable since version React 16.8.0.

Hooks allows you to use state, context and other React features inside functional components (i.e. without writing classes).

```javascript
import React, { useState } from "React";
function Increment({ initialCount }) {
  const [count, setCount] = useState(initialCount);
  return (
    <button onClick={() => setCount(prevCount => prevCount + 1)}>
      Increment: {count}
    </button>
  );
}
```

Quite easy, right?

There is another very useful hook called useReducer which is kind of more advanced state hook:

```javascript
import React, { useReducer } from "React";
const reducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };

    default:
      return state;
  }
};
function Increment({ initialCount }) {
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  return (
    <button onClick={() => dispatch({ type: "increment" })}>
      Increment: {state.count}
    </button>
  );
}
```

First parameter of useReducer hook is reducer function which is basically an equivalent to Redux’s reducer. Second parameter is an initial state.

Hook returns [state, dispatch] array where state is current state and dispatch is similar to dispatch function in Redux with action (in our case { type: 'increment' }) passed as a parameter.

Anytime you call dispatch function, the reducer is called and new modified state is returned.

Cool, right?

Now what happens if you combine Context API and Hooks together?

Photo by Chris Scott on Unsplash
State management in 10 lines of code!
This is beautiful example of synergy. Using Context API and Hooks together gives you very simple and ultimate global state management for your App.

I would like to introduce you my 10 lines of code:

```javascript
import React, { createContext, useContext, useReducer } from "react";
export const StateContext = createContext();
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);
export const useStateValue = () => useContext(StateContext);
```

Let’s explain what is going on here.

First we createContext and assign it to StateContext object containing Provider and Consumer. We will need just a Provider here.
Then we create new React component called StateProvider. This component wraps it’s children with Provider that accepts value prop.
useReducer accept reducer and initialState which are passed as a props from outside. So you have full control over them inside your app as you will see below.
The main trick here is that we pass result of the useReducer hook as a value to our Provider. So it becomes available in any component in your app component tree.
useContext is another React hook that accepts context object as a parameter (StateContext in our case). Normally you would use useContext(StateContext) everywhere inside your app, where you would like to access the value of the context. But why repeat yourself, right?
So this useStateValue function on the last line of our code is basically a custom hook and it’s a little trick how to access your state in any component of your application with less amount of code. It returns exactly the same [state, dispatch] array, that is passed as a value to our Provider.
So we have our minimalistic state management ready! 🎉 But how do we use it?
Enhance your app with global state
In order to use this simple state management in your app you just need to wrap it with our StateProvider created above and pass reducer and initialState like this:

````javascript
import { StateProvider } from '../state';

const App = () => {
  const initialState = {
    theme: { primary: 'green' }
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'changeTheme':
        return {
          ...state,
          theme: action.newTheme
        };

      default:
        return state;
    }
  };

  return (
    <StateProvider initialState={initialState} reducer={reducer}>
        // App content ...
    </StateProvider>
  );
}
`

Then use and update the state inside your app
Now you have unlimited access to your global state in every component of your app:

```
import { useStateValue } from './state';

const ThemedButton = () => {
  const [{ theme }, dispatch] = useStateValue();
  return (
    <Button
      primaryColor={theme.primary}
      onClick={() => dispatch({
        type: 'changeTheme',
        newTheme: { primary: 'blue'}
      })}
    >
      Make me blue!
    </Button>
  );
}```
The only limitation is that this useStateValue function must be called inside functional component. Because it calls a useContext hook inside.

If you would like to access state in class based component, you have two options. Either use the Consumer as mention above in the React Context API section or less verbose contextType feature like this:

```
import React, { Component } from 'react';
import { StateContext } from './state';
class ThemedButton extends Component {
  static contextType = StateContext;
  render() {
    const [{ theme }, dispatch] = this.context;
    return (
      <Button
        primaryColor={theme.primary}
        onClick={() => dispatch({
          type: 'changeTheme',
          newTheme: { primary: 'blue'}
        })}
      >
        Make me blue!
      </Button>
    );
  }
}```
And that’s it! Isn’t it amazing? You really don’t need to use Redux or any other external state library anymore. Everything you need is inside React.

But what about splitting reducer to more then one?
There is an easy answer. For more complex applications it may be handy to have multiple reducers. Well, the reducer (the one passed as a prop to StateProvider) is completely in your hands. Personally I would go this way:

```
import userReducer from './reducers/user';
import basketReducer from './reducers/basket';
const mainReducer = ({ user, basket }, action) => ({
  user: userReducer(user, action),
  basket: basketReducer(basket, action)
});
And what about middleware?
Technically the middleware is a function called just before the dispatched action reaches the reducer. I would do something like this:

import userReducer from './reducers/user';
import basketReducer from './reducers/basket';
const mainReducer = ({ user, basket }, action) => {
  // middleware goes here, i.e calling analytics service, etc.
  return {
    user: userReducer(user, action),
    basket: basketReducer(basket, action)
  };
});
````
