import { DocumentTextIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const serviceType = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  icon: DocumentTextIcon,

  fieldsets: [
    // {
    //   name: 'faqSection',
    //   title: 'FAQ Section',
    //   options: {
    //     collapsible: true,
    //     collapsed: true,
    //   },
    // },
    {
      name: 'seoMetadata',
      title: 'SEO Metadata',
      options: {
        collapsible: true,
        collapsed: true,
      },
    },
  ],

  fields: [
    defineField({
      name: 'title',
      title: 'Service Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'description',
      title: 'Meta Description',
      type: 'text',
      description: 'Short SEO-friendly description of the blog service',
      validation: (Rule) => Rule.max(160),
    }),

    defineField({
      name: 'mainImage',
      title: 'Banner Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          initialValue: 'Banner image',
        },
      ],
    }),

    defineField({
      name: 'categories',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: {type: 'category'}})],
    }),

    defineField({
      name: 'body',
      type: 'blockContent',
    }),

    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      description: 'The date and time this service was published',
      validation: (Rule) => Rule.required(),
      initialValue: () => new Date().toISOString(), // defaults to current datetime on creation
    }),
    
    // FAQ section with a title and FAQ items
    // defineField({
    //   name: 'faqTitle',
    //   title: 'FAQ Title',
    //   type: 'string',
    //   fieldset: 'faqSection',
    //   validation: (Rule) => Rule.required(),
    // }),
    defineField({
      name: 'faqSection',
      title: 'FAQ Section',
      type: 'array',
      // fieldset: 'faqSection',
      of: [
        defineArrayMember({
          type: 'object',
          title: 'FAQ Group',
          fields: [
            defineField({
              name: 'faqTitle',
              title: 'FAQ Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'faqItems',
              title: 'FAQs',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'question',
                      title: 'Question',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'answer',
                      title: 'Answer',
                      type: 'text',
                      validation: (Rule) => Rule.required(),
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),

    // SEO Metadata fields inside collapsible SEO section
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL',
      type: 'url',
      fieldset: 'seoMetadata',
    }),

    defineField({
      name: 'metaRobots',
      title: 'Meta Robots',
      type: 'string',
      description: 'e.g., "max-snippet:-1, max-image-preview:large, max-video-preview:-1"',
      fieldset: 'seoMetadata',
    }),

    defineField({
      name: 'ogTitle',
      title: 'Open Graph Title',
      type: 'string',
      fieldset: 'seoMetadata',
    }),

    defineField({
      name: 'ogDescription',
      title: 'Open Graph Description',
      type: 'text',
      fieldset: 'seoMetadata',
    }),

    defineField({
      name: 'ogType',
      title: 'Open Graph Type',
      type: 'string',
      initialValue: 'website',
      fieldset: 'seoMetadata',
    }),

    defineField({
      name: 'ogImgUrl',
      title: 'Open Graph Img URL',
      type: 'url',
      fieldset: 'seoMetadata',
    }),

    defineField({
      name: 'author',
      type: 'reference',
      to: {type: 'author'},
    }),
  ],

  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
      slug: 'slug.current',
    },
    prepare({ title, media, slug }) {
      return {
        title,
        media,
        subtitle: slug ? `/${slug}` : '',
      }
    },
  },
})
