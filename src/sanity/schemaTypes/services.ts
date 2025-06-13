import { DocumentTextIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const serviceType = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Service Title',
      type: 'string',
      validation: (Rule) => Rule.required().min(3),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Detailed Description',
      type: 'array',
      of: [defineArrayMember({ type: 'block' })],
    }),
    defineField({
      name: 'price',
      title: 'Price (INR)',
      type: 'number',
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: 'duration',
      title: 'Duration (in minutes)',
      type: 'number',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Dining', value: 'dining' },
          { title: 'Takeaway', value: 'takeaway' },
          { title: 'Catering', value: 'catering' },
          { title: 'Home Delivery', value: 'delivery' },
          { title: 'Others', value: 'others' },
        ],
      },
    }),
    defineField({
      name: 'image',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'available',
      title: 'Is Available?',
      type: 'boolean',
      initialValue: true,
    }),
  ],

  preview: {
    select: {
      title: 'title',
      category: 'category',
      media: 'image',
      price: 'price',
      available: 'available',
    },
    prepare(selection) {
      const { title, category, media, price, available } = selection
      return {
        title: title,
        subtitle: `${category ?? 'No category'} — ₹${price ?? 'N/A'} — ${
          available ? 'Available' : 'Unavailable'
        }`,
        media: media,
      }
    },
  },
})
