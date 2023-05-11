import { useState } from "react";
import { Flex, Input, Button } from "@chakra-ui/react";

export const SearchBox = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <Flex as="form" onSubmit={handleSubmit} mb="8">
      <Input type="text" placeholder="Search for movies by title" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} mr="2"/>
        <Button type="submit">Search</Button>
      </Flex>
    );
  };