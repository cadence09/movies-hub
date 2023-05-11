"use client"; 
import { useState } from "react";
import { VStack, Heading, Text, Box, Flex, Image, Button} from "@chakra-ui/react";
import { SearchBox } from "./components/SearchBox";
import { BookmarkList } from "./components/BookmarkList";
import {BookmarkButton} from "./components/BookmarkButton"
import axios from "axios";


export default function Home() {
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalPages, setTotalPages] = useState(1);

  const searchMovies = async (searchTerm, curPage) => {
    let movies = []
    let page = 1

    if (curPage && curPage !==1){
      page = curPage
    }
  
    setSearchTerm(searchTerm)

    if( page<=totalPages ){
      const response = await axios.get(
        `https://movie-database-alternative.p.rapidapi.com/?s=${searchTerm}&page=${page}&r=json`
        , {
          headers: {
            'X-RapidAPI-Key': process.env.NEXT_PUBLIC_MOVIE_API_KEY,
            'X-RapidAPI-Host': 'movie-database-alternative.p.rapidapi.com'
          }
        }
      );
      const data = response.data
      setTotalPages(Math.ceil(data.totalResults/10))
      if (data.Response === "True") {
        movies.push(...data.Search)
        setCurrentPage(page);
      }else{
        throw new Error("Fail in responding back the data")
      }
    }
    setSearchResults(movies || []);
  };

  const displayMovies = searchResults.slice(0, 10);

  const getBookmarks = () => {
    if (typeof localStorage === 'undefined') {
      return [];
    }
    
    const bookmarks = [];
   
    for (let i = 0; i < localStorage.length; i++) {
      if(localStorage.key(i).includes("tt")){
      const key = localStorage.key(i);
      const movie = localStorage.getItem(key)
      bookmarks.push(movie);
      }
    }
    const dataArray = bookmarks.map(JSON.parse);    
    return dataArray;
  };


  return (
    <VStack p="4">
      <Heading as="h1" mb="4">
        Movie Search
      </Heading>
      <SearchBox onSearch = {searchMovies} />
      {displayMovies.length > 0 && (
        <>
          <Heading as="h2" size="md" mt="8" mb="4">
            Search Results
          </Heading>     
          <Flex  flexWrap="wrap" justifyContent="center">
            {displayMovies.map((movie) => (
              <Box key={movie.imdbID} w="240px" maxWidth="300px" m="4">
                <Text fontSize="xl" noOfLines={1} textOverflow="ellipsis" whiteSpace="nowrap">{movie.Title}</Text>
                <Text>{movie.Year}</Text>
                <Image src={movie.Poster} alt={movie.Title} w="240px" h="360px" objectFit="cover" verticalAlign="middle"/>
                <BookmarkButton movie={movie}/>
              </Box>
            ))}
          </Flex>
          {currentPage > 1 && (
            <Button mt="4" onClick={() => searchMovies(searchTerm, currentPage - 1)}>
              prev
            </Button>
          )}
          {displayMovies.length >= 10 && (
            <Button mt="4" onClick={() => searchMovies(searchTerm, currentPage + 1)}>
              Next 
            </Button>
          )}
        </>
      )}
      <BookmarkList bookmarks={getBookmarks()} /> 
    </VStack>
  );
}
