import { useState } from "react";
import { VStack, Heading, Text, Box, Flex, Button } from "@chakra-ui/react";

export const BookmarkList = ({bookmarks}) => {
  const [bookmarkedMovies, setBookmarkedMovies] = useState([]);

  const removeBookmark = (movie) => {
    localStorage.removeItem(movie.imdbID);
    setBookmarkedMovies((bookmarkedMovies) =>
      bookmarkedMovies.filter((m) => m.imdbID !== movie.imdbID)
    );
  };

  return (
    <VStack align="start" w="full">
      <Heading as="h2" size="md" mt="8" mb="4">
        Bookmarked Movies
      </Heading>
    
      {bookmarks.length > 0 ? (
        <Flex flexWrap="wrap">
          {bookmarks.map((movie) => (
            <Box key={movie.imdbID} w="240px" m="4">
              <Text fontSize="xl">{movie.Title}</Text>
              <Text>{movie.Year}</Text>
              <img src={movie.Poster} alt={movie.Title} />
              <Flex mt="2">
                <Button size="sm" colorScheme="red" ml="2" onClick={() => removeBookmark(movie)} >
                  Remove bookmark
                </Button>
              </Flex>
            </Box>
          ))}
        </Flex>
      ) : (
        <Text>You haven't bookmarked any movies yet!</Text>
      )}
    </VStack>
  );
};