import React from 'react';
//
import Head from '../components/Head'
import LibLayout from '../pages/lib/LibLayout';
//console.log("typeof=", typeof(window));
if(typeof(window) !== "undefined"){ LibLayout.startProc(); }
//
const Layout = ({ children }) => {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
// <header>Header</header>
// <footer>Footer</footer>