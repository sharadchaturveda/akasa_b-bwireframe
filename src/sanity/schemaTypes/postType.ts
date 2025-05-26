import {DocumentTextIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
      },
    }),
    defineField({
      name: 'author',
      type: 'reference',
      to: {type: 'author'},
    }),
    defineField({
      name: 'mainImage',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        })
      ]
    }),
    defineField({
      name: 'categories',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: {type: 'category'}})],
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
    }),
    defineField({
      name: 'body',
      type: 'blockContent',
    }),
    defineField({
      name: 'metaRobots',
      title: 'Meta Robots',
      type: 'string',
      description: 'e.g., "max-snippet:-1, max-image-preview:large, max-video-preview:-1"',
      fieldset: 'seoMetadata',
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL',
      type: 'url',
      description: 'canonical URL of the blog post',
      fieldset: 'seoMetadata',
    }),
    defineField({
      name: 'ogTitle',
      title: 'Open Graph Title',
      type: 'string',
      description: 'title for Open Graph previews',
      fieldset: 'openGraphMetadata',
    }),
    defineField({
      name: 'ogDescription',
      title: 'Open Graph Description',
      type: 'text',
      description: 'description for Open Graph',
      fieldset: 'openGraphMetadata',
    }),
    defineField({
      name: 'ogType',
      title: 'Open Graph Type',
      type: 'string',
      description: 'og:type property',
      initialValue: 'website',
      fieldset: 'openGraphMetadata',
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      description: 'featured image for sharing',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        })
      ],
      fieldset: 'openGraphMetadata',
    }),
    defineField({
      name: 'ogUrl',
      title: 'Open Graph URL',
      type: 'url',
      description: 'full URL of the post',
      fieldset: 'openGraphMetadata',
    }),
  ],
  fieldsets: [
    {
      name: 'seoMetadata',
      title: 'SEO Metadata',
      options: {
        collapsible: true,
        collapsed: true,
      },
    },
    {
      name: 'openGraphMetadata',
      title: 'Open Graph Metadata',
      options: {
        collapsible: true,
        collapsed: true,
      },
    },
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `by ${author}`}
    },
  },
})
