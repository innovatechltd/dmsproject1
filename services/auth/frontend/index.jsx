import React from "react";
// For now, to make the dev server compile, we expose a dummy route.
// If you'd like to integrate the cloned App.jsx into the shell, we need to adapt the routing.

export default {
  name: "auth",
  menu: [{ label: "Auth", path: "/login" }],
  routes: [{ path: "/login", public: true, element: <div>Auth Frontend Cloned Successfully</div> }],
};
