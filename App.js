import React from 'react';
import NestedTableHOC from "/components/NestedTableHOC";

const rows = [
  {
    name: "Test Parent Row 1",
    description: "A test",
    revisions: [
      { name: "Test 1 Revision 1" },
      { name: "Test 1 Revision 2" },
    ]
  },
  {
    name: "Test Parent Row w/o Children",
    description: "A test",
    revisions: [
    ]
  },
  {
    name: "Test Parent Row 2",
    description: "A test",
    revisions: [
      { name: "Test 2 Revision 1" },
      { name: "Test 2 Revision 2" },
    ]
  }
];

const cells = [
  { header: "Name", render(row) { return row.name; } },
  { header: "Description", render(row) { return row.description; } }
];

const getChildRows = (rule) => rule.revisions;

class App extends React.Component {

  render () {
    return (
      <div>
        <NestedTableHOC rows={rows} getChildRows={getChildRows} cells={cells}>
        </NestedTableHOC>
      </div>
    )
  }
}

export default App;
