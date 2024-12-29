import { config } from "@/config/auth";
import { siteConfig } from "@/config/site";
import { prisma } from "@/services/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

async function getPostContent(postId: number) {
	return prisma.content.findMany({
		where: {
			postId: postId,
		},
	});
}

async function getPostById(postId: number) {
	const post = await prisma.post.findFirst({
		where: {
			id: Number(postId),
		},
	});

	if (!post) {
		throw new Error("Post not found");
	}

	const contentOfPost = await getPostContent(post.id);

	return { content: contentOfPost, ...post };
}

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;

	if (!searchParams) {
		return NextResponse.json(
			{ error: "Not found Search params" },
			{ status: 404 },
		);
	}

	const postId = searchParams.get("id");

	if (postId) {
		try {
			const post = getPostById(Number(postId));
			return NextResponse.json(post);
		} catch (e) {
			console.log(e);
			return NextResponse.json({ error: e }, { status: 500 });
		}
	}

	const pageId = searchParams.get("pageId");

	const posts = await prisma.post.findMany();

	const postsWithContent = await Promise.all(
		posts.map(async (post) => {
			const contentOfPost = await getPostContent(post.id);
			return { content: contentOfPost, ...post };
		}),
	);

	const sortedPosts = postsWithContent.reverse();

	const publishedPosts = sortedPosts.filter((post) => post.published);

	if (!pageId) {
		return NextResponse.json(publishedPosts);
	}

	return NextResponse.json({
		posts: publishedPosts.slice(
			siteConfig.maxPostsOnPageNews * (Number(pageId) - 1),
			siteConfig.maxPostsOnPageNews * Number(pageId),
		),
		maxPages: Math.ceil(
			publishedPosts.length / siteConfig.maxPostsOnPageNews,
		),
	});
}

export async function POST() {
	console.log(1);
	const session = await getServerSession(config);
	console.log(2);
	const allowedRoles = ["admin"];

	console.log(session);

	if (
		!session ||
		!session.user ||
		!session.user.role ||
		!allowedRoles.includes(session.user.role)
	) {
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 },
		);
	}
	console.log(3);

	const data = request.body;

	console.log(data);

	return NextResponse.json({ status: "ok" });
}
