import { useToast } from "@chakra-ui/react";
import { useCallback } from "react";

const useShowToast = () => {
  const toast = useToast();

  //use-callback prevent infinite loop , by caching the function
  const showToast = useCallback(
    (title, description, status) => {
      toast({
        title,
        description,
        status,
        duration: 9000,
        isClosable: true
      });
    },
    [toast]
  );
  return showToast;
};

export default useShowToast;
