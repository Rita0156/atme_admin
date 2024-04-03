import React, { useState } from "react";
import { Pagination } from "react-admin";

const PostPagination = (props) => {
  const [next, setNext] = useState(true);
  const [previous, setPrevious] = useState(false);

  return (
    <Pagination
      rowsPerPageOptions={[5, 10, 25, 50, 100]}
      limit
      hasPreviousPage={previous}
      hasNextPage={next}
      {...props}
    />
  );
};

export default PostPagination;
