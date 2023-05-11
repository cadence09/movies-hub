import { useState } from "react";
import { Button } from "@chakra-ui/react";

export const BookmarkButton = ({ movie}) => {
    
  const [bookmarked, setBookmarked] = useState(
    localStorage.getItem(movie.imdbID) !== null
  );
  const [watched, setWatched] = useState(
    localStorage.getItem(movie.imdbID) !== null && JSON.parse(localStorage.getItem(movie.imdbID)).watched
  );

  const toggleBookmark = () => {
    if (bookmarked) {
      localStorage.removeItem(movie.imdbID)
      setWatched(false);
    } else {
      localStorage.setItem(movie.imdbID, JSON.stringify({ ...movie, watched: true }));
    setWatched(true);
    }
    setBookmarked(!bookmarked)  
    };
  
  return (
    <div>
      <Button mt="2" size="sm" onClick={toggleBookmark}>
        {bookmarked ? (watched ? 
          <>
            <span>Remove from bookmarks </span><br/>watched
          </> : 
          "Remove from bookmarks"
        ) : "Bookmark"
        }
      </Button>
     </div>
    );
  };