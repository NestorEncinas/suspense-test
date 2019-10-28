import React, { Suspense } from "react";

import Person from "./RandomPerson";
import Number from "./RandomNumber";
import { createResource } from "./RandomPersonApi";

const resource = createResource();

function App() {
  return (
    <div className="App">
      <Suspense fallback={<h1> loading...</h1>}>
        <Number resource={resource} />
      </Suspense>
      <Suspense fallback={<h1> loading...</h1>}>
        <Person resource={resource} />
      </Suspense>
    </div>
  );
}

export default App;
