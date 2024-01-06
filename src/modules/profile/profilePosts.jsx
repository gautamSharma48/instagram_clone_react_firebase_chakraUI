import { Grid, GridItem, Skeleton, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const ProfilePosts = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);
  return (
    <Grid
      templateColumns={{
        sm: "repeat(1 , 1fr)",
        md: "repeat(3, 1fr)",
      }}
      gap={1}
      columnGap={1}
    >
      {loading &&
        [...Array(4)].map((_, index) => (
          <VStack key={index}>
            <Skeleton w="full" h={"300px"}></Skeleton>
          </VStack>
        ))}

      {!loading && (
        <>
          <ProfilePost img="/images/img1.png" />
          <ProfilePost img="/images/img1.png" />
          <ProfilePost img="/images/img1.png" />
        </>
      )}
    </Grid>
  );
};

const ProfilePost = () => {
  return <GridItem></GridItem>;
};

export default ProfilePosts;
