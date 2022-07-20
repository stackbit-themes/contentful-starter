# Next.js + Contentful Stackbit Starter

<div style="text-align: center">

![Full Stackbit Starter](https://assets.stackbit.com/docs/contentful-starter-thumb.png)

</div>

This is a minimal starting point for new Stackbit projects. It is built with Next.js and equipped with visual editing capabilities using Stackbit. It uses Contentful as the content source. See below for [other Stackbit example projects](#other-stackbit-projects).

## Getting Started

The typical development process is to begin by working locally.

Create local Stackbit project from this repo:

```txt
npx create-stackbit-app@latest --starter contentful
```

Change into the project directory and add the Contentful tokens to the `.env` file (see `.env.example` for reference). **If you don't have a Contentful space with the proper content**, [see below](#importing-contentful-content) for importing default content and schema into Contentful.

```txt
cd my-stackbit-site
```

Run the Next.js development server:

```txt
npm run dev
```

Install the Stackbit CLI. Then open a new terminal window in the same project directory and run the Stackbit Dev server:

```txt
npm install -g @stackbit/cli
stackbit dev -c contentful --contentful-space-id <space_id> --contentful-preview-token <preview_token> --contentful-access-token <access_token>
```

This outputs your own Stackbit URL. Open this, register or sign in, and you will be directed to Stackbit's visual editor for your new project.

![Next.js Dev + Stackbit Dev](https://assets.stackbit.com/docs/next-dev-stackbit-dev.png)

## Importing Contentful Content

If you don't have a Contentful space set up and ready to go, you can import the starting content provided by this project.

1. Create a new Space in Contentful
1. Create new Contentful Personal Access Tokens [here](https://app.contentful.com/account/profile/cma_tokens/).
1. Import the Contentful data stored in the `contentful/export.json` file to the new space by running the following command. Replace the `<management_token>` with your Personal Access Token and the `<space_id>` with the new space ID.

   ```txt
   ./contentful/import.js <management_token> <space_id>
   ```

1. Create **Content Preview API - Access Token** for the new space via Contentful app **Settings** => **API Keys** => **Content delivery / preview tokens** => **Add API Key**. Add these keys to `.env` file(s) as mentioned above.

## Next Steps

Here are a few suggestions on what to do next if you're new to Stackbit:

- Learn [how Stackbit works](https://docs.stackbit.com/conceptual-guides/how-stackbit-works/)
- Follow the [_Getting Started_ tutorial](https://docs.stackbit.com/getting-started/)
- Explore the [how-to guides](https://docs.stackbit.com/how-to-guides/) for help while developing your site

## Other Stackbit Projects

Stackbit has a number of examples that you can use to create a new project or evaluate Stackbit. Run the following command to see a list of available examples:

```txt
npx create-stackbit-app@latest --help
```

You can also visit [our `stackbit-themes` GitHub organization](https://github.com/stackbit-themes)

## Join the Community

[Join us on Discord](https://discord.gg/HUNhjVkznH) for community support and to showcase what you build with this starter.
