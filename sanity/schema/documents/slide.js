export default {
  name: 'slide',
  title: 'Slide',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      style: 'h1',
      type: 'string',
    },
    {
      name: 'labeledImage',
      title: 'Labeled Image',
      type: 'labeledImage',
    },
    {
      name: "content",
      title: "Content",
      type: "array",
      of: [
        { type: "block" },
        { type: "labeledImage" },
      ],
    },
    {
      name: "miniImage",
      title: "Mini Image",
      type: "labeledImage",
    },
    {
      name: 'children',
      title: 'Children',
      type: 'array',
      of: [
        {
          type: 'string',
        }
      ]
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 200, // will be ignored if slugify is set
        slugify: input => input
          .toLowerCase()
          .replace(/\s+/g, '-')
          .slice(0, 200)
      }
    },
    {
      name: "index",
      title: "Index",
      type: "number",
    },
    {
      name: "depth",
      title: "Depth",
      type: "number",
    },
    {
      name: "test",
      title: "Test",
      type: "array",
      of: [
        { type: "block" },
        { type: "image" },
      ],
    },
  ],
}

