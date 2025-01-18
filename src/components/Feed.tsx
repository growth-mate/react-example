import React from "react";
import { useFeed, PostData, PostId } from "../utils/growthmate";
import "./Feed.css";

interface IFeed {
	unitId: string;
	accountId?: string;
	network?: string;
	className?: string;
}

const Feed: React.FC<IFeed> = ({ unitId, accountId, className, network }) => {
	const { feed, feedProps, registerClick } = useFeed(unitId, accountId, network);

	return (
		<div
			className={`my-feed ${className ?? ""}`}
			{...feedProps}
		>
			{feed.map((post) => (
				<Post
					key={post.postId}
					postId={post.postId}
					data={post}
					registerClick={registerClick}
				/>
			))}
		</div>
	);
};

interface IPost {
	postId: PostId;
	data: PostData;
	registerClick: (postId: PostId) => void;
	className?: string;
}

const Post: React.FC<IPost> = ({ postId, data, registerClick, className }) => {
	return (
		<a
			ref={(ref) => ref && window.growthmate.registerPost(postId, ref)}
			className={`my-post ${className ?? ""}`}
			href={data.link}
			target="_blank"
			rel="noopener"
			onClick={() => {
				registerClick(postId);
				return true;
			}}
		>
			<div className="my-post-cta">{data.cta}</div>
			<div className="my-post-headline">{data.headline}</div>
			<div className="my-post-description">{data.description}</div>
			<div className="my-post-footer">
				<div className="my-post-topics">
					{data.topics.map((topic) => (
						<div
							key={topic}
							className="chip"
						>
							{topic}
						</div>
					))}
				</div>
				<div className="my-post-details">
					{`${new Date(data.createdAt).toLocaleDateString("en-US", {
						month: "short",
						day: "numeric",
						year: "numeric",
					})}  •  ${data.projectName}`}
				</div>
			</div>
			{!!data.avatar && (
				<img
					className="my-post-avatar"
					src={data.avatar}
					alt={data.projectName}
				/>
			)}
		</a>
	);
};

export { Feed };
export type { IFeed };
