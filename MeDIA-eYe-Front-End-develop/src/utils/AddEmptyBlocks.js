const AddEmptyBlocks = (i) => {
  let width = window.innerWidth;
  let count;
  if (width > 1299) {
    if (i < 4) {
      if (i === 3) {
        count = 1;
      }
      if (i === 2) {
        count = 2;
      }
      if (i === 1) {
        count = 3;
      }
      if (i === 0) {
        count = 0;
      }
    } else {
      count = 4 - (i % 4);
    }
  } else if ((width < 1299) & (width > 991)) {
    if (i < 3) {
      if (i === 2) {
        count = 2;
      }
      if (i === 1) {
        count = 1;
      }
      if (i === 0 || i === 3) {
        count = 0;
      }
    } else {
      count = 3 - (i % 3);
    }
  } else if ((width < 991) & (width > 767)) {
    if (i < 2) {
      if (i === 1) {
        count = 1;
      }
      if (i === 0 || i === 2) {
        count = 0;
      }
    } else {
      count = 2 - (i % 2);
    }
  } else {
    count = 0;
  }

  let blocks = [];
  for (let step = 0; step < count; step++) {
    blocks.push(<div className="explore_block_wrapper"></div>);
  }

  return blocks;
};

export const AddEmptyBlocksCreators = (i) => {
  let width = window.innerWidth;
  let count;
  if (width > 1299) {
    if (i < 5) {
      if (i === 4) {
        count = 1;
      }
      if (i === 3) {
        count = 2;
      }
      if (i === 2) {
        count = 3;
      }
      if (i === 1) {
        count = 4;
      }
      if (i === 0) {
        count = 0;
      }
    } else {
      count = 5 - (i % 5);
    }
  } else if ((width < 1299) & (width > 991)) {
    if (i < 4) {
      if (i === 3) {
        count = 1;
      }
      if (i === 2) {
        count = 2;
      }
      if (i === 1) {
        count = 3;
      }
      if (i === 0) {
        count = 0;
      }
    } else {
      count = 4 - (i % 4);
    }
  } else if ((width < 991) & (width > 767)) {
    if (i < 3) {
      if (i === 2) {
        count = 1;
      }
      if (i === 1) {
        count = 2;
      }
      if (i === 0) {
        count = 0;
      } else {
        count = 3 - (i % 3);
      }
    }
  } else if ((width < 767) & (width > 500)) {
    if (i < 2) {
      if (i === 1) {
        count = 1;
      }
      if (i === 0 || i === 2) {
        count = 0;
      }
    } else {
      count = 2 - (i % 2);
    }
  }

  let blocks = [];
  for (let step = 0; step < count; step++) {
    blocks.push(
      <div
        className="creator_block_wrapper"
        style={{ opacity: '0', height: '0', margin: '0 auto' }}
      ></div>
    );
  }

  return blocks;
};

export const AddEmptyBlocksEvents = (i) => {
  let width = window.innerWidth;
  let count;
  if (width > 991) {
    if (i < 2) {
      if (i === 1) {
        count = 1;
      }
      if (i === 0 || i === 2) {
        count = 0;
      }
    } else {
      count = 2 - (i % 2);
    }
  } else {
    count = 0;
  }

  let blocks = [];
  for (let step = 0; step < count; step++) {
    blocks.push(<div className="events_block" style={{ opacity: 0 }}></div>);
  }

  return blocks;
};

export default AddEmptyBlocks;
