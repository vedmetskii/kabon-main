import { getPost } from "@/services/posts";
import { Image } from "@/components/Items/Image";
import { Items } from "@/components/Items";
import { Handler } from "@/components/Items/Handler";

type Params = {
  id: string;
};

type Props = {
  params: Promise<Params>;
};

export default async function PostPage({ params }: Readonly<Props>) {
  const [postData, status] = await getPost(params.id);
  if (status == 404) {
    return 404;
  }
  // console.log(postData)
  return (
    <>
      <Handler>{postData.title}</Handler>
      <Image src={postData.mainImage} alt="" />
      <Items items={postData.content}></Items>
    </>
  );
}
