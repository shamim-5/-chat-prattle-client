import { useState } from "react";

const useCollapsed = () => {
  const [collapsed, setCollapsed] = useState(false);

  return [collapsed, setCollapsed];
};

export default useCollapsed;
