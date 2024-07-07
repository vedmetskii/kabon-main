"use client";
import useSWR from "swr";
import { FormEventHandler, useState } from "react";
import { getPostsBySearch } from "@/services/posts";
import { Button, Input } from "@nextui-org/react";

const PostSearch = ({pageId}: {pageId: number}) => {
  const { mutate } = useSWR({ pageId: pageId });
  const [search, setSearch] = useState("");

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const posts = await getPostsBySearch({search: search, pageId: pageId});

    mutate(posts);
  };


  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="search"
        placeholder="Search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      /><Button type="submit" variant="light">Search</Button>
    </form>
  );
};

export { PostSearch };