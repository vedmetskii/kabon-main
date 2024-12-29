import { siteConfig } from "@/config/site";

export const fetchDataFromAPI = async (
	apiUrl: string,
	path: string | undefined = undefined,
	q: string | undefined = undefined,
	pageId: number | undefined = undefined,
	maxPages: boolean = false,
): Promise<any> => {
	const url = new URL(
		`${siteConfig.proto}://${siteConfig.domain}:${siteConfig.port}${apiUrl}`,
	);

	if (path) {
		url.searchParams.set("path", path);
	}

	if (q) {
		url.searchParams.set("q", q);
	}

	if (pageId) {
		url.searchParams.set("pageId", String(pageId));
	}

	if (maxPages) {
		url.searchParams.set("maxPages", String(maxPages));
	}

	const response = await fetch(url);

	if (response.status >= 400) {
		throw new Error(String(response.status));
	}

	return await response.json();
};

type NavLink = {
	title: string;
	path: string;
	id: number;
	subLinks: {
		title: string;
		path: string;
		id: number;
	}[];
};

export const getNavLinks = async (): Promise<NavLink[]> => {
	return fetchDataFromAPI("/new_api/nav_links");
};

type Breadcrumbs = {
	title: string;
	path: string;
};

export const getBreadcrumbs = async ({
	path,
}: {
	path: string;
}): Promise<Breadcrumbs[]> => {
	return fetchDataFromAPI("/new_api/breadcrumbs", path);
};

type Content = {
	id: number;
	type: string;
	content: string;
};

type Page = {
	id: number;
	path: string;
	title: string;
	content: Content[];
};

type Post = {
	id: number;
	title: string;
	mainImage: string;
	content: Content[];
};

export const getAllPages = async (): Promise<Page[]> => {
	return fetchDataFromAPI("/new_api/pages");
};

export const getPage = async (path: string): Promise<Page> => {
	return fetchDataFromAPI("/new_api/pages", path);
};

export const getPostsInPage = async ({
	pageId,
}: {
	pageId: number;
}): Promise<{ posts: Post[]; maxPages: number }> => {
	return fetchDataFromAPI("/new_api/posts", "", "", pageId);
};

export const getSiteConfig = async (): Promise<SiteConfig> => {
	const res = await fetchDataFromAPI("/new_api/site_config");
	console.log(res);
	return res;
};
