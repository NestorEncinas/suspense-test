import React, { Suspense, useState } from "react";

import Person from "./RandomPerson";
import Number from "./RandomNumber";
import { PostResult } from "./PostResult";
import { ErrorBoundary } from "./ErrorBoundary";

import { createResource, suspensePromise } from "./RandomPersonApi";

const initialResource = createResource();

function App() {
  // const [resource, setResource] = useState(() => createResource());
  const [resource, setResource] = useState(initialResource);
  const [postResource, setPostResource] = useState({
    result: {
      read() {
        return null;
      }
    }
  });

  return (
    <div className="App">
      <Suspense fallback={<h1> loading...</h1>}>
        <Number resource={resource} />
      </Suspense>
      <Suspense fallback={<h1> loading...</h1>}>
        <ErrorBoundary>
          <Person resource={resource} />
          <PostResult resource={postResource} />
        </ErrorBoundary>
      </Suspense>
      <button
        onClick={() => {
          const promise = fetch("https://ennihoctswyp.x.pipedream.net/", {
            method: "POST",
            body: JSON.stringify({ hello: "world" })
          })
            .then(x => x.json())
            .then(res => {
              console.log(res);
              return res;
            });

          setPostResource({ result: suspensePromise(promise) });
        }}
      >
        call post request
      </button>
      <button
        onClick={() => {
          setResource(createResource());
        }}
      >
        refresh data
      </button>
    </div>
  );
}

export default App;
