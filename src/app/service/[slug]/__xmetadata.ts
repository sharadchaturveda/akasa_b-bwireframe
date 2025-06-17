// import { client } from '@/sanity/lib/client';
// import { generateMetadata as generateSEOMetadata } from '@/utils/seo';
// import { Metadata } from 'next';
// import imageUrlBuilder from '@sanity/image-url';

// const builder = imageUrlBuilder(client);

// function urlFor(source: any) {
//   return builder?.image(source);
// }

// interface Props {
//     params: { slug: string };
// }

// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   const { slug } = params;

//   try {
//     async function getMetadata() {
//       const query = `*[_type == "post" && slug.current == $slug][0]{
//         title,
//         description,
//         mainImage
//       }`;
//       const post = await client.fetch(query, { slug });

//       if (!post) {
//         return {
//           title: 'Post not found',
//           description: 'This blog post could not be found.',
//         };
//       }

//       return {
//         ...generateSEOMetadata({
//           title: post.title,
//           description: post.description || '',
//           ogImagePath: post.mainImage ? urlFor(post.mainImage).url() : undefined,
//           path: `/blog/${slug}`,
//         }),
//         robots: {
//           index: false,
//           follow: true,
//           nocache: true,
//         },
//       };
//     }

//     return await getMetadata();
//   } catch (error) {
//     console.error("Error generating metadata:", error);
//     return {
//       title: 'Blog Post',
//       description: 'Read more on our blog.',
//     };
//   }
// }